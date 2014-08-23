(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	var game = new Phaser.Game(w,h,Phaser.AUTO,"");
	
	game.state.add("boot", require("./states/Boot.js"));
	game.state.add("preload", require("./states/Preload.js"));
	game.state.add("titlescreen", require("./states/TitleScreen.js"));
   game.state.add("game", require("./states/Game.js"));
   game.state.start("boot");
};
},{"./states/Boot.js":3,"./states/Game.js":4,"./states/Preload.js":5,"./states/TitleScreen.js":6}],2:[function(require,module,exports){

var Boid = function(game, x, y, group,image_key,options) {
  Phaser.Sprite.call(this, game, x, y,image_key);
  //this.scale.setTo(0.2,0.2);  
  this.anchor.setTo(0.5, 0.5);
  this.group = group;
  this.game.physics.arcade.enableBody(this);

  this.options = options || {};
  this.cannibal = this.options.caniibal;
  
  this.maxVelocity = 50.0;
  this.maxForce = 10.0;
  this.seekForce = 0.5;
  
  this.radius = Math.sqrt(this.height * this.height + this.width * this.width) / 2;
  this.desiredSeparation = 40.0;
  this.maxDistance = this.radius * 10.0;  
};
Boid.prototype = Object.create(Phaser.Sprite.prototype);
Boid.prototype.constructor = Boid;

Boid.prototype.update = function() {
  this.body.acceleration.setTo(0,0);
  if(this.target && this.target.exists) {
    var seekAccel = Phaser.Point();
    if(this.target instanceof Phaser.Group) {
      seekAccel = this.seekGroup();
    } else {
      seekAccel = this.seek(this.target.body.position);
    }
    seekAccel.multiply(this.seekForce, this.seekForce);
    this.applyForce(seekAccel);
  }
  this.applyForce(this.separate());
  this.applyForce(this.align());
  this.cohesion();
  
  this.checkBorders();
  this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
};

Boid.prototype.applyForce = function(force) {
  this.body.acceleration = Phaser.Point.add(this.body.acceleration, force);
};

Boid.prototype.seekGroup = function(targetGroup) {

  var closest = null;
  var distance = Number.MAX_VALUE;
  targetGroup = targetGroup || this.target;
  targetGroup.forEachExists(function(target) {
    var d = this.body.position.distance(target.body.position);
    if(d < distance) {
      distance = d;
      closest = target;
    }
  }, this);
  if(closest) {
    return this.seek(closest.body.position);  
  }
  return new Phaser.Point();
};

Boid.prototype.seek = function(target) {
  var desired = Phaser.Point.subtract(target, this.body.position);

  desired.normalize();
  desired.multiply(this.maxVelocity, this.maxVelocity);

  var steer = Phaser.Point.subtract(desired, this.body.velocity);
  steer.limit(this.maxVelocity);
  return steer;
};

Boid.prototype.lookAtClosest = function() {
  var target = null;
  var dist = 0;
  this.group.forEach(function(boid) {
    if (boid.body.position !== this.body.position) {
      var distBetween = this.game.physics.arcade.distanceBetween(this, boid);
      if(!target ||  distBetween < dist) {
        dist = distBetween;
        target = boid;
      }
    }
  },this);

  if(!!target) {
    this.rotation = this.game.physics.arcade.angleBetween(this, target);
  }
};

Boid.prototype.separate = function() {
  var distance = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  this.group.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if((d > 0) && (d < this.desiredSeparation)) {
      var diff = Phaser.Point.subtract(this.body.position, boid.body.position);
      diff.normalize();
      diff.divide(d,d);
      steer.add(diff.x,diff.y);
      count++
    }
  }, this);

  if(count > 0) {
    steer.divide(count, count);
  }

  if(steer.getMagnitude() > 0) {
    steer.normalize();
    steer.multiply(this.maxVelocity, this.maxVelocity);
    steer.subtract(this.body.velocity.x, this.body.velocity.y);
    steer.limit(this.maxForce);
  }

  return steer;
};


