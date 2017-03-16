/* global test: true */
/* global expect: true */
const easing = require('easing-js');
const { utils } = require('../src/index.js');


test('wrapPennerFunction() — should work', () => {
	const easingFn = easing.linear;
	const wrappedFn = utils.wrapPennerFunction(easingFn);
	expect(wrappedFn(0)).toBe(0);
	expect(wrappedFn(0.5)).toBe(0.5);
	expect(wrappedFn(1)).toBe(1);
});
