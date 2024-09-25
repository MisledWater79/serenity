import { BlockIdentifier } from "@serenityjs/block";
import { EntityIdentifier } from "@serenityjs/entity";

import { Entity } from "../../entity";
import { EntityFallingBlockComponent } from "../entity";

import { BlockComponent } from "./block-component";

import type { Block } from "../../block";

class BlockGravityComponent extends BlockComponent {
	public static readonly identifier = "minecraft:gravity";

	public static readonly types = [BlockIdentifier.Sand, BlockIdentifier.Gravel];

	public constructor(block: Block) {
		super(block, BlockGravityComponent.identifier);
	}

	public onUpdate(): void {
		// Check if the block below is air
		const below = this.block.below();
		if (!below.isAir()) return;

		// Create a new FallingBlock entity
		const entity = new Entity(
			EntityIdentifier.FallingBlock,
			this.block.dimension
		);

		// Set the entity's position
		entity.position.x = this.block.position.x + 0.5;
		entity.position.y = this.block.position.y;
		entity.position.z = this.block.position.z + 0.5;

		// Create a new EntityFallingBlockComponent
		const component = new EntityFallingBlockComponent(entity);

		// Set the permutation of the falling block
		component.setPermutation(this.block.permutation);

		// Destroy the block
		this.block.destroy({ clearComponents: true, updateBlock: false });

		// Spawn the entity
		entity.spawn();

		// Create a new task to update the additional components
		const task = this.block.dimension.schedule(2);

		// Add the task to the task
		task.on(() => this.block.above().update(false, this.block));
	}
}

export { BlockGravityComponent };
