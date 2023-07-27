

/** FontData class is used to keep font data */

class FontData {
	xmlData: any;
	width: any;
	height: any;
	size: any;
	lineHeight: any;
	baseline: any;
	characters: any;
	kernings: any;
	
	/** Constructor
		@param xmlData Parsed XML data from bmfont output (Andreas Jönsson - http://www.angelcode.com/products/bmfont/) */
	constructor(xmlData) {
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
															'page': <int>} ...
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
				var x = parseFloat($(this).attr('x'));
				var y = parseFloat($(this).attr('y'));
				var width = parseInt($(this).attr('width'));
				var height = parseInt($(this).attr('height'));
				var xoffset = parseFloat($(this).attr('xoffset'));
				var yoffset = parseFloat($(this).attr('yoffset'));

				me.characters[$(this).attr('id')]={
					'position': vec2.fromValues(x, y),
					'size': vec2.fromValues(width, height),
					'offset': vec2.fromValues(xoffset, yoffset),
					'normalizedPosition': vec2.fromValues(x/me.width, 1.0-y/me.height-height/me.height),
					'normalizedSize': vec2.fromValues(-width/me.width, -height/me.height),
					'xadvance': parseInt($(this).attr('xadvance')),
					'page': parseInt($(this).attr('page'))
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

}

globalThis.FontData = FontData;

export default FontData;