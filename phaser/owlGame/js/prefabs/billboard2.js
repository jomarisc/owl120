// Billboard Prefab

function Billboard2(game, x, y, dynamicX, dynamicY, key, frame, scale, rotation, targetInterest, endToken)
{
	//Phaser.Sprite.call(this, game, targetInterest.x - scale * 64, targetInterest.y, key, frame);
	Phaser.Sprite.call(this, game, x, y, key, frame);
	
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
	this.endTokenY = endToken.body.y;
	
	// Allows position of hovering images to follow player
	// at a desired position. This number is added to the player's x and y
	// position which is referred to in moveToXY().
	this.DYNAMIC_X = dynamicX;
	this.DYNAMIC_Y = dynamicY;
	
}

Billboard2.prototype = Object.create(Phaser.Sprite.prototype);
Billboard2.prototype.constructor = Billboard2;

Billboard2.prototype.update = function()
{
	// Check for collisions with targetInterest
	game.physics.arcade.collide(this, this.player);
	//game.physics.arcade.collide(this, this);
	
	// MAIN CODE

	// Moves image to specific position around player
	// moveToXY(displayObject, x, y, speed[by pixels/sec], maxTime[by milliseconds])
	game.physics.arcade.moveToXY(this, this.player.x + this.DYNAMIC_X, this.player.y + this.DYNAMIC_Y, 100, 100);

	/* SUBJECT TO CHANGE
	// console.log("Image body.x: " + this.body.x);
	// console.log("Image body.y: " + this.body.y);
	// console.log("Image player.x: " + this.player.x);
	// console.log("Image player.y: " + this.player.y);
	
	switch(this.far) {
		
		case 0:
			//while(this.body.x <= this.player.x - 1 || this.body.x >= this.player.x + 1 || this.body.y >= this.player.y + 1 || this.body.y <= this.player.y - 1) {
				game.physics.arcade.moveToObject(this, this.player, 360);
				if(this.body.x >= this.player.x - 1 || this.body.x <= this.player.x + 1 || this.body.y <= this.player.y + 1 || this.body.y >= this.player.y - 1) {
					this.far = 1;
				}
			//}
			break;
		case 1:
			//while(this.body.x >= this.player.x - 400 || this.body.x <= this.player.x + 400 || this.body.y <= this.player.y + 400 || this.body.y >= this.player.y - 400) {
				game.physics.arcade.moveToObject(this, this.player, -180);
				if(this.body.x <= this.player.x - 400 || this.body.x >= this.player.x + 400 || this.body.y >= this.player.y + 400 || this.body.y <= this.player.y - 400) {
					this.far = 0;
				}
			//}
			break;
		default:
			game.physics.arcade.moveToObject(this, this.player, 360);	
			
	} 
	*/
	// if(this.body.x <= this.player.x - 75 || this.body.x >= this.player.x + 75 || this.body.y >= this.player.y + 75 || this.body.y <= this.player.y - 75) {
		//  //Conditions: this.body.x >= this.player.y + 200 || this.body.y >= this.player.x + 200
		//  //body.velocity.setTo(600);
		// game.physics.arcade.moveToObject(this, this.player, 360);
		
		
	// }
	// if(this.body.x >= this.player.x - 1 || this.body.x <= this.player.x + 1 || this.body.y <= this.player.y + 1 || this.body.y >= this.player.y - 1) {
			
		// game.physics.arcade.moveToObject(this, this.player, -180);
	
	// }
	
	// Slowly move towards target interest
	//this.body.velocity.setTo(100, 0);
	if(this.body.x <= this.endTokenX - 500 || this.body.x >= this.endTokenX + 500 || this.body.y <= this.endTokenY - 500 || this.body.y >= this.endTokenY + 500)
	{
		// Describes the horizontal movement of the billboard
		// this.body.velocity.setTo(600, 600);
		// this.body.y = this.player.y;
	}
	else
	{
		this.body.velocity.setTo(0);
	} */
	
	
	/* SUBJECT TO CHANGE
	// Defines floaty movement of billboard
	if(this.body.y < this.player.body.y) {
		
		if(this.body.acceleration.y > 0 && this.body.velocity.y == 0) {
			this.body
		} else if(this.body.acceleration.y > 0 && this.body.velocity.y > 0) {
			
		} else if(this.body.acceleration.y < 0 && this.body.velocity.y == 0) {
			
		} else if(this.body.acceleration.y < 0 && this.body.velocity.y < 0) {
			
		}
		
	} else if(this.body.y > this.player.body.y) {
		
	} else {
		
	}
	 */
}