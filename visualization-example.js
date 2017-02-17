const fs = require('fs');
const R = require('ramda');
const Canvas = require('canvas');
const piecewise = require('./');
const { visualization } = piecewise;


const piecewiseEasingFn = piecewise.easing([
	{
		tInterval: [0, 0.5],
		tMap: [0, 1],
		easingFn: R.identity,
	},
	{
		tInterval: [0.5, 0.8],
		easingFn: R.always(1),
	},
	{
		tInterval: [0.8, 1],
		tMap: [1, 0],
		easingFn: R.identity,
	},
]);

const piecewiseEnvelopeFn = piecewise.easing([
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

const finalFn = piecewise.envelope(piecewiseEnvelopeFn, piecewiseEasingFn);


const padding = 20;
const height = 100;
const width = 500;

const canvas = new Canvas(
	(2 * padding) + width,
	(2 * padding) + height
)
const ctx = canvas.getContext('2d');

let opts = {};
opts = {
	lineColor: 'rgb(0, 0, 0)',
	lineWidth: 5,
};
visualization.plotFunction(ctx, opts, finalFn);

opts = {
	lineColor: 'rgb(200, 200, 200)',
	lineWidth: 4,
};
visualization.plotFunction(ctx, opts, piecewiseEasingFn);

opts = {
	lineColor: 'rgb(255, 0, 0)',
	lineWidth: 2,
};
visualization.plotFunction(ctx, opts, piecewiseEnvelopeFn);

fs.writeFileSync('out.png', canvas.toBuffer());

