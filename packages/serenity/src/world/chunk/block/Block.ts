import type { BlockCoordinates } from '@serenityjs/bedrock-protocol';
import type { Dimension } from '../../dimension/index.js';
import type { BlockPermutation } from './Permutation.js';

class Block {
	public readonly dimension: Dimension;
	public readonly permutation: BlockPermutation;
	public readonly location: BlockCoordinates;

	public constructor(dimension: Dimension, permutation: BlockPermutation, location: BlockCoordinates) {
		this.dimension = dimension;
		this.permutation = permutation;
		this.location = location;
	}

	public setPermutation(permutation: BlockPermutation): void {
		this.dimension.setPermutation(this.location.x, this.location.y, this.location.z, permutation);
	}
}

export { Block };