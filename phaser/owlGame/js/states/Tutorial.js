/////
//Creating level one's state.
//var levelComplete = false;
var Tutorial = function(game) {};
Tutorial.prototype = {
	init: function(bgm) {
		this.sky;
		this.farBuildings;
		this.farParallax = 1;
		this.midBuildings;
		this.midParallax = 3;
		this.closeBuildings;
		this.closeParallax = 5;
		this.bgm = bgm;
	},
	preload: function() {
		game.load.image("blueSky", "assets/img/pblueSky0000.png");
		game.load.image("farBuildings", "assets/img/buildings0000.png");
		game.load.image("midBuildings", "assets/img/buildings0001.png");
		game.load.image("closeBuildings", "assets/img/buildings0002.png");
		game.load.image("interactableBuilding", "assets/img/buildings0003.png");
		game.load.image("tutorialBG", "assets/img/tutorialLevel3.png");
		game.load.image("tutorialWall", "assets/img/tutorialWall.png");
		game.load.image("tutorialCeiling", "assets/img/tutorialCeiling.png");
		game.load.image("tutorialBedFloor", "assets/img/tutorialBedFloor.png");
		game.load.image("tutorialGround", "assets/img/tutorialGround.png");
		game.load.audio("levelCleared", "assets/audio/coin.mp3");
		game.load.audio("jumpSound", "assets/audio/wingFlap.mp3");
	},
	create: function() {
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 2400, 900);

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
		setUpBackground(this.layerArray, this.keyArray, 1, 1);
		
		//Creating the house
		//game.add.sprite(400, 140, 'tutorialBG');
		game.add.sprite(850, 200, 'tutorialBG');

		// Creates text in the middle of the screen
		// menuText1 = game.add.text(game.width / 2, 450, 'This is the first level.\nPress Q to enter the next state.', {fontsize: '72px', fill: '#000'});
		// menuText1.anchor.setTo(0.5, 0.5);
		// menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});

		// Creating platforms template
		platforms = game.add.group();
		platforms.enableBody = true;
		deathPlatforms = game.add.group();
		deathPlatforms.enableBody = true;
		housePieces = game.add.group();
		housePieces.enableBody = true;
		
		// Creates the walls of the house
		for (var i = 850; i <= 1435; i = i + 585){
			var walls = housePieces.create(i, 200, "tutorialWall");
			walls.body.immovable = true;
		}	
		// Creates the ceiling of the house
		var ceiling = housePieces.create(850, 200, "tutorialCeiling");
		ceiling.body.immovable = true;
		// Creates the floor of bed area in house
		var bedFloor = housePieces.create(865, 488, "tutorialBedFloor");
		bedFloor.body.immovable = true;
		// Creates the ground of the house
		var houseGround = housePieces.create(868, 770, "tutorialGround");
		houseGround.body.immovable = true;
		
		// Creating ground collidable object
		// Remember the length of each platform is 1600px!
		// Placing the first one will start at x position 0 in the game,
		// and the next one will be placed as x position 1600.
		for (var i = 0; i <= 1600; i = i + 1600){
			// var ground = platforms.create(i, game.world.height-100, "ground");
			var ground = platforms.create(i, 800, "ground");
			ground.body.immovable = true;
		}
		/* for (var i = 3200; i <= (game.world.width - 3200); i = i + 1600){
			var ground = deathPlatforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		for (var i = (game.world.width - 1600); i <= (game.world.width - 1600); i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		} */
		
		// Creates roadblock collidable object
		roadBlock = game.add.group();
		roadBlock.enableBody = true;
		var block = roadBlock.create(3200, 3200, "roadblock"); // game.world.height-200
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
		var standardX = [1200 + (2400 * 1), 700 + (2400 * 2), 800 + (2400 * 3), 1825 + (2400 * 3), 2350 + (2400 * 3), 1515  + (2400 * 4), 565 + (2400 * 5), 1620 + (2400 * 8), 205 + (2400 * 9), 1000 + (2400 * 9), 1000 + (2400 * 9), 1000 + (2400 * 9), 2000 + (2400 * 9), 2000 + (2400 * 9), 2000 + (2400 * 9)];//, 2000 + (2400 * 9)];
		var standardY = [400, 520, 700, 400, 550, 250, 250, 450, 350, 250, 500+175, 750+300, 400+125, 650+250, 900+375];  //, 1150]; // [500, 300, 150, 500, 250, 650]; // 550
		// Creates intentional concrete buildings for standard platforms
		var concreteSY = [375, 505, 675, 375, 525, 225, 225]; // [525, 325, 175, 525, 275, 675];
		for (var i = 0; i < standardY.length - 6; i++) {
			// var x = [1200 + (2400 * 1), 800 + (2400 * 2), 800 + (2400 * 3), 1825 + (2400 * 3), 2350 + (2400 * 3), 1515  + (2400 * 4), 565 + (2400 * 5)];
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i] + 200, "interactableBuilding");
			// Sets size of placeholder image.
			ledge.scale.setTo(1.3);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			ledge.anchor.setTo(0.5, 0.5);
		}
		// Standard platforms for standard buildings
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates intentional longer platforms 
		// Longer platforms are 384px long
		var longerX = [1750 + (2400 * 1), (2400 * 2), 1600 + (2400 * 2), 1984 + (2400 * 2), 1500 + (2400 * 3), 65 + (2400 * 7), 130 + (2400 * 7), 195 + (2400 * 7), 260 + (2400 * 7), 325 + (2400 * 7), 390 + (2400 * 7), 774 + (2400 * 7), 839 + (2400 * 7), 1580 + (2400 * 7), (2400 * 8), 589 + (2400 * 8), 1000 + (2400 * 9)];
		var longerY = [552, 350, 300, 350, 300, 300, 350, 400, 450, 500, 550, 550, 500, 300, 400, 500, 1000+450];// [348, 550, 600, 550, 600]; // 450
		// Creates intentional concrete buildings for longer platforms
		var concreteLY = [552 - 30, 350 - 30, 300 - 30, 350 - 30, 300 - 30];// 
		for (var i = 0; i < longerY.length - 1; i++) {
			
			if(i > longerY.length - 5 || i < longerY.length - 12)
			{
				var ledge = platforms.create(longerX[i], game.world.height - longerY[i] + 200, "interactableBuilding");
				// Sets size of placeholder image.
				ledge.scale.setTo(1.8);
				ledge.body.immovable = true;
				// Setting anchor of image to center
				ledge.anchor.setTo(0.5, 0.5);
			}
		}
		// Longer Platforms for longer buildings
		for (var i = 0; i < longerX.length; i++) {	
			var ledge = platforms.create(longerX[i], game.world.height - longerY[i], "buildingPlatformTop2");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}

		// Creates intentional longerer platforms
		// Longerer platforms are 256 x 4 long
		var longererX = [65 + (2400 * 6)];
		var longererY = [550];
		for (var i = 0; i < longererY.length; i++) {
			var ledge = platforms.create(longererX[i], game.world.height - longererY[i] + 2500, "interactableBuilding");
			// Sets size of placeholder image.
			ledge.scale.setTo(6.5);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			ledge.anchor.setTo(0.5, 0.5);
		}
		for(var i = 0; i < longererX.length; i++)
		{
			var ledge = platforms.create(longererX[i], game.world.height - longererY[i], "buildingPlatformTop2");
			ledge.scale.setTo(4, 1);
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
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
		// this.endToken = new endToken(game, 650 + (2400 * 0), game.world.height - 200, "endToken", 0, 1, 0);
		this.endToken = new endToken(game, 950, game.world.height - 200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);

		// Creating the player
		// Fast overall movement for the player in level one
		this.player = new OwlFabs(game, 1100, 218, "jumpSound", "normOwl", "64owl0000", 2, 1000*(3/4), 300*(3/4), 600*(3/4), 3000*(3/4), 2000*(3/4), 1000*(3/4));
		// this.player = new OwlFabs(game, game.world.width-200, game.world.height - 200, "jumpSound", "owl", "64owl0000", 2, 1000, 300, 600, 3000, 2000, 1000);
		game.add.existing(this.player);

		// Creating Jumps UI
		this.jumpsUI1 = new TopJumpsUI(game, 30, 30, "jumpIndicator", "jumpIndic0000", 2, this.player);
		game.add.existing(this.jumpsUI1);
		this.jumpsUI2 = new BottomJumpsUI(game, 30, 124, "jumpIndicator", "jumpIndic0000", 2, this.player);
		game.add.existing(this.jumpsUI2);
		
	},
	update: function() {
		// Allow the camera to follow the player
		//console.log(this.player.x);
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(game.width / 3, game.height / 2, 1, 1);

		// Player input checking
		var cursors = game.input.keyboard.createCursorKeys();
		
		// Checks collision with sprites and platforms
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
		var houseCollid = game.physics.arcade.collide(this.player, housePieces);
		var hitDeathPlatform = game.physics.arcade.collide(this.player, deathPlatforms);
		var roadBlockCollide = game.physics.arcade.collide(roadBlock, [this.player, platforms, deathPlatforms]);
		var coinPlatform = game.physics.arcade.collide(this.endToken, [platforms, housePieces]);

		// Parallax Speed
		var parallaxSpeed = this.player.body.velocity.x / 750;
		// console.log(parallaxSpeed);
		// Parallax Scrolling
		// Check if player is not inside camera deadzone + Camera is not hitting world bounds
		if((this.player.x - 64 >= game.camera.deadzone.x + game.camera.deadzone.width || this.player.x + 64 <= game.camera.deadzone.x) && game.camera.x + game.camera.width < game.world.width && game.camera.x > 0)
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
		if(game.physics.arcade.collide(this.player, this.endToken)) {
			// Used the below line to remove the hitbox and initiate the transition immediately
			// OBSERVATION: Noticed the transition would not occur immediately when using
			//				overlap or collide in the if statement's check.
			//				Hitbox may be related to this slight difference.
			//				Will continue to look into and change if needed.
			this.endToken.destroy(); 
			this.levelCleared.play();

			game.state.start("CutsceneOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray, this.bgm);
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
	 
	/* render: function()
	{
		//Sample: game.debug.body(sprite);
		game.debug.body(this.player);
		game.debug.body(this.endToken);
		//game.debug.body(housePieces);
	
	} */
	
};
