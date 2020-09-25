// jPlayer Initialization

(function($) {

	initSinglePlayer();
	
	function initSinglePlayer() {
		var players = $('.jplayer');
		players.each( function(e) {
			var player = $(this);
			var ancestor = player.data('ancestor');
			var songUrl = player.data('url');
			player.jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						mp3:songUrl
					});
				},
				play: function() { // To avoid multiple jPlayers playing together.
					$(this).jPlayer("pauseOthers");
					try {
						wavesurfer.pause();
					} catch(err) {
						return;
					}
				},
				swfPath: "jPlayer",
				supplied: "mp3",
				cssSelectorAncestor: ancestor,
				wmode: "window",
				globalVolume: false,
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				solution: 'html',
				preload: 'metadata',
				volume: 0.8,
				muted: false,
				backgroundColor: '#000000',
				errorAlerts: false,
				warningAlerts: false
			});
		});
	}

	function currentTimeAlign () {
		$('.jp-progress').each(function() {
			var jpPBarW = $(this).find('.jp-play-bar').innerWidth();
			if(jpPBarW > 40 ) {
				$(this).addClass('middle');
			} else {
				$(this).removeClass('middle');
			}
		});
	}
	setInterval(currentTimeAlign, 10);
	

	
	$('.single_player').each( function() {
		// var ffaction;
		var rwaction,
			rewinding,
			fastforward,
			thisItem = $(this),
			player = thisItem.find('.jplayer');

		thisItem.find('.jp-next').click(function (e) { 
			FastforwardTrack();
		});

		thisItem.find('.jp-prev').click(function (e) { 
			RewindTrack();
		});


		function GetPlayerProgress() {
			return (thisItem.find('.jp-play-bar').width() / $('.jp-seek-bar').width() * 100);
		}

		function RewindTrack() {
			//Get current progress and decrement
			var currentProgress = GetPlayerProgress();
			var futureProgress = currentProgress - 5;
			//If it goes past the starting point - stop rewinding and pause
			if (futureProgress <= 0) {
				rewinding = false;
				window.clearInterval(rwaction);
				player.jPlayer("pause", 0);
			}
			//Continue rewinding
			else {
				player.jPlayer("playHead", parseInt(futureProgress, 10));
			}
		}

		function FastforwardTrack() {
			//Get current progress and increment
			var currentProgress = GetPlayerProgress();
			var futureProgress = currentProgress + 5;
			//If the percentage exceeds the max - stop fast forwarding at the end.
			if (futureProgress >= 100) {
				fastforward = false;
				window.clearInterval(ffaction);
				player.jPlayer("playHead", parseInt($('.jp-duration').text().replace(':', '')));
			}
			else {
				player.jPlayer("playHead", parseInt(futureProgress, 10));
			}
		}
	});

})(jQuery);

