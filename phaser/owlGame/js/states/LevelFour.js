//Creating level four's state.
var LevelFour = function(game) {};
LevelFour.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},
	preload: function() {
		game.load.image("twilightSky", "assets/img/twilightSky0001.png");
		game.load.image("farBuildings", "assets/img/nightbuild0000.png");
		game.load.image("midBuildings", "assets/img/nightbuild0001.png");
		game.load.image("closeBuildings", "assets/img/nightbuild0002.png");
	},
	create: function() {
		//One more check
		game.stage.backgroundColor = "#facade";

		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 6400, 1800);

		// Level Sounds
		this.levelCleared = game.add.audio("levelCleared");

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		this.keyArray[0] = "twilightSky";
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, this.keyArray, 1, 4);
		game.stage.backgroundColor = "#2B0865";

		menuText1 = game.add.text(game.width / 2, 450, 'This is the fourth level.\nPress R to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
		
		// Creating platforms template
		platforms = game.add.group();
		platforms.enableBody = true;
		
		// Creating ground.
		for (var i = 0; i <= 6400; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		
		// Creating the end token
		this.endToken = new endToken(game, game.world.width-200, game.world.height-200, "endToken", 0, 1, 0);
		game.add.existing(this.endToken);
		
		// Creating the player
		this.player = new OwlFabs(game, game.world.width * (1 / 100), game.world.height - 1000, "jumpSound", "owl", 0, 0.7, Math.PI / (Math.random() * 3 + 3));
		game.add.existing(this.player);
		
		// Creates one image to follow the player
		this.billboard = new Billboard(game, "placeholder", 0, 5, 0, this.player, this.endToken);
		game.add.existing(this.billboard);
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
		// if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
		// 	// game.state.start('GameOver');
		// 	this.levelCleared.play();
		// 	game.camera.fade(0x000000, 1000, true);
		// 	game.camera.onFadeComplete.add(this.finishFade, this);
		// };
		
		// Triggers the start of the next state.
		if(game.physics.arcade.collide(this.player, this.endToken) || game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			// Used the below line to remove the hitbox and initiate the transition immediately
			// OBSERVATION: Noticed the transition would not occur immediately when using
			//				overlap or collide in the if statement's check.
			//				Hitbox may be related to this slight difference.
			//				Will continue to look into and change if needed.
			this.endToken.destroy(); 
			this.levelCleared.play();
			game.state.start('CutsceneFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);

			// Camera Fade
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};

	},
	// finishFade: function()
	// {
	// 	game.state.start('CutsceneFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// }
};