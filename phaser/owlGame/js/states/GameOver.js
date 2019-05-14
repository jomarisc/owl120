var GameOver = function(game) {};
GameOver.prototype = {
	init: function() {

	},
	preload: function() {

	},
	create: function() {
		//Check to start it all over again.
		game.stage.backgroundColor = "#facade";
		menuText1 = game.add.text(game.width / 2, 450, 'This is the game over state.\nPress ENTER to enter go back to the main menu.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(500, 550, '', {fontsize: '64px', fill: '#000'});
	},
	update: function() {
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('MainMenu');
		};
	}
};