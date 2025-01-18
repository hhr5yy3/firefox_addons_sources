/*
 * Texture memory layout
 *
 * 0: White 1x1 (for gradients, etc.)
 * 1: Clouds and mountains
 * 2: Asphalt
 */


// Procedural texture generation

// XXX: <DEBUG>
const TEXTURE_SIZE = 2048 // Real texture size is n^2
const TEXTURE_MAPW = TEXTURE_SIZE / 2 - 16 // Texture atlas constant
const TEXTURE_MAPH = TEXTURE_SIZE / 8 - 16 // Texture atlas constant
const ASPHALT_TEXTURE_SIZE = TEXTURE_SIZE / 2
// XXX: </DEBUG>


var ctx = document.createElement("canvas").getContext("2d")
ctx.canvas.width = ctx.canvas.height = TEXTURE_SIZE
var img = ctx.createImageData(TEXTURE_MAPW, TEXTURE_MAPW)


// Upload a white 1x1 texture for drawing solid-color quads
gl.texImage2D(
    gl.TEXTURE_2D,
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture()),
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([ 255, 255, 255, 255 ])
)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)


/*
 * Multiple cloud layers:
 *
 * - Render two fractal-clouds into the texture
 * - Clouds are rendered in the alpha channel of a solid color: rgb(220,200,220)
 * - Give each layer a constant velocity (wind)
 * - In the scene, draw the upper and lower halves of each cloud with a linear
 *   gradient fading at the bottom; rgba(1,1,1,1)..rgb(0,0,0,0)
 */
for (var i = 0; i < 2; i++) {
    // Setup initial fractal state
    fractal(.3, 2, heightMapFn, halfWeightFn)

    // RENDER CLOUDS
    tmp = 0
    for (var y = 0; y < TEXTURE_MAPW; y++) {
        for (var x = 0; x < TEXTURE_MAPW; x++) {
            // Interpolate between each node
            var sx = x / TEXTURE_MAPW * FRACTAL_SIZE,
                sy = y / TEXTURE_MAPW * FRACTAL_SIZE,

                p1 = fractalData[~~sy][~~sx],
                p2 = fractalData[~~sy][~~sx + 1],
                p3 = fractalData[~~sy + 1][~~sx],
                p4 = fractalData[~~sy + 1][~~sx + 1],

                h = (
                    (p1 + (p2 - p1) * (sx % 1)) * (1 - sy % 1) +
                    (p1 + (p3 - p1) * (sy % 1)) * (1 - sx % 1) +
                    (p3 + (p4 - p3) * (sx % 1)) * (sy % 1) +
                    (p2 + (p4 - p2) * (sy % 1)) * (sx % 1)
                ) / 2

            // Choose color and alpha based on node height
            img.data[tmp++] = img.data[tmp++] = img.data[tmp++] = 255
            img.data[tmp++] = h * 255
        }
    }

    // Duplicate pixels on the horizontal edges to fix texture seams when tiled
    for (var x = 4; x < 8; x++) {
        ctx.putImageData(img, TEXTURE_MAPW + 16 + x, (TEXTURE_MAPW + 16) * i + 8)
    }
    for (var x = 12; x >= 8; x--) {
        ctx.putImageData(img, TEXTURE_MAPW + 16 + x, (TEXTURE_MAPW + 16) * i + 8)
    }

    // Update progress bar
    progress()
}


/*
 * 16 layers can be packed into 4 textures (each layer is 1/4 texture height)
 * Draw 8 ridges per layer with pre-computed fog (? Need a good interpolation function)
 * Apply ambient fog (and light) in the fragment shader
 *
 * 16 parallax layers? holy crap! O_o  Probably 8 layers is better!
 * 8 layers in 2 textures; 16 mountain ridges each.
 *
 * To properly shift the distant mountains up, a small triangle strip must run
 * along the bottom, using the foregroound mountain color. For simplicity, the
 * same kind of strip is needed at the bottom of each layer.
 *
 * It can just stretch a pixel from the bottom of the same texture
 *
 *
 * Each layer:
 * - is a very wide quad
 * - uses texture coordinates that repeat left and right
 * - has an equally wide quad just below, with a single pixel stretched across
 *
 *
 * Tips:
 * - Use the depth buffer ? (draw transparents last, in sorted order)
 * - Group all objects by texture; draw the entire group in one call
 */

