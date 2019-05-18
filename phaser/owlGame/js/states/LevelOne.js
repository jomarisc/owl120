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
		//this.wellbeing = 1;
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
		game.world.setBounds(0, 0, 12800, 900);

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
		
		// Creating ground.
		for (var i = 0; i <= 0; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		for (var i = 3200; i <= 8000; i = i + 1600){
			var ground = deathPlatforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		for (var i = 11200; i <= 11200; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		
		roadBlock = game.add.group();
		roadBlock.enableBody = true;
		var block = roadBlock.create(3200, game.world.height-200, "roadblock");
		var block = roadBlock.create(9600, game.world.height-200, "roadblock");
		block.body.immovable = true;
		
		/*
		for (var i = 9600; i <= 12800; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
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
		game.camera.deadzone = new Phaser.Rectangle(128 / 2, 450, 50, 350);

		// Player input checking
		var cursors = game.input.keyboard.createCursorKeys();
		
		// Checks collision with sprites and platforms
		var hitPlatform = game.physics.arcade.collide(this.player, platforms);
		var hitDeathPlatform = game.physics.arcade.collide(this.player, deathPlatforms);
		var roadBlockCollide = game.physics.arcade.collide(roadBlock, [this.player, platforms, deathPlatforms]);
		var coinPlatform = game.physics.arcade.collide(this.endToken, platforms);

		// Parallax Scrolling
		// Check if player is not inside camera deadzone + Camera is not hitting world bounds
		if((this.player.x - 64 >= game.camera.deadzone.x + game.camera.deadzone.width || this.player.x + 64 <= game.camera.deadzone.x) && game.camera.x + game.camera.width < 3200)
		{
			// Check if player is grounded
			if(this.player.body.onFloor())
			{
				setParallaxValues(this.layerSpeeds, 0.1);
			}
			// Otherwise player is airborne
			else
			{
				setParallaxValues(this.layerSpeeds, 1);
			}

			// Player input
			// LEFT && RIGHT
			if(cursors.left.isDown && cursors.right.isDown)
			{
				// Set the parallax speed to 0
				setParallaxValues(this.layerSpeeds, 0);
			}
			// LEFT
			else if(cursors.left.isDown)
			{
				parallaxScroll(this.layerArray, this.layerSpeeds, "left");
			}
			// RIGHT
			else if(cursors.right.isDown)
			{
				parallaxScroll(this.layerArray, this.layerSpeeds, "right");
			}
			// NO INPUT
			else
			{

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
			// Camera Fade
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
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
	
	finishFade: function()
	{
		game.state.start("CutsceneOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	},
	
	restart: function()
	{
		console.log("Restart Level 1");
		game.state.start("LevelOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	},
	// Uncomment this function to check hitboxes of particular sprites
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
