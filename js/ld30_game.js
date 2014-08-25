(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./states/Boot.js":8,"./states/FinishLevel.js":9,"./states/Game.js":10,"./states/Preload.js":11,"./states/TitleScreen.js":12}],2:[function(require,module,exports){
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
},{"../prefabs/Door.js":5,"../prefabs/Player.js":6,"../prefabs/Torch.js":7}],3:[function(require,module,exports){
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
},{"../prefabs/Door.js":5,"../prefabs/Player.js":6,"../prefabs/Torch.js":7}],4:[function(require,module,exports){
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
},{"../prefabs/Door.js":5,"../prefabs/Player.js":6,"../prefabs/Torch.js":7}],5:[function(require,module,exports){
// Create torch objects
// Torch constructor
function Door(game, x, y) {
   this.image = "door";
   Phaser.Sprite.call(this, game, x, y,this.image);
   
   this.game.physics.arcade.enable(this);      
   this.body.immovable = true;   
   this.body.collideWorldBounds = true;   
   this.body.setSize(this.body.width-20, this.height, 10,0);
   

   // Set the pivot point for this sprite to the center
   //this.anchor.setTo(0.5, 0.5);            
};

// Torches are a type of Phaser.Sprite
Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.prototype.my_reset = function(x,y){
   this.x = x;
   this.y = y;
};

module.exports = Door;
},{}],6:[function(require,module,exports){
/* options = {
faction: black | white
gender: male | female
}
*/

function Player(game,x, y,options){
   this.image = "princess";
   this.start_frame = 4;
   this.default_health = 500;
   if( options.gender === "male"){
      image = "prince";
   }   
            
   Phaser.Sprite.call(this,game,x,y,this.image,this.start_frame);  
//   this.anchor.setTo(0.5,0.5);   
   // physics stuff
   this.game.physics.arcade.enable(this);      
   //this.body.immovable = true;   
   this.body.collideWorldBounds = true;
   this.body.bounce.y  = 0.2;
   this.body.gravity.y = 300;   
   
   // add the left and right walk animations.
   this.animations.add('left',[0,1,2,3],10,true);
   this.animations.add('right',[5,6,7,8],10,true);
   
   this.min_jump = -50;
   this.max_jump = -290;
   this.max_jump_with_object = -165;
   
   
   this.is_throwing = false;
   this.holding_object = null;      
   this.health = this.default_health;
   this.health_timer = null;
   this.heart_array_pos = 0;
   this.heart_array =[];
         
   // add the onKilled event listener.
   this.events.onKilled.add(this.onKilled,this);
   this.events.onRevived.add(this.revived,this);   
   // input control 
   //this.inputEnabled = true;  
   
   
   function setup_holdable_group(){
         this.catch_flag = false;         
         this.max_launch_speed = 210;
         this.holdable_group = this.game.add.group();
         this.arrow = this.game.add.sprite(0, 0, 'arrow');
         this.arrow.anchor.setTo(0.5, 0.0);
         this.arrow.alpha = 1;
               
                           
         this.inputEnabled = true;
         this.input.start(0,true);
         this.events.onInputDown.add(function(obj,pointer){                                                
            if( this.isHoldingObject() === false ){return;}
            this.holdable_group.visible = true;                        
            this.catch_flag = true;              
            
            this.holding_object.body.moves = false;
            this.holding_object.body.velocity.setTo(0, 0);
            this.arrow.reset(this.holding_object.x, this.holding_object.y);            
            console.log("setting pointer"); 
         },this);
         this.events.onInputUp.add(function(){                  
            if( this.isHoldingObject() === false ){return;}
            this.holdable_group.visible = false;
            this.catch_flag = false;                   
                        
            var angle = this.game.physics.arcade.angleToPointer(this.holding_object) - 90*Math.PI/180;
            var dist = this.game.physics.arcade.distanceBetween(this.holding_object,this.game.input.activePointer);
            if( dist >= this.max_launch_speed){
               dist = this.max_launch_speed;  
            }
            var vx = Math.sin(angle)*dist;
            var vy = -Math.cos(angle)*dist;                        
            
            var holding_obj = this.holding_object;
             this.detachHoldingObject();
            // ORDER HERE MATTERS... shit
             holding_obj.body.moves = true;
             holding_obj.body.velocity.setTo(vx,vy); 
            
            console.log("throwing object");
            
            this.is_throwing = false;
         },this);
         
         this.holdable_group.add(this.arrow);         
         this.holdable_group.visible = false;
      }      
      setup_holdable_group.call(this); 
};

//   function listener( sprite, pointer){
//      this.NodeSwitchFX.play();
//      this.send_direction  = (this.send_direction +1 ) % NODE_SEND_DIRECTIONS.NUMBER_OF_DIRECTIONS;
//      this.frame = this.send_direction;     
//   }
//   this.events.onInputDown.add(listener,this);      

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.start_health_timer = function(){   
   this.health_timer = this.game.time.create(true);
   this.health_timer.loop(800,function(){
      this.health -= 100;
      if( this.heart_array_pos > 0 && this.heart_array_pos < this.heart_array.length){
         this.heart_array[this.heart_array_pos].kill();
         this.heart_array_pos -= 1;
      }      
      //console.log(this.health);
      if( this.health <= 0){
         this.kill();         
      }
      //console.log(this.health);
   },this);   
   this.health_timer.start();
};

Player.prototype.stop_health_timer = function(){
   if(this.health_timer){
      this.health_timer.stop(); 
      this.health_timer = null;
   }
};

Player.prototype.jump = function(duration){   
   if( this.holding_object !== null){
      this.body.velocity.y = this.max_jump_with_object;
      //max_jump = this.max_jump_with_object;
   }else{
      this.body.velocity.y = this.max_jump;
      //max_jump = this.max_jump;      
   }
   return;
            
   this.body.velocity.y = -max_jump*(duration/1500);   
   // we do opposite checks because the velocities are negative..
   if( this.body.velocity.y >= this.min_jump){
      this.body.velocity.y = this.min_jump;      
   }else if( this.body.velocity.y <= max_jump){
      this.body.velocity.y = max_jump;
   }   
}

Player.prototype.update = function() {
  //// check to see if our angle is less than 90
  //// if it is rotate the Node towards the ground by 2.5 degrees
  //if(this.angle < 90 && this.alive) {
  //  this.angle += 2.5;
  //} 
//
//  if(!this.alive) {
//    this.body.velocity.x = 0;
//  }
   
   if( this.holding_object !== null){      
      this.holding_object.x = this.x + this.holding_object.holding_x;
      this.holding_object.y = this.y + this.holding_object.holding_y;      
      this.arrow.x = this.holding_object.x;
      this.arrow.y = this.holding_object.y;
      this.arrow.rotation = this.game.physics.arcade.angleToPointer(this.arrow) - 90*Math.PI/180;      
   }
};

Player.prototype.my_reset = function(x,y){
   this.x = x;
   this.y = y;   
   this.is_throwing = false;
   this.holding_object = null;      
   this.in_light = true;
   this.health = this.default_health;
   this.stop_health_timer();
   this.health_timer = null;  
   this.catch_flag = false;
   this.holdable_group.visible = false;      
   
   this.heart_array_pos = this.heart_array.length-1;
   this.heart_array.forEach(function(e){
      e.revive();   
   });
};

Player.prototype.revived = function(){
   this.x = 32;
   this.y = 32;   
   this.is_throwing = false;
   this.holding_object = null;      
   this.in_light = true;
   this.health = this.default_health;
   this.stop_health_timer();
   this.health_timer = null;  
   this.catch_flag = false;
   this.holdable_group.visible = false;      
   
   this.heart_array_pos = this.heart_array.length-1;
   this.heart_array.forEach(function(e){
      e.revive();   
   });
};

Player.prototype.onKilled = function() {   
   if(this.health_timer){
      this.health_timer.stop(true);
   }
   this.animations.stop();
   this.frame = 4;   
   //this.revive(this.default_health);      
};

Player.prototype.getCollisionRadius = function(){
   var w = this.width/2;
   var h = this.height/2;
   return Math.sqrt(w*w + h*h); 
}

Player.prototype.isHoldingObject = function(){
   if( this.holding_object === null){
      return false;
   }else{
      return true;  
   }   
}
Player.prototype.attachHoldingObject = function(obj){   
   if( obj === null){return;}
   this.holding_object = obj;
   this.holding_object.pickup_holding(this);      
   this.is_throwing = false;
}
Player.prototype.detachHoldingObject = function(){
   if(this.holding_object === null){return;}
   this.holding_object.drop_holding(this);            
   this.holding_object = null;
   this.is_throwing = false;
}

module.exports = Player;


},{}],7:[function(require,module,exports){
// Create torch objects
// Torch constructor
var Torch = function(game, x, y,radius,holdable,image_key) {
   this.image = image_key;
   if( this.image === null){
        this.image= "light_sprite";
   }
   this.light_radius = radius;
   this.holdable = holdable;
   Phaser.Sprite.call(this, game, x, y,image_key);
   
   this.game.physics.arcade.enable(this);      
   this.body.immovable = true;   
   this.body.collideWorldBounds = true;
   if( this.holdable){
      this.body.gravity.y = this.default_gravity;
      this.body.drag.x = this.default_gravity;
   }
   
   // Set the pivot point for this sprite to the center
   this.anchor.setTo(0.5, 0.5);
   
   this.holding_x = 0;
   this.holding_y = 5;
   this.default_holding_x = 0;
   this.default_holding_y = 5;      
};

// Torches are a type of Phaser.Sprite
Torch.prototype = Object.create(Phaser.Sprite.prototype);
Torch.prototype.constructor = Torch;

Torch.prototype.update = function(){

};
Torch.prototype.my_reset = function(x,y){
   this.x = x;
   this.y = y;
   this.holding_x = this.default_holding_x;
   this.holding_y = this.default_holding_y;      
   this.body.gravity.y = this.default_gravity;
   this.body.drag.x = 20;
};

// obj must have x,y in the center
// and a radius
Torch.prototype.isWithinRadius = function (x,y,radius){
   var dx = this.x - x;
   var dy = this.y - y;
   var dist = Math.sqrt(dx*dx  + dy*dy);
   return (dist < (this.light_radius-15 + radius));
}

Torch.prototype.default_gravity = 70;
Torch.prototype.pickup_holding= function(player){
   this.holding_x = player.width/2;   
   this.holding_y = this.default_holding_y;
   this.body.velocity.setTo(0,0); 
   this.body.gravity.y = 0;   
//   console.log("pickup holding");
}
Torch.prototype.drop_holding= function(player){   
   this.body.velocity.setTo(0,0); 
   this.holding_x = player.width/2;
   this.holding_y = -10;
   this.body.gravity.y = this.default_gravity;   
   //console.log("drop holding");
}



module.exports = Torch;
},{}],8:[function(require,module,exports){
function Boot(){};
Boot.prototype = {
   preload: function(){
      this.load.image('preloader', "R/preloader.gif");      
   },
   create: function(){
      this.game.input.maxPointers = 1;
      this.game.state.start('preload');
   }
};

module.exports = Boot;
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
var Player = require("../prefabs/Player.js");
var Torch = require("../prefabs/Torch.js");
var Door = require("../prefabs/Door.js");
//var FloorSwitch = require("../prefabs/FloorSwitch.js");

var map1 = require("../maps/map1.js");
var map2 = require("../maps/map2.js");
var map3 = require("../maps/map3.js");

function Game(){   };

Game.prototype = {   
   preload: function(){
      this.level_num = this.game.ld30_data.chosen_level;
      if( this.level_num === 1){
         this.map_object =  map1();
      }else if( this.level_num ===2 ){
         this.map_object =  map2();
      }else if( this.level_num === 3){
         this.map_object =  map3();
      }      
   },
   create:function(){            
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      //this.game.stage.backgroundColor = 0x4488cc;
      this.game.stage.backgroundColor = 0x222222;
//      this.game.world.setBounds(0,0,2000,2000);
//      this.game.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'sky');            
                            
      this.map = this.game.add.tilemap(this.map_object.tile_map);    
      this.map.addTilesetImage("tileset1",'tileset1');        
      this.layer = this.map.createLayer("Tile Layer 1");
      this.layer.resizeWorld();                                        
      this.map.setCollisionBetween(1,30,true, this.layer);
      //this.map.setCollisionBetween(11,13,true,this.layer);            
      //this.layer.debug = true;
                        
      // create all the map specific things..
      this.map_object.create.call(this);
                              
      this.shadowTexture = this.game.add.bitmapData(this.game.world.width,this.game.world.height); 
      this.light_sprite = this.game.add.image(0,0,this.shadowTexture);      
      this.light_sprite.blendMode = Phaser.blendModes.MULTIPLY;
      //light_sprite.fixedToCamera = true;      
                  
      // fps
      this.game.time.advancedTiming = true;
      this.fps_text = this.game.add.text(10,10, "", {fontSize:"8px", fill:"#ffffff"});
      this.fps_text.fixedToCamera = true;
      
      this.debug_text = this.game.add.text(150,10,"", {fontSize:"8px", fill:"#ffffff"});
      this.debug_text.fixedToCamera = true;
      
      // UI
      this.UI_panel = this.game.add.group();
      this.UI_panel.fixedToCamera = true;      
      // heart panel
      function create_heart_panel(){
         var heart_panel = this.game.add.group();
         var heart = null;
         var x = 10;
         var y = 40;
         var num = this.player.default_health/100;
         for( var i = 0; i < num ; ++i){
            heart = this.game.add.sprite(x,y,"heart");
            x += heart.width + 5;
            heart_panel.add(heart);
            this.player.heart_array.push(heart);
         }
         this.player.heart_array_pos = this.player.heart_array.length -1;
         return heart_panel;         
      }
      this.heart_panel = create_heart_panel.call(this);        
      // buttons      
      this.quit_button = this.game.add.button(this.game.width-100, 10,"quit_button", function(){         
         //this.finish_game(false);
         this.game.state.start("titlescreen");
      },this);         
      this.reset_button = this.game.add.button(this.quit_button.x-100, 10,"reset_button", function(){
         this.reset_level();         
         //this.game.state.start("game");
      },this);
      this.reset_button.visible = false;
   
      // add to the UI panel      
      this.UI_panel.add(this.heart_panel);
      //this.UI_panel.add(this.reset_button);
      this.UI_panel.add(this.quit_button);
                  
      // input for everything
      //this.cursor = this.game.input.keyboard.createCursorKeys();
      this.cursor = {
         up:this.game.input.keyboard.addKey(Phaser.Keyboard.W),
         down:this.game.input.keyboard.addKey(Phaser.Keyboard.S),
         right:this.game.input.keyboard.addKey(Phaser.Keyboard.D),
         left:this.game.input.keyboard.addKey(Phaser.Keyboard.A)                
      };
      this.interact_key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.E);            
      this.ped_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
      this.interact_key1.onDown.add(function(){
         if( this.player.isHoldingObject() ){
            this.player.detachHoldingObject();
            return;            
         }
         this.game.physics.arcade.overlap(this.player,this.lights,function(player,light){
            if( light.holdable === false){ return true;}
            if( player.isHoldingObject() ){
               return false;
            }else{               
               player.attachHoldingObject(light);
               return false;
            }            
         },null,this);                  
      },this);   
      
      this.ped_key.onDown.add(function(){         
         if( this.player.isHoldingObject() === false){return;}         
         this.game.physics.arcade.overlap(this.player,this.objective,function(player,door){
            this.finish_game(true);
         },null,this);                           
      },this);
                  
   },   
   reset_level: function(){
      this.player.body.gravity.y = 0;      
      this.player.body.velocity.setTo(0,0); 
      this.game.camera.follow(null);         
      this.game.camera.x = 0;
      this.game.camera.y = 0;      
      this.game.state.restart(true);      
      //this.game.state.start("game");
   },
   finish_game: function(win){
      this.game.ld30_data.is_win = win;    
      this.game.ld30_data.map_level = this.level_num;
      
      if(win){
         // go to win level screen                  
         this.game.state.start("finishlevel");         
      }else{
         // go to lose screen.         
         this.game.state.start("finishlevel");         
      }
   },
   update: function(){        
      if(this.player.alive == false){
         this.finish_game(false);                  
      }
      
      // change the fps text
      if (this.game.time.fps !== 0) {
        this.fps_text.setText(this.game.time.fps + ' FPS');
      }      
      
      // collide with tilemap
      this.game.physics.arcade.collide(this.player, this.layer);      
      this.game.physics.arcade.collide(this.lights, this.layer);                     
      
      this.updateShadowTexture();
            
      var player_in_light = false;      
      var player_radius = this.player.getCollisionRadius();
      var player_x  = this.player.x  + this.player.width/2;
      var player_y  = this.player.y  + this.player.height/2;      
      this.lights.forEach(function(light){
         if( light.isWithinRadius(player_x,player_y,player_radius)){
            player_in_light = true;
            if(this.player.health_timer){
               this.player.stop_health_timer();           
            }
            return false;
         }
      },this);            
      if( player_in_light === false){
         if( this.player.health_timer === null){
            this.player.start_health_timer();
         }         
      }
      if( this.player.body.y >= 3*this.game.world.height/4){
         this.finish_game(false);
         //this.reset_level();
      }
                  
      // handle player movement input.         
      this.cursor_key_handler();
   },
   shutdown: function(){
      // TODO: REDO THIS, I don't thinkg I have everything...
      //this.game.state.start("titlescreen");  
      this.map.destroy();
      this.layer.destroy();
      this.player.destroy();
      this.lights.destroy(true);
      this.objective.destroy();
      this.light_sprite.destroy();
      this.fps_text.destroy();
      //this.help_text_group.destroy();
      this.debug_text.destroy();
      this.UI_panel.destroy();      
//      this.cursor.destroy();      
//      this.interact_key1.destroy();
//      this.interact_key2.destroy();
      
      this.map = null;
      this.layer = null;
      this.player = null;
      this.lights = null;
      this.objective = null;
      this.light_sprite = null;   
      this.fps_text = null;
      this.debug_text= null;
      this.cursor=null;
      this.help_text_group= null;
      this.interact_key1 = null;
      this.interact_key2 = null;
      this.UI_panel = null;
      this.heart_panel= null;
      this.quit_button = null;
      this.reset_button = null;
   },
   paused: function(){            
   },
   pauseUpdate: function(){   
   },   
   cursor_key_handler: function(){
      this.player.body.velocity.x = 0;
                        
      var flag = 0;
      if( this.cursor.left.isDown){
         this.player.body.velocity.x = -150;
         this.player.animations.play("left");
         flag = 1;
      }else if( this.cursor.right.isDown){
         this.player.body.velocity.x = 150;
         this.player.animations.play("right");                  
         flag = 1;
      }
      
//      this.player.body.velocity.y = 0;
//      if( this.cursor.up.isDown){
//         this.player.body.velocity.y = -150;
//         this.player.animations.play("left");
//         flag = 1;
//      }else if( this.cursor.down.isDown){
//         this.player.body.velocity.y = 150;
//         this.player.animations.play("right");
//         flag = 1;
//      }
                  
      if( flag === 0){
         this.player.animations.stop();
         this.player.frame = this.player.start_frame;                     
      }
      
      if(this.cursor.up.isDown && this.player.body.blocked.down){
         this.player.jump(this.cursor.up.duration);
         //this.player.body.velocity.y = -350;
      }      
   },
   render: function(){
      //this.game.debug.bodyInfo(this.player, 32, 320);
      //this.game.debug.spriteInfo(this.player, 400,200);   
//      this.game.debug.text(player_x + " "  + player_y + " " + player_radius +  " " + player_in_light + " living");
   },
   updateShadowTexture: function() {
    // This function updates the shadow texture (this.shadowTexture).
    // First, it fills the entire texture with a dark shadow color.
    // Then it draws a white circle centered on the pointer position.
    // Because the texture is drawn to the screen using the MULTIPLY
    // blend mode, the dark areas of the texture make all of the colors
    // underneath it darker, while the white area is unaffected.

    // Draw shadow
    var type = 1;
    if( type === 0){
      this.shadowTexture.context.fillStyle = 'rgb(255,255,255)';    
    }else{
      this.shadowTexture.context.fillStyle = 'rgb(20,20,20)';   
    }        
    this.shadowTexture.context.fillRect(0, 0, this.game.world.width, this.game.world.height);
      
    // Iterate through each of the lights and draw the glow
    this.lights.forEach(function(light) {
        // Randomly change the radius each frame
        var radius = light.light_radius;// + this.game.rnd.integerInRange(1,10);

        // Draw circle of light with a soft edge
        var gradient =
            this.shadowTexture.context.createRadialGradient(
                light.x, light.y, light.light_radius*0.8,
                light.x, light.y, light.light_radius);
       function grad_colour(type,alpha){
          // 0 for dark, 1 for white
          if(type===0){
             return "rgba(80,80,80," + alpha + ")";
          }else{
             return "rgba(255, 255, 255," + alpha + ")";
          }          
       }
       var type = 1;
       gradient.addColorStop(0, grad_colour(type,1.0));
       gradient.addColorStop(0.2, grad_colour(type,0.8));
       gradient.addColorStop(0.6, grad_colour(type,0.4));
       gradient.addColorStop(0.8, grad_colour(type,0.2));
       gradient.addColorStop(1, grad_colour(type,0.0));        

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(light.x, light.y, radius, 0, Math.PI*2);
        this.shadowTexture.context.fill();
    }, this);

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
   }

};
module.exports = Game;
},{"../maps/map1.js":2,"../maps/map2.js":3,"../maps/map3.js":4,"../prefabs/Door.js":5,"../prefabs/Player.js":6,"../prefabs/Torch.js":7}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
function TitleScreen(){   
   this.chosen_level = null;
};

