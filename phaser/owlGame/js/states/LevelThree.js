//Creating level three's state.
var LevelThree = function(game) {};
LevelThree.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},
	preload: function() {
		game.load.image("redSky", "assets/img/predSky0000.png");
		game.load.image("farBuildings", "assets/img/redbuildings0000.png");
		game.load.image("midBuildings", "assets/img/redbuildings0001.png");
		game.load.image("closeBuildings", "assets/img/redbuildings0002.png");
		game.load.image("streak", "assets/img/billboardimages20000.png");
	},
	create: function() {
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 9400, 1800);

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
		
		// Creating ground.
		for (var i = 0; i <= 9400; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		
		// Creating the end token
		this.endToken = new endToken(game, game.world.width-200, game.world.height-200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);
		
		// Creating the player
		// More slower overall movement for the player in level three
		this.player = new OwlFabs(game, game.world.width * (1 / 100), game.world.height - 200, "jumpSound", "owl", "64owl0000", 2, 1000*(2/4), 300*(2/4), 600*(2/4), 3000*(2/4), 2000*(2/4), 1000*(2/4));
		game.add.existing(this.player);
		
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

		var hitPlatform = game.physics.arcade.collide(this.player, platforms);
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
};