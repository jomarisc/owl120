// Creating Level Final's Cutscene
var CutsceneFinalC = function(game) {};
CutsceneFinalC.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
		this.continues = 0;
	},

	preload: function()
	{
		// Cutscene assets
		game.load.image("finalVig", "assets/img/finalVig.png");
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
		this.keyArray = ["twilightSky", "farBuildings", "midBuildings", "closeBuildings"];
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray, 1, 4);

		menuText1 = game.add.text(game.width / 2, 450, 'This is the Final cutscene.\nYou ring your friend\'s doorbell, but there\'s no response.\nYou call your friend, and it turns out he\'s busy at work.\nYou go back home to sulk on your rooftop.\nPress G to continue', {fontsize: '72px', fill: '#FFF'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
		var last1 = game.add.sprite(0, 0, 'finalVig');
		
		menuText1 = game.add.text(game.width / 2 - 20, 790, "Fin: Knew that you were trying your best. You were doing all sorts of things, chasing opportunities, working hard, trying to clean up everything but actually running away. \nAnd when everything came back... you just took off again... \n*sniff* you aren't alone, ya know... please don't take off like that again... Owl we ain't the best people but there really are people who do care about ya \nenough to know your faults, say something about em, and carry em with you. So please... Owl let's talk. \nOwl: yeah... yeah *sniff* let's go home...", {fontsize: '72px', fill: '#FFF'});
		menuText2 = game.add.text(game.width - 400, 835, "SPACEBAR to continue", {fontsize: '72px', fill: '#FFF'}); 
		menuText1.anchor.setTo(0.5, 0.5);
	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			if(this.continues == 0)
			{
				// Camera Fade in
				game.camera.flash(0x000000, 1000, true);

				// Changing the background
				this.keyArray = ["blueSky", "farBuildings", "midBuildings", "closeBuildings"];
				setUpBackground(this.layerArray, this.keyArray, 1, 4);
				menuText1 = game.add.text(game.width / 2, 450, 'The sun is rising. Your friend pulls up at your place to check in on you.\nYou talk it out, then all the photos that have been bugging you disappear.\nPress G to enter the next state.', {fontsize: '72px', fill: '#000'});
					menuText1.anchor.setTo(0.5, 0.5);
					menuText1.align = "center";
				this.continues++;
			}
			else
			{
				game.camera.fade(0x000000, 1000, true);
				game.camera.onFadeComplete.add(this.finishFade, this);
			}
			
		};
	},

	finishFade: function()
	{
		game.state.start('GameOver', true, true);
	}
}