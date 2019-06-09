// Creating Level Two's Cutscene
var CutsceneTwoB = function(game) {};
CutsceneTwoB.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},

	preload: function()
	{
		// Cutscene assets
		game.load.image("cutscene2b", "assets/img/cutscene2b.png");
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

		var second = game.add.sprite(0,0,'cutscene2b');
		
		menuText1 = game.add.text(game.width / 2, 825, "Owl: Ohh uhh...that's... that's not me! I promise you sir that's another owl. I wouldn't do that! \nInterviewer: Well, this was actually found under an online social media account under a name that really looks like yours. \nOwl: Oh! haha... I was with some friends... haha. It's not something so big. We were just hanging out and having some fun. \nI was reckless, but I promise this is nothing to worry about. Sir, I promise you that I'll work my best for this company!", {fontsize: '72px', fill: '#FFF'});
		menuText2 = game.add.text(game.width - 400, 835, "[SPACE] to continue", {fontsize: '72px', fill: '#FFF'}); 
		menuText1.anchor.setTo(0.5, 0.5);
		
		//Oh is that so Mr. Owl? Tell me, why didn't you say so in the first place? If you're gonna lie, please leave. We can't have someone being dishonest about himself, so GET OUT."


	},

	update: function()
	{
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// game.state.start('LevelThree', true);
			game.state.start('CutsceneTwoC', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
			
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
	}

	// finishFade: function()
	// {
	// 	game.state.start('LevelThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
}