// Creating Level Three's Cutscene
var CutsceneThree = function(game) {};
CutsceneThree.prototype = {
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
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 3200, 900);

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		this.layerArray = [this.sky, this.farBuildings, this.midBuildings, this.closeBuildings];
		this.layerSpeeds = [this.farParallax, this.midParallax, this.closeParallax];
		this.keyArray = ["redSky", "farBuildings", "midBuildings", "closeBuildings"];
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray);

		menuText1 = game.add.text(game.width / 2, 450, 'This is the third cutscene.\nPress D to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			// game.state.start('LevelFour');
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
		};
	},

	finishFade: function()
	{
		game.state.start('LevelFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	}
}