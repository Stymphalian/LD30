window.onload = function(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	var game = new Phaser.Game(w,h,Phaser.AUTO,"");
	
	game.state.add("boot", require("./states/Boot.js"));
	game.state.add("preload", require("./states/Preload.js"));
	game.state.add("titlescreen", require("./states/TitleScreen.js"));
   game.state.add("finishlevel", require("./states/FinishLevel.js"));
   game.state.add("game", require("./states/Game.js"));      
   game.state.start("boot");
};