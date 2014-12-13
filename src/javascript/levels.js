var u = require('./utils.js');

module.exports = {
	count: 3,
	data: [
		{
			name: 'Level 1',
			challenge: 'Make one of your RGB fragments surpass 150',
			showColorLabels: true,
			test: function(playerColor) {
				return surpassSingleFragment(playerColor, 150);
			}
		},
		{
			name: 'Level 2',
			challenge: 'Make one of your RGB fragments surpass 200',
			showColorLabels: true,
			test: function(playerColor) {
				return surpassSingleFragment(playerColor, 200);
			}
		},
		{
			name: 'Level 3',
			challenge: 'Consume all the colors without making one of your RGB fragments surpass 200',
			showColorLabels: false,
			test: function(playerColor, tilesCollected, totalTiles) {
				return consumeAndStayBelowFragment(playerColor, tilesCollected, totalTiles);
			}
		},
		{
			name: 'Level 4',
			challenge: 'Become Red',
			showColorLabels: false,
			test: function(playerColor, tilesCollected, totalTiles) {
				return consumeAndStayBelowFragment(playerColor, tilesCollected, totalTiles);
			}
		}
	]
};


function surpassSingleFragment(color, threshold) {
	var rgb = u.rgba(color);
	var passed = false;
	rgb.forEach(function(elm){
		if (elm >= threshold) {
			passed = 'success';
		}
	});
	return passed;
}


function consumeAndStayBelowFragment(color, tilesCollected, totalTiles) {
	var result = false;
	var rgb = u.rgba(color);

	if (tilesCollected === totalTiles-1) {
		result = 'success';
	}

	rgb.forEach(function(elm){
		if (elm >= 200) {
			result = 'fail';
		}
	});

	return result;
}

function becomeSpecific(currentColor, targetHue) {
	var result = false;
	var rgb = u.rgba(currentColor);


	rgb.forEach(function(elm){
		if (elm >= 200) {
			result = 'fail';
		}
	});

	return result;
}