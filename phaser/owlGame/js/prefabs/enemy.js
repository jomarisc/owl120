// Enemy Prefab
// by Charles Advincula

"use strict";

function Enemy(game, key, frame, scale, rotation)
{
	Phaser.Sprite.call(this, game, 300, game.height * 2 / 3, key, frame);

	// Enemy Properties
	// Sprite
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(scale);

	// Physics
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 800;

	// Character
	this.canHit = true;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{
}

Enemy.prototype.hitPlayer = function(player, enemy)
{
	player.health--;
	console.log("Player Health: %d", player.health);
	// enemy.kill();
	enemy.canHit = false;
	console.log(enemy.canHit);
	// enemy.body.enable = false;
	// var timer = new Phaser.Timer(game);
	// timer.add(3000, revive, enemy);
	// console.log(game.time.time);
	game.time.events.add(2000, enemy.finishHitCooldown, enemy, enemy);
	game.time.events.start();
}

Enemy.prototype.finishHitCooldown = function(enemy)
{
	enemy.canHit = true;
	console.log(enemy.canHit);
}