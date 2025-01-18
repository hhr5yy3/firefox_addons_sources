/**
 * replacement Scratchpad editor
 * foreground page script
 * no privileged listeners or methods
 *
 * TODO:
 *   more per-scratchpad settings
 *   i18n ?
 */
(function () {
	'use strict';

	var
		reader = new FileReader(), // to "upload" inputFile into CodeMirror
		dom = {},                  // persistent DOM references
		tabSize = 2,
		lastSave,                  // last saved scratchpad history version
		editor;                    // CodeMirror object for scratchpad text

	// window beforeunload
	//   confirm close if unsaved data
	// document.body contextmenu
	//   prevent context menu (maybe add a different one later)
	function preventDefault( e ) {
		e.preventDefault();
	}

	// blur things that shouldn't keep focus
	function onFocusIn( e ) {
		e.target.blur();
	}

	// update CodeMirror cursor status
	function onInput( e ) {
		var
			cursor = e.doc.getCursor(),
			data = ( cursor.line + 1 ).toString(),
			line = e.doc.getLine( cursor.line ),
			i, t;

		if ( dom.spanLine.textContent !== data ) {
			dom.spanLine.textContent = data;
		}
		// count tabs correctly
		t = 0;
		for ( i = 0; i < cursor.ch; ++i ) {
			if ( line.charAt( i ) === '\t' ) {
				t = Math.floor( t / tabSize + 1 ) * tabSize;
			} else {
				++t;
			}
		}
		data = ( t + 1 ).toString();
		if ( dom.spanCol.textContent !== data ) {
			dom.spanCol.textContent = data;
		}

		// update the dirty character on changes
		t = document.title;
		if ( t[0] === '*' ) {
			if ( editor.doc.isClean( lastSave ) ) {
				removeEventListener( 'beforeunload', preventDefault );
				document.title = t.slice( 1 ); // remove dirty character
			}
		} else if ( !editor.doc.isClean( lastSave ) ) {
				addEventListener( 'beforeunload', preventDefault );
				document.title = '*' + t;      // add dirty character
		}
	}

	// focus the editor when the pointer enters so the cursor becomes visible
	function onPointerEnter() {
		editor.focus();
	}

	// Step #3: Success (?)
	// load the editor from a File
	// strip CRs from the text
	function onReaderLoad( e ) {
		if ( document.title[0] === '*' ) {
			removeEventListener( 'beforeunload', preventDefault );
		}
		// "open" is "upload," but get the filename in the download link
		document.title = dom.aDownload.download;
		// CodeMirror "events" are synchronous
		// so turn off the cursor event to load a new file
		editor.off( 'cursorActivity', onInput );
		editor.doc.setValue( e.target.result.replace( /\r/g, '' ) );
		// then turn it back on
		editor.on( 'cursorActivity', onInput );
		lastSave = editor.doc.changeGeneration();
	}
	reader.addEventListener( 'load', onReaderLoad );
	// (try to) log errors
	function onReaderError( e ) {
		console.error( e.target.error.name );
	}
	reader.addEventListener( 'error', onReaderError );

	// Step #2: the file picker has picked a file
	// send it to FileReader, which is async
	function onFileChange() {
		var
			file;

		if ( dom.inputFile.files.length ) {
			file = dom.inputFile.files[ 0 ];
			reader.readAsText( file );
			// "open" is "upload," but remember the filename in the download link
			dom.aDownload.download = file.name;
		}
	}

	// Step #1a: confirm discarding unsaved changes
	function onClickDialog( e ) {
		// re-hide the dialog
		dom.divOverlay.classList = 'hidden';
		if ( e.target.id === 'buttonOK' ) {
			// pass the click from buttonOK to inputFile
			dom.inputFile.click();
		}
	}

	// Step #1: consume the click from buttonOpen
	// input type="file" sets a FileList object for FileReader
	function onClickOpen() {
		if ( document.title[0] === '*' ) {
			// unhide the modal dialog
			dom.divOverlay.classList = '';
			// focusVisible is non-standard & requires FF104
			dom.buttonCancel.focus();
		} else {
			// pass the click from buttonOpen to inputFile
			dom.inputFile.click();
		}
	}

	// the only good reason to lose focus is something else has it
	// or the modal dialog closed
	function onTimeout( e ) {
		if (
			!dom.divOverlay.querySelector( ':focus' ) &&
			!dom.divOverlay.classList.value
		) {
			// focus the last thing that had focus
			e.focus();
		}
	}

	// keep the buttons focussed in the modal dialog
	function onBlur( e ) {
		// enqueue the last thing that had focus
		setTimeout( onTimeout, 0, e.target );
	}

	// save editor to a file, using configured browser defaults
	// 1. put the text in a Blob with appropriate MIME type
	// 2. "download" it using a blob: URL
	// 3. revoke the URL for security, memory, puppies, etc.
	// This user routine is superseded if middle.js loads.
	function onClickSave() {
		var
			blob = new Blob( [ editor.doc.getValue() ], { type: 'text/plain' } ),
			t = document.title;

		// "remote" file location is a local Blob
		dom.aDownload.href = URL.createObjectURL( blob );
		dom.aDownload.click(); // click returns immediately, but it's okay
		URL.revokeObjectURL( dom.aDownload.href );
		dom.aDownload.href = '';
		// the Anchor API doesn't return success or failure
		// so assume success
		// it also doesn't return the saved filename
		// so assume it didn't change
		if ( t[0] === '*' ) {
			document.title = t.slice( 1 ); // remove dirty character
			removeEventListener( 'beforeunload', preventDefault );
		}
		lastSave = editor.doc.changeGeneration();
	}

	// copy the editor text to a div for printing
	// print the div, then clear it
	function onPrint() {
		var
			divPrint = document.getElementById( 'divPrint' );

		function onAfterPrint() {
			divPrint.textContent = '';
		}

		addEventListener( 'afterprint', onAfterPrint, { once: true } );
		divPrint.textContent = editor.doc.getValue();
		print();
	}

	// override default Ctrl+[JOPRS]
	// sadly, Ctrl+N cannot be overridden
	// users can also disable overrides in about:config
	// upload (Ctrl-O) file picker only works reliably with a click
	// prevented defaults are:
	//   j: download history (useless)
	//   o: open HTML, replace window contents (bad)
	//   p: screen print window (lame)
	//   r: reload window HTML (bad)
	//   s: save HTML window contents (lame)
	function onKeydown( e ) {
		var
			focus;

		if ( e.metaKey || e.altKey ) {
			e.preventDefault(); // do nothing; probably doesn't work
		} else if ( !dom.divOverlay.classList.value ) {
			// modal is displayed
			if ( e.ctrlKey ) {
				e.preventDefault();
			} else {
				switch( e.key ) {
					case 'Escape':
						dom.buttonCancel.click(); // escape is cancel
						e.preventDefault();
					case ' ':
					case 'Enter':
						break; // space & enter default (click on focus)
					case 'ArrowLeft':
					case 'ArrowRight':
					case 'Tab':
						focus = document.querySelector( ':focus' );
						if (
							focus === dom.buttonOK &&
							e.key.match( /^(?:ArrowRight|Tab)$/ )
						) {
							dom.buttonCancel.focus(); // toggle focus
						} else if (
							focus === dom.buttonCancel &&
							e.key.match( /^(?:ArrowLeft|Tab)$/ )
						) {
							dom.buttonOK.focus(); // toggle focus
						}
					default:
						e.preventDefault(); // do nothing for most keys
				}
			}
		} else if ( e.ctrlKey && !e.shiftKey && e.key.match( /^[joprs]$/ ) ) {
			// modal is hidden
			e.preventDefault();
			if ( e.key === 'o' ) {
				onClickOpen();
			} else if ( e.key === 'p' ) {
				onPrint();
			} else if ( e.key === 'r' ) {
				// non-persistent DOM reference
				// does nothing if middleground script isn't loaded
				document.getElementById( 'buttonRun' ).click();
			} else if ( e.key === 's' ) {
				if ( location.protocol === 'moz-extension:' ) {
					// non-persistent DOM reference
					// does nothing if middleground script isn't loaded
					document.getElementById( 'buttonSaveAs' ).click();
				} else {
					onClickSave();
				}
			}
		}
	}
	document.addEventListener( 'keydown', onKeydown );

	// custom DOM events from the middleground script
	// action: download, tabSize
	function onCustom( e ) {
		var
			d = e.detail;

		if ( d.action === 'download' ) {
			// download success in the middleground script
			// middleground script set the title to the file name
			removeEventListener( 'beforeunload', preventDefault );
			lastSave = editor.doc.changeGeneration();
		} else if ( d.action === 'tabSize' && typeof d.tabSize === 'number' ) {
			// options updated the tab size
			tabSize = d.tabSize;
			onInput( editor ); // to recalculate the column
		}
	}

	// document.ready( function )
	function onContentLoaded() {
		var
			extraKeys = { //remap Tab and Shift-Tab in default map
				Tab: function ( e ) {
					if ( e.getOption( 'keyMap' ) !== 'default' ) {
						return CodeMirror.Pass;
					}
					if ( e.somethingSelected() ) {
						e.indentSelection( 'add' );        // indentMore
					} else if ( e.getOption( 'indentWithTabs' ) ) {
						e.replaceSelection( '\t', 'end' ); // insertTab
					} else {
						e.execCommand( 'insertSoftTab' );
					}
				},
				'Shift-Tab': function ( e ) {
					if ( e.getOption( 'keyMap' ) !== 'default' ) {
						return CodeMirror.Pass;
					}
					e.indentSelection( 'subtract' );     // indentLess
				}
			},
			e;

		// initialize persistent DOM references
		dom.aDownload = document.getElementById( 'aDownload' );
		dom.buttonCancel = document.getElementById( 'buttonCancel' );
		dom.buttonOK = document.getElementById( 'buttonOK' );
		dom.divOverlay = document.getElementById( 'divOverlay' );
		dom.inputFile = document.getElementById( 'inputFile' );
		dom.spanLine = document.getElementById( 'spanLine' );
		dom.spanCol = document.getElementById( 'spanCol' );

		// construct a CodeMirror that replaces the div placeholder
		// and get the instance
		editor = CodeMirror( function ( e ) {
			document.body.replaceChild(
				e,
				document.getElementsByClassName( 'CodeMirror' )[ 0 ]
			);
		}, {
			autoCloseBrackets: true,
			autofocus: true,
			extraKeys: extraKeys,
			indentUnit: tabSize,
			indentWithTabs: true,
			lineNumbers: true,
			matchBrackets: true,
			styleActiveLine: true,
			tabSize: tabSize,
			value: '// This is a JavaScript scratchpad.\n( function () {} () );'
		} );
		// the previous statement swaps out the DOM element, so need  new reference
		document.getElementsByClassName( 'CodeMirror' )[ 0 ].addEventListener(
			'pointerenter', onPointerEnter
		);
		// capture input events for cursor status
		// Beware: CodeMirror "events" are synchronous (setTimeout?)
		editor.on( 'cursorActivity', onInput );
		// move to start of the last line
		editor.doc.setCursor( {
			line: editor.doc.lastLine(),
			ch: 0
		} );
		lastSave = editor.doc.changeGeneration();

		// keep focus out of the button bar
		document.getElementById( 'divButtons' ).addEventListener( 'focusin', onFocusIn );

		// capture context menu events (to kill it for now)
		document.body.addEventListener( 'contextmenu', preventDefault );

		// check why focus was lost and possibly restore it
		dom.buttonOK.addEventListener( 'blur', onBlur );
		dom.buttonCancel.addEventListener( 'blur', onBlur );

		// file Open is really file upload
		document.getElementById( 'buttonOpen' ).addEventListener( 'click', onClickOpen );
		dom.buttonOK.addEventListener( 'click', onClickDialog );
		dom.buttonCancel.addEventListener( 'click', onClickDialog );
		// capture input type="file" change when it opens a file
		dom.inputFile.addEventListener( 'change', onFileChange );

		if ( location.protocol === 'moz-extension:' ) {
			// listen for events from the middleground
			document.addEventListener( 'middle', onCustom );
		} else { // file: or http:
			// file Save is really file download
			e = document.getElementById( 'buttonSave' );
			e.addEventListener( 'click', onClickSave );
			e.title = 'Ctrl-S';
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', onContentLoaded, { once: true } );
	} else {
		onContentLoaded();
	}
}());