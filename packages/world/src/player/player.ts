import {
	type AbilityFlag,
	type AbilityLayerFlag,
	AbilityLayerType,
	AddPlayerPacket,
	type BlockCoordinates,
	ChangeDimensionPacket,
	Gamemode,
	MoveMode,
	MovePlayerPacket,
	NetworkItemStackDescriptor,
	type PermissionLevel,
	PlayStatus,
	PlayStatusPacket,
	RespawnPacket,
	RespawnState,
	type SerializedSkin,
	SetPlayerGameTypePacket,
	TeleportCause,
	TextPacket,
	TextPacketType,
	TransferPacket,
	UpdateAbilitiesPacket,
	type Vector3f
} from "@serenityjs/protocol";
import { EntityIdentifier, EntityType } from "@serenityjs/entity";

import { Entity } from "../entity";
import {
	EntityAlwaysShowNametagComponent,
	EntityBreathingComponent,
	EntityHasGravityComponent,
	EntityHealthComponent,
	EntityInventoryComponent,
	EntityMovementComponent,
	EntityNametagComponent,
	EntityArmorComponent,
	EntityInteractComponent,
	PlayerAttackMobsComponent,
	PlayerAttackPlayersComponent,
	PlayerBuildComponent,
	PlayerChunkRenderingComponent,
	type PlayerComponent,
	PlayerCountComponent,
	PlayerCursorComponent,
	PlayerDoorsAndSwitchesComponent,
	PlayerFlyingComponent,
	PlayerFlySpeedComponent,
	PlayerInstantBuildComponent,
	PlayerInvulnerableComponent,
	PlayerLightningComponent,
	PlayerMayFlyComponent,
	PlayerMineComponent,
	PlayerMutedComponent,
	PlayerNoClipComponent,
	PlayerOpenContainersComponent,
	PlayerOperatorCommandsComponent,
	PlayerPrivilegedBuilderComponent,
	PlayerTeleportComponent,
	PlayerWalkSpeedComponent,
	PlayerWorldBuilderComponent,
	EntityComponent,
	PlayerEntityRenderingComponent
} from "../components";
import { ItemStack } from "../item";

import { PlayerStatus } from "./status";

import type { Dimension } from "../world";
import type { Container } from "../container";
import type { PlayerComponents } from "../types/components";
import type { LoginTokenData } from "../types/login-data";
import type { NetworkSession } from "@serenityjs/network";

// TODO: Possibly expose a collection of entity metadata?

/**
 * Represents a player in a Dimension instance that is connected to the server, and can interact with the world. Creating a new Player instance should be handled by the server instead of Plugins. This class is responsible for handling player-specific logic, such as sending packets, handling player movement, and managing player data. Player instances requires a NetworkSession instance to communicate with the player, and data from the player's login tokens.
 */
class Player extends Entity {
	/**
	 * The player's network session.
	 */
	public readonly session: NetworkSession;

	/**
	 * The player's username.
	 */
	public readonly username: string;

	/**
	 * The player's Xbox Live User ID.
	 */
	public readonly xuid: string;

	/**
	 * The player's Universally Unique Identifier.
	 */
	public readonly uuid: string;

	/**
	 * The player's abilities.
	 */
	public readonly abilities = new Set<AbilityFlag>();

	/**
	 * The current status of the player's connection.
	 */
	public status: PlayerStatus = PlayerStatus.Connecting;

	/**
	 * The player's permission level.
	 */
	public permission: PermissionLevel;

	public readonly skin: SerializedSkin;

	/**
	 * The player's current network latency.
	 */
	public ping = 0;

	/**
	 * The target block the player is currently mining.
	 */
	public target: BlockCoordinates | null = null;

	/**
	 * @readonly
	 * The currently opened container visible to the player.
	 */
	public openedContainer: Container | null = null;

	/**
	 * @readonly
	 * The ItemStack the player is currently using.
	 */
	public usingItem: ItemStack | null = null;

	/**
	 * @readonly
	 * If the player is sneaking.
	 */
	public isSneaking = false;

	/**
	 * @readonly
	 * If the player is sprinting.
	 */
	public isSprinting = false;

	/**
	 * @readonly
	 * If the player is flying.
	 */
	public isFlying = false;

	// Protected properties

	/**
	 * @deprecated This property is deprecated and will be removed in the future.
	 * The player's gamemode.
	 */
	protected _gamemode = Gamemode.Creative;

	public constructor(
		session: NetworkSession,
		tokens: LoginTokenData,
		dimension: Dimension,
		permission: PermissionLevel,
		skin: SerializedSkin
	) {
		super(EntityIdentifier.Player, dimension, session.guid);
		this.session = session;
		this.username = tokens.identityData.displayName;
		this.xuid = tokens.identityData.XUID;
		this.uuid = tokens.identityData.identity;
		this.permission = permission;
		this.skin = skin;

		// Register the type components to the entity.
		for (const component of EntityComponent.registry.get(
			this.type.identifier
		) ?? [])
			new component(this, component.identifier);
	}

