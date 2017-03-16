const R = require('ramda');


const wrapEasingJsFunction =
/**
 * helper function to wrap an [easing-js](https://github.com/rdy/easing-js) function to only be a function of `t`.
 * @param {Function} easingFn — easing-js easing function
 * @return {Function}
 */
module.exports.wrapEasingJsFunction =
function wrapEasingJsFunction(easingFn) {
	// http://upshots.org/actionscript/jsas-understanding-easing
	const startVal = 0;
	const endVal = 1;
	const diff = endVal - startVal;
	return R.partialRight(easingFn, [startVal, diff, endVal]);
	// return (t) => easingFn(t, startVal, diff, endVal);
};
