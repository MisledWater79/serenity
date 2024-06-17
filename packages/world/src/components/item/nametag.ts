import { CompoundTag, StringTag } from "@serenityjs/nbt";

import { ItemComponent } from "./item-component";

import type { Items } from "@serenityjs/item";
import type { ItemStack } from "../../item";

class ItemNametagComponent<T extends keyof Items> extends ItemComponent<T> {
	public static readonly identifier = "minecraft:nametag";

	public defaultValue = "";

	public currentValue = this.defaultValue;

	/**
	 * Creates a new item nametag component.
	 *
	 * @param item The item the component is binded to.
	 * @returns A new item nametag component.
	 */
	public constructor(item: ItemStack<T>) {
		super(item, ItemNametagComponent.identifier);
	}

	public setCurrentValue(value: string): void {
		// Set the current value.
		this.currentValue = value;

		// Update the stacks nbt.
		// Check if a display tag exists.
		if (!this.item.nbt.hasTag("display")) {
			// Create a new display tag.
			const displayTag = new CompoundTag("display", {});

			// Add the nametag to the display tag.
			this.item.nbt.addTag(displayTag);
		}

		// Get the display tag.
		const displayTag = this.item.nbt.getTag("display") as CompoundTag<unknown>;

		// Check if a Name tag exists.
		if (displayTag.hasTag("Name")) displayTag.removeTag("Name");

		// Set the new Name tag.
		const nameTag = new StringTag("Name", value);

		// Add the Name tag to the display tag.
		displayTag.addTag(nameTag);

		// Update the item in the container.
		this.item.update();
	}

	public resetToDefault(): void {
		this.setCurrentValue(this.defaultValue);
	}
}

export { ItemNametagComponent };
