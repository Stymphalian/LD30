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