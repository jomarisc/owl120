//Creating level three's state.
var LevelThree = function(game) {};
LevelThree.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},
	preload: function() {
		game.load.image("farBuildings", "assets/img/redbuildings0000.png");
		game.load.image("midBuildings", "assets/img/redbuildings0001.png");
		game.load.image("closeBuildings", "assets/img/redbuildings0002.png");
		game.load.image("streak", "assets/img/billboardimages20000.png");
	},
	create: function() {
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 24000, 1800); //24000

		// Level Sounds
		this.levelCleared = game.add.audio("levelCleared");

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		this.keyArray[0] = "redSky";
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray, 1, 1);
		game.stage.backgroundColor = "#C00A43";

		menuText1 = game.add.text(game.width / 2, 450, 'This is the third level.\nPress E to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
		
		// Creating platforms template
		platforms = game.add.group();
		platforms.enableBody = true;
		deathPlatforms = game.add.group();
		deathPlatforms.enableBody = true;
		
		// Creating ground.
		for (var i = 0; i <= 24000; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}

		// Creating Death Platforms
		for (var i = 3200; i <= (game.world.width - 3200); i = i + 1600){
			var ground = deathPlatforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}

		// Creates roadblock collidable object
		roadBlock = game.add.group();
		roadBlock.enableBody = true;
		var block = roadBlock.create(3200, game.world.height-200, "roadblock");
		block.body.immovable = true;

		// Creates intentional standard platforms 
		// Standard platforms are 256px long
		var standardX = [1750 + (2400 * 0), 50 + (2400 * 1), 1450 + (2400 * 1), 834 + (2400 * 3), 1090 + (2400 * 3), 1346 + (2400 * 3), 1602 + (2400 * 3), 0 + (2400 * 4), 500 + (2400 * 4), 1500 + (2400 * 4), 2200 + (2400 * 4), 500 + (2400 * 5), 1750 + (2400 * 5), 2500 + (2400 * 5), 850 + (2400 * 6), 1700 + (2400 * 6), 2550 + (2400 * 6), 1000 + (2400 * 7), 2000 + (2400 * 7), 2300 + (2400 * 8), 3000 + (2400 * 8)]; //, 2000 + (2400 * 9)];
		var standardY = [350, 520, 700, 675-150, 750-150, 825-150, 900-150, 675-300, 800-350, 800-350, 925-400, 1050-450, 650, 700, 800, 800, 800, 800, 900, 350, 250];  //, 1150]; // [500, 300, 150, 500, 250, 650]; // 550
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
				
		
		// Creates intentional longer platforms 325 + (2400 * 7)
		// Longer platforms are 384px long
		var longerX = [2100 + (2400 * 0), 1100 + (2400 * 1), 1500 + (2400 * 1), 1900 + (2400 * 1), 2300 + (2400 * 1), 900 + (2400 * 2), 1900 + (2400 * 2), 2900 + (2400 * 2), 1000 + (2400 * 5), 3000 + (2400 * 7), 1500 + (2400 * 8)];
		var longerY = [250, 350, 450, 550, 800, 800-150, 700-150, 600-150, 1050-450, 650, 450];// [348, 550, 600, 550, 600]; // 450
		for (var i = 0; i < longerX.length; i++) {	
			var ledge = platforms.create(longerX[i], game.world.height - longerY[i], "buildingPlatformTop2");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}

		// Creating Player
		// More slower overall movement for the player in level three
		this.player = new OwlFabs(game, game.world.width * (1 / 100), game.world.height - 200, "jumpSound", "owl", "64owl0000", 2, 1000*(2/4), 300*(2/4), 600*(2/4), 3000*(2/4), 2000*(2/4), 1000*(2/4));
		// this.player = new OwlFabs(game, longerX[16], game.world.height - 1000, "jumpSound", "owl", "64owl0000", 2, 1000*(2/4), 300*(2/4), 600*(2/4), 3000*(2/4), 2000*(2/4), 1000*(2/4)); // 7
		game.add.existing(this.player);
		// 1580 + (2400 * 7)

		// Creates intentional concrete buildings for standard platforms
		var concreteSY = [375, 505, 675, 375, 525, 225, 225]; // [525, 325, 175, 525, 275, 675]; // In place of 0: 675
		for (var i = 0; i < concreteSY.length; i++) {
			// var x = [1200 + (2400 * 1), 800 + (2400 * 2), 800 + (2400 * 3), 1825 + (2400 * 3), 2350 + (2400 * 3), 1515  + (2400 * 4), 565 + (2400 * 5)];
			var ledge = platforms.create(standardX[i]-(256/2), game.world.height - standardY[i] + 25, "building"); //game.world.height - concreteSY[i]
			// Sets size of placeholder image.
			ledge.scale.setTo(8);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			//ledge.anchor.setTo(0.5, 0.5);
		}
		// Creates intentional concrete buildings for longer platforms
		var concreteLY = [552 - 30, 350 - 30, 300 - 30, 350 - 30, 300 - 30];// [348+30, 550+30, 600+30, 550+30, 600+30];
		for (var i = 0; i < concreteLY.length; i++) { // Adjust length of for loop
			// var x = [1750 + (2400 * 1), (2400 * 2), 1600 + (2400 * 2), 1984 + (2400 * 2), 1500 + (2400 * 3)];
			var ledge = platforms.create(longerX[i]-(384/2), game.world.height - longerY[i] + 35, "building");//game.world.height - concreteLY[i]
			// Sets size of placeholder image.
			ledge.scale.setTo(12);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			//ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates first platform
		// This platform is 128px long
		for (var i = 0; i < 1; i++) {	
			var x = [1500];
			var y = [game.world.height - 235];// 650]; // Was initially 600 // [game.world.height - 250]
			var ledge = platforms.create(x[i], y[i], "buildingPlatform"); //y[i]
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		/*
		// Creates intentional standard platforms 
		// Standard platforms are 256px long
		var standardX = [1200 + (2400 * 1), 700 + (2400 * 2), 800 + (2400 * 3), 1825 + (2400 * 3), 2350 + (2400 * 3), 1515  + (2400 * 4), 565 + (2400 * 5), 1620 + (2400 * 6), 205 + (2400 * 7), 1000 + (2400 * 7), 1000 + (2400 * 7), 1000 + (2400 * 7), 2000 + (2400 * 7), 2000 + (2400 * 7), 2000 + (2400 * 7)];//, 2000 + (2400 * 9)];
		var standardY = [400, 520, 700, 400, 550, 250, 250, 450, 350, 250, 500+175, 750+300, 400+125, 650+250, 900+375];  //, 1150]; // [500, 300, 150, 500, 250, 650]; // 550
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates intentional longer platforms 
		// Longer platforms are 384px long
		var longerX = [1750 + (2400 * 1), (2400 * 2), 1600 + (2400 * 2), 1984 + (2400 * 2), 1500 + (2400 * 3), 390 + (2400 * 5), 774 + (2400 * 5), (2400 * 6), 589 + (2400 * 6), 1000 + (2400 * 7)];
		// 839 + (2400 * 7)
		// 1580 + (2400 * 7)
		var longerY = [552, 350, 300, 350, 300, 550, 550, 400, 500, 1000+450];// [348, 550, 600, 550, 600]; // 450
		for (var i = 0; i < longerX.length; i++) {	
			var ledge = platforms.create(longerX[i], game.world.height - longerY[i], "buildingPlatformTop2");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}

		
		// Creates intentional concrete buildings for standard platforms
		var concreteSY = [375, 505, 675, 375, 525, 225, 225]; // [525, 325, 175, 525, 275, 675];
		for (var i = 0; i < concreteSY.length; i++) {
			// var x = [1200 + (2400 * 1), 800 + (2400 * 2), 800 + (2400 * 3), 1825 + (2400 * 3), 2350 + (2400 * 3), 1515  + (2400 * 4), 565 + (2400 * 5)];
			var ledge = platforms.create(standardX[i]-(256/2), game.world.height - concreteSY[i], "building");
			// Sets size of placeholder image.
			ledge.scale.setTo(8);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			// ledge.anchor.setTo(0.5, 0.5);
		}
		// Creates intentional concrete buildings for longer platforms
		var concreteLY = [552 - 30, 350 - 30, 300 - 30, 350 - 30, 300 - 30];// [348+30, 550+30, 600+30, 550+30, 600+30];
		for (var i = 0; i < concreteLY.length; i++) {
			// var x = [1750 + (2400 * 1), (2400 * 2), 1600 + (2400 * 2), 1984 + (2400 * 2), 1500 + (2400 * 3)];
			var ledge = platforms.create(longerX[i]-(384/2), game.world.height - concreteLY[i], "building");
			// Sets size of placeholder image.
			ledge.scale.setTo(12);
			ledge.body.immovable = true;
			// Setting anchor of image to center
			// ledge.anchor.setTo(0.5, 0.5);
		} */
		
		// Creating the end token
		this.endToken = new endToken(game, game.world.width-200, game.world.height-200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);
		
		// *** Creating the player ORIGINAL
		
		
		// Creates an additional image to hover near the player
		this.billboard2 = new Billboard2(game, -1000, -1000, -150, -250, "drunk", 0, 2, 0, this.player, this.endToken);

		// Creates one image to follow the player
		//this.billboard = game.add.group();
		this.billboard = new Billboard(game, -1000, 0, "streak", 0, 2, 0, this.player, this.endToken);
		game.add.existing(this.billboard);
		
		//this.player.x - 150, this.player.y - 250
		game.add.existing(this.billboard2);
	},
	update: function() {
		// Allow the camera to follow the player
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(game.width / 3, game.height / 2, 1, 1);

		// Player input checking
		var cursors = game.input.keyboard.createCursorKeys();

		// var hitPlatform = game.physics.arcade.collide(this.player, platforms);
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
		var hitDeathPlatform = game.physics.arcade.collide(this.player, deathPlatforms);
		var roadBlockCollide = game.physics.arcade.collide(roadBlock, [this.player, platforms, deathPlatforms]);
		var coinPlatform = game.physics.arcade.collide(this.endToken, platforms);
		
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
		
		//Triggers the start of the next state.
		// if(game.input.keyboard.isDown(Phaser.Keyboard.E)) {
		// 	// game.state.start('LevelFour');
		// 	this.levelCleared.play();
		// 	game.camera.fade(0x000000, 1000, true);
		// 	game.camera.onFadeComplete.add(this.finishFade, this);
		// };
		
		// Triggers the start of the next state.
		if(game.physics.arcade.collide(this.player, this.endToken) || game.input.keyboard.isDown(Phaser.Keyboard.E)) {
			// Used the below line to remove the hitbox and initiate the transition immediately
			// OBSERVATION: Noticed the transition would not occur immediately when using
			//				overlap or collide in the if statement's check.
			//				Hitbox may be related to this slight difference.
			//				Will continue to look into and change if needed.
			this.endToken.destroy(); 
			this.levelCleared.play();
			game.state.start('CutsceneThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);

			// Camera Fade
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
		
	},
	// finishFade: function()
	// {
	// 	game.state.start('CutsceneThree', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
	restart: function()
	{
		console.log("Restart Level 3");
		game.state.start("LevelThree", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	},
};