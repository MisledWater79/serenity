//flat_cache(cache_2d((("minecraft:blend_offset" * (1 + (-1 * cache_once("minecraft:blend_alpha")))) + ((-0.5037500262260437 + spline({
export interface SplinePoint {
	derivative: number;
	location: number;
	value: number | Spline;
}

export interface Spline {
	coordinate: string;
	points: Array<SplinePoint>;
}

export const offset: Spline = {
	coordinate: "minecraft:overworld/continents",
	points: [
		{
			derivative: 0,
			location: -1.1,
			value: 0.044
		},
		{
			derivative: 0,
			location: -1.02,
			value: -0.2222
		},
		{
			derivative: 0,
			location: -0.51,
			value: -0.2222
		},
		{
			derivative: 0,
			location: -0.44,
			value: -0.12
		},
		{
			derivative: 0,
			location: -0.18,
			value: -0.12
		},
		{
			derivative: 0,
			location: -0.16,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0,
						location: -0.85,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.389_400_96,
									location: -1,
									value: -0.088_801_86
								},
								{
									derivative: 0.389_400_96,
									location: 1,
									value: 0.690_000_06
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.377_880_22,
									location: -1,
									value: -0.115_760_356
								},
								{
									derivative: 0.377_880_22,
									location: 1,
									value: 0.640_000_1
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.2222
								},
								{
									derivative: 0,
									location: -0.75,
									value: -0.2222
								},
								{
									derivative: 0,
									location: -0.65,
									value: 0
								},
								{
									derivative: 0,
									location: 0.595_454_7,
									value: 2.980_232_2e-8
								},
								{
									derivative: 0.253_456_3,
									location: 0.605_454_7,
									value: 2.980_232_2e-8
								},
								{
									derivative: 0.253_456_3,
									location: 1,
									value: 0.100_000_024
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.3
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.05
								},
								{
									derivative: 0,
									location: 0,
									value: 0.05
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0.05
								},
								{
									derivative: 0.007_000_001,
									location: 1,
									value: 0.060_000_002
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.15
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 0,
									value: 0
								},
								{
									derivative: 0.1,
									location: 0.4,
									value: 0.05
								},
								{
									derivative: 0.007_000_001,
									location: 1,
									value: 0.060_000_002
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.2,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.15
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 0,
									value: 0
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 1,
									value: 0
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.02
								},
								{
									derivative: 0,
									location: -0.4,
									value: -0.03
								},
								{
									derivative: 0,
									location: 0,
									value: -0.03
								},
								{
									derivative: 0.06,
									location: 0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 1,
									value: 0
								}
							]
						}
					}
				]
			}
		},
		{
			derivative: 0,
			location: -0.15,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0,
						location: -0.85,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.389_400_96,
									location: -1,
									value: -0.088_801_86
								},
								{
									derivative: 0.389_400_96,
									location: 1,
									value: 0.690_000_06
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.377_880_22,
									location: -1,
									value: -0.115_760_356
								},
								{
									derivative: 0.377_880_22,
									location: 1,
									value: 0.640_000_1
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.2222
								},
								{
									derivative: 0,
									location: -0.75,
									value: -0.2222
								},
								{
									derivative: 0,
									location: -0.65,
									value: 0
								},
								{
									derivative: 0,
									location: 0.595_454_7,
									value: 2.980_232_2e-8
								},
								{
									derivative: 0.253_456_3,
									location: 0.605_454_7,
									value: 2.980_232_2e-8
								},
								{
									derivative: 0.253_456_3,
									location: 1,
									value: 0.100_000_024
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.3
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.05
								},
								{
									derivative: 0,
									location: 0,
									value: 0.05
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0.05
								},
								{
									derivative: 0.007_000_001,
									location: 1,
									value: 0.060_000_002
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.15
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 0,
									value: 0
								},
								{
									derivative: 0.1,
									location: 0.4,
									value: 0.05
								},
								{
									derivative: 0.007_000_001,
									location: 1,
									value: 0.060_000_002
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.2,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.15
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 0,
									value: 0
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 1,
									value: 0
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.02
								},
								{
									derivative: 0,
									location: -0.4,
									value: -0.03
								},
								{
									derivative: 0,
									location: 0,
									value: -0.03
								},
								{
									derivative: 0.06,
									location: 0.4,
									value: 0
								},
								{
									derivative: 0,
									location: 1,
									value: 0
								}
							]
						}
					}
				]
			}
		},
		{
			derivative: 0,
			location: -0.1,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0,
						location: -0.85,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.389_400_96,
									location: -1,
									value: -0.088_801_86
								},
								{
									derivative: 0.389_400_96,
									location: 1,
									value: 0.690_000_06
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.377_880_22,
									location: -1,
									value: -0.115_760_356
								},
								{
									derivative: 0.377_880_22,
									location: 1,
									value: 0.640_000_1
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.2222
								},
								{
									derivative: 0,
									location: -0.75,
									value: -0.2222
								},
								{
									derivative: 0,
									location: -0.65,
									value: 0
								},
								{
									derivative: 0,
									location: 0.595_454_7,
									value: 2.980_232_2e-8
								},
								{
									derivative: 0.253_456_3,
									location: 0.605_454_7,
									value: 2.980_232_2e-8
								},
								{
									derivative: 0.253_456_3,
									location: 1,
									value: 0.100_000_024
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.25
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.05
								},
								{
									derivative: 0,
									location: 0,
									value: 0.05
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0.05
								},
								{
									derivative: 0.007_000_001,
									location: 1,
									value: 0.060_000_002
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0.01,
									location: -0.4,
									value: 0.001
								},
								{
									derivative: 0.01,
									location: 0,
									value: 0.003
								},
								{
									derivative: 0.094_000_004,
									location: 0.4,
									value: 0.05
								},
								{
									derivative: 0.007_000_001,
									location: 1,
									value: 0.060_000_002
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.2,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.02
								},
								{
									derivative: 0,
									location: -0.4,
									value: -0.03
								},
								{
									derivative: 0,
									location: 0,
									value: -0.03
								},
								{
									derivative: 0.12,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					}
				]
			}
		},
		{
			derivative: 0,
			location: 0.25,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0,
						location: -0.85,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: 0.202_350_21
								},
								{
									derivative: 0.513_824_9,
									location: 0,
									value: 0.716_175_1
								},
								{
									derivative: 0.513_824_9,
									location: 1,
									value: 1.23
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: 0.2
								},
								{
									derivative: 0.433_179_74,
									location: 0,
									value: 0.446_820_26
								},
								{
									derivative: 0.433_179_74,
									location: 1,
									value: 0.88
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: 0.2
								},
								{
									derivative: 0.391_705_1,
									location: 0,
									value: 0.308_294_95
								},
								{
									derivative: 0.391_705_1,
									location: 1,
									value: 0.700_000_05
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.25
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.35
								},
								{
									derivative: 0,
									location: 0,
									value: 0.35
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0.35
								},
								{
									derivative: 0.049_000_014,
									location: 1,
									value: 0.420_000_02
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0.07,
									location: -0.4,
									value: 0.006_999_999_8
								},
								{
									derivative: 0.07,
									location: 0,
									value: 0.021
								},
								{
									derivative: 0.658,
									location: 0.4,
									value: 0.35
								},
								{
									derivative: 0.049_000_014,
									location: 1,
									value: 0.420_000_02
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.2,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.45,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0,
									location: -0.4,
									value: {
										coordinate: "minecraft:overworld/ridges_folded",
										points: [
											{
												derivative: 0.5,
												location: -1,
												value: -0.1
											},
											{
												derivative: 0,
												location: -0.4,
												value: 0.01
											},
											{
												derivative: 0,
												location: 0,
												value: 0.01
											},
											{
												derivative: 0.04,
												location: 0.4,
												value: 0.03
											},
											{
												derivative: 0.049,
												location: 1,
												value: 0.1
											}
										]
									}
								},
								{
									derivative: 0,
									location: 0,
									value: 0.17
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.55,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0,
									location: -0.4,
									value: {
										coordinate: "minecraft:overworld/ridges_folded",
										points: [
											{
												derivative: 0.5,
												location: -1,
												value: -0.1
											},
											{
												derivative: 0,
												location: -0.4,
												value: 0.01
											},
											{
												derivative: 0,
												location: 0,
												value: 0.01
											},
											{
												derivative: 0.04,
												location: 0.4,
												value: 0.03
											},
											{
												derivative: 0.049,
												location: 1,
												value: 0.1
											}
										]
									}
								},
								{
									derivative: 0,
									location: 0,
									value: 0.17
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.58,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.1
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.02
								},
								{
									derivative: 0,
									location: -0.4,
									value: -0.03
								},
								{
									derivative: 0,
									location: 0,
									value: -0.03
								},
								{
									derivative: 0.12,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					}
				]
			}
		},
		{
			derivative: 0,
			location: 1,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0,
						location: -0.85,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: 0.347_926_26
								},
								{
									derivative: 0.576_036_9,
									location: 0,
									value: 0.923_963_1
								},
								{
									derivative: 0.576_036_9,
									location: 1,
									value: 1.5
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: 0.2
								},
								{
									derivative: 0.460_829_5,
									location: 0,
									value: 0.539_170_5
								},
								{
									derivative: 0.460_829_5,
									location: 1,
									value: 1
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: 0.2
								},
								{
									derivative: 0.460_829_5,
									location: 0,
									value: 0.539_170_5
								},
								{
									derivative: 0.460_829_5,
									location: 1,
									value: 1
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.2
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.5
								},
								{
									derivative: 0,
									location: 0,
									value: 0.5
								},
								{
									derivative: 0,
									location: 0.4,
									value: 0.5
								},
								{
									derivative: 0.070_000_015,
									location: 1,
									value: 0.6
								}
							]
						}
					},
					{
						derivative: 0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.05
								},
								{
									derivative: 0.099_999_994,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0.099_999_994,
									location: 0,
									value: 0.03
								},
								{
									derivative: 0.94,
									location: 0.4,
									value: 0.5
								},
								{
									derivative: 0.070_000_015,
									location: 1,
									value: 0.6
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.2,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.05
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.05
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.45,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.05
								},
								{
									derivative: 0,
									location: -0.4,
									value: {
										coordinate: "minecraft:overworld/ridges_folded",
										points: [
											{
												derivative: 0.5,
												location: -1,
												value: -0.05
											},
											{
												derivative: 0,
												location: -0.4,
												value: 0.01
											},
											{
												derivative: 0,
												location: 0,
												value: 0.01
											},
											{
												derivative: 0.04,
												location: 0.4,
												value: 0.03
											},
											{
												derivative: 0.049,
												location: 1,
												value: 0.1
											}
										]
									}
								},
								{
									derivative: 0,
									location: 0,
									value: 0.17
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.55,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0,
									location: -1,
									value: -0.05
								},
								{
									derivative: 0,
									location: -0.4,
									value: {
										coordinate: "minecraft:overworld/ridges_folded",
										points: [
											{
												derivative: 0.5,
												location: -1,
												value: -0.05
											},
											{
												derivative: 0,
												location: -0.4,
												value: 0.01
											},
											{
												derivative: 0,
												location: 0,
												value: 0.01
											},
											{
												derivative: 0.04,
												location: 0.4,
												value: 0.03
											},
											{
												derivative: 0.049,
												location: 1,
												value: 0.1
											}
										]
									}
								},
								{
									derivative: 0,
									location: 0,
									value: 0.17
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.58,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.5,
									location: -1,
									value: -0.05
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					},
					{
						derivative: 0,
						location: 0.7,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.015,
									location: -1,
									value: -0.02
								},
								{
									derivative: 0,
									location: -0.4,
									value: 0.01
								},
								{
									derivative: 0,
									location: 0,
									value: 0.01
								},
								{
									derivative: 0.04,
									location: 0.4,
									value: 0.03
								},
								{
									derivative: 0.049,
									location: 1,
									value: 0.1
								}
							]
						}
					}
				]
			}
		}
	]
};
//})) * cache_once("minecraft:blend_alpha")))))

