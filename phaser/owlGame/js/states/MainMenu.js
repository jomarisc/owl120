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

		// Set up background
		// Background
		this.skyArray = [this.sky];
		this.skyKey = ["pblueSky0000", "predSky0000", "ptwilightSky0000"];
		setUpBackground(this.skyArray, "backgrounds", 1, 1, 0, 0, this.skyKey);
		this.layerArray = [this.farBuildings, this.midBuildings, this.closeBuildings];
		this.layerSpeeds = [this.farParallax, this.midParallax, this.closeParallax];
		this.keyArray = ["buildings0000", "buildings0001", "buildings0002"];
		setUpBackground(this.layerArray, "backgrounds", 0.25, 0.25, 0, game.world.height / 2, this.keyArray);

		// // Foreground
		// this.layerArrayFront = [this.farBuildingsFront, this.midBuildingsFront, this.closeBuildingsFront];
		// this.keyArrayFront = ["redbuildings0000", "redbuildings0001", "redbuildings0002"];
		// setUpBackground(this.layerArrayFront, "backgrounds", 0.25, 0.25, 0, game.world.height / 2, this.keyArrayFront);///////////////////////////////////
		// for(var i = 0; i < this.layerArrayFront.length; i++)
		// {
		// 	this.layerArrayFront[i].alpha = 0.01;
		// }
		game.stage.backgroundColor = "#FFF";

		// Main Menu text
		menuText1 = game.add.text(game.width / 2, 250, 'Owl\nLong\nDay', {fill: '#000'});
		menuText1.anchor.setTo(0.5, 0.5);
		menuText1.align = "center";
		menuText1.fontSize = 100;

		menuText2 = game.add.text(game.width / 2, 540, "Press [SPACE] to begin" , {fontsize: '64px', fill: '#000'});
		menuText2.anchor.setTo(0.5, 0.5);
		menuText2.align = "center";

		// Tweens
		// Fade Out
		this.fadeOutSky = game.add.tween(this.skyArray[0]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true, 0, -1, true);
		this.fadeOutFarBuildings = game.add.tween(this.layerArray[0]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true, 0, -1, true);
		this.fadeOutMidBuildings = game.add.tween(this.layerArray[1]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true, 0, -1, true);
		this.fadeOutCloseBuildings = game.add.tween(this.layerArray[2]).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true, 0, -1, true);
		this.fadeOutText1 = game.add.tween(menuText1).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true, 0, -1, true);
		this.fadeOutText2 = game.add.tween(menuText2).to({
			alpha: 0.01
		}, 3000, Phaser.Easing.Quintic.In, true, 0, -1, true);

		// // Fade In
		// this.fadeInFarBuildingsFront = game.add.tween(this.layerArrayFront[0]).to({////////////////////////////////////
		// 	alpha: 1
		// }, 3000, Phaser.Easing.Quadratic.In, true, 0, -1, true);
		// this.fadeInMidBuildingsFront = game.add.tween(this.layerArrayFront[1]).to({
		// 	alpha: 1
		// }, 3000, Phaser.Easing.Quadratic.In, true, 0, -1, true);
		// this.fadeInCloseBuildingsFront = game.add.tween(this.layerArrayFront[2]).to({
		// 	alpha: 1
		// }, 3000, Phaser.Easing.Quadratic.In, true, 0, -1, true);
	},
	update: function() {
		// Scrolling backgrounds
		parallaxScroll(this.layerArray, this.layerSpeeds, 1);
		// parallaxScroll(this.layerArrayFront, this.layerSpeeds, 1);///////////////////////////////////////////////////////

		// Change background over time
		if(this.skyArray[0].alpha === 0.010000000000000009)
		{
			console.log("Change")
			this.background += 1;
			console.log(this.background);
			// Change to Evening
			if(this.background % 3 === 1)
			{
				// this.background = 0;
				this.skyArray[0].frameName = this.skyKey[1];
				for(var i = 0; i < this.layerArray.length; i++)
				{
					this.layerArray[i].frameName = "redbuildings000" + i;
				}
			}
			// Change to Nighttime
			else if(this.background % 3 === 2)
			{
				// this.background = 1;
				this.skyArray[0].frameName = this.skyKey[2];
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
				this.skyArray[0].frameName = this.skyKey[0];
				for(var i = 0; i < this.layerArray.length; i++)
				{
					this.layerArray[i].frameName = "buildings000" + i;
				}
				menuText1.fill = "#000";
				menuText2.fill = "#000";
			}
		}

		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('LevelOne');
		};
	},
	shutdown: function()
	{
		// Garbage clean up
		// Preloaded assets
		game.load.removeFile("image", "blueSky");
		game.load.removeFile("image", "blueFarBuildings");
		game.load.removeFile("image", "blueMidBuildings");
		game.load.removeFile("image", "blueCloseBuildings");

		// Evening
		game.load.removeFile("image", "redSky");
		game.load.removeFile("image", "redFarBuildings");
		game.load.removeFile("image", "redMidBuildings");
		game.load.removeFile("image", "redCloseBuildings");

		// Nighttime
		game.load.removeFile("image", "twilightSky");
		game.load.removeFile("image", "twilightFarBuildings");
		game.load.removeFile("image", "twilightMidBuildings");
		game.load.removeFile("image", "twilightCloseBuildings");

		// Tilemaps
		this.skyArray[0].destroy();
		this.skyKey = null;
		this.layerSpeeds = null;
		this.keyArray = null;
		for(var i = 0; i < this.layerArray.length; i++)
		{
			this.layerArray[i].destroy();
		}
		// Tweens
		game.tweens.removeAll();
	}
};