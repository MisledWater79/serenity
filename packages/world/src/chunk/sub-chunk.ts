import { BlockStorage } from "./block-storage";

import type { BinaryStream } from "@serenityjs/binarystream";

/**
 * Represents a sub chunk.
 */
export class SubChunk {
	/**
	 * The version of the sub chunk.
	 */
	public readonly version: number;

	/**
	 * The layers of the sub chunk.
	 */
	public readonly layers: Array<BlockStorage>;

	/**
	 * Creates a new sub chunk.
	 *
	 * @param version The version of the sub chunk.
	 * @param layers The layers of the sub chunk.
	 */
	public constructor(version?: number, layers?: Array<BlockStorage>) {
		this.version = version ?? 9;
		this.layers = layers ?? [];
	}

	/**
	 * Checks if the sub chunk is empty.
	 *
	 * @returns True if the sub chunk is empty, false otherwise.
	 */
	public isEmpty(): boolean {
		// Loop through each storage.
		for (const storage of this.layers) {
			// Check if the storage is empty.
			if (!storage.isEmpty()) {
				// The sub chunk is not empty.
				return false;
			}
		}

		// The sub chunk is empty.
		return true;
	}

	/**
	 * Gets the block storage at the given index.
	 *
	 * @param index The index of the storage.
	 * @returns The block storage.
	 */
	public getLayer(index: number): BlockStorage {
		// Check if the storage exists.
		if (!this.layers[index]) {
			// Create a new storage.
			for (let index_ = 0; index_ <= index; index_++) {
				if (!this.layers[index_]) this.layers[index_] = new BlockStorage();
			}
		}

		// Return the storage.
		return this.layers[index] as BlockStorage;
	}

	/**
	 * Gets the block state at the given coordinates.
	 *
	 * @param bx The x coordinate of the block.
	 * @param by The y coordinate of the block.
	 * @param bz The z coordinate of the block.
	 * @param layer The layer of the block.
	 * @returns The block state.
	 */
	public getState(bx: number, by: number, bz: number, layer: number): number {
		// Get the storage.
		const storage = this.getLayer(layer);

		// Get the block state.
		return storage.getState(bx, by, bz);
	}

	/**
	 * Sets the block state at the given coordinates.
	 *
	 * @param bx The x coordinate of the block.
	 * @param by The y coordinate of the block.
	 * @param bz The z coordinate of the block.
	 * @param state The block state.
	 * @param layer The layer of the block.
	 */
	public setState(
		bx: number,
		by: number,
		bz: number,
		state: number,
		layer?: number
	): void {
		// Get the storage.
		const storage = this.getLayer(layer ?? 0);

		// Set the block state.
		storage.setState(bx, by, bz, state);
	}

	/**
	 * Serializes the sub chunk.
	 *
	 * @param stream The binary stream to write to.
	 */
	public static serialize(
		subchunk: SubChunk,
		stream: BinaryStream,
		y: number
	): void {
		// Write the version.
		stream.writeByte(subchunk.version);

		// Write the storage count.
		//TEMPORARY +1 FOR WATERLOG LAYER
		stream.writeByte(subchunk.layers.length + 1);

		stream.writeByte(y);

		// Loop through each storage and serialize it.
		for (const storage of subchunk.layers) {
			// Serialize the storage.
			BlockStorage.serialize(storage, stream);

			//TEMP WATERLOG BLOCKS
			stream.writeByte(3);
			stream.writeBuffer(Buffer.from(new ArrayBuffer(512)));
			stream.writeVarInt(2);
			stream.writeVarInt(1_209_499_071); // Air id
		}
	}

	/**
	 * Deserializes the sub chunk.
	 *
	 * @param stream The binary stream to read from.
	 */
	public static deserialize(stream: BinaryStream): SubChunk {
		// Read the version.
		const version = stream.readUint8();

		// Read the storage count.
		const count = stream.readUint8();

		// Loop through each storage and deserialize it.
		const layers: Array<BlockStorage> = [];
		for (let index = 0; index < count; index++) {
			layers.push(BlockStorage.deserialize(stream));
		}

		// Return the sub chunk.
		return new SubChunk(version, layers);
	}
}
