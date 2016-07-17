ig.module(
	'game.entities.flames'
)
.requires(
	'impact.entity',
  'game.entities.particle'
)
.defines(function(){
  Flames = EntityParticle.extend({
    // longer lifetime
    lifetime: 3.0,
    fadetime: 1.5,

    // velocity value to be set
    vel: null,

    gravityFactor: 0,

    // bounce a little less
    bounciness: 0.6,

    // add animation sheet of sprites
    animSheet: new ig.AnimationSheet('media/pixel.png',1,1),

    init: function( x, y, settings ){
      // add ember animation
     this.addAnim( 'idle', 0.3, [254, 127, 0] );

     // update random velocity to create starburst effect
     this.vel = { x: (Math.random() < 0.5 ? -1 : 1)*Math.random()*100,
                  y: (Math.random() < 0.5 ? -1 : 1)*Math.random()*100 };

      // send to parent
      this.parent( x, y, settings );
    },

    update: function() {
      this.vel.y -= 10; // particles move up
      this.pos.x += Math.sin((this.pos.y*(22/7))/100); // make it swirl upwards

      this.parent();
    }
  });
});
