import { BlockPermutation, BlockIdentifier } from "@serenityjs/block";

import { Chunk } from "../chunk";

import { TerrainGenerator } from "./generator";
import { Simplex } from "./simplex";
import { type Spline, spline, type SplinePoint } from "./splines";

import type { Vector3f, DimensionType } from "@serenityjs/protocol";

class Overworld extends TerrainGenerator {
	/**
	 * The identifier for the generator.
	 */
	public static readonly identifier = "overworld";

	public readonly solNoise: Simplex; //  Solid Noise
	public readonly cavNoise: Simplex; //  Cave Noise

	public readonly tempNoise: Simplex; // Temperature Noise
	public readonly humNoise: Simplex; //  Humidity Noise

	public readonly weiNoise: Simplex; //  Weirdness Noise
	public readonly conNoise: Simplex; //  Continentalness Noise
	public readonly eroNoise: Simplex; //  Erosion Noise

	public readonly bedrock: BlockPermutation;
	public readonly stone: BlockPermutation;
	public readonly dirt: BlockPermutation;
	public readonly sand: BlockPermutation;
	public readonly gravel: BlockPermutation;
	public readonly grass: BlockPermutation;
	public readonly water: BlockPermutation;
	public readonly lava: BlockPermutation;
	public readonly tulip_pink: BlockPermutation;
	public readonly poppy: BlockPermutation;
	public readonly dandelion: BlockPermutation;
	public readonly cornflower: BlockPermutation;
	public readonly oak_log: BlockPermutation;
	public readonly oak_leaves: BlockPermutation;
	public readonly sponge: BlockPermutation;
	public readonly air: BlockPermutation;
	public readonly glass: BlockPermutation;

	public constructor() {
		super(69);

		Simplex.currentSeed = this.seed;

		//distrib:
		//scale: size closer to one smaller
		//amplitude:

		this.solNoise = new Simplex({
			distrib: 1,
			scale: 0.03,
			octaves: 2,
			amplitude: 0.8,
			seed: this.seed
		});

		this.cavNoise = new Simplex({
			distrib: 1,
			scale: 0.03,
			octaves: 2,
			amplitude: 0.8,
			seed: this.seed
		});

		this.tempNoise = new Simplex({
			distrib: 1,
			scale: 0.04,
			octaves: 2,
			amplitude: 0.8,
			seed: this.seed
		});

		this.humNoise = new Simplex({
			distrib: 1,
			scale: 0.04,
			octaves: 2,
			amplitude: 0.8,
			seed: this.seed
		});

		this.weiNoise = new Simplex({
			distrib: 1,
			scale: 0.0015,
			octaves: 6,
			amplitude: 1,
			seed: this.seed
		});

		this.conNoise = new Simplex({
			distrib: 1,
			scale: 0.001,
			octaves: 6,
			amplitude: 0.7,
			seed: this.seed
		});

		this.eroNoise = new Simplex({
			distrib: 1,
			scale: 0.001,
			octaves: 6,
			amplitude: 1,
			seed: this.seed
		});

		this.bedrock = BlockPermutation.resolve(BlockIdentifier.Bedrock);
		this.stone = BlockPermutation.resolve(BlockIdentifier.Stone);
		this.dirt = BlockPermutation.resolve(BlockIdentifier.Dirt);
		this.sand = BlockPermutation.resolve(BlockIdentifier.Sand);
		this.gravel = BlockPermutation.resolve(BlockIdentifier.Gravel);
		this.grass = BlockPermutation.resolve(BlockIdentifier.GrassBlock);
		this.water = BlockPermutation.resolve(BlockIdentifier.Water);
		this.lava = BlockPermutation.resolve(BlockIdentifier.Lava);
		this.tulip_pink = BlockPermutation.resolve(BlockIdentifier.YellowFlower, {
			flower_type: "tulip_pink"
		});
		this.poppy = BlockPermutation.resolve(BlockIdentifier.YellowFlower);
		this.dandelion = BlockPermutation.resolve(BlockIdentifier.YellowFlower);
		this.cornflower = BlockPermutation.resolve(BlockIdentifier.YellowFlower, {
			flower_type: "cornflower"
		});
		this.oak_log = BlockPermutation.resolve(BlockIdentifier.OakLog);
		this.oak_leaves = BlockPermutation.resolve(BlockIdentifier.OakLeaves);
		this.sponge = BlockPermutation.resolve(BlockIdentifier.Sponge);
		this.air = BlockPermutation.resolve(BlockIdentifier.Air);
		this.glass = BlockPermutation.resolve(BlockIdentifier.Glass);
	}

	private linearInturp(
		x: number,
		xm: number,
		xM: number,
		ym: number,
		yM: number
	) {
		return ym + ((x - xm) * (yM - ym)) / (xM - xm);
	}

