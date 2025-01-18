var background = browser.extension.getBackgroundPage();
var newSession;

function getMessage(code, obj)
{
    try
    {
        var value = browser.i18n.getMessage(code, obj);
        if (value)
        {
            return value;
        }
    }
    catch (fmt)
    {
        console.error(fmt);
    }
}


function init()
{
    document.title = getMessage("ImportTitle");
    $(ImporttextBox).html(getMessage("ImportSession"));
    
}





function changeDateFormat( baseName )
{
    var parts = baseName.split( "/" );
	var Yt = parts[2].split("_");
	if(Yt[1] === undefined)
	{
		Yt[1] = "00:00";
	}
    switch ( localStorage.dateFormat )
    {
        case "1":
            baseName = parts[ 0 ] + "/" + parts[ 1 ] + "/" + Yt[ 0 ] + "__" + Yt[ 1 ];
            break;
        case "2":
            baseName = parts[ 1 ] + "/" + parts[ 0 ] + "/" + Yt[ 0 ] + "__" + Yt[ 1 ];
            break;
        case "3":
            baseName = Yt[ 0 ] + "-" + parts[ 1 ] + "-" + parts[ 0 ] + "__" + Yt[ 1 ];
            break;
    }
    return baseName;
}



function populateWin( data, id, dataAndEvents )
{
    var tit = $( "#" + id );
    var li = $( "<div/>",
    {
        "class": "winWrapper",
        winId: data.id,
        id: id + "Wrapper" + data.id
    } );
    if ( dataAndEvents )
    {
        li.prependTo( tit );
    }
    else
    {
        li.appendTo( tit );
    }
    tit = $( "<div/>",
        {
            "class": "mswinline"
        } )
        .appendTo( li );
    var $input = $( "<input/>",
        {
            id: id + "_win_" + data.id,
            "class": "mswincheck",
            type: "checkbox",
            checked: dataAndEvents,
            change: function()
            {
                if ( $( this )
                    .prop( "checked" ) === true )
                {
                    li.find( ".mscheck" )
                        .prop( "checked", true );
                }
                else
                {
                    li.find( ".mscheck" )
                        .prop( "checked", false );
                }
            }
        } )
        .appendTo( tit );
		
    var wspan = $( "<span/>",
        {
            "class": "msWinblabel",
            text: data.label || ( dataAndEvents ? "Current Window" :
                "window(" + data.id + ")" )
        } )
        .appendTo( tit );
	data = data.tabs;
	$( "<span/>",
        {
            "class": "mswspan",
            text:"("+data.length+" tabs)"
        } )
        .appendTo( wspan );
    
    tit = 0;
    for ( ; tit < data.length; tit++ )
    {
        var edit = data[ tit ];
        var rightDiv = $( "<div/>",
            {
                "class": "mstabline",
                title: edit.title == edit.url ? edit.title : edit.title + " : " + edit.url
            } )
            .appendTo( li );
        $( "<input/>",
            {
                id: "tabcheck_" + edit.id,
                "class": "mscheck",
                type: "checkbox",
                checked: dataAndEvents,
                change: function()
                {
                    if ( $( this )
                        .prop( "checked" ) === true )
                    {
                        $input.prop( "checked", true );
                    }
                }
            } )
            .appendTo( rightDiv )[ 0 ].tab = edit;
        if ( id == "mslistoriginal" )
        {
            $( "<span/>",
                {
                    "class": "mstablabel",
                    text: edit.title,
                    link: edit.url,
                    click: function()
                    {
                        browser.tabs.create(
                        {
                            url: $( this )
                                .attr( "link" )
                        } );
                    }
                } )
                .appendTo( rightDiv );
        }
        else
        {
            $( "<span/>",
                {
                    "class": "mstablabel",
                    text: edit.title
                } )
                .appendTo( rightDiv );
        }
    }
    $( '#mssavebase input[type="checkbox"]' )
        .change( function()
        {
            var copyProp = $( "#mssavebase .mscheck:checked" )
                .length === 0;
            $( "#mssavebutton" )
                .prop( "disabled", copyProp );
        } );
}