	/**
	 * The player's gamemode.
	 */
	public get gamemode(): Gamemode {
		return this._gamemode;
	}

	public set gamemode(value: Gamemode) {
		this._gamemode = value;

		// Create a new SetPlayerGameTypePacket
		const packet = new SetPlayerGameTypePacket();
		packet.gamemode = value;

		// Send the packet to the player
		this.session.send(packet);
	}

	/**
	 * Ticks the player instance.
	 */
	public tick(): void {
		// TODO: Move this elsewhere.
		// Check if the current tick is divisible by 35
		// if (this.dimension.world.currentTick % 35n === 0n) {
		// 	// Calculate the ping of the player.
		// 	const packet = new NetworkStackLatencyPacket();
		// 	packet.timestamp = BigInt(Date.now());
		// 	packet.fromServer = true;
		// 	// Send the packet to the player.
		// 	this.session.sendImmediate(packet);
		// 	// Wait for the player to respond.
		// 	this.session.once(packet.getId(), () => {
		// 		// Calculate the ping of the player.
		// 		const stamp = Number(BigInt(Date.now()) - packet.timestamp);
		// 		// Subtract 30ms from the ping to get the actual ping.
		// 		this.ping = stamp - 30;
		// 	});
		// }
	}

	/**
	 * Syncs the player instance.
	 */
	public sync(): void {
		// Sync the entity based properties
		super.sync();

		// Sync the player's abilities
		this.syncAbilities();

		// Get the commands that are available to the player
		const available = this.dimension.world.commands.serialize();

		// Filter out the commands that are not applicable to the player
		const filtered = available.commands;

		// Update the commands of the player
		available.commands = filtered;

		// Send the commands to the player
		this.session.sendImmediate(available);

		// TODO: Send the player the world settings.
	}

	/**
	 * Spawns the player in the world.
	 * @param player The player to spawn the player to.
	 */
	public spawn(player?: Player): void {
		// Create a new AddPlayerPacket
		const packet = new AddPlayerPacket();

		// Get the players inventory
		const inventory = this.getComponent("minecraft:inventory");

		// Get the players held item
		const heldItem = inventory.getHeldItem();

		// Set the packet properties
		packet.uuid = this.uuid;
		packet.username = this.username;
		packet.runtimeId = this.runtime;
		packet.platformChatId = String(); // TODO: Not sure what this is.
		packet.position = this.position;
		packet.velocity = this.velocity;
		packet.pitch = this.rotation.pitch;
		packet.yaw = this.rotation.yaw;
		packet.headYaw = this.rotation.headYaw;
		packet.heldItem =
			heldItem === null
				? new NetworkItemStackDescriptor(0)
				: ItemStack.toNetworkStack(heldItem);
		packet.gamemode = this.gamemode;
		packet.metadata = [...this.metadata.values()];
		packet.properties = {
			ints: [],
			floats: []
		};
		packet.uniqueEntityId = this.unique;
		packet.premissionLevel = 2;
		packet.commandPermission = 2;
		packet.abilities = [
			{
				type: AbilityLayerType.Base,
				flags: [...this.abilities.values()],
				flySpeed: 0.05,
				walkSpeed: 0.1
			}
		];
		packet.links = [];
		packet.deviceId = "";
		packet.deviceOS = 0;

		// Send the packet to the player
		player ? player.session.send(packet) : this.dimension.broadcast(packet);

		// If a player was provided, then return
		if (player) return;

		// Add the player to the dimension
		this.dimension.entities.set(this.unique, this);

		// Spawn all entities in the dimension for the player
		// for (const entity of this.dimension.entities.values()) {
		// 	// Check if the entity is the player
		// 	if (entity === this) continue;

		// 	// Spawn the entity for the player
		// 	entity.spawn(this);
		// }

		// Trigger the onSpawn method of all applicable components
		for (const component of this.getComponents()) component.onSpawn?.();

		// Sync the player instance
		this.sync();
	}

	/**
	 * Despawns the player from the world.
	 * @param player The player to despawn the player from.
	 */
	public respawn(): void {
		// Create a new RespawnPacket
		const respawn = new RespawnPacket();

		// Set the packet properties
		respawn.position = this.position; // TODO: Set the respawn position
		respawn.runtimeEntityId = this.runtime;
		respawn.state = RespawnState.ClientReadyToSpawn;

		// Create a new PlayStatusPacket
		const ready = new PlayStatusPacket();

		// Set the packet properties
		ready.status = PlayStatus.PlayerSpawn;

		// Send the packets to the player
		this.session.send(respawn, ready);

		// Check if the player is already in the dimension
		if (this.dimension.entities.has(this.unique)) return;

		// Add the player to the dimension
		this.spawn();
	}

