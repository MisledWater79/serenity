import { ItemIdentifier, type Items } from "@serenityjs/item";
import { ItemUseMethod } from "@serenityjs/protocol";

import { ItemUseCause } from "../../enums";
import { ItemStack } from "../../item";
import { PlayerItemConsumeSignal } from "../../events";

import { ItemComponent } from "./item-component";

import type { ItemUseOptions } from "../../options";

class ItemFoodComponent<T extends keyof Items> extends ItemComponent<T> {
	public static readonly identifier = "minecraft:food";

	/**
	 * The nutrition value that will be given to the player when eated
	 */
	public nutrition: number = 0;

	/**
	 * The saturation modifier to apply the saturation buff
	 */
	public saturationModifier: number = 0;

	/**
	 * Means if the food can be eaten whether the player is hungry or not
	 */
	public canAlwaysEat: boolean = false;

	/**
	 * It's the item that will be converted to when eaten
	 */
	public convertsTo: ItemIdentifier = ItemIdentifier.Air;

	public constructor(item: ItemStack<T>) {
		super(item, ItemFoodComponent.identifier);
	}

	public onUse(options: ItemUseOptions): ItemUseMethod | undefined {
		const { player, cause } = options;

		if (cause != ItemUseCause.Use || !player.usingItem) return;
		if (!this.canAlwaysEat && !player.isHungry()) return;
		// ? Get the player hunger, saturation and inventory
		const hungerComponent = player.getComponent("minecraft:player.hunger");
		const saturationComponent = player.getComponent(
			"minecraft:player.saturation"
		);
		const { container, selectedSlot } = player.getComponent(
			"minecraft:inventory"
		);
		const signal = new PlayerItemConsumeSignal(player, player.usingItem);
		const canceled = signal.emit();

		if (!canceled) return;

		// ? Increase the food based on nutrition
		hungerComponent.increaseValue(this.nutrition);
		// ? Add a saturation buff using the formula nutrition * saturationModifier * 2
		saturationComponent.increaseValue(
			this.nutrition * this.saturationModifier * 2
		);
		// ? Decrement the food item amount
		player.usingItem.decrement(1);

		// ? If the item will be converted to a item different than air, convert it
		if (this.convertsTo != ItemIdentifier.Air) {
			const convertedItemStack = new ItemStack(
				this.convertsTo,
				1,
				0,
				this.item.dimension
			);

			if (player.usingItem.amount > 0) {
				container.addItem(convertedItemStack);
				return ItemUseMethod.Eat;
			}
			container.setItem(selectedSlot, convertedItemStack);
		}
		return ItemUseMethod.Eat;
	}
}

export { ItemFoodComponent };
