//Creating level one's state.
//var levelComplete = false;
var LevelOne = function(game) {};
LevelOne.prototype = {
	init: function() {
		this.sky;
		this.farBuildings;
		this.farParallax = 1;
		this.midBuildings;
		this.midParallax = 3;
		this.closeBuildings;
		this.closeParallax = 5;
		//this.wellbeing = 1; // Not in use.
	},
	preload: function() {
		game.load.image("blueSky", "assets/img/blueSky0000.png");
		game.load.image("farBuildings", "assets/img/buildings0000.png");
		game.load.image("midBuildings", "assets/img/buildings0001.png");
		game.load.image("closeBuildings", "assets/img/buildings0002.png");
		game.load.audio("levelCleared", "assets/audio/coin.mp3");
		game.load.audio("jumpSound", "assets/audio/wingFlap.mp3");
	},
	create: function() {
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 12800, 1800);

		// Level Sounds
		this.levelCleared = game.add.audio("levelCleared");

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);
		//game.camera.width = 12800;
		//game.camera.height = 900;

		// Set up background
		this.layerArray = [this.sky, this.farBuildings, this.midBuildings, this.closeBuildings];
		this.layerSpeeds = [this.farParallax, this.midParallax, this.closeParallax];
		this.keyArray = ["blueSky", "farBuildings", "midBuildings", "closeBuildings"];
		
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray);

		menuText1 = game.add.text(game.width / 2, 450, 'This is the first level.\nPress Q to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
		
		// Creating platforms template
		platforms = game.add.group();
		platforms.enableBody = true;
		deathPlatforms = game.add.group();
		deathPlatforms.enableBody = true;
		
		// Creating ground collidable object
		// Remember the length of each platform is 1600px!
		// Placing the first one will start at x position 0 in the game,
		// and the next one will be placed as x position 1600.
		for (var i = 0; i <= 1600; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		for (var i = 3200; i <= 9600; i = i + 1600){
			var ground = deathPlatforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		for (var i = 11200; i <= 11200; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		
		// Creates roadblock collidable object
		roadBlock = game.add.group();
		roadBlock.enableBody = true;
		var block = roadBlock.create(3200, game.world.height-200, "roadblock");
		block.body.immovable = true;
		// 2nd potential roadblock may be here. Test by game feel. 
		var block = roadBlock.create(11200, game.world.height-200, "roadblock");
		block.body.immovable = true;
		/* 
		// TESTING CODE: Uncomment this code for testing the placement of the    
		// roadblock. If change is needed, adjust death ground platform position    // accordingly
		// 1st potential roadblock may be here. Test by game feel.
		var block = roadBlock.create(9600, game.world.height-200, "roadblock");
		block.body.immovable = true;
		// Test roadblock
		var block = roadBlock.create(10700, game.world.height-200, "roadblock");
		block.body.immovable = true;
		*/
		
		// Creates first platform
		// This platform is 128px long
		for (var i = 0; i < 1; i++) {	
			var x = [3000];
			var y = [game.world.height - 250];// 650]; // Was initially 600
			var ledge = platforms.create(x[i], y[i], "buildingPlatform");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates intentional standard platforms 
		// Standard platforms are 256px long
		for (var i = 0; i < 6; i++) {	
			var x = [3600, 5600, 8000, 9025, 9450, 11115];
			var y = [400, 600, 750, 400, 650, 250]; // [500, 300, 150, 500, 250, 650]; // 550
			var ledge = platforms.create(x[i], game.world.height - y[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates intentional longer platforms 
		// Longer platforms are 384px long
		for (var i = 0; i < 5; i++) {	
			var x = [4150, 4800, 6400, 6784, 8700];
			var y = [552, 350, 300, 350, 300];// [348, 550, 600, 550, 600]; // 450
			var ledge = platforms.create(x[i], game.world.height - y[i], "buildingPlatformTop2");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates intentional concrete buildings for standard platforms
		for (var i = 0; i < 6; i++) {
			var x = [3600, 5600, 8000, 9025, 9450, 11115];
			var y = [375, 575, 725, 375, 625, 225]; // [525, 325, 175, 525, 275, 675];
			var ledge = platforms.create(x[i]-(256/2), game.world.height - y[i], "building");
			// Sets size of placeholder image.
			ledge.scale.setTo(8);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			//ledge.anchor.setTo(0.5, 0.5);
		}
		// Creates intentional concrete buildings for longer platforms
		for (var i = 0; i < 5; i++) {
			var x = [4150, 4800, 6400, 6784, 8700];
			var y = [552 - 30, 350 - 30, 300 - 30, 350 - 30, 300 - 30];// [348+30, 550+30, 600+30, 550+30, 600+30];
			var ledge = platforms.create(x[i]-(384/2), game.world.height - y[i], "building");
			// Sets size of placeholder image.
			ledge.scale.setTo(12);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			//ledge.anchor.setTo(0.5, 0.5);
		}
		
		/* 
		// TESTING CODE: Uncomment this code for testing the placement of platforms
		// Creates sample platforms
		// Helps visualize height of game world
		for (var i = 0; i < 6; i++) {	
			var x = [2600, 2600, 2600, 2600, 2600, 2600];
			var y = [600, 500, 400, 300, 200, 100];
			var ledge = platforms.create(x[i], y[i], "buildingPlatform");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		// Creates test ledge
		var ledge = platforms.create(200, 600, "buildingPlatformTop");
		ledge.body.immovable = true;
		var ledge = platforms.create(500, 600, "buildingPlatformTop2");
		ledge.body.immovable = true;
		*/
		
		// Creating the end token
		this.endToken = new endToken(game, game.world.width-200, game.world.height-200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);

		// Creating the player
		this.player = new OwlFabs(game, "jumpSound", "owl", 0, 0.7, Math.PI / (Math.random() * 3 + 3));
		game.add.existing(this.player);
		
	},
	update: function() {
		// Allow the camera to follow the player
		//console.log(this.player.x);
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(game.width / 3, game.height / 2, 1, 1);

		// Player input checking
		var cursors = game.input.keyboard.createCursorKeys();
		
		// Checks collision with sprites and platforms
		var hitPlatform = game.physics.arcade.collide(this.player, platforms);
		var hitDeathPlatform = game.physics.arcade.collide(this.player, deathPlatforms);
		var roadBlockCollide = game.physics.arcade.collide(roadBlock, [this.player, platforms, deathPlatforms]);
		var coinPlatform = game.physics.arcade.collide(this.endToken, platforms);

		// Parallax Speed
		var parallaxSpeed = this.player.body.velocity.x / 750;
		// Parallax Scrolling
		// Check if player is not inside camera deadzone + Camera is not hitting world bounds
		if((this.player.x - 64 >= game.camera.deadzone.x + game.camera.deadzone.width || this.player.x + 64 <= game.camera.deadzone.x) && game.camera.x + game.camera.width < game.world.width)
		{
			// Check if player is grounded
			if(this.player.body.onFloor())
			{
				setParallaxValues(this.layerSpeeds, parallaxSpeed);
			}
			// Otherwise player is airborne
			else
			{
				setParallaxValues(this.layerSpeeds, parallaxSpeed);
			}

			// Player input
			// LEFT && RIGHT
			if(cursors.left.isDown && cursors.right.isDown)
			{
				// Set the parallax speed to 0
				setParallaxValues(this.layerSpeeds, 0);
			}
			// // LEFT
			// else if(cursors.left.isDown)
			// {
			// 	parallaxScroll(this.layerArray, this.layerSpeeds, "left");
			// }
			// // RIGHT
			// else if(cursors.right.isDown)
			// {
			// 	parallaxScroll(this.layerArray, this.layerSpeeds, "right");
			// }
			// NO INPUT
			else
			{
				parallaxScroll(this.layerArray, this.layerSpeeds, parallaxSpeed);
			}
		}
		
		if(hitDeathPlatform) {
			
			console.log("Touching death platforms");
			this.restart();
			
		}
		
		// Triggers the start of the next state.
		if(game.physics.arcade.collide(this.player, this.endToken) || game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			// Used the below line to remove the hitbox and initiate the transition immediately
			// OBSERVATION: Noticed the transition would not occur immediately when using
			//				overlap or collide in the if statement's check.
			//				Hitbox may be related to this slight difference.
			//				Will continue to look into and change if needed.
			this.endToken.destroy(); 
			this.levelCleared.play();

			game.state.start("CutsceneOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
			// // Camera Fade
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
		
		// First version of code that ends level and transitions to next state.
		/*
		// Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			this.levelCleared.play();
			// Camera Fade
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
		};
		*/
	},
	
	// finishFade: function()
	// {
	// 	game.state.start("CutsceneOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// },
	
	restart: function()
	{
		console.log("Restart Level 1");
		game.state.start("LevelOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	},
	// TESTING CODE: Uncomment this function to check hitboxes of particular sprites
	// that utilze arcade physics
	/* 
	render: function()
	{
		//Sample: game.debug.body(sprite);
		game.debug.body(this.player);
		game.debug.body(this.endToken);
	}
	*/
};
