// Top Jumps Indicator UI

// targetInterest points to an object that has a property named "jumps"
function TopJumpsUI(game, x, y, key, frame, scale, targetInterest)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// Jumps UI Properties

	// Sprite
	this.scale.setTo(scale);
	this.fixedToCamera = true;

	// Animations
	this.animations.add("unused", ["jumpIndic0000"], 1, false);
	this.animations.add("used", ["usedJump10000"], 1, false);

	// Character
	this.player = targetInterest;
}

TopJumpsUI.prototype = Object.create(Phaser.Sprite.prototype);
TopJumpsUI.prototype.constructor = TopJumpsUI;

TopJumpsUI.prototype.update = function()
{
	if(this.player.jumps === 2 || this.player.jumps === 100)
	{
		this.animations.play("unused");
	}
	else
	{
		this.animations.play("used");
	}
}