	/**
	 * Despawns the player from the world.
	 * @param player The player to despawn the player from.
	 */
	public hasComponent<T extends keyof PlayerComponents>(
		identifier: T
	): boolean {
		return this.components.has(identifier) as boolean;
	}

	/**
	 * Gets a component from the player.
	 * @param component The component to get.
	 * @returns The component that was found.
	 */
	public getComponent<T extends keyof PlayerComponents>(
		identifier: T
	): PlayerComponents[T] {
		return this.components.get(identifier) as PlayerComponents[T];
	}

	/**
	 * Gets all the components from the player.
	 * @returns The components that were found.
	 */
	public getComponents(): Array<PlayerComponent> {
		return [...this.components.values()] as Array<PlayerComponent>;
	}

	/**
	 * Sets a component to the player.
	 * @param component The component to set.
	 */
	public setComponent<T extends keyof PlayerComponents>(
		component: PlayerComponents[T]
	): void {
		this.components.set(component.identifier, component as PlayerComponent);
	}

	/**
	 * Removes a component from the player.
	 * @param component The component to remove.
	 */
	public removeComponent<T extends keyof PlayerComponents>(
		identifier: T
	): void {
		this.components.delete(identifier);
	}

	/**
	 * Syncs the player's abilities to the dimension.
	 */
	public syncAbilities(): void {
		// Create a new UpdateAbilitiesPacket
		const packet = new UpdateAbilitiesPacket();
		packet.permissionLevel = this.permission;
		packet.commandPersmissionLevel = 2;
		packet.entityUniqueId = this.unique;
		packet.abilities = [
			{
				type: AbilityLayerType.Base,
				flags: [...this.abilities.values()],
				walkSpeed: 0.1,
				flySpeed: 0.05
			}
		];

		// Send the packet to the player
		this.dimension.broadcast(packet);
	}

	/**
	 * Checks if the player has a specific ability.
	 * @param ability The ability to check.
	 * @returns Whether the player has the ability.
	 */
	public hasAbility(ability: AbilityLayerFlag): boolean {
		return [...this.abilities.values()].some((flag) => flag.flag === ability);
	}

	/**
	 * Gets a specific ability from the player.
	 * @param ability The ability to get.
	 * @returns The ability that was found.
	 */
	public getAbility(ability: AbilityLayerFlag): AbilityFlag | undefined {
		return [...this.abilities.values()].find((flag) => flag.flag === ability);
	}

	/**
	 * Gets all the abilities from the player.
	 * @returns The abilities that were found.
	 */
	public getAllAbilities(): Array<AbilityFlag> {
		return [...this.abilities.values()];
	}

	/**
	 * Adds an ability to the player.
	 * @param ability The ability to add.
	 * @param sync Whether to synchronize the ability to the dimension.
	 */
	public addAbility(ability: AbilityFlag, sync = true): void {
		this.abilities.add(ability);

		// Check if the ability should be synchronized
		if (sync) this.syncAbilities();
	}

	/**
	 * Sets a specific ability to the player.
	 * @param ability The ability to set.
	 * @param value The value to set the ability to.
	 * @param sync Whether to synchronize the ability to the dimension.
	 */
	public setAbility(
		ability: AbilityLayerFlag,
		value: boolean,
		sync = true
	): void {
		// Get the ability
		const flag = this.getAbility(ability);

		// Check if the ability was found
		if (!flag) return;

		// Set the value of the ability
		flag.value = value;

		// Check if the ability should be synchronized
		if (sync) this.syncAbilities();
	}

	/**
	 * Creates a new ability for the player.
	 * @param ability The ability to create.
	 * @param value The value to set the ability to.
	 * @param sync Whether to synchronize the ability to the dimension.
	 */
	public createAbility(
		ability: AbilityLayerFlag,
		value: boolean,
		sync = true
	): void {
		// TODO: rewrite the ability proto and types

		// Create a new ability flag
		const flag: AbilityFlag = {
			flag: ability,
			value
		};

		// Add the ability to the player
		this.addAbility(flag);

		// Check if the ability should be synchronized
		if (sync) this.syncAbilities();
	}

	/**
	 * Removes an ability from the player.
	 * @param ability The ability to remove.
	 * @param sync Whether to synchronize the ability to the dimension.
	 */
	public removeAbility(ability: AbilityLayerFlag, sync = true): void {
		// Get the ability
		const flag = this.getAbility(ability);

		// Check if the ability was found
		if (!flag) return;

		// Remove the ability
		this.abilities.delete(flag);

		// Check if the ability should be synchronized
		if (sync) this.syncAbilities();
	}

