import { ItemIdentifier, type Items } from "@serenityjs/item";

import { ItemStack } from "../../item";
import { ItemUseCause } from "../../enums";
import { PlayerItemConsumeSignal } from "../../events";

import { ItemComponent } from "./item-component";

import type { Player } from "../../player";
import type { Effect } from "../../effect/effect";

class ItemPotionComponent<T extends keyof Items> extends ItemComponent<T> {
	public static readonly identifier = "minecraft:dye";
	public potionEffect: Effect;

	public constructor(item: ItemStack<T>, effect: Effect) {
		super(item, ItemPotionComponent.identifier);
		this.potionEffect = effect;
	}

	public setEffect(effect: Effect) {
		this.potionEffect = effect;
	}

	public onUse(player: Player, cause: ItemUseCause): boolean {
		if (cause != ItemUseCause.Use || !player.usingItem) return false;
		// ? Get the player inventory to transform the potion into a glass bottle
		const { container, selectedSlot } = player.getComponent(
			"minecraft:inventory"
		);
		const signal = new PlayerItemConsumeSignal(player, player.usingItem);
		const canceled = player.getWorld().emit(signal.identifier, signal);

		if (!canceled) return false;

		// ? Add the potion effect to the player
		player.addEffect(this.potionEffect);

		// ? Convert the potion into a empty glass bottle
		const convertedItemStack = new ItemStack(ItemIdentifier.GlassBottle, 1);
		container.setItem(selectedSlot, convertedItemStack);
		return true;
	}

	public onStartUse(_player: Player, _cause: ItemUseCause): void {}

	public onStopUse(_player: Player, _cause: ItemUseCause): void {}
}

export { ItemPotionComponent };