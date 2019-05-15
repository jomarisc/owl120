//Creating the Main Menu state.
var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function() {

	},
	preload: function() {
		// game.load.image("owl", "assets/img/owl10000ver.2.png");
		// game.load.image("enemy", "assets/img/owl12.png");
		// game.load.image("support", "assets/img/owl3.png");
		// game.load.image("endToken", "assets/img/coin0000.v3.png");
		// game.load.image("billboard", "assets/img/cloud20000.png");

		// Load sprites from a texture atlas
		game.load.path = 'assets/img/';
		game.load.atlas('owl', 'owl.png', 'owl.json');
		
		// Loads images separately from the assets/img folder
		game.load.image("ground", "urbanGround.png");
		game.load.image('platform', 'grayPlatform0000.png');
	},
	create: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//Basic functionality check.

		// Setting up stage color
		game.stage.backgroundColor = "#facade";

		// Main Menu text
		menuText1 = game.add.text(game.width / 2, 450, 'This is the Main Menu.\nPress SPACE to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, , {fontsize: '64px', fill: '#000'});
	},
	update: function() {
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('LevelOne');
		};
	}
};