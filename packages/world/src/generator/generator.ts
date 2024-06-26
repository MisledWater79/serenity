import type { Worker } from "node:worker_threads";
import type { TerrainWorker } from "./worker";
import type { DimensionType } from "@serenityjs/protocol";
import type { Chunk } from "../chunk";

/**
 * Represents a generic generator.
 */
export class TerrainGenerator {
	/**
	 * The identifier for the generator.
	 */
	public static readonly identifier: string;

	/**
	 * The worker for the generator.
	 */
	public static worker: typeof TerrainWorker | null = null;

	/**
	 * The identifier for the provider.
	 */
	public readonly identifier: string;

	/**
	 * The chunks that are queued for threaded generation.
	 */
	public readonly queue = new Set<Chunk>();

	/**
	 * The seed of the generator.
	 */
	public readonly seed: number;

	/**
	 * The worker for the generator.
	 */
	public readonly worker: Worker | null;

	/**
	 * Creates a new generator instance.
	 *
	 * @param seed The seed of the generator.
	 */
	public constructor(seed: number) {
		// Set the seed of the generator.
		this.seed = seed;

		// Set the identifier of the generator.
		this.identifier = (this.constructor as typeof TerrainGenerator).identifier;

		// Initialize the worker if available.
		this.worker =
			(this.constructor as typeof TerrainGenerator).worker?.initialize(seed) ??
			null;

		// Check if the worker is available and listen for messages.
		this.worker?.on("message", (chunk: Chunk) => {
			// Process the chunk.
			this.process(chunk);
		});
	}

	/**
	 * Generates a chunk at the specified coordinates.
	 * @param _cx The chunk x coordinate.
	 * @param _cz The chunk z coordinate.
	 * @param _type The dimension type.
	 */
	public apply(_cx: number, _cz: number, _type: DimensionType): Chunk {
		throw new Error("Not implemented.");
	}

	/**
	 * Handoff a chunk to the worker for generation.
	 * @param chunk The chunk to handoff.
	 */
	protected handoff(chunk: Chunk): void {
		// Check if the worker is available.
		if (!this.worker) throw new Error("Worker is not available.");

		// Add the chunk to the queue.
		this.queue.add(chunk);

		// Seperate the chunk data.
		const { x: cx, z: cz, type } = chunk;

		// Handoff the chunk generation to the worker thread.
		this.worker.postMessage({ cx, cz, type });
	}

	/**
	 * Processes a chunk that was generated by the worker.
	 * @param chunk The chunk that was generated.
	 */
	protected process(chunk: Chunk): void {
		// Find the queued chunk from the set.
		const queued = [...this.queue].find(
			(ch) => ch.x === chunk.x && ch.z === chunk.z
		);

		// Check if the chunk was found.
		if (!queued) throw new Error("Chunk not found in queue.");

		// Update the queued chunk with the generated data.
		// Since workers are not allowed to transfer class instances, we need to manually copy the data.
		for (const sub of chunk.subchunks) {
			// Get the subchunk from the queued chunk.
			const subchunk = queued.getSubChunk(chunk.subchunks.indexOf(sub));

			// Loop through the layers and copy the data.
			for (const lay of sub.layers) {
				// Get the layer from the queued
				const layer = subchunk.getLayer(sub.layers.indexOf(lay));

				// Copy the block data.
				for (const [index, block] of lay.blocks.entries()) {
					layer.blocks[index] = block;
				}

				// Copy the palette data.
				for (const [index, block] of lay.palette.entries()) {
					layer.palette[index] = block;
				}
			}
		}

		// Now we can mark the chunk as ready.
		queued.ready = true;

		// Remove the chunk from the queue.
		this.queue.delete(queued);
	}
}
