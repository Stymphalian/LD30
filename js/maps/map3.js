var Player = require("../prefabs/Player.js");
var Torch = require("../prefabs/Torch.js");
var Door = require("../prefabs/Door.js");

module.exports = function(){   
   return {
     map_num: 3, 
     tile_map: "level3_map",
     create: function(){
      this.player = new Player(this.game,64,358,{ gender: "male", faction:"white"}); 
      this.game.add.existing(this.player);      
      this.game.camera.follow(this.player);         
            
      // lights and shadow textures          
      this.lights= this.game.add.group()
      this.lights.add( new Torch(this.game,720,468,200,true,"light_sprite"));  // wasd
      //this.lights.add( new Torch(this.game,20,426,200,false,"light_shard"));    // e
      this.lights.add( new Torch(this.game,206,464,200,false,"light_shard"));                
                                          
      this.arrow_directions = this.game.add.group();
      var arrow = this.game.add.sprite(1920,640,"arrow",this.arrow_directions);
      arrow.anchor.setTo(0.5,0.5);
      arrow.rotation = Math.PI;
        
      arrow = this.game.add.sprite(3328,1024,"arrow",this.arrow_directions);
      arrow.anchor.setTo(0.5,0.5);
      arrow.rotation = 3*Math.PI/4;        
        
      this.objective = new Door(this.game,3584,1233);      
      this.game.add.existing(this.objective); 
     }
   };   
};