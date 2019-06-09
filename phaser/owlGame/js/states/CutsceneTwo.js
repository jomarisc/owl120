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
		game.load.image("cutscene2a", "assets/img/cutscene2a.png");
		game.load.image("cutscene2b", "assets/img/cutscene2b.png");
		game.load.image("cutscene2c", "assets/img/cutscene2c.png");
		game.load.image("cutscene3", "assets/img/cutscene3.png");
	},

	create: function()
	{
		// Something
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 3200, 900);

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		setUpBackground(this.layerArray, this.keyArray, 1, 2);

		//Another check
		menuText1 = game.add.text(game.width / 2, 450, 'This is the second cutscene.\nYou get a call from your friend asking about the interview.\nYou lie about it and say it went fairly well.\nPress S to enter the next level.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
		var fourth = game.add.sprite(0,0,'cutscene3');
		var third = game.add.sprite(0,0,'cutscene2c');
		var second = game.add.sprite(0,0,'cutscene2b');
		var first = game.add.sprite(0,0,'cutscene2a');

	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
			// game.state.start('LevelThree', true);
			game.state.start('LevelThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
			
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
				
		if(game.input.keyboard.isDown(Phaser.Keyboard.P)) {
			///////////////////////////////////////////////////sprite.first.alpha = 0; help with this please
			//Pressing P instantly sets the alpha of the image on top to 0. 
			//I forgot the documentation for this one line of code ;-;
			
		};
	},

	// finishFade: function()
	// {
	// 	game.state.start('LevelThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
}