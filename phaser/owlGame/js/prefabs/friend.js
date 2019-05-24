// Friend Prefab

function Friend(game, x, y, key, frame, scale)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// Friend Properties

	// Sprite
	this.anchor.setTo(0.5);
	this.scale.setTo(scale);
}

Friend.prototype = Object.create(Phaser.Sprite.prototype);
Friend.prototype.constructor = Friend;

Friend.prototype.update = function()
{

}