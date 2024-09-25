import { Component } from "../component";

import type { World } from "../../world";
import type { BlockIdentifier } from "@serenityjs/block";
import type { CompoundTag } from "@serenityjs/nbt";
import type { Vector3f } from "@serenityjs/protocol";
import type { Player } from "../../player";
import type { Block } from "../../block";

class BlockComponent extends Component {
	/**
	 * The block type identifiers to bind the component to.
	 */
	public static readonly types: Array<BlockIdentifier> = [];

	/**
	 * The block the component is binded to.
	 */
	protected readonly block: Block;

	/**
	 * Creates a new block component.
	 *
	 * @param block The block the component is binded to.
	 * @param identifier The identifier of the component.
	 * @returns A new block component.
	 */
	public constructor(block: Block, identifier: string) {
		super(identifier);
		this.block = block;

		// Register the component to the block.
		// @ts-ignore WHYYY
		this.block.setComponent(this);
	}

	/**
	 * Clones the block component.
	 * @param block The block to clone the component to.
	 * @returns A new block component.
	 */
	public clone(block: Block): this {
		// Create a new instance of the component.
		const component = new (this.constructor as new (
			block: Block,
			identifier: string
		) => BlockComponent)(block, this.identifier) as this;

		// Copy the key-value pairs.
		for (const [key, value] of Object.entries(this)) {
			// Skip the block.
			if (key === "block") continue;

			// @ts-expect-error
			component[key] = value;
		}

		// Return the component.
		return component;
	}

	/**
	 * Called when the block is updated in the dimension.
	 * This includes when the block is placed, broken, or interacted with.
	 */
	public onUpdate?(source?: Block): void;

	/**
	 * Called when the block is placed in the dimension.
	 * @param player The player that placed the block.
	 * @param clickPosition The position of the affected block which was clicked.
	 */
	public onPlace?(player: Player, clickPosition: Vector3f): void;

	/**
	 * Called when the block is destruction process has started in the dimension.
	 * @param player The player that started to destroy the block.
	 */
	public onStartBreak?(player: Player): void;

	/**
	 * Called when the block is destruction process has stopped in the dimension.
	 * @param player The player that stopped destroying the block.
	 */
	public onStopBreak?(player: Player): void;

	/**
	 * Called when the block is broken in the dimension.
	 * @note The `player` parameter is optional as the block can be broken by the server.
	 * @param player The player that broke the block.
	 * @returns Whether the block was successfully broken.
	 */
	public onBreak?(player?: Player): boolean;

	/**
	 * Called when the block is interacted with in the dimension.
	 * @param player The player that interacted with the block.
	 */
	public onInteract?(player: Player): void;

	/**
	 * Called when a player picks the block.
	 * @param player The player that picked the block.
	 */
	public onPick?(player: Player): void;

	/**
	 * Registers the block component to the world.
	 * @param world The world to register the block component to.
	 * @returns Whether the block component was registered.
	 */
	public static register(world: World): boolean {
		return world.blocks.registerComponent(this);
	}

	/**
	 * Serializes the block component to the NBT tag.
	 * @param nbt The NBT tag to serialize to.
	 * @param component The block component to serialize
	 */
	public static serialize(_nbt: CompoundTag, _component: BlockComponent): void {
		return;
	}

	/**
	 * Deserializes the block component from the NBT tag.
	 * @param nbt The NBT tag to deserialize from.
	 * @param block The block the component is binded to.
	 * @returns The deserialized block component.
	 */
	public static deserialize(_nbt: CompoundTag, _block: Block): BlockComponent {
		return new this(_block, this.identifier);
	}
}

export { BlockComponent };