export const factor: Spline = {
	coordinate: "minecraft:overworld/continents",
	points: [
		{
			derivative: 0.0,
			location: -0.19,
			value: 3.95
		},
		{
			derivative: 0.0,
			location: -0.15,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0.0,
						location: -0.6,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 6.25
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.5,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 2.67
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 6.25
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.25,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 6.25
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 2.67
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 6.3
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.03,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 6.25
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.35,
						value: 6.25
					},
					{
						derivative: 0.0,
						location: 0.45,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.9,
									value: 6.25
								},
								{
									derivative: 0.0,
									location: -0.69,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: 0.0,
												value: 6.25
											},
											{
												derivative: 0.0,
												location: 0.1,
												value: 0.625
											}
										]
									}
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.55,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.9,
									value: 6.25
								},
								{
									derivative: 0.0,
									location: -0.69,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: 0.0,
												value: 6.25
											},
											{
												derivative: 0.0,
												location: 0.1,
												value: 0.625
											}
										]
									}
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.62,
						value: 6.25
					}
				]
			}
		},
		{
			derivative: 0.0,
			location: -0.1,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0.0,
						location: -0.6,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.47
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.5,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 2.67
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.47
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.25,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.47
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 2.67
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 6.3
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.03,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.47
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.35,
						value: 5.47
					},
					{
						derivative: 0.0,
						location: 0.45,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.9,
									value: 5.47
								},
								{
									derivative: 0.0,
									location: -0.69,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: 0.0,
												value: 5.47
											},
											{
												derivative: 0.0,
												location: 0.1,
												value: 0.625
											}
										]
									}
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.55,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.9,
									value: 5.47
								},
								{
									derivative: 0.0,
									location: -0.69,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: 0.0,
												value: 5.47
											},
											{
												derivative: 0.0,
												location: 0.1,
												value: 0.625
											}
										]
									}
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.62,
						value: 5.47
					}
				]
			}
		},
		{
			derivative: 0.0,
			location: 0.03,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0.0,
						location: -0.6,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.08
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.5,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 2.67
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.08
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.25,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.08
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 2.67
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 6.3
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.03,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 5.08
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.35,
						value: 5.08
					},
					{
						derivative: 0.0,
						location: 0.45,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.9,
									value: 5.08
								},
								{
									derivative: 0.0,
									location: -0.69,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: 0.0,
												value: 5.08
											},
											{
												derivative: 0.0,
												location: 0.1,
												value: 0.625
											}
										]
									}
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.55,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.9,
									value: 5.08
								},
								{
									derivative: 0.0,
									location: -0.69,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: 0.0,
												value: 5.08
											},
											{
												derivative: 0.0,
												location: 0.1,
												value: 0.625
											}
										]
									}
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.62,
						value: 5.08
					}
				]
			}
		},
		{
			derivative: 0.0,
			location: 0.06,
			value: {
				coordinate: "minecraft:overworld/erosion",
				points: [
					{
						derivative: 0.0,
						location: -0.6,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 4.69
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.5,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 2.67
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.35,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 4.69
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.25,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 4.69
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: -0.1,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.05,
									value: 2.67
								},
								{
									derivative: 0.0,
									location: 0.05,
									value: 6.3
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.03,
						value: {
							coordinate: "minecraft:overworld/ridges",
							points: [
								{
									derivative: 0.0,
									location: -0.2,
									value: 6.3
								},
								{
									derivative: 0.0,
									location: 0.2,
									value: 4.69
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.05,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: 0.45,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: -0.2,
												value: 6.3
											},
											{
												derivative: 0.0,
												location: 0.2,
												value: 4.69
											}
										]
									}
								},
								{
									derivative: 0.0,
									location: 0.7,
									value: 1.56
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.4,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: 0.45,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: -0.2,
												value: 6.3
											},
											{
												derivative: 0.0,
												location: 0.2,
												value: 4.69
											}
										]
									}
								},
								{
									derivative: 0.0,
									location: 0.7,
									value: 1.56
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.45,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.7,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: -0.2,
												value: 6.3
											},
											{
												derivative: 0.0,
												location: 0.2,
												value: 4.69
											}
										]
									}
								},
								{
									derivative: 0.0,
									location: -0.15,
									value: 1.37
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.55,
						value: {
							coordinate: "minecraft:overworld/ridges_folded",
							points: [
								{
									derivative: 0.0,
									location: -0.7,
									value: {
										coordinate: "minecraft:overworld/ridges",
										points: [
											{
												derivative: 0.0,
												location: -0.2,
												value: 6.3
											},
											{
												derivative: 0.0,
												location: 0.2,
												value: 4.69
											}
										]
									}
								},
								{
									derivative: 0.0,
									location: -0.15,
									value: 1.37
								}
							]
						}
					},
					{
						derivative: 0.0,
						location: 0.58,
						value: 4.69
					}
				]
			}
		}
	]
}

