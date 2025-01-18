//------------------------------------------------------------------------------
s3radio.create_country_list = function() {
	s3radio.create_country_list_main();
}
//------------------------------------------------------------------------------
s3radio.create_country_list_main = function() {
	fetch(s3radio.main_url + '/stations/summary.json').then(function(response) {
		return response.json();
	}).then(function(summary_list) {
		s3radio.create_country_list_main_run(summary_list);
		s3radio.create_country_list_search();
	}).catch(function(error) {
		s3radio.create_country_list_main_run({});
		s3radio.create_country_list_search();
	});
}
//------------------------------------------------------------------------------
s3radio.create_country_list_main_run = function(summary_list) {
	var region_map = [
		{ 'region' : 'north_america', 'country_list' : [ 'cu', 'ht', 'us', 'pr', 'jm', 'ca', 'mx', 'tt', 'do' ] },
		{ 'region' : 'central_america', 'country_list' : [ 'cr', 'sv', 'ni', 'pa', 'gt', 'hn' ] },
		{ 'region' : 'south_america', 'country_list' : [ 'ar', 'bo', 'br', 'py', 'pe', 'sr', 'cl', 'co', 'mq', 'gy', 'gp', 'gf', 'ec', 'uy', 'fk', 've' ] },
		{ 'region' : 'europe', 'country_list' : [ 'be', 'by', 'cz', 'dk', 'ee', 'es', 'de', 'fr', 'gr', 'cy', 'at', 'pl', 'pt', 'ro', 'ch', 'si', 'fi', 'hr', 'ie', 'it', 'hu', 'lu', 'lt', 'nl', 'tr', 'se', 'no', 'bg', 'rs', 'ua', 'ru', 'sk', 'uk', 'mt', 'ba', 'md' ] },
		{ 'region' : 'africa', 'country_list' : [ 'dz', 'cm', 'ci', 'cg', 'ng', 'za', 'eg', 'sn', 'tn', 'gh', 'ke', 'ma', 'ug', 'mg' ] },
		{ 'region' : 'asia', 'country_list' : [ 'az', 'bd', 'ge', 'kr', 'hk', 'in', 'id', 'ir', 'iq', 'kz', 'sg', 'lk', 'vn', 'il', 'th', 'my', 'np', 'sa', 'jp', 'pk', 'ph', 'cn', 'tw', 'jo' ] },
		{ 'region' : 'oceania', 'country_list' : [ 'au', 'nz' ] },
	];

	for (var i=0; i<region_map.length; i++) {
		var region_id = region_map[i].region;
		var country_list = region_map[i].country_list;
		var region_box = document.getElementById('country_region_' + region_id);

		for (var i2=0; i2<country_list.length; i2++) {
			var country_id = country_list[i2];
			var country_region_box = document.createElement('div');
			country_region_box.className = 'country_region_box';

			var country_region_image = document.createElement('div');
			country_region_image.className = 'country_region_image';
			country_region_box.appendChild(country_region_image);

			var country_region_name = document.createElement('div');
			country_region_name.className = 'country_region_name';
			country_region_box.appendChild(country_region_name);

			s3radio.utils.HTMLDOM_value(country_region_name, s3radio.utils.get_country_name(country_id, true));
			country_region_image.style.backgroundImage = 'url("/skin/country/' + country_id + '.png")';

			//-----------------------------------------------------------
			if (summary_list[country_id]) {
				country_region_box.setAttribute('title', s3radio.utils.get_country_name(country_id) + ' (' + summary_list[country_id].stations_count + ')');
			} else {
				country_region_box.setAttribute('title', s3radio.utils.get_country_name(country_id));
			}

			//-----------------------------------------------------------
			country_region_box.setAttribute('country_id', country_id);
			region_box.appendChild(country_region_box);

			//-----------------------------------------------------------
			country_region_box.addEventListener("click", function(event) {
				s3radio.selected_country = this.getAttribute('country_id');
				s3radio.get_country_stations(s3radio.selected_country, function(){
					s3radio.pref_save('selected_country', s3radio.selected_country, function(){
						//-----------------------------------------------
						if (! s3radio.current_radio.country) {
							s3radio.current_radio = s3radio.stations[s3radio.selected_country][Math.floor(Math.random() * s3radio.stations[s3radio.selected_country].length)];
							s3radio.utils.create_station_id(s3radio.current_radio, s3radio.selected_country);
							s3radio.pref_save('current_radio', s3radio.current_radio);
							s3radio.create_player();
						}
						//-----------------------------------------------
						s3radio.create_list_by_country(s3radio.selected_country);
						document.getElementById('button_body_country_list_close').setAttribute('is_hidden', false);
						//-----------------------------------------------
						document.getElementById('div_body_player').setAttribute('is_hidden', false);
						document.getElementById('div_body_country_list').setAttribute('is_hidden', true);
					});
				});
			}, true);
		}
	}
}
//------------------------------------------------------------------------------
s3radio.create_list_by_country = function(country_id) {
	s3radio.get_country_stations(country_id, function(){
		s3radio.create_list_by_country_run(country_id);
	});
}
//------------------------------------------------------------------------------
s3radio.create_list_by_country_run = function(country_id) {
	//------------------------------------------------------------------------
	s3radio.station_list = s3radio.utils.clone_object(s3radio.stations[country_id]).sort(function(a, b) {
		if (String(a.name).toLowerCase() > String(b.name).toLowerCase()) { return 1; }
		if (String(a.name).toLowerCase() < String(b.name).toLowerCase()) { return -1; }
		return 0;
	});

	//------------------------------------------------------------------------
	for (var i=0; i<s3radio.station_list.length; i++) {
		var station = s3radio.station_list[i];
		s3radio.utils.create_station_id(station, country_id);
		station.gains = s3radio.equalizer.get_filters_by_radio_id(station.id);
	}

	//------------------------------------------------------------------------
	if (s3radio.shuffle_enabled) {
		chrome.runtime.sendMessage({ 'action_set_station_list' : true, 'station_list' : s3radio.station_list }, function(response) {});
	}
	//------------------------------------------------------------------------
	s3radio.title_list_head_hide();
	document.getElementById('country_list_head').setAttribute('is_hidden', false);
	s3radio.utils.HTMLDOM_value(document.getElementById('country_list_head'), s3radio.utils.get_country_name(country_id));
	//------------------------------------------------------------------------
	s3radio.create_list_elements();
}
//------------------------------------------------------------------------------
s3radio.country_list = {
	'cu' : 'Cuba',
	'ht' : 'Haïti',
	'pr' : 'Puerto Rico',
	'jm' : 'Jamaica',
	'us' : 'USA',
	'ca' : 'Canada',
	'mx' : 'México',
	'tt' : 'Trinidad and Tobago',
	'do' : 'República Dominicana',

	'cr' : 'Costa Rica',
	'sv' : 'El Salvador',
	'ni' : 'Nicaragua',
	'pa' : 'Panamá',
	'gt' : 'Guatemala',
	'hn' : 'Honduras',

	'ar' : 'Argentina',
	'bo' : 'Bolivia',
	'br' : 'Brasil',
	'py' : 'Paraguay',
	'pe' : 'Perú',
	'sr' : 'Suriname',
	'cl' : 'Chile',
	'co' : 'Colombia',
	'mq' : 'Martinique',
	'gy' : 'Guyana',
	'gp' : 'Guadeloupe',
	'gf' : 'French Guiana',
	'ec' : 'Ecuador',
	'uy' : 'Uruguay',
	'fk' : 'Falkland Islands',
	've' : 'Venezuela',

	'be' : 'België',
	'dk' : 'Danmark',
	'cz' : 'Česká republika',
	'ee' : 'Eesti',
	'es' : 'España',
	'de' : 'Deutschland',
	'fr' : 'France',
	'at' : 'Österreich',
	'pl' : 'Polska',
	'pt' : 'Portugal',
	'ro' : 'România',
	'ch' : 'Schweiz',
	'si' : 'Slovenija',
	'fi' : 'Suomi',
	'hr' : 'Hrvatska',
	'ie' : 'Ireland',
	'it' : 'Italia',
	'lu' : 'Lëtzebuerg',
	'no' : 'Norge',
	'nl' : 'Nederland',
	'hu' : 'Magyarország',
	'se' : 'Sverige',
	'tr' : 'Türkiye',
	'uk' : 'United Kingdom',
	'bg' : 'България',
	'ru' : 'Россия',
	'ua' : 'Україна',
	'gr' : 'Ελλάδα',
	'cy' : 'Κύπρος',
	'md' : 'Republica Moldova',
	'rs' : 'Србија',
	'sk' : 'Slovensko',
	'by' : 'Беларусь',
	'mt' : 'Malta',
	'lt' : 'Lietuva',
	'ba' : 'Bosna i Hercegovina',


	'dz' : 'Algérie',
	'cm' : 'Cameroon',
	'ci' : "Côte d'Ivoire",
	'cg' : 'Congo',
	'ng' : 'Nigeria',
	'za' : 'South Africa',
	'sn' : 'Sénégal',
	'tn' : 'Tunisie',
	'gh' : 'Ghana',
	'ke' : 'Kenya',
	'ma' : 'Maroc',
	'ug' : 'Uganda',
	'mg' : 'Madagasikara',
	'eg' : 'مصر',

	'bd' : 'Bangladesh',
	'kr' : 'Hanguk',
	'hk' : 'Hong Kong',
	'in' : 'India',
	'id' : 'Indonesia',
	'ir' : 'Iran',
	'iq' : 'Irak',
	'kz' : 'Қазақстан',
	'sg' : 'Singapore',
	'lk' : 'Sri Lankā',
	'vn' : 'Việt Nam',
	'il' : 'יִשְׂרָאֵל‎',
	'th' : 'ประเทศไทย',
	'my' : 'Malaysia',
	'np' : 'Nepāla',
	'jp' : 'Nihon',
	'pk' : 'Pakistan',
	'ph' : 'Philippines',
	'cn' : '中国',
	'tw' : '台灣',
	'ge' : 'საქართველო',
	'sa' : 'المملكة العربية السعودية',
	'az' : 'Azərbaycan',
	'jo' : 'الأردن',

	'au' : 'Australia',
	'nz' : 'New Zealand'
};

