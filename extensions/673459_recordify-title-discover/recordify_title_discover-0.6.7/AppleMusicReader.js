function fetchCurrentService() {
	return "Apple Music";
}

function getAlbumURI() {
	titleName = fetchSongTitle();

	try {
		tracks = null;
		if (document.getElementById('schema:music-playlist') != null) {
			tracks = JSON.parse(document.getElementById('schema:music-playlist').innerHTML).track
		}
		else {
			tracks = JSON.parse(document.getElementById('schema:music-album').innerHTML).tracks
		}

		for (e of tracks) {
			if (e != null && e.name != null && e.name.toLowerCase() == titleName.toLowerCase()) {
				return e.url;
			}
		};
	} catch (error) {
		console.log(error)
	}
}

function fetchAlbumArt() {
	if (currCover === "") {
		amp = document.querySelector('amp-lcd[class*="lcd lcd__music"]');
		if (amp != null) {
			url = getAlbumURI();

			if (url != null) {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function () {
					if (request.readyState == 4) {
						try {
							artarr = request.response.querySelector('picture')
							sources = artarr.querySelector('source').srcset
							split = sources.split(',')
							currCover = split[split.length - 1].split(' ')[0]
						} catch (err) { }
					}
				};
				request.responseType = "document";
				request.open('get', e.url);
				request.send();
			}
		}
	}
	return currCover;
}

function fetchAlbum() {
	try {
		let amp = document.querySelector('amp-lcd[class*="lcd lcd__music"]');
		if (amp != null) {
			let shadowroot = amp.shadowRoot;
			let tmp = shadowroot.querySelectorAll('amp-marquee-text[class="lcd-meta__secondary"] div[class="lcd-meta-line__scrolling-text-chunk"] span[class="lcd-meta-line__fragment"]');
			if (tmp != null) {

				uri = getAlbumURI()
				if (songAlbumUri !== uri) {
					songAlbumUri = uri;
					songAlbum = tmp[tmp.length - 1].innerText.split(' - ')[0]
					currCover = "";
				}
			}
		}
	}
	catch (error) { }
	return songAlbum;
}

//done
function fetchSongArtist() {
	try {
		songArtist = "";
		let amp = document.querySelector('amp-lcd[class*="lcd lcd__music"]');
		if (amp != null) {
			let shadowroot = amp.shadowRoot;
			let tmp = shadowroot.querySelector('amp-marquee-text[class="lcd-meta__secondary"]');
			let spanElements = tmp.querySelector('span[class="lcd-meta-line__text-content"]').children;
			if (spanElements[0].innerText.includes(" & ")) {
				songArtist = spanElements[0].innerText;
			} else {
				let artists = [];
				for (let i = 0; i < spanElements.length; i++) {
					let innerText = spanElements[i].innerText;
					if (innerText == "—") {
						break;
					}
					if (innerText == ",") {
						continue;
					}
					artists.push(innerText);
				}
				songArtist = artists.join(", ");
			}
		}
	}
	catch (error) { }
	return songArtist;
}

//done
function fetchSongTitle() {
	try {
		let amp = document.querySelector('amp-lcd[class*="lcd lcd__music"]');
		if (amp != null) {
			let shadowroot = amp.shadowRoot;
			tmp = shadowroot.querySelector('div[class="lcd-meta__primary-wrapper"] div[class="lcd-meta-line__scrolling-text-chunk"] span[class="lcd-meta-line__fragment"]').innerText;
			if (tmp != null) {
				songTitle = tmp;
			}
		}
	}
	catch (error) { }
	return songTitle;
}

// done
function fetchIsPlaying() {
	let button = document.querySelectorAll('button[class="playback-play__play"]');
	if (button != null && button) {
		if (button[0].getAttribute("tabindex") != null) {
			return true;
		}
		else {
			return false;
		}
	}
	return false;
}

function fetchPlaybackPosition() {
	try {
		let amp = document.querySelector('amp-lcd[class*="lcd lcd__music"]');
		if (amp != null) {
			let shadowroot = amp.shadowRoot;
			tmp = shadowroot.querySelector('div[class="progress-range"] input[id="playback-progress"]').getAttribute('aria-valuenow');
			if (tmp != null) {
				playbackPosition = tmp;
			}
		}
	}
	catch (error) { }
	return playbackPosition;
}

function fetchPlaybackDuration() {
	try {
		let amp = document.querySelector('amp-lcd[class*="lcd lcd__music"]');
		if (amp != null) {
			let shadowroot = amp.shadowRoot;
			tmp = shadowroot.querySelector('div[class="progress-range"] input[id="playback-progress"]').getAttribute('aria-valuemax');
			if (tmp != null) {
				playbackDuration = tmp;
			}
		}
	}
	catch (error) { }
	return playbackDuration;
}

function isReady() {
	return true;
}