function editSave()
{
    if ( !$( "#mseditsave" )
        .prop( "disabled" ) && $( "#mstitle" )
        .val() )
    {
        var now = new Date();
			now = now.getMinutes();
			
			if (now < 10)
			{
				now = new Date();
				now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900)+"_"+now.getHours()+":" + "0" +now.getMinutes();
			}
			else
			{
				now = new Date();
				now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			}
        var self = new background.SessionData( $( "#mstitle" )
            .val(), now);
        $.each( $( "#mseditsession .winWrapper" ), function( dataAndEvents,
            elem )
        {
            var $elem = $( elem );
            var windows = $elem.attr( "winId" );
            $.each( $elem.find( ".mscheck" ), function( dataAndEvents,
                e )
            {
                if ( e.checked )
                {
                    var tab = e.tab;
                    if ( tab )
                    {
                        self.addTab(
                        {
                            url: tab.url,
                            title: tab.title,
                            win: windows
                        } );
                    }
                }
            } );
        } );
        //var c = self.getCount();
        if ( self.getCount() === 0 )
            {
                alert( getMessage( "emptySession" ) );
            }
            else
            {
                if ( self.getCount() > 0 )
                {
                    self.save( function( dataAndEvents )
                    {
                        if ( !dataAndEvents )
                        {
                            alert( getMessage( "saveFail" ) );
                        }
                    } );
                }
            }
        window.location.reload();
    }
}

function importSessionf(event)
{
	var file = event.target.files[0];
	console.log(file);
	var output = document.getElementById('output');
		var reader = new FileReader();
			reader.onload = function(e) {
				var text = e.target.result;
				var array = text.split('\n');
				var Stitle = array[1].substring(5);
				var timeA = new Date(Number(array[2].substring(10)));
			timeA = timeA.getMinutes();
			
			if (timeA < 10)
			{
				timeA = new Date();
				timeA = timeA.getDate() + "/" + (timeA.getMonth() + 1) + "/" + (timeA.getYear() + 1900)+"_"+timeA.getHours()+":" + "0" +timeA.getMinutes();
			}
			else
			{
				timeA = new Date();
				timeA = timeA.getDate() + "/" + ( timeA.getMonth() + 1 ) + "/" + ( timeA.getYear() + 1900 )+"_"+timeA.getHours()+":"+timeA.getMinutes();
			}
				var data = JSON.parse(array[4]);
				console.log(data.windows.length);
				$( "#mseditsave" )
				.prop( "index", data.index );
				var i_n = 0;
				var j_n = 0;
				data.title = Stitle;
			
				for ( ; i_n < data.windows.length; i_n++ )
					{
						console.log(data.windows[i_n]);
						for ( ; j_n < data.windows[i_n].tabs.length; j_n++ )
						{	
					
							data.windows[i_n].tabs[j_n] = data.windows[i_n].tabs[j_n].entries[data.windows[i_n].tabs[j_n].entries.length-1];
							if(!data.windows[i_n].tabs[j_n])
							{
								data.windows[i_n].tabs[j_n] = data.windows[i_n].tabs[j_n-1];
								console.log(j_n);
							}
							data.windows[i_n].tabs[j_n].id = j_n;
			
						}
						j_n=0;
					}
					for ( i_n in data.windows )
					{
						populateWin(
						{
							id: i_n,
							tabs: data.windows[ i_n ].tabs,
							label: data.windows[ i_n ].name
						}, "mslistoriginal", true );
					}
					$( "#mslistoriginal input[type=checkbox]" )
						.prop( "checked", true );
					$( "#msrestorelist" )
						.hide();
					$( "#mseditsession" )
						.show()
						.animate(
					{
						left: "0%"
					}, 250, "swing", function()
					{
						$( "#mstitle" )
						.val( data.title )
						.focus()
						.select();
					} );
		
					$( '#mseditsession input[type="checkbox"]' )
						.change( function()
						{
							var copyProp = $( "#mseditsession .mscheck:checked" )
								.length === 0;
							$( "#mseditsave" )
								.prop( "disabled", copyProp );
						} );
					$( function()
					{
						$( "#mseditlist1, #mslistoriginal" )
							.sortable(
							{
								items: ".mstabline",
								connectWith: ".mseditlist"
							} )
							.disableSelection();
					} );
			
			
		};
      
      reader.readAsText(file);

}



$( document )
    .ready( function()
    {
		$(file )
            .change( function(event)
            {
				importSessionf(event);
            } );
		$( mseditsave )
            .click( function()
            {
                editSave();
            } );
        init();
    } );