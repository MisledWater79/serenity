import {
	type DataPacket,
	type DimensionType,
	SetTimePacket,
	TextPacket,
	TextPacketType
} from "@serenityjs/protocol";
import { Logger, LoggerColors } from "@serenityjs/logger";
import { Commands } from "@serenityjs/command";

import { COMMON_COMMANDS } from "../commands";
import { ADMIN_COMMANDS } from "../commands/admin";

import { Dimension } from "./dimension";

import type { TerrainGenerator } from "../generator";
import type { Entity } from "../entity";
import type { WorldProvider } from "../provider";
import type { Player } from "../player";

class World {
	/**
	 * The identifier of the world.
	 */
	public readonly identifier: string;

	/**
	 * The data provider for the world.
	 */
	public readonly provider: WorldProvider;

	/**
	 * The dimensions within the world.
	 */
	public readonly dimensions: Map<string, Dimension>;

	/**
	 * The commands for the world.
	 */
	public readonly commands: Commands<Entity | Dimension>;

	/**
	 * The logger for the world.
	 */
	public readonly logger: Logger;

	/**
	 * The current tick of the world.
	 */
	public currentTick = 0n;

	/**
	 * The current time of the world.
	 */
	public dayTime = 0;

	/**
	 * Creates a new world instance.
	 * @param identifier The identifier of the world.
	 * @param provider The data provider for the world.
	 * @returns A new world instance with the specified identifier and provider.
	 */
	public constructor(identifier: string, provider: WorldProvider) {
		this.identifier = identifier;
		this.provider = provider;
		this.dimensions = new Map();
		this.commands = new Commands();
		this.logger = new Logger(identifier, LoggerColors.GreenBright);

		// Register the default comman and admin commands
		for (const register of [...COMMON_COMMANDS, ...ADMIN_COMMANDS])
			register(this);
	}

	/**
	 * Ticks the world instance.
	 */
	public tick(): void {
		// Check if there are no players in the world
		if (this.getPlayers().length === 0) return;

		// Add one to the current tick
		this.currentTick++;

		// Increment the day time
		// Day time is 24000 ticks long
		this.dayTime = (this.dayTime + 1) % 24_000;

		// Tick all the dimensions
		for (const dimension of this.dimensions.values())
			try {
				dimension.tick();
			} catch (reason) {
				this.logger.error(
					`Failed to tick dimension "${dimension.identifier}," reason: ${reason}`
				);
			}

		// Check if the world has been running for 10 minutes
		if (this.currentTick % 12_000n === 0n) {
			// Signal the provider to save the world
			try {
				this.provider.save();
			} catch (reason) {
				this.logger.error(`Failed to save world, reason: ${reason}`);
			}
		}
	}

	/**
	 * Gets all the players in the world.
	 */
	public getPlayers(): Array<Player> {
		return [...this.dimensions.values()].flatMap((dimension) =>
			dimension.getPlayers()
		);
	}

	/**
	 * Gets all the entities in the world.
	 */
	public getEntities(): Array<Entity> {
		return [...this.dimensions.values()].flatMap((dimension) =>
			dimension.getEntities()
		);
	}

	/**
	 * Gets a dimension by its identifier.
	 *
	 * @param identifier The identifier of the dimension.
	 * @returns The dimension that was found.
	 */
	public getDimension(identifier?: string): Dimension {
		return this.dimensions.get(identifier ?? "overworld") as Dimension;
	}

	/**
	 * Creates a new dimension.
	 *
	 * @param identifier The identifier of the dimension.
	 * @param type The type of the dimension.
	 * @param generator The generator of the dimension.
	 * @returns A new dimension.
	 */
	public createDimension(
		identifier: string,
		type: DimensionType,
		generator: TerrainGenerator
	): Dimension {
		// Check if the dimension already exists
		if (this.dimensions.has(identifier)) {
			this.logger.error(
				`Failed to create dimension "${identifier}," it already exists.`
			);

			return this.dimensions.get(identifier) as Dimension;
		}

		// Create the dimension
		const dimension = new Dimension(identifier, type, generator, this);

		// Set the dimension
		this.dimensions.set(identifier, dimension);

		// Return the dimension
		return dimension;
	}

	/**
	 * Broadcasts packets to all the players in the world.
	 *
	 * @param packets The packets to broadcast.
	 */
	public broadcast(...packets: Array<DataPacket>): void {
		for (const player of this.getPlayers()) player.session.send(...packets);
	}

	/**
	 * Broadcasts packets to all the players in the world immediately.
	 *
	 * @param packets The packets to broadcast.
	 */
	public broadcastImmediate(...packets: Array<DataPacket>): void {
		for (const player of this.getPlayers())
			player.session.sendImmediate(...packets);
	}

	/**
	 * Broadcasts packets to all the players in the world except one.
	 *
	 * @param player The player to exclude.
	 * @param packets The packets to broadcast.
	 */
	public broadcastExcept(player: Player, ...packets: Array<DataPacket>): void {
		for (const x of this.getPlayers())
			if (x !== player) x.session.send(...packets);
	}

	/**
	 * Sends a message to all the players in the world.
	 * @param message The message to send.
	 */
	public sendMessage(message: string): void {
		// Create a new TextPacket
		const packet = new TextPacket();

		// Set the packet properties
		packet.type = TextPacketType.Raw;
		packet.needsTranslation = false;
		packet.source = null;
		packet.message = message;
		packet.parameters = null;
		packet.xuid = "";
		packet.platformChatId = "";
		packet.filtered = message;

		// Broadcast the packet
		this.broadcast(packet);
	}

	/**
	 * Gets the time of the world.
	 *
	 * @returns The time of the world.
	 */
	public getTime(): number {
		return this.dayTime;
	}

	/**
	 * Sets the time of the world.
	 *
	 * @param time The time to set.
	 */
	public setTime(time: number): void {
		// Make sure the time is within the bounds
		this.dayTime = time % 24_000;

		// Broadcast the time change
		const packet = new SetTimePacket();
		packet.time = this.dayTime;

		// Broadcast the packet
		this.broadcast(packet);
	}
}

export { World };
