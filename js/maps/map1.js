var Player = require("../prefabs/Player.js");
var Torch = require("../prefabs/Torch.js");
var Door = require("../prefabs/Door.js");

module.exports = function(){   
   return {
     map_num: 1, 
     tile_map: "level1_map",
     create: function(){
      this.player = new Player(this.game,695,235,{ gender: "male", faction:"white"}); 
      this.game.add.existing(this.player);      
      this.game.camera.follow(this.player);         
            
      // lights and shadow textures          
      this.lights= this.game.add.group()
      this.lights.add( new Torch(this.game,1030,250,200,true,"light_sprite"));  // wasd
      this.lights.add( new Torch(this.game,695,115,200,false,"light_shard"));    // e
      this.lights.add( new Torch(this.game,600,510,200,false,"light_shard"));          
      this.lights.add( new Torch(this.game,1200,510,200,false,"light_shard"));          
      this.lights.add( new Torch(this.game,1800,510,200,false,"light_shard"));                
      this.lights.add( new Torch(this.game,this.game.world.width - 350,320,200,false,"light_shard"));    
                  
      this.help_text_group = this.game.add.group();
              
      var help_text = this.game.add.text(50,80, "Stay out of the dark!",{fontSize:"8px", fill:"#ffffff"});
      this.help_text_group.add(help_text);      
      var help_text = this.game.add.text(50,105, "You only have 5 hearts.",{fontSize:"8px", fill:"#ffffff"});
      this.help_text_group.add(help_text);      
                
      var help_text = this.game.add.text(1000,70, "Press E to pick up",{fontSize:"8px", fill:"#ffffff"});
      this.help_text_group.add(help_text);      
      var help_text = this.game.add.text(1000,95, "Press E again to drop",{fontSize:"8px", fill:"#ffffff"});
      this.help_text_group.add(help_text);      
      
      var help_text = this.game.add.text(1400,70, "Left-click on the character",{fontSize:"6px", fill:"#ffffff"});
      this.help_text_group.add(help_text);      
      var help_text = this.game.add.text(1400,95, "Drag the mouse.",{fontSize:"6px", fill:"#ffffff"});
      this.help_text_group.add(help_text);            
      var help_text = this.game.add.text(1400,120, "Release to throw.",{fontSize:"6px", fill:"#ffffff"});
      this.help_text_group.add(help_text);            
      
      var help_text = this.game.add.text(1950,50, "Press spacebar to place.",{fontSize:"6px", fill:"#ffffff"});
      this.help_text_group.add(help_text);            
      var help_text = this.game.add.text(1950,75 , "the light on the pedestal.",{fontSize:"6px", fill:"#ffffff"});
      this.help_text_group.add(help_text);            
      
      this.objective = new Door(this.game,this.game.world.width-350,240);      
      this.game.add.existing(this.objective); 
     }
   };   
};