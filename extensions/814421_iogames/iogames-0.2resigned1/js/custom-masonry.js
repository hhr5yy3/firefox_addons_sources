function init_isotope(){
	
	// MASSONRY
	var $grid = $('#ms-container-app').isotope({
		// options
		itemSelector: '.ms-item',
		percentPosition: true,
		masonry: {
			columnWidth: '.ms-item'
		},
		getSortData: {
			name: '.title',
			likes: function( itemElem ) {
				var likes = $( itemElem ).find('.likes').text();
				return parseFloat( likes.replace( /[\(\)]/g, '') );
			},
			plays: function( itemElem ) {
				var plays = $( itemElem ).find('.plays').text();
				return parseFloat( plays.replace( /[\(\)]/g, '') );
			},
			date: function( itemElem ) {
				var date = $( itemElem ).find('.date').text();
				return parseFloat( date.replace( /[\(\)]/g, '') );
			},
			name: function( itemElem ) {
				var name = $( itemElem ).find('.name').text();
				return name;
			}
		}
	});


	$('.sort-by-button-group').on( 'click', 'a', function() {

	  var sortValue = $(this).attr('data-sort-value');
	  switch(sortValue){
		  case 'likes':
				$grid.isotope({
					sortBy: 'likes',
					sortAscending: false
				});
			break;
		  case 'plays':
				$grid.isotope({
					sortBy: 'plays',
					sortAscending: false
				});
			break;
		  case 'new':
				$grid.isotope({
					sortBy: 'date',
					sortAscending: false
				});
			break;
		  case 'name':
			  $grid.isotope({
				  sortBy: 'name',
				  sortAscending: true
			  });
			  break;
		  case '*':
				$grid.isotope({ 
					sortBy : 'original-order',
					sortAscending: true
				});
			break;
	  }
	});

	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
	  var $buttonGroup = $( buttonGroup );
	  $buttonGroup.on( 'click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
	  });
	});
}