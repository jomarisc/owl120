// Billboard Prefab

function Billboard(game, key, frame, scale, rotation, targetInterest, endToken)
{
	Phaser.Sprite.call(this, game, targetInterest.x - scale * 64, targetInterest.y, key, frame);
	
	// Billboard Properties

	// Sprite
	this.anchor.setTo(0.5);
	this.scale.setTo(scale);

	// Physics
	game.physics.enable(this);
	this.mass = 100;
	this.body.collideWorldBounds = false; // Can go through world bounds
	this.body.velocity.setTo(0); // Begin w/ billboards at rest
	this.body.acceleration.setTo(0); // Begin with 0 acceleration
	this.body.gravity.y = 0; // Gravity will not affect billboards
	//this.body.maxVelocity.setTo(100, 100); // Billboards have slow movement for now
	this.body.maxVelocity.setTo(1000, 1000);
	
	// Character
	this.player = targetInterest;
	this.endTokenX = endToken.body.x;
}

Billboard.prototype = Object.create(Phaser.Sprite.prototype);
Billboard.prototype.constructor = Billboard;

Billboard.prototype.update = function()
{
	// Check for collisions with targetInterest
	game.physics.arcade.collide(this, this.player);
	//game.physics.arcade.collide(this, this);
	

	// Slowly move towards target interest
	this.body.y = this.player.y-100;
	//this.body.velocity.setTo(100, 0);
	if(this.body.x <= this.endTokenX - 500)
	{
		this.body.velocity.setTo(600, 600);
	}
	else
	{
		this.body.velocity.setTo(0);
	}
}