function Preload(){
   this.ready = false;
   this.asset = null;
}
Preload.prototype = {
   preload:  function preload(){
      Phaser.Point.prototype.limit = function(high, low) {
        high = high || null;
        low = low || null;
        if(high && this.getMagnitude() > high) {
          this.setMagnitude(high);
        }
        if(low && this.getMagnitude() < low) {
          this.setMagnitude(low);
        }

        return this;
      };

         
      this.asset = this.add.sprite(this.game.width/2,this.game.height/2, "preloader");
      this.asset.anchor.setTo(0.5, 0.5);
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset,0);
      
      // dummy loading...                                
      this.load.image("play_button","R/play_button.png");      
      this.load.image("ball","R/ball_48_48.png");
      this.load.image("boid","R/boid.png");      
      
      this.load.spritesheet("dude","R/assets/dude.png",32,48);
      this.load.image("diamond","R/assets/diamond.png");
      this.load.image("ground","R/assets/platform.png");
      this.load.image("sky","R/assets/sky.png");
      this.load.image("star","R/assets/star.png");            
      
      
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
               
      //this.game.state.start("titlescreen");
      this.game.state.start("game");
   }      
};

module.exports = Preload;