function Preload(){
   this.ready = false;
   this.asset = null;
}
Preload.prototype = {
   preload:  function preload(){         
      this.game.ld30_data = this.game.ld30_data || {
         chosen_level:0,
         map_level:0,
         max_level_unlocked:1,
         is_win:false,         
      };
                        
      this.asset = this.add.sprite(this.game.width/2,this.game.height/2, "preloader");
      this.asset.anchor.setTo(0.5, 0.5);
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset,0);
      
      // dummy loading...                                
      this.load.image("play_button","R/play_button.png");      
      this.load.image("back_button", "R/back_button.png");
      this.load.image("help_button", "R/help_button.png");
      this.load.image("quit_button", "R/quit_button.png");
      this.load.image("reset_button", "R/reset_button.png");
      this.load.image("level_1", "R/level_1.png");
      this.load.image("level_2", "R/level_2.png");
      this.load.image("level_3", "R/level_3.png");
      this.load.image("arrow", "R/arrow.png");            
      this.load.image("heart", "R/heart.png");            
      
      this.load.spritesheet("prince","R/prince.png",32,48);
      this.load.spritesheet("princess","R/princess.png",32,48);
      this.load.image("sky","R/sky.png");
      this.load.image("light_sprite","R/light_ball.png");  
      this.load.image("light_shard","R/light_shard.png");
      this.load.image("blurred_circle","R/blurred_circle.png");
      this.load.image("star","R/star.png");            
      this.load.tilemap("tilemap1", "R/maps/tilemap1.json",null,Phaser.Tilemap.TILED_JSON);
      this.load.tilemap("level1_map", "R/maps/level1_map.json",null,Phaser.Tilemap.TILED_JSON);
      this.load.tilemap("level2_map", "R/maps/level2_map.json",null,Phaser.Tilemap.TILED_JSON);
      this.load.tilemap("level3_map", "R/maps/level3_map.json",null,Phaser.Tilemap.TILED_JSON);      
      this.load.image("tileset1", "R/tileset.png");
      
      this.load.image("floor_switch", "R/floor_switch.png");
      this.load.image("door", "R/pedestal.png");
      this.load.image("ld30_logo", "R/ld30_logo.png");
                        
      //	Create our bitmapData which we'll use as a Sprite texture      
      var bmd = this.game.add.bitmapData(8,8);	      
       bmd.context.fillStyle = '#b2dfb0';
       bmd.context.fillRect(0,0, 8,8);
       bmd.render();
       this.game.cache.addBitmapData('food', bmd);      
   },
   create: function create(){      
      this.loading_text = this.game.add.text(this.asset.x - this.asset.width/2 + 3, this.game.height/2 - 2*this.asset.height,"Loading...",{fontSize:"8px Helvetica", fill:"#fff"});
      this.asset.cropEnabled = false;
   },
   update: function update(){      
      if( !!this.ready){         
         this.ready = false;
      }         
   },   
   onLoadComplete: function(){
      this.ready = true;                     
      this.game.state.start("titlescreen");
      //this.game.state.start("game");
   }      
};

module.exports = Preload;