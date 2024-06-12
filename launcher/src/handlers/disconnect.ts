import { DisconnectPacket } from "@serenityjs/protocol";

import { SerenityHandler } from "./serenity-handler";

import type { NetworkSession } from "@serenityjs/network";

class Disconnect extends SerenityHandler {
	public static packet = DisconnectPacket.id;

	public static handle(
		packet: DisconnectPacket,
		session: NetworkSession
	): void {
		// Get the player from the session
		// And check if the player is not undefined
		const player = this.serenity.getPlayer(session);
		if (!player) return;

		// Despawn the player
		player.despawn();

		// Remove the player from the players map
		this.serenity.players.delete(player.xuid);

		// Send the player left message
		player.dimension.sendMessage(`§e${player.username} left the game.§r`);

		// Log the player left message
		player.dimension.world.logger.info(
			`§8[§9${player.username}§8] Event:§r Player has left the game.`
		);
	}
}

export { Disconnect };
