function fluid_mech(){
   this.grid = [];
   this.width = 0;
   this.height = 0;
   
   this.diffusion_rate = 0;
   this.sources = [];
   this.sinks = [];
};



// sources = [{x,y,amount},...]
// sinks = [{x,y,amount},...]
fluid_mechanics.prototype.set_grid(w,h){
   this.width = w;
   this.height= h;
   
   this.grid = [];
}
fluid_mechanics.prototype.set_sources(sources){this.sources = sources;}
fluid_mechanics.prototype.set_sinks(sinks){this.sinks = sinks;}
fluid_mechanics.prototype.set_diffusion_rate(rate){this.diffusion_rate = rate;}

module.exports = fluid_mechanics.js;