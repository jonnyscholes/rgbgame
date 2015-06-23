var u = require('./utils.js');
var Hammer = require('hammerjs');

Crafty.scene('Loading', function () {
	Crafty.e('GameScreen')
		.text('Loading...')
		.attr({ x: 0, y: RunningGame.height() / 2 - 24, w: RunningGame.width() });
	Crafty.scene('GameStart');
});


Crafty.scene('GameStart', function () {
	Crafty.e('GameScreen')
		.attr({ x: 0, y: RunningGame.height() / 2 - 24, w: RunningGame.width() })
		.text('Reach X color etc');

	this.button = Crafty.e('GameScreenButton')
		.bind('Click', startLevel);

	function startLevel() {
		Crafty.scene('Game');
	}
}, function () {
	this.unbind('Click', this.button);
});


Crafty.scene('Game', function () {
	this.occupied = new Array(RunningGame.map_grid.width);
	for (var i = 0; i < RunningGame.map_grid.width; i++) {
		this.occupied[i] = new Array(RunningGame.map_grid.height);
		for (var y = 0; y < RunningGame.map_grid.height; y++) {
			this.occupied[i][y] = false;
		}
	}

	var player = this.player = Crafty.e('PlayerCharacter').at(5, 5).color('rgb(0, 0, 0)');
	this.occupied[this.player.at().x][this.player.at().y] = true;

	var color;
	for (var x = 0; x < RunningGame.map_grid.width; x++) {
		for (var y = 0; y < RunningGame.map_grid.height; y++) {
			if (!this.occupied[x][y]) {
				color = u.randomColor();
				Crafty.e('ColorTile')
					.append('<div class="ColorTileLabel">'+color.replace('rgb(','').replace(')','')+'</div>')
					.at(x, y)
					.setColor(color);
			}
		}
	}

	var hammertime = new Hammer(Crafty.stage.elem);
	hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	hammertime.on('swipe', function(e) {
		switch(e.direction) {
			case 2:
				player.move('w', RunningGame.map_grid.tile.height);
				break;
			case 4:
				player.move('e', RunningGame.map_grid.tile.height);
				break;
			case 8:
				player.move('n', RunningGame.map_grid.tile.height);
				break;
			case 16:
				player.move('s', RunningGame.map_grid.tile.height);
				break;
		}
	});

	this.showVictory = this.bind('ColorTileVisited', function () {
		var testResult = RunningGame.currentTest()(this.player._color, this.player.tilesCollected, RunningGame.map_grid.width*RunningGame.map_grid.height);

		if (testResult === 'success') {
			Crafty.scene('Victory');
			RunningGame.nextLevel();
		} else if (testResult === 'fail') {
			Crafty.scene('Failed');
		}
	});

	RunningGame.updateLevelUI();
	RunningGame.updateCurrentColor(this.player._color);
}, function () {
	this.unbind('ColorTileVisited', this.showVictory);
});


Crafty.scene('Victory', function () {
	Crafty.e('GameScreen')
		.text('Level passed!')
		.attr({ x: 0, y: RunningGame.height() / 2 - 24, w: RunningGame.width() });

	this.button = Crafty.e('GameScreenButton')
		.bind('Click', restartLevel);

//	this.requires('Button')
//		.attr({ w :RunningGame.map_grid.tile.width*2, h: RunningGame.map_grid.tile.width })
//		.at(2, 4)
//		.color('blue')
//		.text('Start level '+(RunningGame.currentLevel+1));

	function restartLevel () {
		Crafty.scene('Game');
	}
}, function () {
	this.unbind('Click', this.button);
});


Crafty.scene('WinScreen', function () {
	Crafty.e('GameScreen')
		.text('SUCH WIN! VERY SKILL!')
		.attr({ x: 0, y: RunningGame.height() / 2 - 24, w: RunningGame.width() });

	this.button = Crafty.e('GameScreenButton')
		.bind('Click', restartGame);

	 function restartGame() {
		RunningGame.reset();
	}
}, function () {
	this.unbind('Click', this.button);
});


Crafty.scene('Failed', function () {
	Crafty.e('GameScreen')
		.text('FAIL!')
		.attr({ x: 0, y: RunningGame.height() / 2 - 24, w: RunningGame.width() });

	this.button = Crafty.e('GameScreenButton')
		.bind('Click', restartLevel);

	function restartLevel () {
		Crafty.scene('Game');
	}
}, function () {
	this.unbind('Click', this.button);
});