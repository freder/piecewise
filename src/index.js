const R = require('ramda');


const map =
module.exports.map =
function map(n, start1, stop1, start2, stop2) {
	return (((n - start1) / (stop1 - start1)) * (stop2 - start2)) + start2;
};


const piecewiseEasing =
module.exports.piecewiseEasing =
function piecewiseEasing(pieces) {
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
			piece.tInterval[0], piece.tInterval[1],
			tMap[0], tMap[1]
		);

		return piece.easingFn(mappedT);
	};
};