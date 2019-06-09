//Creating the final level's state.
var LevelFinal = function(game) {};
LevelFinal.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
		this.pastBillboard3VelX;
		this.pastBillboard2VelX;
		this.pastBillboardVelX;
		this.destinationToggle3 = 0;
		this.destinationToggle2 = 1;
		this.destinationToggle = 0;
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
			ledge.scale.setTo(2);
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}

		// Creating the end token
		this.endToken = new endToken(game, game.world.width * 3 / 4, 200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);

		// Creating the player
		// Slowest overall movement for the player in level three
		this.player = new OwlFabs(game, 400 + (2400 * 0), game.world.height - 200, "jumpSound", "owl", "64sadOwl0000", 2, 1000*(1/4), 300*(1/4), 600*(3/4), 3000*(1/4), 2000*(1/4), 1000*(3/4));
		game.add.existing(this.player);

		// // // Creates two images to hover near the player
		// this.billboard2 = new Billboard2(game, -1000, -1000, -175, -200, "streak", 0, 2, 0, this.player, this.endToken);
		// // this.player.x -175, this.player.y - 200
		// game.add.existing(this.billboard2);
		// this.billboard3 = new Billboard3(game, 1000, 1000, 175, -200, "drunk", 0, 2, 0, this.player, this.endToken);
		// // this.player.x + 175, this.player.y - 200
		// game.add.existing(this.billboard3);
		// // Creates one image to follow the player
		// this.billboard = new Billboard(game, -1000, 0, "coke", 0, 2, 0, this.player, this.endToken);
		// game.add.existing(this.billboard);

		// Set up game camera
		game.camera.y = game.world.height - 900;
		game.camera.lerp.setTo(0.1);

		// Creating billboards
		this.billboard3Y = game.camera.y + 370;
		this.billboard3 = game.add.sprite(game.world.width - 410, game.camera.y + 370, "drunk", 0);
		this.billboard3.scale.setTo(2);

		this.billboard2Y = game.camera.y;
		this.billboard2 = game.add.sprite(154, game.camera.y, "streak", 0);
		this.billboard2.scale.setTo(2);

		this.billboardY = game.camera.y - 370;
		this.billboard = game.add.sprite(game.world.width - 410, game.camera.y - 370, "coke", 0);
		this.billboard.scale.setTo(2);

		game.physics.arcade.enable([this.billboard3, this.billboard2, this.billboard]);

		// Array for storing x coordinates of where billboards should move to
		this.billboardDestinationX = [50, game.world.width - 306];

		// Creating Jumps UI
		this.jumpsUI1 = new TopJumpsUI(game, 30, 30, "jumpIndicator", "jumpIndic0000", 2, this.player);
		game.add.existing(this.jumpsUI1);
		this.jumpsUI2 = new BottomJumpsUI(game, 30, 124, "jumpIndicator", "jumpIndic0000", 2, this.player);
		game.add.existing(this.jumpsUI2);

		// Keyboard cursors
		this.cursors = game.input.keyboard.createCursorKeys();
	},
	update: function()
	{
		// Allow the camera to follow the player
		if(this.player.y < game.camera.y + 600)
		{
			game.camera.follow(this.player);
		}
		else
		{
			game.camera.unfollow();
		}
		game.camera.deadzone = new Phaser.Rectangle(game.width / 2, game.height * 2 / 3, 10, 10);
		// game.camera.deadzone.anchor.setTo(0.5);

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
		var playerBillboard = game.physics.arcade.collide(this.player, [this.billboard3, this.billboard2, this.billboard]);

		// Switch directions of billboard movement
		if(this.billboard3.body.x < 150 || this.billboard3.body.x > game.world.width - 406)
		{
			this.destinationToggle3++;
		}
		if(this.billboard2.body.x < 150 || this.billboard2.body.x > game.world.width - 406)
		{
			this.destinationToggle2++;
		}
		if(this.billboard.body.x < 150 || this.billboard.body.x > game.world.width - 406)
		{
			this.destinationToggle++;
		}

		// Move billboards
		game.physics.arcade.moveToXY(this.billboard3, this.billboardDestinationX[this.destinationToggle3 % 2], this.billboard3Y, 120, 1000);
		if(this.billboard3.body.y > game.camera.y + game.camera.height)
		{
			this.billboard3Y = this.billboardY - 370;
		}
		game.physics.arcade.moveToXY(this.billboard2, this.billboardDestinationX[this.destinationToggle2 % 2], this.billboard2Y, 120, 1000);
		if(this.billboard2.body.y > game.camera.y + game.camera.height)
		{
			this.billboard2Y = this.billboard3Y - 360;
		}
		game.physics.arcade.moveToXY(this.billboard, this.billboardDestinationX[this.destinationToggle % 2], this.billboardY, 120, 1000);

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

		// Ways to restart level
		// 1) Falling off of camera
		if(this.player.y - this.player.height / 2 >= game.camera.y + game.camera.height)
		{
			this.restart();
		}
	},
	finishFade: function()
	{
		game.state.start('CutsceneFinal', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	},
	restart: function()
	{
		console.log("Restart Level Final");
		game.state.start("LevelFinal", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	}
}