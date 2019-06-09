// Creating Level One's Cutscene
var CutsceneOne = function(game) {};
CutsceneOne.prototype = {
	init: function(layerArray, layerSpeeds, keyArray, bgm) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
		this.bgm = bgm;
		this.continues = 0;
	},

	preload: function()
	{
		// Cutscene assets
		//First image
		game.load.image("cutscene1", "assets/img/cutscene1.png");
	},

	create: function()
	{
		console.log(this.bgm.name)

		// Something
		game.world.setBounds(0, 0, 1600, 900);

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		setUpBackground(this.layerArray, this.keyArray, 1, 1);

		
		// Creates the first cutscene image
		game.add.sprite(0, 0, 'cutscene1');
		
		// Creates the text of the first cutscene
		menuText1 = game.add.text(game.width / 2 - 10, 835, "Owl: Oh hey its Fin. Hmm gonna quickly respond and get going. Gotta hurry though for my interview or else I'll be late!", {fontsize: '72px', fill: '#FFF'});
		menuText2 = game.add.text(game.width - 400, 835, "[SPACE] to continue", {fontsize: '72px', fill: '#FFF'}); 
		menuText1.anchor.setTo(0.5, 0.5);
		//menuText1.align = "center";
		// menuText1 = game.add.text(game.width / 2, 450, 'This is the first cutscene.\nYou have your job interview, but the interviewer\npulls up an image of you passed out on the floor\nholding a bottle of liquor.\nInterviewer says, "Explain this please."\nYou try to talk your way out of this embarrassing photo.\nPress SPACEBAR to continue.', {fontsize: '72px', fill: '#000'});
		// menuText1.anchor.setTo(0.5, 0.5);
		// menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
	},

	update: function()
	{
		// Allow the camera to follow the player
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(128 / 2, 450, 50, 350);

		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			/* if(this.continues == 0)
			{
				// Camera Fade in
				game.camera.flash(0x000000, 1000, true);
				
				menuText1.text = "You walk out of the interview.\nYou pull up your notepad with a list of crossed-out job interviews.\nYou cross out another one.\nPress A to move on to the next level."
				this.continues++;
			}
			else
			{ */
				game.state.start('LevelOne', true, false, this.bgm);
			//}

			
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
	},

	// finishFade: function()
	// {
	// 	game.state.start('LevelTwo', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
}