// Reinitialize fractal state
fractal(.5, 2, heightMapFn, halfWeightFn)

// RENDER MOUNTAINS
ctx.save()
ctx.translate(8, 8)
for (var i = 0; i < 8; i++) {
    for (var y = 0; y < 16; y++) {
        ctx.beginPath()

        // Choose a color based on depth
        ctx.fillStyle =
            "rgb(" +
            ~~(((16 - y) / 16 * .125 + .875) * 255) + "," +
            ~~(((16 - y) / 16 * .125 + .875) * 255) + "," +
            "255)"

        ctx.moveTo(-4, TEXTURE_MAPH + 4)
        ctx.lineTo(-4,
            (
                1 - (fractalData[y + i * 16][0] * ((8 - i) / 16 + .5) * .8 + .2)
            ) * TEXTURE_MAPH + y / 16 * .2 * TEXTURE_MAPH
        )

        for (var x = 0; x <= FRACTAL_SIZE; x++) {
            ctx.lineTo(x / FRACTAL_SIZE * TEXTURE_MAPW,
                (
                    1 - (fractalData[y + i * 16][x] * ((8 - i) / 16 + .5) * .8 + .2)
                ) * TEXTURE_MAPH + y / 16 * .2 * TEXTURE_MAPH
            )
        }

        ctx.lineTo(TEXTURE_MAPW + 4,
            (
                1 - (fractalData[y + i * 16][0] * ((8 - i) / 16 + .5) * .8 + .2)
            ) * TEXTURE_MAPH + y / 16 * .2 * TEXTURE_MAPH
        )
        ctx.lineTo(TEXTURE_MAPW + 4, TEXTURE_MAPH + 4)
        ctx.fill()
    }
    ctx.translate(0, TEXTURE_MAPH + 16)
}
ctx.restore()


// Upload the mountains/clouds texture to the GPU
gl.activeTexture(gl.TEXTURE1)
gl.texImage2D(
    gl.TEXTURE_2D,
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture()),
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    ctx.canvas
)

// Disable mipmap on the background texture (not needed, and causes texture seams)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

// Update progress bar
progress()


// RENDER ASPHALT

// Clear destination texture
ctx.canvas.width = ctx.canvas.height = TEXTURE_SIZE

// Reuse cloud texture data ;)
ctx.putImageData(img, 0, 0)

// Scale the cloud texture to fit
ctx.save()
ctx.globalCompositeOperation = "copy"
ctx.drawImage(ctx.canvas, 0, 0, TEXTURE_MAPW, TEXTURE_MAPW, 0, 0, ASPHALT_TEXTURE_SIZE, ASPHALT_TEXTURE_SIZE)
ctx.restore()

// Get the scaled image data
img = ctx.getImageData(0, 0, ASPHALT_TEXTURE_SIZE, ASPHALT_TEXTURE_SIZE)

tmp = 0
for (var y = 0; y < ASPHALT_TEXTURE_SIZE; y++) {
    for (var x = 0; x < ASPHALT_TEXTURE_SIZE; x++) {
        // Mix alpha channel with white noise, and limit to [104..152]
        var gray = Math.min(Math.max((img.data[tmp + 3] / (16 / 3) + 104) * (Math.random() * 2 - 1), 0), 255)

        // Add some fake blur
        if (y) {
            gray = (
                gray + img.data[tmp - 4] +
                img.data[tmp - ASPHALT_TEXTURE_SIZE * 4]
            ) / 3
        }

        // Grayscale
        img.data[tmp++] = img.data[tmp++] = img.data[tmp++] = gray

        // Full alpha
        img.data[tmp++] = 255
    }
}

tmp = 0
for (var x = 0; x < ASPHALT_TEXTURE_SIZE; x++) {
    // Blur the top line after the bottom line
    gray = (
        img.data[tmp] + img.data[(tmp - 4) & (ASPHALT_TEXTURE_SIZE - 1)] +
        img.data[(tmp - ASPHALT_TEXTURE_SIZE * 4) & (ASPHALT_TEXTURE_SIZE * ASPHALT_TEXTURE_SIZE - 1)]
    ) / 3

    img.data[tmp++] = img.data[tmp++] = img.data[tmp++] = gray
    tmp++
}

