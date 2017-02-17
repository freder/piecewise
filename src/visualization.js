const R = require('ramda');


const plotFunction =
module.exports.plotFunction =
function plotFunction(ctx, opts, fn) {
	const { step, lineColor, lineWidth, padding } = R.merge(
		{
			padding: 20,
			step: 0.01,
			lineColor: 'rgb(0, 0, 0)',
			lineWidth: 1,
		},
		opts
	);

	const width = ctx.canvas.width - (2 * padding);
	const height = ctx.canvas.height - (2 * padding);

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
};