Boid.prototype.cohesion = function() {
  
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  this.group.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(boid.body.position.x, boid.body.position.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  
    return this.seek(sum);
  }
  return steer;
};


Boid.prototype.align = function() {
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;
  this.group.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(boid.body.velocity.x, boid.body.velocity.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  

    sum.normalize();
    sum.multiply(this.maxVelocity, this.maxVelocity);
    steer = Phaser.Point.subtract(sum, this.body.velocity);
    steer.limit(this.maxForce);
  }

  return steer;
};

Boid.prototype.checkBorders = function() {
  if(this.body.position.x < -this.radius ){
    this.body.position.x = this.game.width + this.radius;
  }
  if(this.body.position.y < -this.radius ){
    this.body.position.y = this.game.height + this.radius;
  }
  if(this.body.position.x > this.game.width + this.radius ){
    this.body.position.x = -this.radius;
  }
  if(this.body.position.y > this.game.height + this.radius ){
    this.body.position.y = -this.radius;
  }
};
module.exports = Boid;


/*
  'use strict';
  var Boid = require('../prefabs/boid');

  function Play() {}
  Play.prototype = {
    create: function() {

      this.zombies = this.game.add.group();
      this.maxFood = 3;
      this.maxZombies = 150;
      
      this.food = this.game.add.group();
      
      for(var j = 0; j < this.maxFood; j++) {
        this.addFood();
      }
      
      
      
      
      for(var i = 0; i < this.maxZombies; i++) {
        this.zombies.add(new Boid(this.game, this.game.world.randomX, this.game.world.randomY, this.zombies));
      }

      this.zombies.setAll('target',this.food);
      this.zombies.setAll('scale.x',0.25);
      this.zombies.setAll('scale.y',0.25);
       
      this.game.input.onDown.add(this.addFoodFromPointer, this);
      var instructionText = this.game.add.bitmapText(10,10, 'minecraftia', 'Click to add food', 12);
      
    },
    update: function() {
      this.game.physics.arcade.collide(this.food, this.zombies, this.foodHit, null, this);
    },
    foodHit: function(food, zombie) {
      food.kill();
      if(this.food.countLiving() < this.maxFood) {
        this.addFood();  
      }
    },
    addFood: function(x,y) {
      x = x || this.game.world.randomX;
      y = y || this.game.world.randomY;
      
      var food = this.food.getFirstExists(false);
      if(!food) {
        food = this.game.add.sprite(0, 0, this.game.cache.getBitmapData('food'));
        food.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enableBody(food);
        this.food.add(food);
      }
      food.reset(x, y);
      food.revive();
    },
    addFoodFromPointer: function() {
      this.addFood(this.game.input.x, this.game.input.y);
    }

  };
  
  module.exports = Play;
*/
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
var Boid = require("../prefabs/Boid.js");

function Game(){};
Game.prototype = {
   preload: function(){
      
   },
   create: function() {
      this.zombies = this.game.add.group();
      this.food = this.game.add.group();
      this.maxFood = 3;
      this.maxZombies = 150;
                  
      for(var j = 0; j < this.maxFood; j++) {
        this.addFood();
      }            
      for(var i = 0; i < this.maxZombies; i++) {
        this.zombies.add(new Boid(this.game, this.game.world.randomX, this.game.world.randomY,this.zombies,"boid"));
      }

      this.zombies.setAll('target',this.food);
      this.zombies.setAll('scale.x',0.25);
      this.zombies.setAll('scale.y',0.25);
      this.game.input.onDown.add(this.addFoodFromPointer, this);
      //var instructionText = this.game.add.bitmapText(10,10, 'minecraftia', 'Click to add food', 12);
      
    },
    update: function() {
      this.game.physics.arcade.collide(this.food, this.zombies, this.foodHit, null, this);
    },
    foodHit: function(food, zombie) {
      food.kill();
      if(this.food.countLiving() < this.maxFood) {
        this.addFood();  
      }
    },
    addFood: function(x,y) {
      x = x || this.game.world.randomX;
      y = y || this.game.world.randomY;
      
      var food = this.food.getFirstExists(false);  
      if(!food) {
        food = this.game.add.sprite(0, 0, this.game.cache.getBitmapData('food'));
        food.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enableBody(food);
        this.food.add(food);
      }
      food.reset(x, y);
      food.revive();
    },
    addFoodFromPointer: function() {
      this.addFood(this.game.input.x, this.game.input.y);
    }
};
module.exports = Game;




