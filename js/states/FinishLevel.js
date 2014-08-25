function FinishLevel(phaser,type){   
};

FinishLevel.prototype = {
   preload: function(){      
      if( this.game.ld30_data.is_win){
         this.is_win = true;
         if( this.game.ld30_data.map_level + 1 > this.game.ld30_data.max_level_unlocked){
            this.game.ld30_data.max_level_unlocked = this.game.ld30_data.map_level + 1;  
         }
      }else{
         this.is_win = false;
      }                        
   },   
   create: function(){
      this.game.stage.backgroundColor = 0x000000;
      var font_type = {fontSize:"8px", fill:"#ffffff"};
      if( this.is_win){
         // show you win graphics.
         // you have reunited with the light world. congratulations         
         this.text = this.game.add.text(this.game.width/4, 3*this.game.height/4, "You have reunited with the light world. Congratulations!",font_type);         
      }else{
         // show you lose graphic, try again?         
         this.text = this.game.add.text(this.game.width/4, 3*this.game.height/4, "You lost, try again?",font_type);
         this.play_again_button = this.game.add.button(this.game.width/2,this.game.height/2 - 40,"reset_button", function(){
            this.game.state.start("game");
         },this);         
         this.play_again_button.anchor.setTo(0.5,0.5);
      }                        
            
      this.quit_button = this.game.add.button(this.game.width/2,this.game.height/2,"quit_button", function(){
            this.game.state.start("titlescreen");
      },this);               
      this.quit_button.anchor.setTo(0.5,0.5);
   },
   update: function(){
      
   },
   shutdown: function(){
      if( this.is_win){
         
      }else{         
         this.play_again_button.destroy();
      }  
      this.quit_button.destroy();
      this.text.destroy();    
   }
};

module.exports = FinishLevel;