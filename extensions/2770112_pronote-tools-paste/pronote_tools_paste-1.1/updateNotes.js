var updatedNotes = false;

document.body.addEventListener("click", function(event){
	event.preventDefault();
	
	if(!updatedNotes)
	{
		navigator.clipboard.readText().then((notes) => {
			
			notes = notes.split("\n");
			
			notes.forEach(function(note){
				changeEvent = new KeyboardEvent('keyup', {
					charCode: 40,
					keyCode: 40,
					which: 40,
					key: "ArrowDown",
					view: window,
					bubbles: true
				});
				
				var input = document.querySelector(':focus');
				input.value = note;
				input.dispatchEvent(changeEvent);
			});
		})
		
		updatedNotes = true;
	}
});

