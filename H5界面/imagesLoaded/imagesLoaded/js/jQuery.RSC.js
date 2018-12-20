( function ( $ ) {
	$.fn.RSC = function ( options ) {
		var defaults = {
			prevImageID: "#prev",
			nextImageID: "#next",
			noOfContainer: 6,
			containerW: 500,
			duration: 1000
		};
		var op = $.extend( defaults, options );
		var pathObj = $( '#container' ).children();
		var i = 0;

		function loadImg( url, obj, loading, msg )
		{
			$( loading ).css( {
				"display": "block"
			} ).animate( {
				opacity: 1
			}, 1000 );
			$( obj ).html( "<img src='" + url + "' width='500px' height='350px'/>" ).css( {
				opacity: 0
			} );
			var tmp = $( obj ).children();
			tmp[ 0 ].onload = function () {
				$( obj ).animate( {
					opacity: 1
				}, 1000 );
				$( loading ).animate( {
					opacity: 0
				}, 1000 ).css( {
					"display": "none"
				} );
			}
			tmp[ 0 ].onerror = function () {
				$( this ).css( {
					"display": "none"
				} );
				$( obj ).html( $( obj ).html() + "<div>" + msg + "</div>" ).animate( {
					opacity: 1
				}, 1000 );
				$( loading ).animate( {
					opacity: 0
				}, 1000 ).css( {
					"display": "none"
				} );
			}
		}

		function getImg( obj )
		{
			url = $( obj ).css( {
				"display": "block",
				"visibility": "visible"
			} ).html();
			loaded = false;
			if ( url.search( /<.*/ ) != -1 )
			{
				loaded = true;
				tmp = $( obj ).children();
				url = $( tmp[ 0 ] ).attr( "src" );
				if ( tmp[ 1 ] != undefined )
					loaded = false;
			}
			if ( !loaded )
				loadImg( url, obj, "#loading",
					"there seems to be an issue, try again later" );
		}
		getImg( pathObj[ 0 ] );
		return this.each( function () {
			$( this ).click( function ()
			{
				if ( this.id == op.prevImageID.replace( "#", "" ) )
				{
					i++;
					if ( i > 0 )
						i = ( 0 - ( op.noOfContainer - 1 ) )
				}
				else if ( this.id == op.nextImageID.replace( "#", "" ) )
				{
					i--;
					if ( i < ( 0 - ( op.noOfContainer - 1 ) ) )
						i = 0;
				}
				$( "div#container" ).animate( {
					marginLeft: i * op.containerW + "px"
				}, op.duration, function () {
					var imgObj = getImg( pathObj[ 0 - i ] );
				} );
			} );
		} );
	};
} )( jQuery );