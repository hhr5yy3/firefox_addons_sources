/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 /********/
 var loc = "EN";
 var loc_json = {};
if( ApiGetItemFromStore("untrans") !== null){
	untranslated = ApiGetItemFromStore("untrans").split(",");
}else{
	var untranslated = [];
}


function setLocale(){
	
	if(typeof(loc)!= "undefined" && typeof(locales[loc]) != "undefined" ){
		loc = loc;
	}else{
		loc = 'EN';
	}
	
	if(typeof(locales[loc]) != "undefined" && locales[loc].length > 0 ){
		for(i=0 ; i < locales[loc].length ; i++){
		 loc_json[ locales[loc][i].term ]= locales[loc][i].definition;
		}
	}
	moment.locale(loc);
	setCalendars();
	replaceHTMLtrans();
    initTranslate();
    
    $.extend(jQuery.validator.messages, {
		required: _t("This field is required")
	})
}

// se ejecuta en login
function checkLocale(nu_loc){
	
	if( nu_loc !== loc){
		loc = nu_loc;
		if(IS_WEB && loc !== "EN" && typeof(locales[loc]) == "undefined" ){
			$.getScript( "app_files/locale-js/"+loc+".js" )
			  .done(function( script, textStatus ) {
				setLocale();
			  })
			  .fail(function( jqxhr, settings, exception ) {
			    loc = nu_loc;
				setLocale();
			});
		}else{
			loc = nu_loc;
				setLocale();
		}
	}
}

//return navigator language
function returnBrowserLanguage(){
	//aca podria tratar de sacar el locale del navegador
	return "EN";
}

function _t(string_to_translate,val){
    /*
    if(typeof(loc)=='undefined'){
        loc = 'EN';
    }
    */
    var string = (typeof(loc_json[string_to_translate])=='undefined' ||
    			  typeof(loc_json[string_to_translate]) =='undefined' || 
    			  loc_json[string_to_translate] == null || 
    			  loc_json[string_to_translate] == "" 
    			  )? string_to_translate : loc_json[string_to_translate];
    
    if(DEBUG_MODE){
	    if(typeof(loc_json[string_to_translate])=='undefined' ||
    			  typeof(loc_json[string_to_translate]) =='undefined' || 
    			  loc_json[string_to_translate] == null || 
    			  loc_json[string_to_translate] == ""
    	   ){
		    if( untranslated.indexOf(string) == -1 && $.isEmptyObject(loc_json) == false){
			    untranslated.push(string);
			    ApiSaveItemToStore("untrans",untranslated);
			    console.log("TERMS NOT TRANSLATED : " + untranslated.length )
		    }
	    }
    }			  
    var translation = (typeof(val)=='undefined')? string:string.replace( '{}' , val );
    return translation;
}
 /*******************/




function initTranslate(){
    /*
    $("#taskForm input[name=name]").attr('placeholder',_t('Task name'));
    $("#taskForm input[name=due_date]").attr('placeholder',_t('Due Date'));
       $("#taskForm input[name=estimated_time]").attr('placeholder',tdisplay);
    $("#filterInput").attr('placeholder',_t('Search Tasks'));
    $("#addSubtaskForm input[name=name]").attr('placeholder',_t('New todo'));
    $("#addCommentForm textarea[name=text]").attr('placeholder',_t('Write a comment'));  
    */
    $("input").each(function(){
	    var $this = $(this);
	    var ph = $this.attr('data-orig_text');
	    if(typeof(ph)!= "undefined"){
		    $this.attr('placeholder',_t(ph));
	    }
    })
    /*
    $("option[value='']").each(function(){
    	var $this = $(this);
		var text = $this.text();
      
		if(typeof(text)!="undefined"){
        	$this.text(_t(text)); 
    	}  
	})
	*/
}

function replaceHTMLtrans(){
    $('.trans').each(function(){
        $this=$(this);
        var t_to_translate = $this.attr('data-orig_text');
        $this.html( _t(t_to_translate) )
    })
}





/* UITLES ******************************************************************************************/

function i18n(arr){
    for (var i in arr){
        var n= arr[i].name;
        var v= arr[i].value;
        if( n=="delivery_date" || n=="start_date" || n=="end_date" || n=="due_date" || n=="from" || n=="to" || n=="start" || n=="end"){
            arr[i].value = i18n_date(v);
        }
        else if( n=="hourly_rate" || n=="fixed_rate"){
            arr[i].value = i18n_num(v);
        }
        else if( n=="estimated_time"){
            arr[i].value = i18n_hr(v);
        }else{
            arr[i].value = encodeURIComponent(v);
        }
    }
    return arr;
}

