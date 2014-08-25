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