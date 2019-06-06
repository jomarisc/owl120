//Creating the final level's state.
var LevelFinal = function(game) {};
LevelFinal.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},
	preload: function()
	{
		game.load.image("interactableBuilding", "assets/img/nightbuild0003.png");
	},
	create: function()
	{
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 2400, 2400);

		// Level Sounds
		this.levelCleared = game.add.audio("levelCleared");

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		this.keyArray[0] = "twilightSky";
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray, 1, 4);

		game.stage.backgroundColor = "#2B0865";

		// Creating platforms template
		platforms = game.add.group();
		platforms.enableBody = true;

		// Creating foreground building
		var building = platforms.create(300, game.world.height - 2000, "interactableBuilding");
		building.body.immovable = true;
		
		// Creating ground.
		for (var i = 0; i <= 6400; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}

		// Creates intentional standard platforms 
		// Standard platforms are 256px long
		var standardX = [600, 1200, 1800, 600, 1200, 1800, 600, 1200, 1800, 600, 1200, 1800, 600, 1200, 1800, 1200];//, 2000 + (2400 * 9)];
		var standardY = [400, 300, 400, 700, 600, 700, 1000, 900, 1000, 1300, 1200, 1300, 1600, 1500, 1600, 1800];  //, 1150]; // [500, 300, 150, 500, 250, 650]; // 550
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}

		// Creating the end token
		this.endToken = new endToken(game, game.world.width-200, game.world.height-200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);

		// Creating the player
		// Slowest overall movement for the player in level three
		this.player = new OwlFabs(game, 400 + (2400 * 0), game.world.height - 200, "jumpSound", "owl", "64owl0000", 2, 1000*(1/4), 300*(1/4), 600*(3/4), 3000*(1/4), 2000*(1/4), 1000*(3/4));
		game.add.existing(this.player);
	},
	update: function()
	{
		// Allow the camera to follow the player
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(game.width / 2, game.height * 2 / 3, 1, 1);

		// var hitPlatform = game.physics.arcade.collide(this.player, platforms);
		for(var i = 0; i < platforms.length; i++)
		{
			if(platforms.getAt(i).body.y < 500)
			{
				game.physics.arcade.collide(this.player, platforms.getAt(i));
			}
			else if(this.player.y < platforms.getAt(i).body.y)
			{
				game.physics.arcade.collide(this.player, platforms.getAt(i));
			}
		}
		var coinPlatform = game.physics.arcade.collide(this.endToken, platforms);

		// Skip to cutscene
		// Triggers the start of the next state.
		if(game.physics.arcade.collide(this.player, this.endToken) || game.input.keyboard.isDown(Phaser.Keyboard.T)) {
			// Used the below line to remove the hitbox and initiate the transition immediately
			// OBSERVATION: Noticed the transition would not occur immediately when using
			//				overlap or collide in the if statement's check.
			//				Hitbox may be related to this slight difference.
			//				Will continue to look into and change if needed.
			this.endToken.destroy(); 
			this.levelCleared.play();
			// game.state.start('CutsceneFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);

			// Camera Fade
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
		};

	},
	finishFade: function()
	{
		game.state.start('CutsceneFinal', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	}
}