class Spline {
	public value: number;
	public constructor(value?: number) {
		this.value = value || 0;
	}

	public minValue(): number {
		return 0;
	}

	public maxValue(): number {
		return 0;
	}
}

function linearExtend(
	yM: number,
	ym: Array<number>,
	xM: number,
	xm: Array<number>,
	x: number
): number {
	const $$5 = xm[x] || 0;
	return $$5 == 0 ? xM : xM + $$5 * (yM - (ym[x] || 0));
}

function convertSpline(value: Spline | number): Spline {
	// @ts-ignore
	if (typeof value == typeof Spline) return value;
	return new Spline(value);
}

/*
 * value: noise/value
 * location
 */

function create(
	value: Noise,
	locations: Array<number>,
	values: Array<Spline | number>,
	derivative: Array<number>
) {
	//validateSizes(locations, values, derivative);
	const locSize = locations.length - 1;
	let low = Number.NEGATIVE_INFINITY;
	let high = Number.POSITIVE_INFINITY;
	const noiseMin = value.minValue();
	const noiseMax = value.maxValue();
	let $$11 = 0;
	let $$15 = 0;
	// @ts-ignore
	if (noiseMin < locations[0]) {
		$$11 = linearExtend(
			noiseMin,
			locations,
			convertSpline(values[0] || 0).minValue(),
			derivative,
			0
		);
		$$15 = linearExtend(
			noiseMin,
			locations,
			convertSpline(values[0] || 0).maxValue(),
			derivative,
			0
		);
		high = Math.min(high, Math.min($$11, $$15));
		low = Math.max(low, Math.max($$11, $$15));
	}

	// @ts-ignore
	if (noiseMax > locations[locSize]) {
		$$15 = linearExtend(
			noiseMax,
			locations,
			convertSpline(values[locSize] || 0).maxValue(),
			derivative,
			locSize
		);
		high = Math.min(high, Math.min($$11, $$15));
		$$11 = linearExtend(
			noiseMax,
			locations,
			convertSpline(values[locSize] || 0).minValue(),
			derivative,
			locSize
		);
		low = Math.max(low, Math.max($$11, $$15));
	}

	let spline = new Spline();
	for (
		let index = values.length;
		values[index + 1];
		low = Math.max(low, spline.maxValue())
	) {
		spline = convertSpline(values[index] || 0);
		high = Math.min(high, spline.minValue());
	}

	for (let index = 0; index < locSize; index++) {
		$$15 = locations[index] || 0;
		const $$16 = locations[index + 1] || 0;
		const $$17 = $$16 - $$15;
		const $$18 = convertSpline(values[index] || 0);
		const $$19 = convertSpline(values[index + 1] || 0);
		const $$20 = $$18.minValue();
		const $$21 = $$18.maxValue();
		const $$22 = $$19.minValue();
		const $$23 = $$19.maxValue();
		const $$24 = derivative[index] || 0;
		const $$25 = derivative[index + 1] || 0;
		if ($$24 != 0 || $$25 != 0) {
			const $$26 = $$24 * $$17;
			const $$27 = $$25 * $$17;
			const $$28 = Math.min($$20, $$22);
			const $$29 = Math.max($$21, $$23);
			const $$30 = $$26 - $$23 + $$20;
			const $$31 = $$26 - $$22 + $$21;
			const $$32 = -$$27 + $$22 - $$21;
			const $$33 = -$$27 + $$23 - $$20;
			const $$34 = Math.min($$30, $$32);
			const $$35 = Math.max($$31, $$33);
			high = Math.min(high, $$28 + 0.25 * $$34);
			low = Math.max(low, $$29 + 0.25 * $$35);
		}
	}

	return new Multipoint(value, locations, values, derivative, high, low);
}
