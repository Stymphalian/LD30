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