let fd = {
	"type": "minecraft:min",
	"argument1": {
		"type": "minecraft:squeeze",
		"argument": {
			"type": "minecraft:mul",
			"argument1": 0.64,
			"argument2": {
				"type": "minecraft:interpolated",
				"argument": {
					"type": "minecraft:blend_density",
					"argument": {
						"type": "minecraft:add",
						"argument1": 0.1171875,
						"argument2": {
							"type": "minecraft:mul",
							"argument1": {
								"type": "minecraft:y_clamped_gradient",
								"from_value": 0.0,
								"from_y": -64,
								"to_value": 1.0,
								"to_y": -40
							},
							"argument2": {
								"type": "minecraft:add",
								"argument1": -0.1171875,
								"argument2": {
									"type": "minecraft:add",
									"argument1": -0.078125,
									"argument2": {
										"type": "minecraft:mul",
										"argument1": {
											"type": "minecraft:y_clamped_gradient",
											"from_value": 1.0,
											"from_y": 240,
											"to_value": 0.0,
											"to_y": 256
										},
										"argument2": {
											"type": "minecraft:add",
											"argument1": 0.078125,
											"argument2": {
												"type": "minecraft:range_choice",
												"input": "minecraft:overworld/sloped_cheese",
												"max_exclusive": 1.5625,
												"min_inclusive": -1000000.0,
												"when_in_range": {
													"type": "minecraft:min",
													"argument1": "minecraft:overworld/sloped_cheese",
													"argument2": {
														"type": "minecraft:mul",
														"argument1": 5.0,
														"argument2": "minecraft:overworld/caves/entrances"
													}
												},
												"when_out_of_range": {
													"type": "minecraft:max",
													"argument1": {
														"type": "minecraft:min",
														"argument1": {
															"type": "minecraft:min",
															"argument1": {
																"type": "minecraft:add",
																"argument1": {
																	"type": "minecraft:mul",
																	"argument1": 4.0,
																	"argument2": {
																		"type": "minecraft:square",
																		"argument": {
																			"type": "minecraft:noise",
																			"noise": "minecraft:cave_layer",
																			"xz_scale": 1.0,
																			"y_scale": 8.0
																		}
																	}
																},
																"argument2": {
																	"type": "minecraft:add",
																	"argument1": {
																		"type": "minecraft:clamp",
																		"input": {
																			"type": "minecraft:add",
																			"argument1": 0.27,
																			"argument2": {
																				"type": "minecraft:noise",
																				"noise": "minecraft:cave_cheese",
																				"xz_scale": 1.0,
																				"y_scale": 0.6666666666666666
																			}
																		},
																		"max": 1.0,
																		"min": -1.0
																	},
																	"argument2": {
																		"type": "minecraft:clamp",
																		"input": {
																			"type": "minecraft:add",
																			"argument1": 1.5,
																			"argument2": {
																				"type": "minecraft:mul",
																				"argument1": -0.64,
																				"argument2": "minecraft:overworld/sloped_cheese"
																			}
																		},
																		"max": 0.5,
																		"min": 0.0
																	}
																}
															},
															"argument2": "minecraft:overworld/caves/entrances"
														},
														"argument2": {
															"type": "minecraft:add",
															"argument1": "minecraft:overworld/caves/spaghetti_2d",
															"argument2": "minecraft:overworld/caves/spaghetti_roughness_function"
														}
													},
													"argument2": {
														"type": "minecraft:range_choice",
														"input": "minecraft:overworld/caves/pillars",
														"max_exclusive": 0.03,
														"min_inclusive": -1000000.0,
														"when_in_range": -1000000.0,
														"when_out_of_range": "minecraft:overworld/caves/pillars"
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"argument2": "minecraft:overworld/caves/noodle"
}

export const jaged: Spline = {
	"coordinate": "minecraft:overworld/continents",
	"points": [
		{
			"derivative": 0.0,
			"location": -0.11,
			"value": 0.0
		},
		{
			"derivative": 0.0,
			"location": 0.03,
			"value": {
				"coordinate": "minecraft:overworld/erosion",
				"points": [
					{
						"derivative": 0.0,
						"location": -1.0,
						"value": {
							"coordinate": "minecraft:overworld/ridges_folded",
							"points": [
								{
									"derivative": 0.0,
									"location": 0.19999999,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 0.44999996,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 1.0,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.63
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.3
											}
										]
									}
								}
							]
						}
					},
					{
						"derivative": 0.0,
						"location": -0.78,
						"value": {
							"coordinate": "minecraft:overworld/ridges_folded",
							"points": [
								{
									"derivative": 0.0,
									"location": 0.19999999,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 0.44999996,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 1.0,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.315
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.15
											}
										]
									}
								}
							]
						}
					},
					{
						"derivative": 0.0,
						"location": -0.5775,
						"value": {
							"coordinate": "minecraft:overworld/ridges_folded",
							"points": [
								{
									"derivative": 0.0,
									"location": 0.19999999,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 0.44999996,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 1.0,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.315
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.15
											}
										]
									}
								}
							]
						}
					},
					{
						"derivative": 0.0,
						"location": -0.375,
						"value": 0.0
					}
				]
			}
		},
		{
			"derivative": 0.0,
			"location": 0.65,
			"value": {
				"coordinate": "minecraft:overworld/erosion",
				"points": [
					{
						"derivative": 0.0,
						"location": -1.0,
						"value": {
							"coordinate": "minecraft:overworld/ridges_folded",
							"points": [
								{
									"derivative": 0.0,
									"location": 0.19999999,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 0.44999996,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.63
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.3
											}
										]
									}
								},
								{
									"derivative": 0.0,
									"location": 1.0,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.63
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.3
											}
										]
									}
								}
							]
						}
					},
					{
						"derivative": 0.0,
						"location": -0.78,
						"value": {
							"coordinate": "minecraft:overworld/ridges_folded",
							"points": [
								{
									"derivative": 0.0,
									"location": 0.19999999,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 0.44999996,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 1.0,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.63
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.3
											}
										]
									}
								}
							]
						}
					},
					{
						"derivative": 0.0,
						"location": -0.5775,
						"value": {
							"coordinate": "minecraft:overworld/ridges_folded",
							"points": [
								{
									"derivative": 0.0,
									"location": 0.19999999,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 0.44999996,
									"value": 0.0
								},
								{
									"derivative": 0.0,
									"location": 1.0,
									"value": {
										"coordinate": "minecraft:overworld/ridges",
										"points": [
											{
												"derivative": 0.0,
												"location": -0.01,
												"value": 0.63
											},
											{
												"derivative": 0.0,
												"location": 0.01,
												"value": 0.3
											}
										]
									}
								}
							]
						}
					},
					{
						"derivative": 0.0,
						"location": -0.375,
						"value": 0.0
					}
				]
			}
		}
	]
}