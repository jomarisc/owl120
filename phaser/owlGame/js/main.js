//Making sure we're strict on the syntax.
"use strict";
//Creating a new instance of the game object.
//Resolution is 1600x900

// var game = new Phaser.Game(1600, 900, Phaser.AUTO);

//Placeholder text.
var menuText1;
var menuText2;
var game;



window.onload = function(){

	game = new Phaser.Game(2400, 900, Phaser.CANVAS); // AUTO);

	//Adding all game states to the 'game' object instance.
	game.state.add('MainMenu', MainMenu);
	game.state.add('LevelOne', LevelOne);
	game.state.add('CutsceneOne', CutsceneOne);
	game.state.add('LevelTwo', LevelTwo);
	game.state.add('CutsceneTwo', CutsceneTwo);
	game.state.add('LevelThree', LevelThree);
	game.state.add('CutsceneThree', CutsceneThree);
	game.state.add('LevelFour', LevelFour);
	game.state.add('CutsceneFour', CutsceneFour);
	game.state.add('GameOver', GameOver);

	//As soon as the page is loaded, starts the game in the 'MainMenu' state.
	game.state.start('MainMenu');
}

// Helper functions------------------------------------------------------------------------------

// Precondition: 1) layers and keys have the same length
//				 2) layers is an array of background layers (i.e. [this.sky, this.farBuildings])
//				 3) the first element of layers is a static background image
//				 4) keys is an array of image keys (i.e. ["sky", "farBuildings"])
// Postcondition: Creates the background for a game state
function setUpBackground(layers, keys, scaleX, scaleY)
{
	game.stage.backgroundColor = "#0B9CF6";
	for (var i = 0; i < layers.length; i++)
	{
		if(scaleX === 1 && scaleY === 1)
		{
			layers[i] = game.add.tileSprite(0, game.world.height - 900, 24000, 900, keys[i]);
		}
		else
		{
			layers[i] = game.add.tileSprite(0, 0, 24000, 900, keys[i]);
		}
		layers[i].scale.setTo(scaleX, scaleY);
	}
}

// Precondition: 1) layerSpeeds is an array of floats that contain the varying background layer speeds
// Postcondition: the different background speeds
function setParallaxValues(layerSpeeds, slowestSpeed)
{
	for(var i = 0; i < layerSpeeds.length; i++)
	{
		layerSpeeds[i] = slowestSpeed + (2 * i * slowestSpeed);
	}
}


// Precondition: 1) layers is an array of background layers (i.e. [this.sky, this.farBuildings])
//				 2) layerSpeeds is an array of floats that contain the varying background layer speeds
//				 3) characterDirection is a string equal either to "left" or "right"
//				 4) Function must be called in the update() method of a game state
// Postcondition: Function simulates parallax scrolling relative to a game object's movement direction
function parallaxScroll(layers, layerSpeeds, characterDirection)
{
	for(var i = 0; i < layers.length - 1; i++)
	{
		if(characterDirection != 0)
			layers[i + 1].tilePosition.x -= layerSpeeds[i];
		// else if(characterDirection < 0)
		// 	layers[i + 1].tilePosition.x += layerSpeeds[i];
		else
		{
			// throw an exception
			// console.log("Invalid character direction");
			// window.location.href = "Invalid character direction";
			layers[i + 1].tilePosition.x += 0;
		}
	}
}

// Pause code by Nathan Altice
// bind pause key to browser window event
window.onkeydown = function(event) {
	// capture keycode (event.which for Firefox compatibility)
	var keycode = event.keyCode || event.which;	
	if(keycode === Phaser.Keyboard.P) {
		pauseGame();
	}
}

function pauseGame() {
	// toggle game pause
	game.paused ? game.paused = false : game.paused = true;
}