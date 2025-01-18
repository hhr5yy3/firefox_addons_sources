/**
 * Converts any colour to rgba object.
 * @author JayB on Stack Overflow (modified by Eason Wong).
 * @param {string | Number[]} colour Colour to convert.
 * @returns Colour in rgba object. Pure black if invalid.
 */
export function rgba(colour) {
	if (typeof colour == "string") {
		if (colour == "DEFAULT" || colour == "DARKNOISE" || colour == "PLAINTEXT" || colour == "HOME" || colour == "FALLBACK") return colour;
		var canvas = document.createElement("canvas").getContext("2d");
		canvas.fillStyle = colour;
		let colour_temp = canvas.fillStyle;
		if (colour_temp.startsWith("#")) {
			let r = colour_temp[1] + colour_temp[2];
			let g = colour_temp[3] + colour_temp[4];
			let b = colour_temp[5] + colour_temp[6];
			return {
				r: parseInt(r, 16),
				g: parseInt(g, 16),
				b: parseInt(b, 16),
				a: 1,
			};
		} else {
			let result = colour_temp.match(/[.?\d]+/g).map(Number);
			return {
				r: result[0],
				g: result[1],
				b: result[2],
				a: result[3],
			};
		}
	} else if (typeof colour == "object") {
		return { r: colour[0], g: colour[1], b: colour[2], a: colour[3] };
	} else {
		return null;
	}
}

/**
 * Dims or lightens colour.
 * @param {object} colour Colour to process, in rgb object.
 * @param {number} dim between -1.0 (dim) to 1.0 (light).
 * @returns Dimmed or lightened colour string.
 */
export function dimColour(colour, dim) {
	let result = Object.assign({}, colour);
	if (dim > 0) {
		result.r = colour.r + dim * (255 - colour.r);
		result.g = colour.g + dim * (255 - colour.g);
		result.b = colour.b + dim * (255 - colour.b);
	} else if (dim < 0) {
		result.r = (dim + 1) * colour.r;
		result.g = (dim + 1) * colour.g;
		result.b = (dim + 1) * colour.b;
	}
	return "rgb(" + Math.floor(result.r) + ", " + Math.floor(result.g) + ", " + Math.floor(result.b) + ")";
}

/**
 * Overlays one colour over another.
 * @param {Object} colourTop Colour on top.
 * @param {Object} colourBottom Colour underneath.
 * @returns Result of the addition in object.
 */
export function overlayColour(colourTop, colourBottom) {
	let a = (1 - colourTop.a) * colourBottom.a + colourTop.a;
	if (a == 0) {
		// Firefox renders transparent background in rgb(236, 236, 236)
		return rgba([236, 236, 236, 0]);
	} else {
		return {
			r: ((1 - colourTop.a) * colourBottom.a * colourBottom.r + colourTop.a * colourTop.r) / a,
			g: ((1 - colourTop.a) * colourBottom.a * colourBottom.g + colourTop.a * colourTop.g) / a,
			b: ((1 - colourTop.a) * colourBottom.a * colourBottom.b + colourTop.a * colourTop.b) / a,
			a: a,
		};
	}
}

/**
 * Copies rgba objects.
 * @param {Object} target Target colour object.
 * @param {Object} source Source colour object.
 */
export function cc(target, source) {
	target.r = source.r;
	target.g = source.g;
	target.b = source.b;
	target.a = source.a;
}
