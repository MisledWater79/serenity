import {
	ComplexInventoryTransaction,
	DisconnectReason,
	type InventoryAction,
	InventoryTransactionPacket,
	ItemUseInventoryTransactionType,
	type ItemUseInventoryTransaction,
	Gamemode,
	type ItemUseOnEntityInventoryTransaction,
	type ItemReleaseInventoryTransaction,
	AbilityIndex,
	CompletedUsingItemPacket
} from "@serenityjs/protocol";
import {
	EntityInteractType,
	ItemUseCause,
	type Player
} from "@serenityjs/world";
import { BlockIdentifier, BlockPermutation } from "@serenityjs/block";

import { SerenityHandler } from "./serenity-handler";

import type { NetworkSession } from "@serenityjs/network";

class InventoryTransaction extends SerenityHandler {
	public static packet = InventoryTransactionPacket.id;

	public static handle(
		packet: InventoryTransactionPacket,
		session: NetworkSession
	): void {
		// Get the player from the session
		// If there is no player, then disconnect the session.
		const player = this.serenity.getPlayer(session);
		if (!player)
			return session.disconnect(
				"Failed to connect due to an invalid player. Please try again.",
				DisconnectReason.InvalidPlayer
			);

		// Check if the packet has a transaction
		if (!packet.transaction) throw new Error("Transaction is missing.");

		switch (packet.transaction.type) {
			case ComplexInventoryTransaction.NormalTransaction: {
				this.handleNormalTransaction(packet.transaction.actions, player);
				break;
			}

			case ComplexInventoryTransaction.ItemUseTransaction: {
				// Get the itemUse object from the transaction
				const itemUse = packet.transaction.itemUse;

				// Check if the itemUse object is valid, if not throw an error that the itemUse object is missing.
				if (!itemUse) throw new Error("ItemUse object is missing.");

				// Handle the itemUse transaction
				this.handleItemUseTransaction(itemUse, player);
				break;
			}

			case ComplexInventoryTransaction.ItemUseOnEntityTransaction: {
				// Get the itemUse object from the transaction
				const itemUse = packet.transaction.itemUseOnEntity;

				// Check if the itemUse object is valid, if not throw an error that the itemUse object is missing.
				if (!itemUse) throw new Error("ItemUseOnEntity object is missing.");

				// Handle the itemUse transaction
				this.handleItemUseOnEntityTransaction(itemUse, player);
				break;
			}

			case ComplexInventoryTransaction.ItemReleaseTransaction: {
				// Get the itemRelease object from the transaction
				const itemRelease = packet.transaction.itemRelease;

				// Check if the itemRelease object is valid, if not throw an error that the itemRelease object is missing.
				if (!itemRelease) throw new Error("ItemRelease object is missing.");

				// Handle the itemRelease transaction
				this.handleItemReleaseTransaction(itemRelease, player);
				break;
			}
		}
	}

	public static handleNormalTransaction(
		actions: Array<InventoryAction>,
		player: Player
	): void {
		// TODO: CLEANUP

		// ? The Drop Action has exactly 2 actions
		if (actions.length !== 2) return;

		// NOTE: This implmentation is incomplete and will be updated in the future.
		// This only handles item dropping for now.
		const action = actions[0] as InventoryAction;
		const amount = action.newItem.stackSize ?? 1;

		// Get the inventory of the player
		const inventory = player.getComponent("minecraft:inventory");

		// Drop the item from the player's inventory
		player.dropItem(inventory.selectedSlot, amount, inventory.container);
	}

