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

