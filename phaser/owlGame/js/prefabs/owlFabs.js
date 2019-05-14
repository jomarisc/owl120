// Owl Character Prefab
// by Charles Advincula

"use strict";

function OwlFabs(game, jumpSound, key, frame, scale, rotation)
{
	Phaser.Sprite.call(this, game, 128 / 2, game.height * 2 / 3, key, frame);

	// OwlFabs Properties
	
	// Sprite
	this.health = 1;
	this.anchor.setTo(0.5, 0.5);

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

	// Sounds
	this.jumpSound = game.add.audio(jumpSound);
}

OwlFabs.prototype = Object.create(Phaser.Sprite.prototype);
OwlFabs.prototype.constructor = OwlFabs;

OwlFabs.prototype.update = function()
{
	// Check if player is airborne or grounded
	if(this.body.onFloor()) // onFloor() checks if in contact w/ world bounds or tile
	{
		this.body.maxVelocity.setTo(this.GROUND_SPEED, this.JUMP_SPEED);
	}
	else
	{
		this.body.maxVelocity.setTo(this.AIR_SPEED, this.JUMP_SPEED);
	}

	// Player Input Checking
	var cursors = game.input.keyboard.createCursorKeys();
	// LEFT && RIGHT
	if(cursors.left.isDown && cursors.right.isDown)
	{
		this.body.acceleration.x = 0;
	}
	// LEFT
	else if(cursors.left.isDown)
	{
		// Accelerate to the left
		this.body.acceleration.x = -this.ACCELERATION;
	}
	// RIGHT
	else if(cursors.right.isDown)
	{
		// Accelerate to the right
		this.body.acceleration.x = this.ACCELERATION;
	}
	// NO INPUT
	else
	{
		this.body.acceleration.x = 0;
	}

	// UP
	if(cursors.up.downDuration(1)) //  && this.body.touching.down)
	{
		// Jump
		this.jumpSound.play();
		this.body.velocity.y = -this.JUMP_SPEED;
	}
}