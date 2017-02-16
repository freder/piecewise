# @freder/piecewise

a library for creating composable easing functions.


## example

```javascript
function identity(a) {
	return a;
}

function always(b) {
	return () => b;
}

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
```

