var GameOver = function(game) {};
GameOver.prototype = {
	init: function() {

	},
	preload: function() {

	},
	create: function() {
		//Check to start it all over again.
		game.stage.backgroundColor = "#000"; //#facade
		menuText = game.add.text(game.width / 2 - 680, 300, 'Thank you for playing', {font: '144px Helvetica', fill: '#FFF', align: "center"});
		menuText = game.add.text(game.width / 2 - 350, 500, '\nPress ENTER to go back to the main menu.', {font: '36px Helvetica', fill: '#FFF', align: "center"});
		menuText = game.add.text(game.width / 2, 700, 'OWLG120: \nJoel Mariscal\nCharles Advincula\n Alex Kuang\n Jarreau Ortega', {font: '18px Helvetica',fill: '#FFF'});
		menuText.anchor.setTo(0.5, 0.5);
		menuText.align = "center";
		// menuText2 = game.add.text(500, 550, '', {fontsize: '64px', fill: '#000'});
	},
	update: function() {
		//Triggers the start of the next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('MainMenu');
		};
	}
};