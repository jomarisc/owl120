// SupportPackage Prefab
// by Charles Advincula

"use strict";

function SupportPackage(game, x, y, key, frame, scale, rotation)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// SupportPackage Properties
	// Sprite
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(scale);

	// Physics
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 800;
}

SupportPackage.prototype = Object.create(Phaser.Sprite.prototype);
SupportPackage.prototype.constructor = SupportPackage;

SupportPackage.prototype.update = function()
{
}

SupportPackage.prototype.increaseMaxHealth = function(player, support)
{
	player.health = 2;
	console.log("Player Health: %d", player.health);
	support.kill();
}