TitleScreen.prototype = {   
   preload:function preload(){
      
   },
   create:function create(){            
      //var button  = this.game.cache.getImage("play_button");      
      this.game.stage.backgroundColor = 0x000000;
           
      this.main_panel = this.create_main_panel();
      this.help_panel = this.create_help_panel();      
      this.choose_level_panel = this.create_choose_level_panel();
      
      this.main_panel.visible = true;                           
      //this.game.add.text(50,50,"play button", {fontSize:"8px Helvetica",fill:"#fff"});
   },
   update:function update(){      
      
   },  
   shutdown: function(){
      this.main_panel.destroy(true); 
      this.help_panel.destroy(true);
      this.choose_level_panel.destroy(true);
   },
   start_game: function(){      
      if(this.game.ld30_data.max_level_unlocked >= this.chosen_level ){
         this.game.ld30_data.chosen_level = this.chosen_level;      
         this.game.state.start("game");
      }      
   },   
   create_choose_level_panel: function(){
      var choose_level_panel = this.game.add.group();
      var back_button = this.game.add.button(20,20, "back_button" , function(){
         this.choose_level_panel.visible = false;
         this.main_panel.visible = true;
      },this);
                        
      var level_choosing = this.game.add.group();
      var level1 = this.game.add.button(100,200,"level_1",function(){
         this.chosen_level = 1;
         this.start_game();
      },this);
      var level2 = this.game.add.button(level1.x + level1.width + 5,200,"level_2",function(){
         this.chosen_level = 2;
         this.start_game();
      },this);
      var level3 = this.game.add.button(level2.x + level2.width + 5,200,"level_3",function(){
         this.chosen_level = 3;
         this.start_game();
      },this);
            
      level1.alpha = 0.4;
      level2.alpha = 0.4;
      level3.alpha = 0.4;
      if( this.game.ld30_data.max_level_unlocked >= 1){
         level1.alpha = 1;         
      }
      if( this.game.ld30_data.max_level_unlocked >= 2){
         level2.alpha = 1;         
      }
      if( this.game.ld30_data.max_level_unlocked >= 3){
         level3.alpha = 1;         
      }
      

      level_choosing.add(level1);
      level_choosing.add(level2);
      level_choosing.add(level3);
      
      choose_level_panel.add(back_button);
      choose_level_panel.add(level_choosing);
      
      choose_level_panel.visible = false;
      return choose_level_panel;      
   },
   create_main_panel: function(){
      var main_panel = this.game.add.group();      
      this.background_image = this.game.add.image(this.game.width/2,this.game.height/2,"ld30_logo");
      this.background_image.anchor.setTo(0.5,0.5);
      
      var play_button = this.game.add.button(this.game.width/2,this.game.height/2,"play_button",function(){
         this.main_panel.visible = false;
         this.choose_level_panel.visible = true;
      },this);      
      var help_button = this.game.add.button(this.game.width/2, this.game.height/2 + play_button.height + 5, "help_button", function(){
         this.main_panel.visible = false;
         this.help_panel.visible = true;  
      },this);
      play_button.anchor.setTo(0.5,0.5);
      help_button.anchor.setTo(0.5,0.5);
      
      
      main_panel.add(this.background_image);
      main_panel.add(play_button);
      main_panel.add(help_button);      
      
      main_panel.visible = false;      
      return main_panel;
   },   
   create_help_panel: function(){
      var help_panel = this.game.add.group();
            
      var back_button = this.game.add.button(20,20, "back_button" , function(){
         this.help_panel.visible = false;
         this.main_panel.visible = true;
      },this);
      
      var text_group = this.game.add.group();
      
      text_string = this.game.add.text(40,100 ,"You are a citizen of the world of light.",{fontSize:"8px",fill:"#fff"});      
      text_group.add(text_string);
      text_string = this.game.add.text(40,120 ,"Trapped in the darkness you seek to reconnect with your world.",{fontSize:"8px",fill:"#fff"});      
      text_group.add(text_string);
      text_string = this.game.add.text(40,145,"Collect the orbs of light around you and place them on the pedestals",{fontSize:"8px",fill:"#fff"});      
      text_group.add(text_string);      
      
            
      var of = 250;
      text_string = this.game.add.text(40,100 + of,"Credits",{fontSize:"8px",fill:"#fff"});      
      text_group.add(text_string);      
      text_string = this.game.add.text(40,120 + of,"Author: Jordan Yu",{fontSize:"8px",fill:"#fff"});
      text_group.add(text_string);
      text_string = this.game.add.text(40,145 + of,"Framework: Phaser [Phaser.io], Javascript",{fontSize:"8px",fill:"#fff"});
      text_group.add(text_string);
      text_string = this.game.add.text(40,170 + of,"Art: Asesprite (v1.0.3-dev), Graphics Gale, Tiler",{fontSize:"8px",fill:"#fff"});
      text_group.add(text_string);
      text_string = this.game.add.text(40,195 + of,"LD30 background by PixlWalkr",{fontSize:"8px",fill:"#fff"});      
      text_group.add(text_string);      
      text_string = this.game.add.text(40,220 + of,"Sound: bfxr",{fontSize:"8px",fill:"#fff"});
      text_group.add(text_string);
      
      
      help_panel.add(back_button);
      help_panel.add(text_group);
      
      help_panel.visible = false;
      return help_panel;      
   }
};

module.exports = TitleScreen;
},{}]},{},[1]);
