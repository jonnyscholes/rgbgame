var $ = require('jquery');
var Crafty = require('craftyjs');

var u = require('./utils.js');
var levels = require('./levels.js');

require('./components.js');
require('./scenes.js');

var Game = function() {
	var self = this;

	var scale = 6;
	var unit;

	var isMobile = $(window).width() <= 768;

	if ($(window).width() > $(window).height()) {
		unit = parseInt($(window).height() / scale, 10);
	} else {
		unit = parseInt($(window).width() / scale, 10);
	}

	self.map_grid = {
		width: scale,
		height: scale,
		tile: {
			width: unit,
			height: unit
		}
	};

	self.currentLevel = 0;
	self.currentTest = function(){ return levels.data[self.currentLevel].test; };

	self.nextLevel = function() {
		if(self.currentLevel+1 === levels.count){
			Crafty.scene('WinScreen');
		} else {
			self.currentLevel++;
			self.updateLevelUI();
		}
	};

	self.updateLevelUI = function() {
		$('.js-color-current-challenge').text(levels.data[self.currentLevel].challenge);
		$('.js-level-name').text(levels.data[self.currentLevel].name);
		levels.data[self.currentLevel].showColorLabels ? $('body').addClass('show-color-labels') : $('body').removeClass('show-color-labels');
	};

	self.width = function () {
		return self.map_grid.width * self.map_grid.tile.width;
	};

	self.height = function () {
		return self.map_grid.height * self.map_grid.tile.height;
	};

	self.start = function() {
		Crafty.init(self.width(), self.height(), 'game-stage');
		Crafty.scene('GameStart');
	};

	self.reset = function() {
		self.currentLevel = 0;
		self.updateLevelUI();
		Crafty.scene('GameStart');
	};

	self.updateCurrentColor = function(color) {
		var rgb = u.rgba(color);
		$('.js-color-current').html(function() {
			return '<span class="current-color--red">'+rgb[0]+'</span><span class="current-color--green">'+rgb[1]+'</span><span class="current-color--blue">'+rgb[2]+'</span>';
		});
	};
};

$(window).load(function(){
	window.RunningGame = new Game();
	window.RunningGame.start();
});