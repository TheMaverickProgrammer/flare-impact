ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',

	// game specific dependencies
	'game.entities.flames',
	'game.levels.splash'
)
.defines(function(){
	MyGame = ig.Game.extend({

		// create a timer for lares
		fireTimer: new ig.Timer(),

		init: function() {
			this.loadLevel(LevelSplash);
			this.fireTimer.set(1);
		},

		update: function() {
			this.parent();

			// Use timer to spawn fireworks every second
			if( this.fireTimer.delta() > 0 ){
			  for (var i = 0; i <= 2; i++){
					randPos = {x: Math.random()*150, y: Math.random()*50};
					randPos.x += (640-380);
					randPos.y += (480-210);

			    ig.game.spawnEntity( Flames, randPos.x, randPos.y );
			  }
			  this.fireTimer.reset();
			}
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
		}
	});

	var scale = (window.innerWidth < 640) ? 2 : 0.5;


	// We want to run the game in "fullscreen", so let's use the window's size
	// directly as the canvas' style size.
	var canvas = document.getElementById('canvas');
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';


	// Listen to the window's 'resize' event and set the canvas' size each time
	// it changes.
	window.addEventListener('resize', function(){
		// If the game hasn't started yet, there's nothing to do here
		if( !ig.system ) { return; }

		// Resize the canvas style and tell Impact to resize the canvas itself;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );

		// Also repositon the touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.align();
		}
	}, false);


	// Finally, start the game into MyGame and use the ImpactSplashLoader plugin
	// as our loading screen
	var width = window.innerWidth * scale,
		height = window.innerHeight * scale;

	ig.main( '#canvas', MyGame, 60, width, height, 1, ig.ImpactSplashLoader );

});
