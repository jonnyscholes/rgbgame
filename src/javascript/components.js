var u = require('./utils.js');

Crafty.c('Grid', {
	init: function () {
		this.attr({
				w: RunningGame.map_grid.tile.width,
				h: RunningGame.map_grid.tile.height
			});
	},

	at: function (x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x / RunningGame.map_grid.tile.width, y: this.y / RunningGame.map_grid.tile.height };
		} else {
			this.attr({ x: x * RunningGame.map_grid.tile.width, y: y * RunningGame.map_grid.tile.height });
			return this;
		}
	}
});

Crafty.c('Actor', {
	init: function () {
		this.requires('2D, DOM, Grid');
	},
	setColor: function (color) {
		this.color(color);

		return this;
	}
});

Crafty.c('GameScreen', {
	init: function () {
		this.requires('2D, DOM, Text');
	}
});

Crafty.c('PlayerCharacter', {
	init: function () {
		var tileSize = RunningGame.map_grid.tile.height;

		this.requires('Actor, Color, Collision, Text')
			.text('!')
			.bind('KeyDown', function(e) {
				var direction;
				var atEdge = '';

				if (this.x == 0) {
					atEdge += 'w';
				}
				if (this.x == RunningGame.width() - tileSize) {
					atEdge += 'e';
				}
				if (this.y == 0) {
					atEdge += 'n';
				}
				if (this.y == RunningGame.height() - tileSize) {
					atEdge += 's';
				}

				switch(e.key) {
					case Crafty.keys.LEFT_ARROW:
						direction = 'w';
						break;
					case Crafty.keys.RIGHT_ARROW:
						direction = 'e';
						break;
					case Crafty.keys.UP_ARROW:
						direction = 'n';
						break;
					case Crafty.keys.DOWN_ARROW:
						direction = 's';
						break;
				}

				if(atEdge.indexOf(direction) === -1 && direction) {
					this.move(direction, tileSize);
				}
			})
			.onHit('ColorTile', this.collectColorTile);
	},

	// Respond to this player visiting a village
	collectColorTile: function (data) {
		var colorTile = data[0].obj;
		var newColor = u.mix(this._color, colorTile._color);
		this.tilesCollected++;
		RunningGame.updateCurrentColor(newColor);
		this.color(newColor);

		colorTile.visit();
	},

	tilesCollected: 0
});

Crafty.c('ColorTile', {
	init: function () {
		this.requires('Actor, Color, HTML');
	},

	visit: function () {
		this.destroy();
		Crafty.trigger('ColorTileVisited', this);
	}
});


