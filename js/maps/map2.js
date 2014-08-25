var Player = require("../prefabs/Player.js");
var Torch = require("../prefabs/Torch.js");
var Door = require("../prefabs/Door.js");

module.exports = function(){   
   return {
     map_num: 2, 
     tile_map: "level2_map",
     create: function(){
      this.player = new Player(this.game,64,240,{ gender: "male", faction:"white"}); 
      this.game.add.existing(this.player);      
      this.game.camera.follow(this.player);         
            
      // lights and shadow textures          
      this.lights= this.game.add.group()
      this.lights.add( new Torch(this.game,74,256,200,true,"light_sprite"));  // wasd
      this.lights.add( new Torch(this.game,1423,1280,150,false,"light_shard"));
      this.lights.add( new Torch(this.game,1680,800,50,false,"light_shard"));          

        
      this.arrow_directions = this.game.add.group();
      var arrow = this.game.add.sprite(2048,288,"arrow",this.arrow_directions);
      arrow.anchor.setTo(0.5,0.5);
      arrow.rotation = Math.PI;
        
      arrow = this.game.add.sprite(1490,1280,"arrow",this.arrow_directions);
      arrow.anchor.setTo(0.5,0.5);
      arrow.rotation = Math.PI;
        
        
      this.objective = new Door(this.game,832,1455 ); 
      this.game.add.existing(this.objective); 
     }
   };   
};