//Creating level two's state.
var LevelTwo = function(game) {};
LevelTwo.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},
	preload: function() {
		game.load.image("enemy", "assets/img/chadFlex0000.png");
		game.load.image("drunk", "assets/img/billboardimages30000.png");
	},
	create: function() {
		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 16000, 1800); // 24000

		// Level Sounds
		this.levelCleared = game.add.audio("levelCleared");

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		setUpBackground(this.layerArray, this.keyArray, 1, 2);

		//Another check
		menuText1 = game.add.text(game.width / 2, 450, 'This is the second level.\nPress W to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});


		enemyGroup = game.add.group() 
		// // Creating the enemy
		// for (var i = 0; i <= 5; i++){
		// 	this.enemy = new Enemy(game, "enemy", 0, 2, 0);
		// 	game.add.existing(this.enemy);
		// 	enemyGroup.add(this.enemy);
		// }
		
		// Creating platforms template
		platforms = game.add.group();
		platforms.enableBody = true;
		deathPlatforms = game.add.group();
		deathPlatforms.enableBody = true;
		
		// Creating ground.
		/*
		for (var i = 0; i <= 3200; i = i + 1600){
			var ground = platforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		*/
		// Creates death ground
		for (var i = 0; i <= (game.world.width - 3200); i = i + 1600){
			var ground = deathPlatforms.create(i, game.world.height-100, "ground");
			ground.body.immovable = true;
		}
		
		// Creates roadblock collidable object
		roadBlock = game.add.group();
		roadBlock.enableBody = true;
		var block = roadBlock.create(14400, game.world.height-200, "roadblock");
		block.body.immovable = true;
		// block.scale.setTo(4);
		
		// Creates green platforms
		var standardX = [300, 2000 + (2400 * 0), 5000 + (2400 * 0)];
		var standardY = [400, 400 , 300];
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatform");
			ledge.body.immovable = true;
			ledge.scale.setTo(3, 1.5);
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates standard platforms
		var standardX = [100 + (2400 * 0), 1025 + (2400 * 0), 100 + (2400 * 0), 1025 + (2400 * 0), 2400 + (2400 * 0), 3000 + (2400 * 0), 4300 + (2400 * 0), 5700 + (2400 * 0),7000 + (2400 * 0), 7000 + (2400 * 0), 7000 + (2400 * 0), 7700 + (2400 * 0), 7700 + (2400 * 0), 8900 + (2400 * 0), 8700 + (2400 * 0), 9300 + (2400 * 0), 12000, 13000];
		var standardY = [1450, 1250, 1050, 800, 780, 780, 450, 450, 830, 578, 1200, 1070, 1370, 1370, 1070, 830, 730, 600];
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates longer platforms
		var standardX = [2780 + (2400 * 0), 6500 + (2400 * 0), 9000, 11100];
		var standardY = [520, 320, 450, 830];
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop2");
			ledge.body.immovable = true;
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creates longerer platforms
		var standardX = [2700 + (2400 * 0), 4500 + (2400 * 0), 5500 + (2400 * 0), 8300 + (2400 * 0)];
		var standardY = [1050, 800, 800, 1560];
		for (var i = 0; i < standardX.length; i++) {	
			var ledge = platforms.create(standardX[i], game.world.height - standardY[i], "buildingPlatformTop");
			ledge.body.immovable = true;
			ledge.scale.setTo(4, 1);
			ledge.anchor.setTo(0.5, 0.5);
		}
		
		// Creating the end token
		this.endToken = new endToken(game, game.world.width-550, game.world.height-200, "endToken", 0, 1, 0); // 200
		game.add.existing(this.endToken);
		
		// Creating the player
		// Slower overall movement for the player in level two 
		// this.player = new OwlFabs(game, game.world.width * (1 / 100), game.world.height - 1000, "jumpSound", "owl", 0, 2, 1000*(3/4), 300*(3/4), 600*(3/4), 3000*(3/4), 2000*(3/4), 1000*(3/4));
		//this.player = new OwlFabs(game,  8300 + (2400 * 0), 150, "jumpSound", "owl", "64owl0000", 2, 1000*(3/4), 300*(3/4), 600*(3/4), 3000*(3/4), 2000*(3/4), 1000*(3/4));
		this.player = new OwlFabs(game, 0 + (2400 * 0), 200, "jumpSound", "owl", "64owl0000", 2, 1000*(3/4), 300*(3/4), 600*(3/4), 3000*(3/4), 2000*(3/4), 1000*(3/4));
		game.add.existing(this.player);

		// Extra Health Object
		this.powerUp = new SupportPackage(game, 500, 600, "support", 0, 1, 0);
		game.add.existing(this.powerUp);
		
		// Creates one image to follow the player
		this.billboard = new Billboard(game, -1000, -1000, "drunk", 0, 2, 0, this.player, this.endToken);
		game.add.existing(this.billboard);
		
	},
	update: function() {
		// Allow the camera to follow the player
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(game.width / 3, game.height / 2, 1, 1);

		// Player input checking
		var cursors = game.input.keyboard.createCursorKeys();

		var hitPlatform = game.physics.arcade.collide(this.player, platforms);
		var hitDeathPlatform = game.physics.arcade.collide(this.player, deathPlatforms);
		var roadBlockCollide = game.physics.arcade.collide(roadBlock, [this.player, platforms, deathPlatforms]);
		var coinPlatform = game.physics.arcade.collide(this.endToken, platforms);
		var powerUpPlatform = game.physics.arcade.collide(this.powerUp, platforms);
		var enemyPlatform = game.physics.arcade.collide(enemyGroup, platforms);

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
		// if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		// 	// game.state.start('LevelThree', true);
		// 	this.levelCleared.play();
		// 	game.camera.fade(0x000000, 1000, true);
		// 	game.camera.onFadeComplete.add(this.finishFade, this);
		// }

		// // Player-Enemy Collision
		// if(this.enemy.canHit)
		// {
		// 	game.physics.arcade.overlap(this.player, enemyGroup, this.enemy.hitPlayer, null, this);
		// }
		
		// Player-Extra Health Object Collision
		game.physics.arcade.overlap(this.player, this.powerUp, this.powerUp.increaseMaxHealth, null, this);

		if(this.player.health <= 0)
		{
			this.restart();
		}
		
		if(hitDeathPlatform) {
			
			console.log("Touching death platforms");
			this.restart();
			
		}
		
		// Triggers the start of the next state.
		if(game.physics.arcade.collide(this.player, this.endToken) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
			// Used the below line to remove the hitbox and initiate the transition immediately
			// OBSERVATION: Noticed the transition would not occur immediately when using
			//				overlap or collide in the if statement's check.
			//				Hitbox may be related to this slight difference.
			//				Will continue to look into and change if needed.
			this.endToken.destroy(); 
			this.levelCleared.play();
			game.state.start('CutsceneTwo', true, false, this.layerArray, this.layerSpeeds, this.keyArray);

			// // Camera Fade
			// game.camera.fade(0x000000, 1000, true);
			// game.camera.onFadeComplete.add(this.finishFade, this);
		};
		
		//game.physics.moveToObject(this.billboard, this.player, 100);
		
	},
	// finishFade: function()
	// {
	// 	game.state.start('CutsceneTwo', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	// },
	restart: function()
	{
		console.log("Restart Level 2");
		game.state.start("LevelTwo", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	},
	/*
	render: function()
	{
		//Sample: game.debug.body(sprite);
		game.debug.body(this.player);
		game.debug.body(this.endToken);
		game.debug.body(this.billboard);
	}
	*/
};