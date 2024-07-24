import { AttributeName } from "@serenityjs/protocol";

import { EntityAttributeComponent } from "./attribute";

import type { Entity } from "../../../entity";

class EntityMovementComponent extends EntityAttributeComponent {
	/**
	 * The identifier of the component.
	 */
	public static readonly identifier = AttributeName.Movement;

	/**
	 * The minimum health allowed for the entity.
	 */
	public readonly effectiveMin = 0;

	/**
	 * The maximum health allowed for the entity.
	 */
	public readonly effectiveMax = 3.402_823_466e+38;

	/**
	 * The default health for the entity.
	 */
	public readonly defaultValue = 0.1;

	/**
	 * Creates a new entity movement component.
	 *
	 * @param entity The entity the component is binded to.
	 * @returns A new entity movement component.
	 */
	public constructor(entity: Entity) {
		super(entity, EntityMovementComponent.identifier);

		// Set the default movement for the entity
		this.setCurrentValue(this.defaultValue, false);
	}
}

export { EntityMovementComponent };
