const fs = require('fs');
const R = require('ramda');
const Canvas = require('canvas');
const piecewise = require('./');


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

// const Image = Canvas.Image;
const canvas = new Canvas(
	(2 * padding) + width,
	(2 * padding) + height
)
const ctx = canvas.getContext('2d');

function plotFunction(ctx, fn, opts) {
	const { step, lineColor, lineWidth } = R.merge(
		{
			step: 0.01,
			lineColor: 'rgb(0, 0, 0)',
			lineWidth: 1,
		},
		opts
	);

	ctx.strokeStyle = lineColor;
	ctx.lineWidth = lineWidth;

	let t = 0;
	ctx.beginPath();
	ctx.moveTo(padding, padding + height);
	while (t <= 1) {
		ctx.lineTo(
			padding + (t * width),
			padding + height - (fn(t) * height));
		t += step;
	}
	ctx.stroke();
}

let opts;

opts = {
	lineColor: 'rgb(0, 0, 0)',
	lineWidth: 5,
};
plotFunction(ctx, finalFn, opts);

opts = {
	lineColor: 'rgb(200, 200, 200)',
	lineWidth: 4,
};
plotFunction(ctx, piecewiseEasingFn, opts);

opts = {
	lineColor: 'rgb(255, 0, 0)',
	lineWidth: 2,
};
plotFunction(ctx, piecewiseEnvelopeFn, opts);

fs.writeFileSync('out.png', canvas.toBuffer());

