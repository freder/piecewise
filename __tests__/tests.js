const R = require('ramda');
const piecewise = require('../src/index.js');


test('easing() — should create new piecewise defined function', () => {
	const piecewiseEasingFn = piecewise.easing([
		{
			tInterval: [0, 0.5],
			tMap: [0, 1], // optional
			easingFn: R.identity,
		},
		{
			tInterval: [0.5, 0.8],
			easingFn: R.always(1),
		},
		{
			tInterval: [0.8, 1],
			tMap: [1, 0], // reverse
			easingFn: R.identity,
		},
	]);

	expect(piecewiseEasingFn(0)).toBe(0);
	expect(piecewiseEasingFn(0.25)).toBe(0.5);
	expect(piecewiseEasingFn(0.5)).toBe(1);

	expect(piecewiseEasingFn(0.6)).toBe(1);
	expect(piecewiseEasingFn(0.7)).toBe(1);
	expect(piecewiseEasingFn(0.8)).toBe(1);

	expect(piecewiseEasingFn(0.9)).toBe(0.5);
	expect(piecewiseEasingFn(1)).toBe(0);
});


test('envelope() — should shape another function', () => {
	const easingFn = R.always(1);
	const envelopeFn = piecewise.easing([
		{
			tInterval: [0, 0.5],
			tMap: [0, 1],
			easingFn: R.identity,
		},
		{
			tInterval: [0.5, 1],
			tMap: [1, 0],
			easingFn: R.identity,
		},
	]);
	const shapedFn = piecewise.envelope(envelopeFn, easingFn);

	expect(shapedFn(0)).toBe(0);
	expect(shapedFn(0.25)).toBe(0.5);
	expect(shapedFn(0.5)).toBe(1);
	expect(shapedFn(0.75)).toBe(0.5);
	expect(shapedFn(1)).toBe(0);
});


test('crossfade() — should mix two functions', () => {
	const easingFn = R.identity;
	const f1 = R.always(1);
	const f2 = R.always(0);
	const cf = piecewise.crossfade(easingFn, f1, f2);

	expect(cf(0)).toBe(1);
	expect(cf(0.25)).toBe(0.75);
	expect(cf(0.5)).toBe(0.5);
	expect(cf(0.75)).toBe(0.25);
	expect(cf(1)).toBe(0);
});
