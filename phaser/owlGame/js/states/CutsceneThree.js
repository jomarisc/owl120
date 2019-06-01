// Creating Level Three's Cutscene
var CutsceneThree = function(game) {};
CutsceneThree.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
		this.continues = 0;
	},

	preload: function()
	{
		// Cutscene assets
		game.load.image("twilightSky", "assets/img/ptwilightSky0000.png");
		game.load.image("farBuildings", "assets/img/nightbuild0000.png");
		game.load.image("midBuildings", "assets/img/nightbuild0001.png");
		game.load.image("closeBuildings", "assets/img/nightbuild0002.png");
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
		setUpBackground(this.layerArray, this.keyArray, 1, 4);
		game.stage.backgroundColor = "#2B0865";

		menuText1 = game.add.text(game.width / 2, 450, 'This is the third cutscene.\nUpon stumbling across your friend, he shows you\nanother embarrassing photo of you\nas a part of a Throwback Thursday post.\n You can\'t even with your friend right now\n so you storm back to your home, leaving your friend puzzled.\nPress D to continue.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.downDuration(Phaser.Keyboard.D, 1)) {
			if(this.continues == 0)
			{
				// Camera Fade in
				game.camera.flash(0x000000, 1000, true);

				// Changing the background
				this.keyArray = ["twilightSky", "farBuildings", "midBuildings", "closeBuildings"];
				setUpBackground(this.layerArray, this.keyArray, 1, 4);
				menuText1 = game.add.text(game.width / 2, 450, "It is now nighttime.\nMaybe it wasn\'t the best idea to leave your friend hanging.\nYou decide to go visit your friend.\nPress D to enter the next level.", {fontsize: '72px', fill: '#FFF'});
				menuText1.anchor.setTo(0.5, 0.5);
				menuText1.align = "center";
				this.continues++;
			}
			else
			{
				game.state.start('LevelFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
			}
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
	},

	// finishFade: function()
	// {
	// 	game.state.start('LevelFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
}