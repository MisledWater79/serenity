import {
	ActorEventIds,
	ActorEventPacket,
	ItemUseOnEntityInventoryTransactionType
} from "@serenityjs/protocol";

import { EntityComponent } from "./entity-component";

import type { Player } from "../../player";
import type { Entity } from "../../entity";

class EntityInteractComponent extends EntityComponent {
	public static readonly identifier = "minecraft:interact";

	public constructor(entity: Entity) {
		super(entity, EntityInteractComponent.identifier);
	}

	public onInteract(
		player: Player,
		transaction: ItemUseOnEntityInventoryTransactionType
	): void {
		const health = this.entity.getComponent("minecraft:health");
		const runtime = this.entity.runtime;

		switch (transaction) {
			case ItemUseOnEntityInventoryTransactionType.Attack: {
				if (health.getCurrentValue() > 0) {
					health.decreaseValue(0.5);

					const packet = new ActorEventPacket();
					packet.actorRuntimeId = runtime;
					packet.eventId = ActorEventIds.HURT_ANIMATION;
					packet.eventData = 1;

					this.entity.dimension.broadcast(packet);
				} else {
					this.entity.kill();
				}
				break;
			}
			case ItemUseOnEntityInventoryTransactionType.Interact: {
				break;
			}
		}
	}
}

export { EntityInteractComponent };
