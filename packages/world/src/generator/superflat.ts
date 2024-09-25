import { BlockIdentifier } from "@serenityjs/block";

import { Chunk } from "../chunk";

import { TerrainGenerator } from "./generator";

import type { DimensionType } from "@serenityjs/protocol";

class Superflat extends TerrainGenerator {
	/**
	 * The identifier for the generator.
	 */
	public static readonly identifier = "superflat";

	public bedrock = this.palette.resolvePermutation(BlockIdentifier.Bedrock);
	public dirt = this.palette.resolvePermutation(BlockIdentifier.Dirt);
	public grass = this.palette.resolvePermutation(BlockIdentifier.GrassBlock);

	public apply(cx: number, cz: number, type: DimensionType): Chunk {
		const chunk = new Chunk(cx, cz, type);

		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				for (let y = -64; y < -60; y++) {
					const position = { x, y, z };

					if (y === -64) {
						chunk.setPermutation(position, this.bedrock, false);
					} else if (y === -63 || y === -62) {
						chunk.setPermutation(position, this.dirt, false);
					} else {
						chunk.setPermutation(position, this.grass, false);
					}
				}
			}
		}

		// Return the chunk.
		return chunk;
	}
}

export { Superflat };