function arrToParams(arr){
    //TODO VALIDAR aca todos los parametros.
    var url_params = "";
    for (var i in arr){
        var n= arr[i].name;
        var v= arr[i].value;
        url_params += n+"="+v+"&";
    }
    url_params = url_params.slice(0,url_params.length-1)
    return url_params;
}


function i18n_date(val){
    if(val=="" || typeof(val)=='undefined' || typeof(val)==null){
        return val;
    }
    if(val){
        var val_arr = val.split(" ");
        var d =  moment(val_arr[0],[SET_DATE_FORMAT , "YYYY-MM-DD" ]).format("YYYY-MM-DD"); //Date.parseExact(val_arr[0],dateformat_to_datejs(SET_DATE_FORMAT)).toString("yyyy-MM-dd");
        return d;
    }else{
        return val;
    }
}
function i18n_hr(val){
    if(val=="" || typeof(val)=='undefined' || typeof(val)==null){
        return val;
    }
    if(val.indexOf(":")!=-1){
        var val_arr = val.split(":");
        var val_validar = String(val_arr[0])+String(val_arr[1])
        if(val_arr[1]>60 || val_arr[1]<0 || val_arr[1].length>3 ||  val.indexOf('.')!=-1 || val.indexOf(',')!=-1 || isNaN(val_validar) ){
            val = "error";
        }else{
            val = val_arr[0]+"."+Math.round((val_arr[1]/60)*100);
        }
    }else{
        val = i18n_num(val);
    }
    
    return val;
}
function i18n_num(val){
    var orig_val =val;
    if(val=="" || typeof(val)=='undefined' || typeof(val)==null){
        return val;
    }
    //1 234,56 | 1'234.56 | 1.234,56 | 1,234.56
    if(SET_NUMBER_FORMAT=="1 234,56"){
        //agrego decimal si no hay
        if(val.indexOf(",")==-1){
            val +=",00";
        }
        //valido separaciones de numero
        var arrNumDec = val.split(',');
        var decimal = val.split(',')[1];
        var arrNumber = val.split(',')[0].split(' ');
        val= validateNumber(arrNumDec,arrNumber,decimal);
    }
    // ----- 
    if(SET_NUMBER_FORMAT=="1'234.56"){
        //agrego decimal si no hay
        if(val.indexOf(".")==-1){
            val +=".00";
        }
        //valido separaciones de numero
        var arrNumDec = val.split('.');
        var decimal = val.split('.')[1];
        var arrNumber = val.split('.')[0].split("'");
        val= validateNumber(arrNumDec,arrNumber,decimal);
    }
    // ----- 
    if(SET_NUMBER_FORMAT=="1.234,56"){
        //agrego decimal si no hay
        if(val.indexOf(",")==-1){
            val +=",00";
        }
        //valido separaciones de numero
        var arrNumDec = val.split(',');
        var decimal = val.split(',')[1];
        var arrNumber = val.split(',')[0].split('.');
        val= validateNumber(arrNumDec,arrNumber,decimal);
    }
    // ----- 
    if(SET_NUMBER_FORMAT=="1,234.56"){
        if(val.indexOf(".")==-1){
            val +=".00";
        }
        //valido separaciones de numero
        var arrNumDec = val.split('.');
        var decimal = val.split('.')[1];
        var arrNumber = val.split('.')[0].split(',');
        val= validateNumber(arrNumDec,arrNumber,decimal);
    }
    if(val=="error"){
        console.error(orig_val);
    }
    return val;
    
}

function local_date(val){
    if(DEBUG_MODE){
	    console.error("Function deprecated");
    }
}


function time_to_locale(val){
    if(store.settings.time_display=='HH:MM'){
        return ssTOhhmmss(actual_task_time);
    }else{
        return ssTOhhDecimal_locale(actual_task_time);
    }
    
}


function ss_to_hh_display_locale(val){
	
    if(SET_TIME_DISPLAY == 'HH:MM'){
        return ssTOhhmmss(val);
    }else{
        return numberToLocale( ssTOhhDecimal(val) );
    }
}

function ss_to_hhmm_display_locale(val){
	
    if(SET_TIME_DISPLAY == 'HH:MM'){
        return ssTOhhmm(val);
    }else{
        return numberToLocale( ssTOhhDecimal(val) );
    }
}


