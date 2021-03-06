// Creating Level Four's Cutscene
var CutsceneFour = function(game) {};
CutsceneFour.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
		this.continues = 0;
	},

	preload: function()
	{
		// Cutscene assets
		game.load.image("farBuildings", "assets/img/nightbuild0000.png");
		game.load.image("midBuildings", "assets/img/nightbuild0001.png");
		game.load.image("closeBuildings", "assets/img/nightbuild0002.png");
		game.load.image("cutscene4b", "assets/img/cutscene4b.png");

	},

	create: function()
	{
		// Add music
		this.bgm = game.add.audio("bgm02");
		this.bgm.play("", 0, 0.5, true);

		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 3200, 900);

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		this.layerArray = [this.sky, this.farBuildings, this.midBuildings, this.closeBuildings];
		this.layerSpeeds = [this.farParallax, this.midParallax, this.closeParallax];
		this.keyArray = ["twilightSky", "farBuildings", "midBuildings", "closeBuildings"];
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray, 1, 4);

		menuText1 = game.add.text(game.width / 2, 450, "It is now nighttime.\nMaybe it wasn\'t the best idea to leave your friend hanging.\nYou decide to go visit your friend.\nPress F to enter the next level.", {fontsize: '72px', fill: '#FFF'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});

		var second = game.add.sprite(0, 0, 'cutscene4b');
		
		menuText1 = game.add.text(game.width / 2 - 20, 800, "Owl: ...they're coming back. I remember these... I thought these were gone... \nWhat's all this work been for? After all the work to learn these skills, be a part of a tech company, and start clean... \nit started to look like something good was coming. Fin even recommended me to this company to help me \ntry to land an opportunity. It's gonna go to waste... man if Fin knew all about this... he'd think I'm horrible. \nI've gotta go somewhere... please anywhere... anywhere away from here...", {fontsize: '72px', fill: '#FFF'});
		menuText2 = game.add.text(game.width - 400, 835, "[SPACE] to continue", {fontsize: '72px', fill: '#FFF'}); 
		menuText1.anchor.setTo(0.5, 0.5);

	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			// if(this.continues == 0)
			// {
			// 	// Camera Fade in
			// 	game.camera.flash(0x000000, 1000, true);

			// 	// Changing the background
			// 	this.keyArray = ["blueSky", "farBuildings", "midBuildings", "closeBuildings"];
			// 	setUpBackground(this.layerArray, this.keyArray, 1, 4);
			// 	menuText1 = game.add.text(game.width / 2, 450, "It is now nighttime.\nMaybe it wasn\'t the best idea to leave your friend hanging.\nYou decide to go visit your friend.\nPress D to enter the next level.", {fontsize: '72px', fill: '#FFF'});
			// 		menuText1.anchor.setTo(0.5, 0.5);
			// 		menuText1.align = "center";
			// 	this.continues++;
			// }
			// else
			// {
				game.state.start('LevelFinal', true, false, this.layerArray, this.layerSpeeds, this.keyArray, this.bgm);
			// }
		};

		if(game.input.keyboard.isDown(Phaser.Keyboard.P)) {
			//Set alpha to zero for subsequent images.
			//first.sprite.alpha = 0?
		}
	}
}