	public static handleItemUseTransaction(
		transaction: ItemUseInventoryTransaction,
		player: Player
	): void {
		// Switch based on the type of the item use transaction
		switch (transaction.type) {
			case ItemUseInventoryTransactionType.Place: {
				// Get the interacted block and check if it is air
				const interactedBlock = player.dimension.getBlock(
					transaction.blockPosition
				);
				if (interactedBlock.isAir()) break;

				// Trigger the onInteract method of the block components
				const interacted = interactedBlock.interact(
					player,
					transaction.face,
					transaction.clickPosition
				);

				// Check if the interaction opened a container, if so stop the block placement
				if (!interacted || player.openedContainer) break;

				// Check if the player is using an item
				const usingItem = player.usingItem;
				if (!usingItem) break;

				// Check if the item network ids match
				if (usingItem.type.network !== transaction.item.network) return;

				// Trigger the onUse method of the item components
				for (const component of usingItem.components.values()) {
					// Get the item use cause
					const cause = ItemUseCause.Place;

					// Get the block from the transaction
					const targetBlock = player.dimension.getBlock(
						transaction.blockPosition
					);

					component.onUse?.({ player, cause, targetBlock });
				}

				// Check if the transaction is an initial transaction
				if (!transaction.intialTransaction) return;

				// Check if a block type is present within the item
				const blockType = usingItem.type.block;
				if (!blockType || blockType.identifier === BlockIdentifier.Air) break;

				// Get the resulting block from the interacted block
				// ANd check if the block is also air
				const resultingBlock = interactedBlock.face(transaction.face);
				if (!resultingBlock.isAir()) break;

				// Check if the player is in adventure mode, if so stop the block placement
				// And check if the player is able to place blocks
				const canBuild = player.getAbility(AbilityIndex.Build);

				// Check if the player is in adventure mode, if so stop the block placement
				if (
					player.gamemode === Gamemode.Adventure ||
					!canBuild ||
					player.dimension.bounds.max < resultingBlock.position.y ||
					player.dimension.bounds.min > resultingBlock.position.y
				) {
					// Get the Air Permutation
					const air = BlockPermutation.resolve(BlockIdentifier.Air);

					// Set the resulting block to air
					resultingBlock.setPermutation(air);
					break;
				}

				// Get the blockPermutation from the blockType
				const blockPermutation =
					blockType.permutations[usingItem.metadata] ??
					blockType.getPermutation();

				// Get the click position of the packet
				const clickPosition = transaction.clickPosition;

				// Set the block with the blockType permutation based off the items metadata
				const placed = resultingBlock.setPermutation(blockPermutation, {
					player,
					blockFace: transaction.face,
					clickPosition
				});

				// Check if the block was placed, if not break the switch statement
				if (!placed) break;

				// Check if the player is in survival mode, if so decrement the item
				if (player.gamemode === Gamemode.Survival) usingItem.decrement();
				break;
			}

			case ItemUseInventoryTransactionType.Use: {
				const playerInventory = player.getComponent("minecraft:inventory");
				const usingItem = playerInventory.container.getItem(
					playerInventory.selectedSlot
				);

				if (!usingItem) break;
				if (!player.usingItem) {
					// Set the player's using item
					player.usingItem = usingItem;

					// Trigger the onStartUse method of the item components
					player.startUsingTick = player.getWorld().currentTick;
					for (const component of usingItem.components.values()) {
						// Get the item use cause
						const cause = ItemUseCause.Use;

						component.onStartUse?.({ player, cause });
					}

					// Break the switch statement
					break;
				}

				for (const component of usingItem.components.values()) {
					// Get the item use cause
					const cause = ItemUseCause.Use;

					// Trigger the onUse method of the item component.
					const used = component.onUse?.({ player, cause });

					// Check if the item was successfully used
					if (used != undefined) {
						const packet = new CompletedUsingItemPacket();

						packet.itemId = player.usingItem?.type.network ?? 0;
						packet.itemUseMethod = used;
						player.usingItem = null;
					}
				}

				break;
			}

			case ItemUseInventoryTransactionType.Destroy: {
				this.serenity.logger.debug(
					"ItemUseInventoryTransactionType.Destroy is not implemented yet.",
					transaction
				);
			}
		}
	}

	public static handleItemUseOnEntityTransaction(
		transaction: ItemUseOnEntityInventoryTransaction,
		player: Player
	): void {
		// Get the entity from the dimension
		const entity = player.dimension.getEntityByRuntime(
			transaction.actorRuntimeId
		);

		// Check if the entity is valid
		if (!entity) return;

		// Get the type of the transaction
		const type =
			transaction.type === 0
				? EntityInteractType.Interact
				: EntityInteractType.Attack;

		// Trigger the onInteract method of the entity components
		entity.interact(player, type);

		// Get the held item of the player.
		const inventory = player.getComponent("minecraft:inventory");

		// Get using item from the player
		const usingItem = inventory.getHeldItem();

		// Check if the item is valid
		if (!usingItem) return;

		// Trigger the onUse method of the item components;
		for (const component of usingItem.components.values()) {
			// Get the item use cause
			const cause =
				type === EntityInteractType.Interact
					? ItemUseCause.Place
					: ItemUseCause.Use;

			// Get the targeted entity of the action
			const targetEntity = entity;

			// Call the onUse method
			component.onUse?.({ player, cause, targetEntity });
		}
	}

	public static handleItemReleaseTransaction(
		transaction: ItemReleaseInventoryTransaction,
		player: Player
	): void {
		// Get the using item of the player
		const usingItem = player.usingItem;

		// Check if the using item is valid
		if (!usingItem) return;

		// Trigger the onRelease method of the item components
		for (const component of usingItem.components.values()) {
			// Get the item use cause
			const cause = ItemUseCause.Use;

			component.onStopUse?.({ player, cause });
		}

		// Set the player's using item to null
		player.usingItem = null;
	}
}

export { InventoryTransaction };