	/*
	 * TODO: ? Use a more rounder spline,
	 * right now it's just a straight line to each point,
	 * no curve/smoothness at the moment.
	 */
	public spline(value: number, points: Array<Array<number>>): number {
		for (let index = 0; index < points.length - 1; index++) {
			const [x1, y1] = points[index] ?? [0, 0];
			const [x2, y2] = points[index + 1] ?? [0, 0];

			if (value >= (x1 ?? 0) && value <= (x2 ?? 0))
				return this.linearInturp(value, x1 ?? 0, x2 ?? 0, y1 ?? 0, y2 ?? 0);
		}

		return 0;
	}

	public cubicSpline(
		x: number,
		points: Array<number>,
		values: Array<number>,
		derivatives: Array<number>
	): number {
		//@ts-ignore
		// if (x < points[0] || x > points.at(-1)) {
		// 	throw new Error(
		// 		`Value to interpolate is outside the range of the spline. Value: ${x}, Range: ${points[0]} | ${points.at(-1)}`
		// 	);
		// }
		if (x < points[0]) x = points[0];
		//@ts-ignore
		if (x > points.at(-1)) x = points.at(-1);

		function h(index: number): number {
			//@ts-ignore
			return points[index + 1] - points[index];
		}

		function a(index: number): number {
			//@ts-ignore
			return values[index];
		}

		function b(index: number): number {
			//@ts-ignore
			return derivatives[index];
		}

		function c(index: number): number {
			return (
				//@ts-ignore
				(3 / Math.pow(h(index), 2)) * (values[index + 1] - values[index]) -
				//@ts-ignore
				(derivatives[index + 1] + 2 * derivatives[index]) / h(index)
			);
		}

		function d(index: number): number {
			//@ts-ignore
			return (
				//@ts-ignore
				(-2 / Math.pow(h(index), 3)) * (values[index + 1] - values[index]) +
				//@ts-ignore
				(derivatives[index + 1] + derivatives[index]) / Math.pow(h(index), 2)
			);
		}

		let index = 0;
		//@ts-ignore
		while (index < points.length - 1 && x > points[index + 1]) {
			index++;
		}

		//@ts-ignore
		const dx = x - points[index];
		return (
			a(index) +
			b(index) * dx +
			c(index) * Math.pow(dx, 2) +
			d(index) * Math.pow(dx, 3)
		);
	}

	public getSplineVal(
		con: number,
		ero: number,
		pav: number,
		spline: Spline
	): number {
		let cord = 0;
		switch (spline.coordinate) {
			case "minecraft:overworld/continents": {
				cord = con;
				break;
			}
			case "minecraft:overworld/erosion": {
				cord = ero;
				break;
			}
			case "minecraft:overworld/ridges_folded": {
				cord = pav;
				break;
			}
		}
		const points = new Array<number>();
		const values = new Array<number>();
		const derivatives = new Array<number>();
		for (const p of spline.points) {
			points.push(p.location);
			derivatives.push(p.derivative);
			if (typeof p.value == "number") values.push(p?.value);
			else values.push(this.getSplineVal(con, ero, pav, p?.value));
		}
		const s = this.cubicSpline(cord, points, values, derivatives);
		return s;
	}

	//FOR DEBUG
	public getHeight(pos: Vector3f) {
		const con = this.conNoise.noise(
			Number(pos.x.toFixed(0)),
			Number(pos.z.toFixed(0))
		);
		const ero = this.eroNoise.noise(
			Number(pos.x.toFixed(0)),
			Number(pos.z.toFixed(0))
		);
		const wei = this.weiNoise.noise(
			Number(pos.x.toFixed(0)),
			Number(pos.z.toFixed(0))
		);
		const pav = 1 - Math.abs(3 * Math.abs(wei) - 2);

		//flat_cache(cache_2d((("minecraft:blend_offset" * (1 + (-1 * cache_once("minecraft:blend_alpha")))) + ((-0.5037500262260437 + n) * cache_once("minecraft:blend_alpha")))))
		const n = this.getSplineVal(con, ero, pav, spline);

		const h = this.linearInturp(n, -1.5, 1.5, -64, 320);
		return h;
	}

