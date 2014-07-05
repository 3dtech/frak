/** FontData class is used to keep font data */
var FontData=Class.extend({
	/** Constructor 
		@param xmlData Parsed XML data from bmfont output (Andreas Jönsson - http://www.angelcode.com/products/bmfont/) */
	init: function(xmlData) {
		this.xmlData=xmlData;	// Original data
		
		var common=$(xmlData).find('font common');
		this.width=parseInt(common.attr('scaleW'));
		this.height=parseInt(common.attr('scaleH'));
		this.size=vec2.fromValues(this.width, this.height);
		this.lineHeight=parseInt(common.attr('lineHeight'));
		this.baseline=parseInt(common.attr('base'));
		
		this.characters={};   // Characters that can be used during rendering as:
		                      /* { 
														<id>: { 
															'position':<vec2>,           - Position in pixel based units
															'size':<vec2>,               - Pixel based size of font character
															'normalizedPosition':<vec2>, - Normalized position
															'normalizedSize':<vec2>,     - Normalized size
															'offset':<vec2>, 
															'xadvance':<float>, 
															'page': <int>}, ... 
														}
													} */
		this.kernings={};			// Kernings between characters as:
		                      // {
													//   <first id>: {
													//     <second id>: <float>
													//   }, ...
													// }
		
		var me=this;
		$(xmlData).find('font chars char').each(
			function() {
				me.characters[$(this).attr('id')]={
					'position': vec2.fromValues($(this).attr('x'), $(this).attr('y')),
					'size': vec2.fromValues(parseInt($(this).attr('width')), parseInt($(this).attr('height'))),
					'offset': vec2.fromValues($(this).attr('xoffset'), $(this).attr('yoffset')),
					'normalizedPosition': vec2.fromValues($(this).attr('x')/me.width, 1.0-$(this).attr('y')/me.height-$(this).attr('height')/me.height),
					'normalizedSize': vec2.fromValues(-$(this).attr('width')/me.width, -$(this).attr('height')/me.height),
					'xadvance': $(this).attr('xadvance'),
					'page': $(this).attr('page')
				};
			}
		);
		
		$(xmlData).find('font kernings kerning').each(
			function() {
				if(!me.kernings[$(this).attr('first')]) me.kernings[$(this).attr('first')]={};
				me.kernings[$(this).attr('first')][$(this).attr('second')]=parseInt($(this).attr('amount'));
			}
		);
	}
});