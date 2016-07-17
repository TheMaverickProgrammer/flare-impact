ig.module(
	'game.entities.logo'
)
.requires(
	'impact.entity'
)
.defines(function(){
  EntityLogo = ig.Entity.extend({
    size: {x: 400, y: 300},

    animSheet: new ig.AnimationSheet( 'media/logo-lg.png', 400, 200 ),

  	init: function( x, y, settings ) {
  		this.parent( x, y, settings );

  		// Add the animations
  	  this.addAnim( 'idle', 1, [0] );
  	}
  });
  // end EntityLogo
});
