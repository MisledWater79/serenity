import type { Worker } from "node:worker_threads";
import type { TerrainGenerator } from "../generator";
import type { DimensionType } from "@serenityjs/protocol";
import type { Chunk } from "../../chunk";

class TerrainWorker {
	/**
	 * The generator the worker is bound to.
	 */
	public static generator: typeof TerrainGenerator;

	/**
	 * The path of the worker file.
	 */
	public static readonly path = __filename;

	/**
	 * The seed of the generator.
	 */
	public seed = 0;

	/**
	 * Generates a chunk at the specified coordinates.
	 * @param _cx The chunk x coordinate.
	 * @param _cz  The chunk z coordinate.
	 * @param _type The dimension type.
	 */
	public apply(_cx: number, _cz: number, _type: DimensionType): Chunk {
		throw new Error("TerrainWorker.apply is not implemented");
	}

	/**
	 * Initializes the worker thread.
	 */
	public static initialize(_seed: number): Worker {
		throw new Error("TerrainWorker.initialize is not implemented");
	}
}

export { TerrainWorker };
