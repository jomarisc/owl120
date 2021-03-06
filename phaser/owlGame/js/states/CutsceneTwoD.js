// Creating Level Two's Cutscene
var CutsceneTwoD = function(game) {};
CutsceneTwoD.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},

	preload: function()
	{
		// Cutscene assets
		game.load.image("cutscene3", "assets/img/cutscene3.png");
	},

	create: function()
	{
		// Add music
		this.bgm = game.add.audio("bgm01");
		this.bgm.play("", 0, 0.1, true, true);

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

		var second = game.add.sprite(0,0,'cutscene3');

		menuText1 = game.add.text(game.width / 2 - 30, 800, "Owl: That's another... man how'd that picture even come up? Man, why now... what do I tell Fin? \nGonna go home...", {fontsize: '72px', fill: '#FFF'});
		menuText2 = game.add.text(game.width - 400, 835, "[SPACE] to continue", {fontsize: '72px', fill: '#FFF'}); 
		menuText1.anchor.setTo(0.5, 0.5);

	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// game.state.start('LevelThree', true);
			game.state.start('LevelTwo', true, false, this.layerArray, this.layerSpeeds, this.keyArray, this.bgm);
			
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
	}

	// finishFade: function()
	// {
	// 	game.state.start('LevelThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
}