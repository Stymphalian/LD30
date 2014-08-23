function TitleScreen(){}

TitleScreen.prototype = {   
   preload:function preload(){
      
   },
   create:function create(){
      //var button  = this.game.cache.getImage("play_button");
      this.play_button = this.game.add.button(this.game.width/2,this.game.height/2,"play_button",this.play_button_click,this);
      this.play_button.anchor.setTo(0.5,0.5);
      //this.game.add.text(50,50,"play button", {fontSize:"8px Helvetica",fill:"#fff"});
   },
   update:function update(){      
   },  
   play_button_click: function play_button_click(){      
      this.game.state.start("game");
   }
};

module.exports = TitleScreen;