	/**
	 * Sends a message to the player.
	 *
	 * @param message The message to send.
	 */
	public sendMessage(message: string): void {
		// Construct the text packet.
		const packet = new TextPacket();

		// Assign the packet data.
		packet.type = TextPacketType.Raw;
		packet.needsTranslation = false;
		packet.source = null;
		packet.message = message;
		packet.parameters = null;
		packet.xuid = "";
		packet.platformChatId = "";
		packet.filtered = message;

		// Send the packet.
		this.session.send(packet);
	}

	/**
	 * Teleports the player to a specific position.
	 * @param position The position to teleport the player to.
	 * @param dimension The dimension to teleport the player to.
	 */
	public teleport(position: Vector3f, dimension?: Dimension): void {
		// Set the player's position
		this.position.x = position.x;
		this.position.y = position.y;
		this.position.z = position.z;

		// Check if the dimension is provided
		if (dimension) {
			// Despawn the player from the current dimension
			this.despawn();

			// Check if the dimension types are different
			// This allows for a faster dimension change if the types are the same
			if (this.dimension.type === dimension.type) {
				// Despawn all entities in the dimension for the player
				for (const entity of this.dimension.entities.values()) {
					// Despawn the entity for the player
					entity.despawn(this);
				}
			} else {
				// Create a new ChangeDimensionPacket
				const packet = new ChangeDimensionPacket();
				packet.dimension = dimension.type;
				packet.position = position;
				packet.respawn = true;

				// Send the packet to the player
				this.session.send(packet);
			}

			// Set the new dimension
			this.dimension = dimension;

			// Check if the player has the chunk rendering component
			if (this.hasComponent("minecraft:chunk_rendering")) {
				// Get the chunk rendering component
				const component = this.getComponent("minecraft:chunk_rendering");

				// Clear the chunks
				component.chunks.clear();
			}

			// Spawn the player in the new dimension
			this.spawn();
		} else {
			// Create a new MovePlayerPacket
			const packet = new MovePlayerPacket();

			// Set the packet properties
			packet.runtimeId = this.runtime;
			packet.position = position;
			packet.pitch = this.rotation.pitch;
			packet.yaw = this.rotation.yaw;
			packet.headYaw = this.rotation.headYaw;
			packet.mode = MoveMode.Teleport;
			packet.onGround = false; // TODO: Added ground check
			packet.riddenRuntimeId = 0n;
			packet.cause = new TeleportCause(4, 0);
			packet.tick = this.dimension.world.currentTick;

			// Send the packet to the player
			this.session.send(packet);
		}
	}

	/**
	 * Transfers the player to a different server.
	 * @param address The address to transfer the player to.
	 * @param port The port to transfer the player to.
	 */
	public transfer(address: string, port: number): void {
		// Create a new TransferPacket
		const packet = new TransferPacket();

		// Set the packet properties
		packet.address = address;
		packet.port = port;

		// Send the packet to the player
		this.session.send(packet);
	}
}

export { Player };

// Register the player components
// TODO: Move this to a separate file.
const type = EntityType.get(EntityIdentifier.Player) as EntityType;
PlayerCursorComponent.register(type);
EntityInventoryComponent.register(type);
EntityMovementComponent.register(type);
EntityHasGravityComponent.register(type);
EntityBreathingComponent.register(type);
EntityNametagComponent.register(type);
EntityAlwaysShowNametagComponent.register(type);
EntityHealthComponent.register(type);
EntityArmorComponent.register(type);
EntityInteractComponent.register(type);
PlayerBuildComponent.register(type);
PlayerMineComponent.register(type);
PlayerDoorsAndSwitchesComponent.register(type);
PlayerOpenContainersComponent.register(type);
PlayerAttackPlayersComponent.register(type);
PlayerAttackMobsComponent.register(type);
PlayerOperatorCommandsComponent.register(type);
PlayerTeleportComponent.register(type);
PlayerInvulnerableComponent.register(type);
PlayerFlyingComponent.register(type);
PlayerMayFlyComponent.register(type);
PlayerInstantBuildComponent.register(type);
PlayerLightningComponent.register(type);
PlayerFlySpeedComponent.register(type);
PlayerWalkSpeedComponent.register(type);
PlayerMutedComponent.register(type);
PlayerWorldBuilderComponent.register(type);
PlayerNoClipComponent.register(type);
PlayerPrivilegedBuilderComponent.register(type);
PlayerCountComponent.register(type);
PlayerChunkRenderingComponent.register(type);
PlayerEntityRenderingComponent.register(type);
