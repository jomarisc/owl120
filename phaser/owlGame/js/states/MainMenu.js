//Creating the Main Menu state.
var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function() {
		this.sky;
		this.farBuildings;
		this.farParallax = 1;
		this.midBuildings;
		this.midParallax = 3;
		this.closeBuildings;
		this.closeParallax = 5;
		this.background = 0;
	},
	preload: function() {
		// game.load.image("owl", "assets/img/owl10000ver.2.png");
		game.load.atlas("owl", "assets/img/owl.png", "assets/img/owl.json");
		game.load.image("enemy", "assets/img/owl12.png");
		game.load.image("support", "assets/img/owl3.png");
		game.load.image("endToken", "assets/img/door-3.png"); // assets/img/coin0000.v3.png
		game.load.image("billboard", "assets/img/cloud20000.png");
		game.load.image("ground", "assets/img/urbanGround.png");
		game.load.image("buildingPlatformTop", "assets/img/grayPlatformsStandard.png");
		game.load.image("buildingPlatformTop2", "assets/img/grayPlatformsLonger.png");
		game.load.image("buildingPlatform", "assets/img/gPlatform0001.png");
		game.load.image("roadblock", "assets/img/cloud20000.png");

		// Background Assets
		// Texture Atlas
		game.load.atlas("backgrounds", "assets/img/background.png", "assets/img/background.json");
		// Daytime
		game.load.image("blueSky", "assets/img/pblueSky0000.png");
		game.load.image("blueFarBuildings", "assets/img/buildings0000.png");
		game.load.image("blueMidBuildings", "assets/img/buildings0001.png");
		game.load.image("blueCloseBuildings", "assets/img/buildings0002.png");

		// Evening
		game.load.image("redSky", "assets/img/predSky0000.png");
		game.load.image("redFarBuildings", "assets/img/redbuildings0000.png");
		game.load.image("redMidBuildings", "assets/img/redbuildings0001.png");
		game.load.image("redCloseBuildings", "assets/img/redbuildings0002.png");

		// Nighttime
		game.load.image("twilightSky", "assets/img/ptwilightSky0000.png");
		game.load.image("twilightFarBuildings", "assets/img/nightbuild0000.png");
		game.load.image("twilightMidBuildings", "assets/img/nightbuild0001.png");
		game.load.image("twilightCloseBuildings", "assets/img/nightbuild0002.png");
	},
	create: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//Basic functionality check.

		// Array for different backgrounds
		// Daytime
		this.daytimeKeys = ["buildings0000", "buildings0001", "buildings0002"]; //["blueFarBuildings", "blueMidBuildings", "blueCloseBuildings"];
		this.eveningKeys = ["redbuildings0000", "redbuildings0001", "redbuildings0002"];//["redFarBuildings", "redMidBuildings", "redCloseBuildings"];
		this.nighttimeKeys = ["nightbuild0000", "nightbuild0001", "nightbuild0002"]; //["twilightFarBuildings", "twilightMidBuildings", "twilightCloseBuildings"];

		// Set up background
		this.skyArray = [this.sky];
		this.skyKey = ["pblueSky0000", "predSky0000", "ptwilightSky0000"];
		setUpBackground(this.skyArray, "backgrounds", 1, 1, 0, 0, this.skyKey);
		this.layerArray = [this.farBuildings, this.midBuildings, this.closeBuildings];
		this.layerSpeeds = [this.farParallax, this.midParallax, this.closeParallax];
		this.keyArray = this.daytimeKeys;
		setUpBackground(this.layerArray, "backgrounds", 0.25, 0.25, 0, game.world.height / 2, this.keyArray);
		game.stage.backgroundColor = "#FFF";

		// Tweens
		// Fade Out
		this.fadeOutSky = game.add.tween(this.skyArray[0]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true);
		this.fadeOutFarBuildings = game.add.tween(this.layerArray[0]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true);
		this.fadeOutMidBuildings = game.add.tween(this.layerArray[1]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true);
		this.fadeOutCloseBuildings = game.add.tween(this.layerArray[2]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true);

		// Fade In
		this.fadeInSky = game.add.tween(this.skyArray[0]).to({
			alpha: 2
		}, 3000, Phaser.Easing.Quadratic.Out, false);
		this.fadeInFarBuildings = game.add.tween(this.layerArray[0]).to({
			alpha: 2
		}, 3000, Phaser.Easing.Quadratic.Out, false);
		this.fadeInMidBuildings = game.add.tween(this.layerArray[1]).to({
			alpha: 2
		}, 3000, Phaser.Easing.Quadratic.Out, false);
		this.fadeInCloseBuildings = game.add.tween(this.layerArray[2]).to({
			alpha: 2
		}, 3000, Phaser.Easing.Quadratic.Out, false);

		// Main Menu text
		menuText1 = game.add.text(game.width / 2, 250, 'Owl\nLong\nDay', {fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		menuText1.fontSize = 100;

		menuText2 = game.add.text(game.width / 2, 540, "Press [SPACE] to begin" , {fontsize: '64px', fill: '#000'});
		menuText2.anchor.setTo(0.5, 0.5);
		menuText2.align = "center";
	},
	update: function() {
		// Scrolling background
		parallaxScroll(this.layerArray, this.layerSpeeds, 1);
		console.log(this.skyArray[0].alpha)

		// Change background over time
		if(this.skyArray[0].alpha === 0.010000000000000009)
		{
			console.log("Change")
			this.background += 1;
			console.log(this.background);
			// Change to Evening
			if(this.background === 1)
			{
				this.background = 0;
				this.skyArray[0].frameName = this.skyKey[this.background + 1];
				for(var i = 0; i < this.layerArray.length; i++)
				{
					this.layerArray[i].frameName = "redbuildings000" + i;
				}
			}
			// Change to Nighttime
			else if(this.background === 2)
			{
				this.background = 1;
				this.skyArray[0].frameName = this.skyKey[this.background + 1];
				for(var i = 0; i < this.layerArray.length; i++)
				{
					this.layerArray[i].frameName = "nightbuild000" + i;
				}
				menuText1.fill = "#FFF";
				menuText2.fill = "#FFF";
			}
			// Change to Daytime
			else
			{
				this.background = 0;
				this.skyArray[0].frameName = this.skyKey[this.background];
				for(var i = 0; i < this.layerArray.length; i++)
				{
					this.layerArray[i].frameName = "buildings000" + i;
				}
				menuText1.fill = "#000";
				menuText2.fill = "#000";
			}

			// Tween fade-ins
			this.fadeInSky.start();
			this.fadeInFarBuildings.start();
			this.fadeInMidBuildings.start();
			this.fadeInCloseBuildings.start();
		}
		else if(this.skyArray[0].alpha >= 2)
		{
			// Tween fade-outs
			this.fadeOutSky.start();
			this.fadeOutFarBuildings.start();
			this.fadeOutMidBuildings.start();
			this.fadeOutCloseBuildings.start();
		}

		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('LevelOne');
		};
	}
};