function mm_to_hh_display_locale(val){
	
    if(SET_TIME_DISPLAY == 'HH:MM'){
        return mmTOhhmm(val);
    }else{
        return numberToLocale( mmTOhhDecimal(val) );
    }
}

function ss_to_hh__locale(val){
	var date = new Date("2012-1-1 "+ssTOhhmm(val));
	return moment(date).format( getMomentsHourFormat() );
	
}
function mm_to_hh__locale(val){
	var date = new Date("2012-1-1 "+mmTOhhmm(val));
	return moment(date).format( getMomentsHourFormat() );
}

function numberToLocale(num){
	
	var num_locale = num;
	
	if( SET_NUMBER_FORMAT == "1,234.56"){
		num_locale = numberWithCommas(num);
	}
	if( SET_NUMBER_FORMAT == "1.234,56"){
		num_locale = numberWithCDots(num);
	}
	
	return num_locale;
}

function validateNumber(arrNumDec,arrNumber,decimal){
    // si tiene 2 separadores de decimales
    if(arrNumDec.length>2){
        console.error(arrNumDec,arrNumber,decimal);
        return "error";
    }
    // si el valor decimal no es un numero
    if(isNaN(decimal)){
        return "error";
    }
    // si viene sin separador de miles
    if(arrNumber.length == 1){
        //si no es un numero devuelve error
        if(isNaN(arrNumber[0])){
            console.error(arrNumDec,arrNumber,decimal);
            return "error";
        }else{
            var sys_number = arrNumber[0]+"."+decimal;
            return sys_number;
        }
    }
    // verifica el separador de miles
    var num="";
    for(i=0 ; i < arrNumber.length ; i++){
        
        if( i==0 ){
            //checkea la primer porción
            if(String(arrNumber[i]).length < 4 && !isNaN(arrNumber[i]) ){
                num += arrNumber[i];
            }else{
                console.error(arrNumDec,arrNumber,decimal);
                return "error";
            }
        }else{
            //el resto de las porciones deberian ser iguales a 3
            if(String(arrNumber[i]).length == 3 && !isNaN(arrNumber[i]) ){
                num += arrNumber[i];
            }else{
                console.error(arrNumDec,arrNumber,decimal);
                return "error";
            }
        }
    }
    // fin for
    var sys_number = num+"."+decimal;
    return sys_number;
}

function onlyHoursLocale(date_val){
	var date_arr = date_val.split(" ");
	if(SET_TIME_FORMAT == 'AMPM'){
		return date_arr[1]+" "+date_arr[2];
	}else{
		return date_arr[1];
	}
}