	/**
	 * Generates a chunk.
	 *
	 */
	public apply(cx: number, cz: number, type: DimensionType): Chunk {
		// Generate the chunk.
		const chunk = new Chunk(cx, cz, type);

		//53 gravel
		// MOUNTAINS/WATER
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				const con = this.conNoise.noise(chunk.x * 16 + x, chunk.z * 16 + z);
				const ero = this.eroNoise.noise(chunk.x * 16 + x, chunk.z * 16 + z);
				const wei = this.weiNoise.noise(chunk.x * 16 + x, chunk.z * 16 + z);
				const pav = 1 - Math.abs(3 * Math.abs(wei) - 2);

				//bo = 0; ba = 1;

				//flat_cache(
				//	cache_2d(
				//		("minecraft:blend_offset" *
				//			(1 +
				//				(-1 * cache_once("minecraft:blend_alpha"))
				//			)
				//		) + (
				//			(-0.5037500262260437 + n) * cache_once("minecraft:blend_alpha")
				//		)
				//	)
				//)
				const n = this.getSplineVal(con, ero, pav, spline);

				const h = this.linearInturp(n, -1.5, 1.5, -64, 320) - 66;
				for (let index = -64; index < h; index++) {
					chunk.setPermutation(x, index, z, this.stone, false);
					if (index >= h - 3) {
						if (h >= 64.545) {
							chunk.setPermutation(x, index, z, this.dirt);
							if (index >= h - 1) chunk.setPermutation(x, index, z, this.grass);
						} else {
							if (h >= 55.55) {
								chunk.setPermutation(x, index, z, this.sand);
							} else {
								chunk.setPermutation(x, index, z, this.gravel);
							}
						}
					}
					// if (index >= 64 && index >= h - 4) {
					// 	chunk.setPermutation(x, index, z, this.dirt);
					// 	if (index >= h - 1) chunk.setPermutation(x, index, z, this.grass);
					// } else if (index >= h - 4) {
					// 	if (index >= 55 && index >= h - 4)
					// 		chunk.setPermutation(x, index, z, this.sand);
					// 	else if (index >= h - 4)
					// 		chunk.setPermutation(x, index, z, this.gravel);
					// }
				}
				// lava 55 so 56
				if (h < 63) {
					for (let index = h + 1; index < 63; index++) {
						chunk.setPermutation(x, index, z, this.water);
					}
				}
			}
		}

		//Generate the terrain.
		// for (let x = 0; x < 16; x++) {
		// 	for (let z = 0; z < 16; z++) {
		// 		for (let y = 0; y < 128; y++) {
		// 			const s = this.solNoise.noise(chunk.x * 16 + x, y, chunk.z * 16 + z);
		// 			// if (chunk.x * 16 + x == 0 && chunk.z * 16 + z == 0) {
		// 			// 	if (y > 10) break;
		// 			// 	console.log(s);
		// 			// 	console.log(x, y, z, chunk.x * 16 + x, chunk.z * 16 + z);
		// 			// }
		// 			if (s <= -0.522 && chunk.getPermutation(x, y, z) != this.bedrock)
		// 				chunk.setPermutation(x, y, z, this.air);
		// 			//if (s > 0.3) chunk.setPermutation(x, y, z, this.sponge);
		// 		}
		// 	}
		// }

		// DEBUG
		// for (let x = 0; x < 16; x++) {
		// 	for (let z = 0; z < 16; z++) {
		// 		for (let y = 0; y < 32; y++) {
		// 			const s = Math.random();
		// 			chunk.setPermutation(x, y, z, this.stone, false);
		// 		}
		// 	}
		// }

		// //let c = this.cavNoise.noise(chunk.x * 16 + x, y, chunk.z * 16 + z);

		// s -= y / 80;
		// //c += 0.0001 * y * y;
		// if (s > 0) {
		// 	chunk.setPermutation(x, y, z, this.stone);
		// }
		// //if (c >= -0.1 && c <= 0.1) chunk.setPermutation(x, y, z, this.air);

		// Lava & Bedrock.
		// for (let x = 0; x < 16; x++) {
		// 	for (let z = 0; z < 16; z++) {
		// 		for (let y = 0; y < 5; y++) {
		// 			//if (chunk.getPermutation(x, y, z) == this.air && y < -54)
		// 			//chunk.setPermutation(x, y, z, this.lava);
		// 			switch (y) {
		// 				case 4: {
		// 					if (
		// 						this.solNoise.noise(
		// 							(chunk.x * 16 + x) * 64,
		// 							(chunk.z * 16 + z) * 64,
		// 							y
		// 						) >= 0.3
		// 					)
		// 						chunk.setPermutation(x, y, z, this.bedrock, false);
		// 					break;
		// 				}
		// 				case 3: {
		// 					if (
		// 						this.solNoise.noise(
		// 							(chunk.x * 16 + x) * 32,
		// 							(chunk.z * 16 + z) * 32,
		// 							y
		// 						) >= 0
		// 					)
		// 						chunk.setPermutation(x, y, z, this.bedrock, false);
		// 					break;
		// 				}
		// 				case 2: {
		// 					if (
		// 						this.solNoise.noise(
		// 							(chunk.x * 16 + x) * 16,
		// 							(chunk.z * 16 + z) * 16,
		// 							y
		// 						) >= -0.3
		// 					)
		// 						chunk.setPermutation(x, y, z, this.bedrock, false);
		// 					break;
		// 				}
		// 			}
		// 		}

		// 		chunk.setPermutation(x, 1, z, this.bedrock, false);
		// 		chunk.setPermutation(x, 0, z, this.bedrock, false);
		// 	}
		// }

		// Return the chunk.
		return chunk;
	}
}

export { Overworld };