tmp = 0
for (var y = 0; y < ASPHALT_TEXTURE_SIZE; y++) {
    for (var x = 0; x < ASPHALT_TEXTURE_SIZE; x++) {
        gray = img.data[tmp]

        // Add some fake emboss
        if (
            (img.data[(tmp - 4) & (ASPHALT_TEXTURE_SIZE - 1)] < 64) ||
            (img.data[(tmp - ASPHALT_TEXTURE_SIZE * 4) & (ASPHALT_TEXTURE_SIZE - 1)] < 64)
        ) {
            gray += 64
        }

        // Desaturate
        img.data[tmp++] = img.data[tmp++] = img.data[tmp++] = gray / 4

        tmp++
    }
}

ctx.putImageData(img, 0, 0)
ctx.putImageData(img, ASPHALT_TEXTURE_SIZE, 0)
ctx.putImageData(img, 0, ASPHALT_TEXTURE_SIZE)
ctx.putImageData(img, ASPHALT_TEXTURE_SIZE, ASPHALT_TEXTURE_SIZE)

// Update progress bar
progress()

function yellowStripes(u, v) {
    // Get the center vertical strip of asphalt texture
    img = ctx.getImageData(ASPHALT_TEXTURE_SIZE / 2 - 30 + u, v, 60, ASPHALT_TEXTURE_SIZE)

    tmp = 0
    for (var y = 0; y < ASPHALT_TEXTURE_SIZE; y++) {
        for (var x = 0; x < 60; x++) {
            gray = img.data[tmp]

            // Yellow lines
            if (
                (gray > 20 && (
                    (x > 2 && x < 20 && (u || v || y < ASPHALT_TEXTURE_SIZE / 2)) ||
                    (x > 40 && x < 58 && (!u || v || y < ASPHALT_TEXTURE_SIZE / 2))
                )) ||
                (gray > 28 && (
                    (x < 22 && (u || v || y < ASPHALT_TEXTURE_SIZE / 2)) ||
                    (x > 38 && (!u || v || y < ASPHALT_TEXTURE_SIZE / 2))
                ))
            ) {
                gray = gray / 55 + .2

                img.data[tmp++] = 230 * gray + Math.random() * 20
                img.data[tmp++] = 183 * gray + Math.random() * 5
                img.data[tmp++] = 22 * gray + Math.random() * 5

                tmp++
            }
            else {
                tmp += 4
            }
        }
    }

    ctx.putImageData(img, ASPHALT_TEXTURE_SIZE / 2 - 30 + u, v)
}

yellowStripes(0, 0)
yellowStripes(0, ASPHALT_TEXTURE_SIZE)
yellowStripes(ASPHALT_TEXTURE_SIZE, 0)
yellowStripes(ASPHALT_TEXTURE_SIZE, ASPHALT_TEXTURE_SIZE)

function whiteStripes(u) {
    // Get the center vertical strip of asphalt texture
    img = ctx.getImageData(u, 0, 22, ASPHALT_TEXTURE_SIZE * 2)

    tmp = 0
    for (var y = 0; y < ASPHALT_TEXTURE_SIZE * 2; y++) {
        for (var x = 0; x < 22; x++) {
            gray = img.data[tmp]

            // White lines
            if (
                (gray > 20 && (x > 2 && x < 20)) ||
                (gray > 28 && (x < 22))
            ) {
                gray = gray / 55 + .2

                var random = Math.random() * 20

                img.data[tmp++] = 200 * gray + random
                img.data[tmp++] = 200 * gray + random
                img.data[tmp++] = 200 * gray + random

                tmp++
            }
            else {
                tmp += 4
            }
        }
    }

    ctx.putImageData(img, u, 0)
}

whiteStripes(20)
whiteStripes(ASPHALT_TEXTURE_SIZE - 22 - 20)
whiteStripes(ASPHALT_TEXTURE_SIZE + 20)
whiteStripes(ASPHALT_TEXTURE_SIZE * 2 - 22 - 20)


// Upload the asphalt texture to the GPU
gl.activeTexture(gl.TEXTURE2)
gl.texImage2D(
    gl.TEXTURE_2D,
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture()),
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    ctx.canvas
)

// We want a mipmap for asphalt
gl.generateMipmap(gl.TEXTURE_2D)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)

if (anisotropic) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_ANISOTROPY_EXT, anisotropic)
}

// Update progress bar
progress()
