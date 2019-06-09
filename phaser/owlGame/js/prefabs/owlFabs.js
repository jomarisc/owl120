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
	this.scale.setTo(scale);

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

	// Animations
	this.pastAnimation; // This keeps track of the name of the previous animation
	this.animations.add("idle", ["64sadOwl0000"], 1, false);
	this.animations.add("crouch", ["owlCrouch0000"], 1, false);
	this.animations.add("sadWalk", Phaser.Animation.generateFrameNames("64sadOwlWalk", 1, 4, "", 4), 3, false);
	this.animations.add("sadWalkLeft", Phaser.Animation.generateFrameNames("64sadOwlWalkLeft", 1, 4, "", 4), 3, false);
	this.animations.add("sadJump", Phaser.Animation.generateFrameNames("64sadOwlJumpUP", 0, 11, "", 4), 30, false);
	this.animations.add("sadJumpLeft", Phaser.Animation.generateFrameNames("64sadOwlJumpLeft", 0, 11, "", 4), 30, false);

	// Sounds
	this.jumpSound = game.add.audio(jumpSound);

	// Character
	// Single jump height: ~173px
	// Double jump height: ~345px
	this.jumps = 2;
}

OwlFabs.prototype = Object.create(Phaser.Sprite.prototype);
OwlFabs.prototype.constructor = OwlFabs;

OwlFabs.prototype.update = function()
{
	// Player Input Checking
	var cursors = game.input.keyboard.createCursorKeys();

	// Player grounded flags
	this.isGrounded = this.body.touching.down;
	this.isBlockedDown = this.body.blocked.down;
	
	// Check if player is grounded
	if(this.isGrounded || this.isBlockedDown) // onFloor() checks if in contact w/ world bounds or tile
	{
		this.body.maxVelocity.setTo(this.GROUND_SPEED, this.JUMP_SPEED);
		this.body.setSize(25, 46);

		this.jumps = 2;

		this.jumping = false;

		// LEFT && RIGHT
		if(cursors.left.isDown && cursors.right.isDown)
		{
			this.body.acceleration.x = 0;
			if(this.pastAnimation === "sadWalk" || this.pastAnimation === "sadWalkLeft")
			{
				this.body.y -= 3;
			}
			else if(this.pastAnimation === "crouch")
			{
				this.body.y -= 19;
			}
			this.animations.play("idle");
		}
		// Down
		else if(cursors.down.isDown)
		{
			this.body.velocity.x = 0;
			this.body.acceleration.x = 0;
			this.body.setSize(53, 27);
			if(this.pastAnimation === "idle")
			{
				this.body.y += 19;
			}
			else if(this.pastAnimation === "sadWalk" || this.pastAnimation === "sadWalkLeft")
			{
				this.body.y += 16;
			}
			else if(this.pastAnimation === "sadJump" || this.pastAnimation === "sadJumpLeft")
			{
				this.body.y += 17;
			}
			this.animations.play("crouch");
		}
		// LEFT
		else if(cursors.left.isDown)
		{
			// Accelerate to the left
			this.body.setSize(24, 43);
			if(this.pastAnimation === "crouch")
			{
				this.body.y -= 16;
			}
			this.animations.play("sadWalkLeft");
			this.body.acceleration.x = -this.ACCELERATION;
		}
		// RIGHT
		else if(cursors.right.isDown)
		{
			// Accelerate to the right
			this.body.setSize(24, 43);
			if(this.pastAnimation === "crouch")
			{
				this.body.y -= 16;
			}
			this.animations.play("sadWalk");
			this.body.acceleration.x = this.ACCELERATION;
		}
		
		// NO INPUT
		else
		{
			this.body.acceleration.x = 0;
			if(this.pastAnimation === "sadWalk" || this.pastAnimation === "sadWalkLeft")
			{
				this.body.y -= 3;
			}
			else if(this.pastAnimation === "crouch")
			{
				this.body.y -= 19;
			}
			this.animations.play("idle");
			// Testing for jump height in pixels
			// if(this.body.velocity.y === 0)
			// {
			// 	console.log(this.body.y);
			// }
			// if(this.body.velocity.y > 0)
			// {
			// 	console.log(this.body.y);
			// }
		}
	}
	// Otherwise player is airborne
	else
	{
		this.body.maxVelocity.setTo(this.AIR_SPEED, this.JUMP_SPEED);

		// LEFT && RIGHT
		if(cursors.left.isDown && cursors.right.isDown)
		{
			this.body.acceleration.x = 0;
		}
		// LEFT
		else if(cursors.left.isDown)
		{
			// Accelerate to the left
			// this.scale.setTo(-1);
			this.body.acceleration.x = -this.ACCELERATION;

			if(this.pastAnimation === "sadJump")
			{
				var frame = this.animations.currentFrame.name[this.animations.currentFrame.name.length - 1];
				var frameNumber = parseInt(frame, 10);
				this.animations.getAnimation("sadJumpLeft").play();
				this.animations.next(frameNumber);
				// pauseGame();
			}
		}
		// RIGHT
		else if(cursors.right.isDown)
		{
			// Accelerate to the right
			this.body.acceleration.x = this.ACCELERATION;

			if(this.pastAnimation === "sadJumpLeft")
			{
				var frame = this.animations.currentFrame.name[this.animations.currentFrame.name.length - 1];
				var frameNumber = parseInt(frame, 10);
				this.animations.getAnimation("sadJump").play();
				this.animations.next(frameNumber);
			}
		}
		// NO INPUT
		else
		{
			this.body.acceleration.x = 0;
			// Testing for jump height in pixels
			// if(this.body.velocity.y === 0)
			// {
			// 	console.log(this.body.y);
			// }
			// if(this.body.velocity.y > 0)
			// {
			// 	console.log(this.body.y);
			// }
		}
	}


	// UP
	if(this.jumps > 0 && cursors.up.downDuration(1)) // && this.body.touching.down)
	{
		// Jump
		this.jumpSound.play("", 0, 0.5);
		// this.animations.play("sadJump");
		if(cursors.left.isDown)
		{
			this.animations.getAnimation("sadJumpLeft").play();
		}
		else
		{
			this.animations.getAnimation("sadJump").play();
		}
		this.body.velocity.y = -this.JUMP_SPEED;
// <<<<<<< HEAD
		this.jumps--;
		// console.log(this.jumps);
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
	this.pastAnimation = this.animations.name;
}