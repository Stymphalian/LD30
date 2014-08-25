// Create torch objects
// Torch constructor
var FloorSwitch = function(game, x, y) {
   this.image = "floor_switch";   
   Phaser.Sprite.call(this, game, x, y, 'floor_switch');
   
   this.game.physics.arcade.enable(this);      
   this.body.immovable = true;   
   this.body.collideWorldBounds = true;
   this.body.setSize(this.width/2,this.height/4, this.width/4,3*this.height/4);
   
   this.switch_active_flag = false;
   this.action = function(){
      if( this.switch_active_flag){
         this.action_callback.call(this);
      }      
   };
   this.action_callback = null;
   //this.body.gravity.y = this.default_gravity;
   
   // Set the pivot point for this sprite to the center
   //this.anchor.setTo(0.5, 0.5);            
};

// Torches are a type of Phaser.Sprite
FloorSwitch.prototype = Object.create(Phaser.Sprite.prototype);
FloorSwitch.prototype.constructor = FloorSwitch;

module.exports = FloorSwitch;