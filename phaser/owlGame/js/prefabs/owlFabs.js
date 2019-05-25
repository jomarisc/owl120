// Owl Character Prefab
// by Charles Advincula

"use strict";

function OwlFabs(game, x, y, jumpSound, key, frame, scale, airSpeed, groundSpeed, jumpSpeed, acceleration, drag, yGravity)
{// Left most position of sprite
	//Phaser.Sprite.call(this, game, 128 / 2, game.height * 2 / 3, key, frame);
	
	//TESTING CODE: Uncomment this code for testing placement of player
	//Phaser.Sprite.call(this, game, game.world.width-400, game.height * 2 / 3, key, frame);
	Phaser.Sprite.call(this, game, x, y, key, frame);
	//Phaser.Sprite.call(this, game, 5600, 230, key, frame);
	
	// OwlFabs Properties
	
	// Sprite
	this.health = 1;
	this.anchor.setTo(0.5, 0.5);

	// Physics
	this.AIR_SPEED = airSpeed;
	this.GROUND_SPEED = groundSpeed; // 300
	this.JUMP_SPEED = jumpSpeed;
	this.ACCELERATION = acceleration // Max Acceleration
	this.DRAG = drag;
	game.physics.enable(this); // Enable Physics Body
	this.body.collideWorldBounds = true; // Confine Sprite to Game Camera
	this.body.gravity.y = yGravity; // Gravity
	this.body.maxVelocity.setTo(this.GROUND_SPEED, this.JUMP_SPEED);
	this.body.acceleration.setTo(0);
	this.body.drag.setTo(this.DRAG, 0);

	// Sounds
	this.jumpSound = game.add.audio(jumpSound);

	// Character
	this.jumps = 2;
}

OwlFabs.prototype = Object.create(Phaser.Sprite.prototype);
OwlFabs.prototype.constructor = OwlFabs;

OwlFabs.prototype.update = function()
{
	this.isGrounded = this.body.touching.down;
	this.isBlockedDown = this.body.blocked.down;
	
	// Check if player is airborne or grounded
	if(this.isGrounded || this.isBlockedDown) // onFloor() checks if in contact w/ world bounds or tile
	{
		this.body.maxVelocity.setTo(this.GROUND_SPEED, this.JUMP_SPEED);
		this.jumps = 100;
		this.jumping = false;
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
	if(this.jumps > 0 && cursors.up.downDuration(1)) // && this.body.touching.down)
	{
		// Jump
		this.jumpSound.play();
		this.body.velocity.y = -this.JUMP_SPEED;
// <<<<<<< HEAD
		this.jumps--;
		console.log(this.jumps);
	}
// =======
	// 	this.jumping = true;
	// }
	// // Additional check while Owl is in the air
	// if(this.jumping && cursors.up.upDuration(Phaser.Keyboard.UP)) {
		
	// 		this.jumps--;
	// 		this.jumping = false;
		
	// }
	/* OLD CODE
	// UP
	if(cursors.up.downDuration(1)) //  && this.body.touching.down)
	{
		// Jump
		this.jumpSound.play();
		this.body.velocity.y = -this.JUMP_SPEED;
	}
	*/
	
// >>>>>>> TestLevels
}