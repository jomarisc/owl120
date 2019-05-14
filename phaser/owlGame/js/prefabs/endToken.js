// endToken prefab

"use strict";

function endToken(game, x, y, key, frame, scale, rotation)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);
	
	// endToken Properties
	// Sprite
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(scale);
	
	// Physics
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 800;

}

endToken.prototype = Object.create(Phaser.Sprite.prototype);
endToken.prototype.constructor = endToken;

endToken.prototype.update = function()
{	
}

/* Code below was intended to utilize functions in the prefab
 * in order to accomplish the transition of levels. It did not work
 * and have referred to using the code in the respective levels to
 * transistion levels.
 */

/*
endToken.prototype.changeLevel = function(levelComplete)
{
	levelComplete = true;
}
*/
/*
endToken.prototype.finishFade = function()
{
	game.state.start("CutsceneOne", true, false, this.layerArray, this.layerSpeeds, this.keyArray);
}
*/