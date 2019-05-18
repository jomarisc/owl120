// Creating Level Two's Cutscene
var CutsceneTwo = function(game) {};
CutsceneTwo.prototype = {
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
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 3200, 900);

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		setUpBackground(this.layerArray, this.keyArray);

		//Another check
		menuText1 = game.add.text(game.width / 2, 450, 'This is the second cutscene.\nPress S to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
			// game.state.start('LevelThree', true);
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
		}
	},

	finishFade: function()
	{
		game.state.start('LevelThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	}
}