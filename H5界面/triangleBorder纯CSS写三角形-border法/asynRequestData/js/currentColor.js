$( function () {
	var divHeight = $( '.header' ).height();
	console.log( divHeight )
	var w = window.screen.availWidth;
	var h = window.screen.availHeight;
	console.log( w, h )
	$( '.container' ).css( 'min-height', h - divHeight + 'px' );

	$( '#btnScale' ).click( function () {
		changeColor();
	} )
} )

var scale = 1;

function changeColor() {
	$( '#btnScale' ).toggleClass( 'btn-red' );
	$( '#show p a' ).toggleClass( 'ico-a-red' );
	var transform = '';
	if ( scale == 1 ) {
		scale = 2;
		$( '#btnScale' ).html( '比例还原' );
	} else {
		scale = 1;
		$( '#btnScale' ).html( '点击我所有小图标2倍放大' );
	}
	transform = 'scale(' + scale + ')';
	$( ".ico-a" ).each( function ( index, val ) {
		$( ".ico-a" ).eq( index ).find( ".ico" ).css( 'webkitTransform', transform );
		$( ".ico-a" ).eq( index ).find( ".ico" ).css( 'msTransform', transform );
		$( ".ico-a" ).eq( index ).find( ".ico" ).css( 'transform', transform );
		if ( window.addEventListener ) {
			$( ".ico-a" ).eq( index ).find( ".ico" ).css( 'margin', "0 " + 10 * (
					scale - 1 ) +
				"px" );
		} else {
			$( ".ico-a" ).eq( index ).find( ".ico" ).css( 'zoom', 'scale' );
		}
	} )
}