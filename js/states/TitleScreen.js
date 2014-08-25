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