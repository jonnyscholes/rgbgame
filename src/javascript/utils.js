module.exports = {
	mix: mix,
	randomColor: randomColor,
	getRandomInRange: getRandomInRange,
	rgba: rgba
};

// @todo replace this with fuzzy-color or another new color mixing module
function mix(currentColor, newColor) {
	var cc = rgba(currentColor);
	var nc = rgba(newColor);
	return 'rgba('+parseInt(((cc[0]+nc[0])/2), 10)+','+parseInt(((cc[1]+nc[1])/2), 10)+','+parseInt(((cc[2]+nc[2])/2), 10)+',1)';
}

function randomColor() {
	return 'rgb('+getRandomInRange(0,255)+','+getRandomInRange(0,255)+','+getRandomInRange(0,255)+')';
}

function getRandomInRange(from, to) {
	return (Math.random() * (to - from) + from).toFixed(0) * 1;
}

function rgba(str) {
	if (str.indexOf('rgba(') !== -1) {
		var rgb = str.trim()
			.replace(/rgba?\(/, '')
			.replace(/;/g, '')
			.replace(')', '')
			.split(',')
			.filter(function (elm) { return elm.replace(new RegExp(/\s/g), '').length > 0; })
			.filter(function (number) { return number <= 255; });

		if (rgb[3] > 1 || rgb.length !== 4) {
			return false;
		}
		return rgb.map(function(i){ return parseFloat(i); });
	}
	return false;
}