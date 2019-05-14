//Creating level four's state.
var LevelFour = function(game) {};
LevelFour.prototype = {
	init: function(layerArray, layerSpeeds, keyArray) {
		this.layerArray = layerArray;
		this.layerSpeeds = layerSpeeds;
		this.keyArray = keyArray;
	},
	preload: function() {

	},
	create: function() {
		//One more check
		game.stage.backgroundColor = "#facade";

		// Setting up the world bounds for the camera
		game.world.setBounds(0, 0, 3200, 900);

		// Level Sounds
		this.levelCleared = game.add.audio("levelCleared");

		// Camera Fade in
		game.camera.flash(0x000000, 1000, true);

		// Set up background
		this.keyArray = ['twilightsky0001', 'nightbuild0000', 'nightbuild0001', 'nightbuild0002'];
		
		// setUpBackground(layerArray, keyArray)
		setUpBackground(this.layerArray, 'owl',this.keyArray);

		menuText1 = game.add.text(game.width / 2, 450, 'This is the fourth level.\nPress R to enter the next state.', {fontsize: '72px', fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		// menuText2 = game.add.text(800, 550, '', {fontsize: '64px', fill: '#000'});
		
		// Creating the end token
		this.endToken = new endToken(game, game.world.width-200, game.world.height-100, 'owl', 'coin0000v3', 1, 0);
		game.add.existing(this.endToken);
		
		// Creating the player
		this.player = new OwlFabs(game, "jumpSound", 'owl', 'owl10000', 0.7, Math.PI / (Math.random() * 3 + 3));
		game.add.existing(this.player);
		
		// Creates one image to follow the player
		this.billboard = new Billboard(game, "placeholder", 0, 5, 0, this.player);
		game.add.existing(this.billboard);
	},
	update: function() {
		// Allow the camera to follow the player
		game.camera.follow(this.player);
		game.camera.deadzone = new Phaser.Rectangle(128 / 2, 450, 50, 350);

		// Player input checking
		var cursors = game.input.keyboard.createCursorKeys();

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

		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			// game.state.start('GameOver');
			this.levelCleared.play();
			game.camera.fade(0x000000, 1000, true);
			game.camera.onFadeComplete.add(this.finishFade, this);
		};
		
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

	},
	finishFade: function()
	{
		game.state.start('CutsceneFour', true, false, this.layerArray, this.layerSpeeds, this.keyArray);
	}
};