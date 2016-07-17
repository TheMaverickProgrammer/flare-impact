ig.module(
	'game.entities.particle'
)
.requires(
	'impact.entity'
)
.defines(function(){
  EntityParticle = ig.Entity.extend({
    // single pixel sprites
    size: { x:1, y:1 },
    offset: { x:0, y:0 },

    // particle will collide but not effect other entities
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.LITE,

    // default particle lifetime & fadetime
    lifetime: 5,
    fadetime: 1,

    // particles will bounce off other entities when it collides
    minBounceVelocity: 0,
    bounciness: 1.0,
    friction: { x:0, y:0 },

    init: function( x, y, settings ){
      this.parent( x, y, settings );

      // take velocity and add randomness to vel
      var vx = this.vel.x; var vy = this.vel.y;
      this.vel.x = (Math.random()*2 - 1)*vx;
      this.vel.y = (Math.random()*2 - 1)*vy;

      // creates a flicker effect
      this.currentAnim.gotoRandomFrame();

      // init timer for fadetime
      this.idleTimer = new ig.Timer();
    },

    update: function(){
      // check if particle has existed past lifetime
      // if so, remove particle
      if(this.idleTimer.delta() > this.lifetime){
        this.kill();
        return;
      }

      // fade the particle effect using the aplha blend
      this.currentAnim.alpha = this.idleTimer.delta().map( this.lifetime - this.fadetime, this.lifetime, 1, 0 );
      this.parent();
    }

  });
});
