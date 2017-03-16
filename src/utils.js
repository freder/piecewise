const R = require('ramda');


const wrapPennerFunction =
/**
 * helper function to wrap a [penner easing function](http://upshots.org/actionscript/jsas-understanding-easing) to only be a function of `t`.
 * @param {Function} easingFn — easing-js easing function
 * @return {Function}
 */
module.exports.wrapPennerFunction =
function wrapPennerFunction(easingFn) {
	const startVal = 0;
	const endVal = 1;
	const diff = endVal - startVal;
	return R.partialRight(easingFn, [startVal, diff, endVal]);
	// return (t) => easingFn(t, startVal, diff, endVal);
};