function numberWithCDots(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//helper para inicializar datepicker
function dateformat_to_jquery(val){
    var str = val.toLowerCase();
    str = str.replace('yyyy','yy');
    return str;
}
function dateformat_to_datejs(val){
    var str = val.toLowerCase();
    str = str.replace('YYYY','yyyy');
    str = str.replace('DD','dd');
    str = str.replace('mm','MM');
    return str;
}
//DATE
function db_dateTO_js(db_date){
    var js_date = Date.parseExact(db_date, "yyyy-mm-dd hh:mm:ss");
    return js_date;
}

function setCalendars(){
        /* German initialisation for the jQuery UI date picker plugin. */
        /* Written by Milian Wolff (mail@milianw.de). */
        if(loc=="DE"){
            jQuery(function($){
                $.datepicker.regional['de'] = {
                    closeText: 'schließen',
                    prevText: '&#x3C;zurück',
                    nextText: 'Vor&#x3E;',
                    currentText: 'heute',
                    monthNames: ['Januar','Februar','März','April','Mai','Juni',
                        'Juli','August','September','Oktober','November','Dezember'],
                    monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
                        'Jul','Aug','Sep','Okt','Nov','Dez'],
                    dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
                    dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
                    dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
                    weekHeader: 'KW',
                    dateFormat: 'dd.mm.yy',
                    firstDay: returnWeeksStartsOn(),
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ''};
                $.datepicker.setDefaults($.datepicker.regional['de']);
            });
           
        }
        /* Inicialización en español para la extensión 'UI date picker' para jQuery. */
        /* Traducido por Vester (xvester@gmail.com). */
        if(loc=="ES"){
           
            jQuery(function($){
                $.datepicker.regional['es'] = {
                    closeText: 'Cerrar',
                    prevText: '&#x3C;Ant',
                    nextText: 'Sig&#x3E;',
                    currentText: 'Hoy',
                    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
                        'Jul','Ago','Sep','Oct','Nov','Dic'],
                    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
                    dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
                    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
                    weekHeader: 'Sm',
                    dateFormat: 'dd/mm/yy',
                    firstDay: returnWeeksStartsOn(),
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ''};
                $.datepicker.setDefaults($.datepicker.regional['es']);
            });
        }
        if(loc=="EN"){
           
            jQuery(function($){
                $.datepicker.regional['en'] = {
                    closeText: 'Close',
                    prevText: '&#x3C;Prev',
                    nextText: 'Next&#x3E;',
                    currentText: 'Today',
                    monthNames: ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'],
                    monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun',
                        'Jul','Aug','Sep','Oct','Nov','Dec'],
                    dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                    dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                    dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
                    weekHeader: 'Sm',
                    dateFormat: 'mm/dd/yy',
                    firstDay: returnWeeksStartsOn(),
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ''};
                $.datepicker.setDefaults($.datepicker.regional['en']);
            });
        }
        if(loc=="IT"){
            jQuery(function($){
		        $.datepicker.regional['it'] = {
		                closeText: 'Chiudi',
		                prevText: '&#x3c;Prec',
		                nextText: 'Succ&#x3e;',
		                currentText: 'Oggi',
		                monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
		                        'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		                monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu',
		                        'Lug','Ago','Set','Ott','Nov','Dic'],
		                dayNames: ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
		                dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
		                dayNamesMin: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
		                weekHeader: 'Sm',
		                dateFormat: 'dd/mm/yy',
		                firstDay: returnWeeksStartsOn(),
		                isRTL: false,
		                showMonthAfterYear: false,
		                yearSuffix: ''};
		        $.datepicker.setDefaults($.datepicker.regional['it']);
			});

        }
        if(loc=="KO"){
            jQuery(function($){
		        $.datepicker.regional['ko'] = {
	                closeText: '닫기',
	                prevText: '이전달',
	                nextText: '다음달',
	                currentText: '오늘',
	                monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
	                '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
	                monthNamesShort: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
	                '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
	                dayNames: ['일','월','화','수','목','금','토'],
	                dayNamesShort: ['일','월','화','수','목','금','토'],
	                dayNamesMin: ['일','월','화','수','목','금','토'],
	                weekHeader: 'Wk',
	                dateFormat: 'yy-mm-dd',
	                firstDay: returnWeeksStartsOn(),
	                isRTL: false,
	                showMonthAfterYear: false,
	                yearSuffix: '년'
	                };
				$.datepicker.setDefaults($.datepicker.regional['ko']);
			});
        }
        if(loc =="PL"){
	        jQuery(function($){
		        $.datepicker.regional['pl'] = {
		                closeText: 'Zamknij',
						prevText: '&#x3c;Poprzedni',
		                nextText: 'NastÄpny&#x3e;',
		                currentText: 'DziÅ',
		                monthNames: ['StyczeÅ','Luty','Marzec','KwiecieÅ','Maj','Czerwiec',
		                'Lipiec','SierpieÅ','WrzesieÅ','PaÅºdziernik','Listopad','GrudzieÅ'],
		                monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
		                'Lip','Sie','Wrz','Pa','Lis','Gru'],
		                dayNames: ['Niedziela','PoniedziaÅek','Wtorek','Åroda','Czwartek','PiÄtek','Sobota'],
		                dayNamesShort: ['Nie','Pn','Wt','År','Czw','Pt','So'],
		                dayNamesMin: ['N','Pn','Wt','År','Cz','Pt','So'],
		                weekHeader: 'Tydz',
		                dateFormat: 'dd.mm.yy',
		                firstDay: returnWeeksStartsOn(),
		                isRTL: false,
		                showMonthAfterYear: false,
		                yearSuffix: ''};
		        $.datepicker.setDefaults($.datepicker.regional['pl']);
			});
        }
}

//LOCALE -------------------------------------------------------
function returnWeeksStartsOn(){
	if(typeof(STORE.USER_INFO) == "undefined" || typeof(STORE.USER_INFO.settings.week_starts_on) == "undefined"){
		return 1;
	}
	var weeks_start_on = 1;
	if(STORE.USER_INFO.settings.week_starts_on == "Sunday"){
		weeks_start_on = 0;
	}
	if(STORE.USER_INFO.settings.week_starts_on == "Monday"){
		weeks_start_on = 1;
	}
	if(STORE.USER_INFO.settings.week_starts_on == "Saturday"){
		weeks_start_on = 6;
	}
	return weeks_start_on;
}
