import { EntityIdentifier } from "@serenityjs/entity";
import {
	AbilityLayerType,
	AbilitySet,
	AddEntityPacket,
	AddItemActorPacket,
	AddPlayerPacket,
	NetworkItemStackDescriptor,
	PropertySyncData,
	RemoveEntityPacket,
	type Vector3f
} from "@serenityjs/protocol";

import { PlayerStatus, type Player } from "../../player";
import { ItemStack } from "../../item";

import { PlayerComponent } from "./player-component";

class PlayerEntityRenderingComponent extends PlayerComponent {
	public static readonly identifier = "minecraft:entity_rendering";

	public static readonly types = [EntityIdentifier.Player];

	/**
	 * A collective map of all the entities that have been rendered for the player.
	 */
	public readonly entities: Set<bigint> = new Set();

	public constructor(player: Player) {
		super(player, PlayerEntityRenderingComponent.identifier);
	}

	public onTick(): void {
		// Get the current tick
		const currentTick = this.player.dimension.world.currentTick;

		// Check if the current tick is a multiple of 5
		if (currentTick % 5n !== 0n) return;

		// Check if the player is spawned
		if (this.player.status !== PlayerStatus.Spawned) return;

		// Check if the player has a chunk rendering component
		const component = this.player.getComponent("minecraft:chunk_rendering");
		if (!component) return;

		// Get the player's view distance
		const viewDistance = component.viewDistance << 4;

		// Get all the entities in the player's dimension
		const entities = this.player.dimension.entities;

		// Iterate over the entities
		for (const [unique, entity] of entities) {
			// Check if the entity is the player or if the entity has already been rendered
			if (this.entities.has(unique) || entity === this.player) continue;

			// Check if the entity is a player and if the player is spawned
			if (entity.isPlayer() && entity.status !== PlayerStatus.Spawned) continue;

			// Check if the entity is alive
			if (!entity.isAlive) continue;

			// Check if the entity is within the player's view distance
			if (this.distance(entity.position, this.player.position) > viewDistance)
				continue;

			// Add the entity to the rendered entities
			this.entities.add(unique);

			// Check if the entity is a player
			if (entity.isPlayer()) {
				// Create a new AddPlayerPacket
				const packet = new AddPlayerPacket();

				// Get the players inventory
				const inventory = entity.getComponent("minecraft:inventory");

				// Get the players held item
				const heldItem = inventory.getHeldItem();

				// Set the packet properties
				packet.uuid = entity.uuid;
				packet.username = entity.username;
				packet.runtimeId = entity.runtime;
				packet.platformChatId = String(); // TODO: Not sure what entity is.
				packet.position = entity.position;
				packet.velocity = entity.velocity;
				packet.pitch = entity.rotation.pitch;
				packet.yaw = entity.rotation.yaw;
				packet.headYaw = entity.rotation.headYaw;
				packet.heldItem =
					heldItem === null
						? new NetworkItemStackDescriptor(0)
						: ItemStack.toNetworkStack(heldItem);
				packet.gamemode = entity.gamemode;
				packet.data = [...entity.metadata];
				packet.properties = new PropertySyncData([], []);
				packet.uniqueEntityId = entity.unique;
				packet.premissionLevel = entity.permission;
				packet.commandPermission = entity.permission === 2 ? 1 : 0;
				packet.abilities = [
					{
						type: AbilityLayerType.Base,
						abilities: [...entity.abilities.entries()].map(
							([ability, value]) => new AbilitySet(ability, value)
						),
						walkSpeed: 0.1,
						flySpeed: 0.05
					}
				];
				packet.links = [];
				packet.deviceId = "";
				packet.deviceOS = 0;

				// Send the packet to the player
				this.player.session.send(packet);

				// Sync the entity
				entity.sync();

				// Continue to the next entity
				continue;
			}

			// Check if the entity is an item
			if (entity.isItem()) {
				// Get the item component
				const itemComponent = entity.getComponent("minecraft:item");

				// Create a new AddItemActorPacket
				const packet = new AddItemActorPacket();

				// Set the packet properties
				packet.uniqueId = entity.unique;
				packet.runtimeId = entity.runtime;
				packet.item = ItemStack.toNetworkStack(itemComponent.itemStack);
				packet.position = entity.position;
				packet.velocity = entity.velocity;
				packet.data = [...entity.metadata];
				packet.fromFishing = false;

				// Send the packet to the player
				this.player.session.send(packet);

				// Sync the entity
				entity.sync();

				// Continue to the next entity
				continue;
			}

			// Create a new AddEntityPacket
			const packet = new AddEntityPacket();

			// Set the packet properties
			packet.uniqueEntityId = entity.unique;
			packet.runtimeId = entity.runtime;
			packet.identifier = entity.type.identifier;
			packet.position = entity.position;
			packet.velocity = entity.velocity;
			packet.pitch = entity.rotation.pitch;
			packet.yaw = entity.rotation.yaw;
			packet.headYaw = entity.rotation.headYaw;
			packet.bodyYaw = entity.rotation.yaw;
			packet.attributes = [];
			packet.data = [...entity.metadata];
			packet.properties = new PropertySyncData([], []);
			packet.links = [];

			// Send the packet to the player
			this.player.session.send(packet);

			// Sync the entity
			entity.sync();
		}

		// Iterate over the entities
		for (const unique of this.entities) {
			// Check if the entity is still in the player's dimension
			if (this.player.dimension.entities.has(unique)) {
				// Get the entity
				const entity = this.player.dimension.getEntity(unique);
				if (!entity) continue;

				// Check if the entity is in the player's view distance
				if (
					this.distance(entity.position, this.player.position) <= viewDistance
				)
					continue;

				// Create a new remove entity packet
				const packet = new RemoveEntityPacket();

				// Set the unique entity id
				packet.uniqueEntityId = unique;

				// Send the packet to the player
				this.player.session.send(packet);

				// Remove the entity from the rendered entities
				this.entities.delete(unique);
			} else {
				// Create a new remove entity packet
				const packet = new RemoveEntityPacket();
				packet.uniqueEntityId = unique;

				// Send the packet to the player
				this.player.session.send(packet);

				// Remove the entity from the rendered entities
				this.entities.delete(unique);
			}
		}
	}

	public distance(a: Vector3f, b: Vector3f): number {
		return Math.sqrt(
			Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
		);
	}
}

export { PlayerEntityRenderingComponent };
