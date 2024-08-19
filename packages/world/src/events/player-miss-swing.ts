import { WorldEventSignal } from "./signal";

import type { World } from "../world";
import type { Player } from "../player";
import type { WorldEvent } from "../enums";

class PlayerMissSwingSignal extends WorldEventSignal {
	public static readonly identifier: WorldEvent.PlayerMissSwing;

	/**
	 * The player that miss the arm swing.
	 */
	public readonly player: Player;

	/**
	 * Constructs a new player miss swing after signal instance.
	 * @param player The player that missed the arm swing.
	 */
	public constructor(player: Player) {
		super();
		this.player = player;

		// TODO: WorldEvents experimental - Remove this once the chosen event system is implemented.
		this.emit();
	}

	public getWorld(): World {
		return this.player.dimension.world;
	}
}

export { PlayerMissSwingSignal };
