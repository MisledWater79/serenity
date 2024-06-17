import { ValidEnum, StringEnum } from "@serenityjs/command";

import { Entity } from "../../entity";
import { Player } from "../../player";

import type { Dimension } from "../../world";
import type { CommandExecutionState } from "@serenityjs/command";

class TargetEnum extends ValidEnum {
	/**
	 * The type of the enum.
	 */
	public static readonly name = "target";

	/**
	 * The symbol of the enum.
	 */
	public static readonly symbol = (this.type << 16) | 0x0a;

	/**
	 * The result of the enum.
	 */
	public readonly result: Array<Entity>;

	public constructor(result: Array<Entity>) {
		super();
		this.result = result;
	}

	public static extract<O = Entity | Dimension>(
		state: CommandExecutionState<O>
	): TargetEnum | undefined {
		// Read next argument in slice array.
		const stringValue = StringEnum.extract(state as never);
		if (!stringValue) throw new Error("Invalid target.");

		// Separate the target from the arguments.
		const target = stringValue.result;

		// Get the origin of the command.
		const origin =
			state.origin instanceof Entity
				? state.origin.dimension
				: (state.origin as Dimension);

		// Check if the target starts with @.
		// This means we are querying for a target.
		if (target.startsWith("@")) {
			// Get the query symbol. (e.g. a, e, p, r, s)
			const symbol = target.slice(1)[0];
			const query = target.slice(2);

			// Check if the query is valid.
			if (query.length > 0 && (!query.startsWith("[") || !query.endsWith("]")))
				throw new Error("Invalid query."); // TODO: more specific error

			// Parse the query.
			const queries =
				query.length > 0
					? query
							.slice(1, -1)
							.split(",")
							.flatMap((data) => {
								const [key, value] = data.split("=");
								return { key, value };
							})
					: [];

			// Check if the symbol is a valid query.
			switch (symbol) {
				// Get all players.
				case "a": {
					const players = origin.getPlayers().filter((player) => {
						// Check if there are any queries.
						if (queries.length === 0) return true;

						// Check if the player matches the query.
						for (const { key, value } of queries) {
							switch (key) {
								// Check if the player name matches the query.
								case "name": {
									if (player.username !== value) return false;
									break;
								}

								default: {
									throw new TypeError(`Invalid query key "${key}"`);
								}
							}
						}

						return true;
					});

					return new TargetEnum(players);
				}

				// Get all entities.
				case "e": {
					// Filter entities by query.
					const entities = origin.getEntities().filter((entity) => {
						// Check if there are any queries.
						if (queries.length === 0) return true;

						// Check if the entity matches the query.
						for (const { key, value } of queries) {
							switch (key) {
								// Check if the entity name matches the query.
								case "name": {
									if (entity.hasComponent("minecraft:nametag")) {
										// Get the nametag component.
										const nametag = entity.getComponent("minecraft:nametag");

										// Check if the nametag matches the query.
										if (nametag.currentValue !== value) return false;
									} else {
										return false;
									}
									break;
								}

								// Check if the entity type matches the query.
								case "type": {
									// Parse the entity type.
									const type = value?.includes(":")
										? value
										: `minecraft:${value}`;

									if (entity.type.identifier !== type) return false;
									break;
								}

								default: {
									throw new TypeError(`Invalid query key "${key}"`);
								}
							}
						}

						return true;
					});

					return new TargetEnum(entities);
				}

				// Get the nearest player.
				case "p": {
					if (state.origin instanceof Player) {
						return new TargetEnum([state.origin]);
					} else {
						throw new TypeError(
							"Nearest player is not available in this context."
						);
					}
				}

				// Get a random player.
				case "r": {
					// Get all players that match the query.
					const players = origin.getPlayers().filter((player) => {
						// Check if there are any queries.
						if (queries.length === 0) return true;

						// Check if the player matches the query.
						for (const { key, value } of queries) {
							switch (key) {
								// Check if the player name matches the query.
								case "name": {
									if (player.username !== value) return false;
									break;
								}

								default: {
									throw new TypeError(`Invalid query key "${key}"`);
								}
							}
						}

						return true;
					});

					// Get a random player from the list.
					const player = players[
						Math.floor(Math.random() * players.length)
					] as Player;

					// Return the random player.
					return new TargetEnum([player]);
				}

				// Get the source player.
				case "s": {
					if (state.origin instanceof Entity) {
						return new TargetEnum([state.origin]);
					} else {
						throw new TypeError(
							"Source player is not available in this context."
						);
					}
				}
			}
		} else {
			// Filter players by username.
			const players = origin
				.getPlayers()
				.filter((player) => player.username === target);

			// Check if the player was found.
			if (players.length === 0) {
				throw new Error(
					`Player "${target}" was not found in the current dimension.`
				);
			}

			// Return the player.
			return new TargetEnum(players);
		}
	}
}

export { TargetEnum };
