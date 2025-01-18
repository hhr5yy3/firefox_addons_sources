/*
 * From the SlowAES project, http://code.google.com/p/slowaes/
 * 
 * Copyright (c) 2008 	Josh Davis ( http://www.josh-davis.org ),
 *						Mark Percival ( http://mpercival.com ),
 *						Johan Sundstrom ( http://ecmanaut.blogspot.com ),
 *			 			John Resig ( http://ejohn.org )
 * 
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/
 */

var Base64 = {
	
	chars: [
    	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    	'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    	'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    	'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    	'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    	'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    	'w', 'x', 'y', 'z', '0', '1', '2', '3',
    	'4', '5', '6', '7', '8', '9', '+', '/',
    	'=', // for decoding purposes
	],

	encode_line: function(bytes){
		var b64 = '';

		for (var i = 0; i < bytes.length; i += 3){
			b64 += this.chars[bytes[i] >> 2];
			b64 += this.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
			if (!(bytes[i + 1] == null)){
				b64 += this.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
			}else{
				b64 += '=';
			}
			if (!(bytes[i + 2] == null)){
				b64 += this.chars[bytes[i + 2] & 63];
			}else{
				b64 += '=';
			}
		}
		return b64;
	},

	encode: function(bytes)
	{
		var b64 = this.encode_line(bytes);
		// OpenSSL is super particular about line breaks
		var broken_b64 = b64.slice(0, 64) + '\n';
		for (var i = 1; i < (Math.ceil(b64.length / 64)); i++)
		{
			broken_b64 += b64.slice(i * 64, i * 64 + 64) + (Math.ceil(b64.length / 64) == i + 1 ? '': '\n');
		}
		return broken_b64;
	},

    decode: function(string)
	{
		string = string.replace(/[\r\n\t ]+/g, '') + '===='; // drop all whitespaces and pad with '=' (end of b64 marker)
		var bytes = [];
		var c = [];
		for (var i = 0; ; i = i + 4){
			c[0] = this.chars.indexOf(string.charAt(i));
			if(c[0] == 64){
				return bytes;
			}
			c[1] = this.chars.indexOf(string.charAt(i + 1));
			c[2] = this.chars.indexOf(string.charAt(i + 2));
			c[3] = this.chars.indexOf(string.charAt(i + 3));

			if(
				(c[0] < 0) || // char1 is wrong
				(c[1] < 0) || (c[1] == 64) || // char2 is wrong
				(c[2] < 0) || // char3 is neither an valid char nor '='
				(c[3] < 0)    // char4 is neither an valid char nor '='
			){
				throw 'error during base64 decoding at pos '+i+': cryptoHelpers.base64.decode.';
			}

			bytes.push((c[0] << 2) | (c[1] >> 4));
			if(c[2] >= 0 && c[2] < 64){
				bytes.push(((c[1] & 15) << 4) | (c[2] >> 2));
				if(c[3] >= 0 && c[3] < 64){
					bytes.push(((c[2] & 3) << 6) | c[3]);
				}
			}
		}
	}
	
};
