// Creating Level One's Cutscene
var CutsceneOne = function(game) {};
CutsceneOne.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},

	preload: function()
	{
		// Cutscene assets
	},

	create: function()
	{
		// Something
		game.world.setBounds(0, 0, 1600, 900);

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		setUpBackground(this.layerArray, this.keyArray);

		menuText1 = game.add.text(game.width / 2, 450, 'This is the first cutscene.\nPress A to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
	},

	update: function()
	{
		// Allow the camera to follow the player
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(128 / 2, 450, 50, 350);

		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			// game.state.start('LevelTwo', true, false, this.sky, this.farBuildings, this.midBuildings, this.closeBuildings);
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
		};
	},

	finishFade: function()
	{
		game.state.start('LevelTwo', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	}
}