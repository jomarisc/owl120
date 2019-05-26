// Friend Prefab

function Friend(game, x, y, key, frame, scale, platformGroup)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// Friend Properties

	// Sprite
	this.anchor.setTo(0.5);
	this.scale.setTo(scale);

	// Physics
	this.AIR_SPEED = 1000;
	this.GROUND_SPEED = 300;
	this.JUMP_SPEED = 600;
	this.ACCELERATION = 3000; // Max Acceleration
	this.DRAG = 2000;
	game.physics.enable(this); // Enable Physics Body
	this.body.collideWorldBounds = true; // Confine Sprite to Game Camera
	this.body.gravity.y = 1000; // Gravity
	this.body.maxVelocity.setTo(this.GROUND_SPEED, this.JUMP_SPEED);
	this.body.acceleration.setTo(0);
	this.body.drag.setTo(this.DRAG, 0);

	// Character
	this.platforms = platformGroup;
	this.jumps = 1;
}

Friend.prototype = Object.create(Phaser.Sprite.prototype);
Friend.prototype.constructor = Friend;

Friend.prototype.update = function()
{
	
}