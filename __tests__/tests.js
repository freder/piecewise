const R = require('ramda');
const piecewise = require('../');


test('easing — should create new piecewise defined function', () => {
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


// test('fails', () => {
// 	expect(false).toBe(true);
// });