/*function Game(){
   this.platforms = null;
   this.score = 0;
};

Game.prototype = {   
   preload: function(){
      this.grid_units = 25;
      this.grid_w = this.game.world.width/this.grid_units;
      this.grid_h = this.game.world.height/this.grid_units;
      console.log(this.grid_w);
      console.log(this.grid_h);
   },
   create:function(){      
      console.log("Game created");      
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
                        
      this.game.add.tileSprite(0,0,this.game.width,this.game.height,'sky');      
      
      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
      
      var ground = this.platforms.create(0,this.game.world.height - 64, 'ground');
      var ledge1 = this.platforms.create(400,400, 'ground');
      var ledge2 = this.platforms.create(-150,250, 'ground'); 
      
      ground.scale.setTo(4,2);      
      
      ground.body.immovable = true;
      ledge1.body.immovable = true;
      ledge2.body.immovable = true;
      
      this.player = this.create_a_player(32,this.game.world.height -150);
      this.cursor = this.game.input.keyboard.createCursorKeys();
      
      this.stars = this.game.add.group();
      this.stars.enableBody = true;
      var i =0;
      var star;
      for( i = 0;i < 10; ++i){
         star = this.stars.create(i*30,10,"star");
         star.body.gravity.y = 14;
         star.body.bounce.y = 0.2 + Math.random()*0.2;          
      }
      
      
      this.score = 0;
      this.scoreText = this.game.add.text(10,10,"Score: 0",{fontSize:"8px Helvetica",fill:"#000000"});
      
      
      this.pauseText = this.game.add.text(this.game.width/2,this.game.height/2,"PAUSED", {fonsize:"48px Helvetica", file:"#000000"});
      this.pauseText.anchor.setTo(0.5,0.5);
      this.pauseText.visible = false;      
      
         
      this.arrows = this.game.add.group();      
      this.arrows.position.x = 0;
      this.arrows.position.y = 0;
      function create_arrow_grid(){                                           
          var col,row,arrow;         
          var p = [];        
          p.push(new Phaser.Point(0,-2));
          p.push(new Phaser.Point(10,0));
          p.push(new Phaser.Point(0,2));                  
         for( row = 0; row < this.grid_h; ++row){
            for( col = 0; col < this.grid_w; ++col){
               arrow =  this.game.add.graphics(col*this.grid_units, row*this.grid_units, this.arrows);     
               arrow.beginFill(0x00dd00);
               arrow.lineStyle(1,0x00dd00);
               arrow.drawTriangle(p);                              
            }            
         }         
      };
      create_arrow_grid.call(this);
      
      this.force_arrows = this.game.add.group();                  
      this.forces = [];
      
      (function(self){
         var num_forces= Math.random()*80;
         var x = Math.random()*self.world.width;
         var y = Math.random()*self.world.height;
         var fx = Math.random()*600;
         var fy = Math.random()*600;
         if( Math.random() >0.5){fx *= -1;}
         if( Math.random() >0.5){fy *= -1;}         
                        
         console.log(num_forces);
         for(var i = 0; i < 8; ++i){
            x = Math.random()*self.world.width;
            y = Math.random()*self.world.height;
            fx = Math.random()*600;
            fy = Math.random()*600;
            if( Math.random() >0.5){fx *= -1;}
            if( Math.random() >0.5){fy *= -1;}         
            
            self.forces.push({origin:new Phaser.Point(x,y),dir: new Phaser.Point(fx,fy)});               
         }
      })(this);
      
//      this.forces.push({origin:new Phaser.Point(400,200),dir: new Phaser.Point(-400,-400)});                     
//      this.forces.push({origin:new Phaser.Point(600,450),dir: new Phaser.Point(200,-200)});
//      this.forces.push({origin:new Phaser.Point(800,450),dir: new Phaser.Point(0,300)});
//      this.forces.push({origin:new Phaser.Point(1200,150),dir: new Phaser.Point(200,400)});
//      this.forces.push({origin:new Phaser.Point(1200,500),dir: new Phaser.Point(-150,-200)});
      
      var self = this;
      this.forces.forEach(function(f){
         function set_direction(obj,dir){            
            obj.angle = Math.atan2(dir.y,dir.x)*180/Math.PI;            
         }         
          var p = [];        
          p.push(new Phaser.Point(0,-4));
          p.push(new Phaser.Point(20,0));
          p.push(new Phaser.Point(0,4)); 
         
         var arrow = self.game.add.graphics(f.origin.x, f.origin.y,self.force_arrows);
         arrow.beginFill(0xff0000);
         arrow.lineStyle(1,0xff0000);
         arrow.drawTriangle(p);             
         set_direction(arrow,f.dir);
      });   
      
      
      this.ball = this.game.add.sprite(400,250,"ball");
      this.game.physics.arcade.enable(this.ball);      
      this.ball.body.bounce.y  = 0.5;
      this.ball.body.bounce.x  = 0.5;
      this.ball.body.gravity.y = 150;
      this.ball.body.collideWorldBounds = true;                  
      this.ball.anchor.setTo(0.5,0.5);                 
                  
      this.apply_forces.call(this,this.forces,this.arrows);
      
      this.game.time.advancedTiming = true;
      this.fps_text = this.game.add.text(500,10, "", {fontSize:"8px", fill:"#000000"});
      
                   
   },
   apply_forces:function apply_forces(forces,group){
         var self = this;
         function set_direction(obj,dir){            
            obj.angle = Math.atan2(dir.y,dir.x)*180/Math.PI;            
         }         
         function get_applied_force(force,origin){
            var result = new Phaser.Point(0,0);
            
            // get the distance away from the force
            var dist = origin.distance(force.origin);
            // scale the magnitude of the force by the distance
            var magnitude = force.dir.getMagnitude()/dist;
            
            // keep the same direction but scale the magnitude
            result.x = force.dir.x;
            result.y = force.dir.y;
            result.setMagnitude(magnitude);
            return result;            
         }
         
         function out_of_range(force, elem_origin){            
            function get_angle(a,b){            
               return Math.acos(a.dot(b)/(b.getMagnitude()*a.getMagnitude()) )*180/Math.PI;
            }             
            var ab = new Phaser.Point(elem_origin.x -force.origin.x,(elem_origin.y - force.origin.y) );
            var angle = get_angle(ab,force.dir);                        
            return (Math.abs(angle) >= 45);            
         }
      
         function get_mouse_force(elem,mouse_force){
            var dir = new Phaser.Point(mouse_force.origin.x - elem.position.x, mouse_force.origin.y - elem.position.y);
            var mag = mouse_force.mag/elem.position.distance(mouse_force.origin);
            dir.setMagnitude(mag);                        
            return dir;
         };
               
         var mouse_force = {
            origin: new Phaser.Point(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY),
            mag: 800
         };      

      
         group.forEach(function(elem){ 
            var elem_origin = new Phaser.Point(elem.x, elem.y);
            var current_forces = new Phaser.Point(1,0);
            
            forces.forEach(function(force){                              
               //get the amount of force this force applies on the object
               var applied_force = get_applied_force(force,elem_origin);               
               
               // add the amount for to the current forces on the object.
               current_forces.add(applied_force.x, applied_force.y);
            });                        
            
            // apply mouse force           
            if( this.game.input.activePointer.isDown){
               var m_force = get_mouse_force(elem, mouse_force);
               current_forces.add(m_force.x, m_force.y);
            }
            
            // set the direction of the object based on the overall force
            // being applied to the object.
            set_direction(elem,current_forces);
         },this);
      
      
         var current_forces = new Phaser.Point(0,0);         
         forces.forEach(function(force){                              
            //get the amount of force this force applies on the object
            var applied_force = get_applied_force(force,self.ball.body.position);
            // add the amount for to the current forces on the object.
            current_forces.add(applied_force.x, applied_force.y);
         });
         if( this.game.input.activePointer.isDown){            
            var m_force = get_mouse_force(this.ball.body,mouse_force);
            current_forces.add(m_force.x, m_force.y);
         }
         this.ball.body.gravity.x = current_forces.x*2;
         this.ball.body.gravity.y = current_forces.y*2;
               
         this.update_counter = 0;
      },
   update: function(){
      var self = this;      
//      this.forces.forEach(function(e,index){                  
//         var angle = Math.atan2(e.dir.y, e.dir.x)*180/Math.PI;         
//         e.dir = e.dir.rotate(0,0,angle + 5,true);
//         
//         var f = self.force_arrows.getAt(index);
//         f.angle = Math.atan2(e.dir.y,e.dir.x)*180/Math.PI;                     
//      });
      this.apply_forces.call(this,this.forces,this.arrows);
                           
      this.game.physics.arcade.collide(this.player, this.platforms);      
      this.game.physics.arcade.collide(this.stars, this.platforms);
      this.game.physics.arcade.overlap(this.player,this.stars,function(player,star){
         star.kill();
         this.score += 10;
         this.scoreText.text = "Score: " + this.score;
      },null,this);
      this.cursor_key_handler();
      if(this.score >= 100){
         this.game.state.start("titlescreen");
      }
      
      if (this.game.time.fps !== 0) {
        this.fps_text.setText(this.game.time.fps + ' FPS');
      }      
   },
   shutdown: function(){
      //this.game.state.start("titlescreen");  
   },
   paused: function(){      
      this.pauseText.visible = true;
   },
   pauseUpdate: function(){
      if( this.cursor.up.isDown){
         this.game.paused = false;
         this.pauseText.visible = false;
      }      
   },   
   cursor_key_handler: function(){
      this.player.body.velocity.x = 0;
      if( this.cursor.left.isDown){
         this.player.body.velocity.x = -150;
         this.player.animations.play("left");
      }else if( this.cursor.right.isDown){
         this.player.body.velocity.x = 150;
         this.player.animations.play("right");                  
      }else{
         this.player.animations.stop();
         this.player.frame =4;                  
      }
            
      if(this.cursor.up.isDown && this.player.body.touching.down){
         this.player.body.velocity.y = -350;
      }
      if( this.cursor.down.isDown){
         this.game.paused = true;
      }
   },
   create_a_player: function(x,y){
      var player = this.game.add.sprite(x,y,"dude");
      this.game.physics.arcade.enable(player);
      
      player.body.bounce.y  = 0.2;
      player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;
      
      player.animations.add('left',[0,1,2,3],10,true);
      player.animations.add('right',[5,6,7,8],10,true);
      return player;
   },
   render: function(){
      this.game.debug.pointer(this.game.input.activePointer);  
      this.game.debug.spriteInfo(this.ball,400,20);      
   }
};
module.exports = Game;*/
},{"../prefabs/Boid.js":2}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
function TitleScreen(){}

TitleScreen.prototype = {   
   preload:function preload(){
      
   },
   create:function create(){
      //var button  = this.game.cache.getImage("play_button");
      this.play_button = this.game.add.button(this.game.width/2,this.game.height/2,"play_button",this.play_button_click,this);
      this.play_button.anchor.setTo(0.5,0.5);
      //this.game.add.text(50,50,"play button", {fontSize:"8px Helvetica",fill:"#fff"});
   },
   update:function update(){      
   },  
   play_button_click: function play_button_click(){      
      this.game.state.start("game");
   }
};

module.exports = TitleScreen;
},{}]},{},[1]);
