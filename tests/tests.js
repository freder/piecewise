import test from 'ava';
const piecewise = require('../');



function identity(a) {
	return a;
}

function always(b) {
	return () => b;
}


test('foo', t => {
	const piecewiseEasingFn = piecewise.easing([
		{
			tInterval: [0, 0.5],
			tMap: [0, 1], // optional
			easingFn: identity,
		},
		{
			tInterval: [0.5, 0.8],
			easingFn: always(1),
		},
		{
			tInterval: [0.8, 1],
			tMap: [1, 0], // reverse
			easingFn: identity,
		},
	]);

	t.true(piecewiseEasingFn(0) === 0);
	t.true(piecewiseEasingFn(0.25) === 0.5);
	t.true(piecewiseEasingFn(0.5) === 1);

	t.true(piecewiseEasingFn(0.6) === 1);
	t.true(piecewiseEasingFn(0.7) === 1);
	t.true(piecewiseEasingFn(0.8) === 1);

	t.true(piecewiseEasingFn(0.9) === 0.5);
	t.true(piecewiseEasingFn(1) === 0);
});
