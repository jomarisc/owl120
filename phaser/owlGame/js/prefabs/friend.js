// Friend Prefab

function Friend(game, x, y, key, frame, scale, platformGroup, targetInterest)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// Friend Properties

	// Sprite
	this.anchor.setTo(0.5);
	this.scale.setTo(scale);

	// Physics
	this.AIR_SPEED = 1000;
	this.GROUND_SPEED = 300;
	this.JUMP_SPEED = 3600;
	this.ACCELERATION = 3000; // Max Acceleration
	this.DRAG = 200;
	game.physics.enable(this); // Enable Physics Body
	this.body.collideWorldBounds = true; // Confine Sprite to Game Camera
	this.body.gravity.y = 1000; // Gravity
	this.body.maxVelocity.setTo(this.AIR_SPEED, this.JUMP_SPEED);
	this.body.acceleration.setTo(0);
	this.body.drag.setTo(this.DRAG, 0);

	// Character
	this.platforms = platformGroup;
	this.player = targetInterest;
	console.log(this.platforms)
	this.jumps = 2;
	this.platformQueue = []; // A Queue that keeps track of platforms that the player has collided with
	console.log(this.platformQueue.length);
}

Friend.prototype = Object.create(Phaser.Sprite.prototype);
Friend.prototype.constructor = Friend;

Friend.prototype.update = function()
{
	// Only check for platform collisions when above platforms
	for(var i = 0; i < this.platforms.length; i++)
	{
		if(this.body.y < this.platforms.getAt(i).body.y)
		{
			game.physics.arcade.collide(this, this.platforms.getAt(i));
		}
	}

	// Friend grounded flags
	this.isGrounded = this.body.touching.down;
	this.isBlockedDown = this.body.blocked.down;
	
	// Check if Friend is grounded
	if(this.isGrounded || this.isBlockedDown)
	{
		this.jumps = 2;
	}

	// Jump towards player whenever possible
	if(this.jumps > 0 && this.player.body.touching.down || this.player.body.blocked.down)
	{
		console.log(game.physics.arcade.distanceBetween(this, this.player))
		if(game.physics.arcade.distanceBetween(this, this.player) < 300)
		{
			game.physics.arcade.moveToXY(this, this.player.body.x, this.player.body.y, 350, 1000);
		}
		else
		{
			game.physics.arcade.moveToXY(this, this.player.body.x, this.player.body.y - 550, 750, 1000);
		}
		console.log("X: " + this.body.velocity.x)
		console.log("Y: " + this.body.velocity.y)
		this.jumps--;
	}
}