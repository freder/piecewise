const R = require('ramda');


module.exports.visualization = require('./visualization.js');
module.exports.utils = require('./utils.js');


const map =
module.exports.map =
function map(n, start1, stop1, start2, stop2) {
	return (((n - start1) / (stop1 - start1)) * (stop2 - start2)) + start2;
};


const easing =
module.exports.easing =
function easing(pieces) {
	return (t) => {
		// find the right piece for `t`
		const piece = R.find(
			(piece) => (
				(piece.tInterval[0] <= t)
				&& (t <= piece.tInterval[1])
			),
			pieces
		);

		if (!piece) {
			throw new Error(`No piece defined for t = ${t}`);
		}

		const tMap = piece.tMap || [0, 1];

		const mappedT = map(
			t,
			...piece.tInterval,
			...tMap
		);

		return piece.easingFn(mappedT);
	};
};


const envelope =
module.exports.envelope =
function envelope(envelopeFn, easingFn) {
	return (t) => (envelopeFn(t) * easingFn(t));
};


const mix =
module.exports.mix =
function mix(fn1, fn2, fraction) {
	return (t) => {
		const a = fn1(t) * fraction;
		const b = fn2(t) * (1 - fraction);
		return (a + b);
	};
};


const crossfade =
module.exports.crossfade =
function crossfade(easingFn, fn1, fn2) {
	return (t) => {
		const easingT = easingFn(t);
		const mixFn = mix(fn1, fn2, (1 - easingT));
		return mixFn(t);
	};
};
