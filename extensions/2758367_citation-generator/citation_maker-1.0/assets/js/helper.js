//localStorage.clear();
const api_url = 'https://plagiarismcheckerx.com/cite-maker-api?api=1';
document.body.style.width = "420px";
document.body.style.height = "500px";

window.onload = function() {

  if(document.getElementById('category_name').value == '') document.getElementById('category_name').value = 'website';

  function loadModule() {
    setTimeout(
      function() {
          document.getElementById('portfolio').classList.remove("collapse");
          document.getElementById('txt_url').value = '';
      }, 10);
    }

    loadModule();

    function showHideElements(day, month, year, unknown){

      if(day == 0) {

        document.getElementById('published_day_row').classList.add("collapse");
      } else {
        document.getElementById('published_day_row').classList.remove("collapse");
      }

      if(month == 0) {
        document.getElementById('published_month_row').classList.add("collapse");
      } else {
        document.getElementById('published_month_row').classList.remove("collapse");
      }

      if(year == 0) {
        document.getElementById('published_year_row').classList.add("collapse");
      } else {
        document.getElementById('published_year_row').classList.remove("collapse");
      }

      if(unknown == 0) {
        document.getElementById('published_unknown_row').classList.add("collapse");
      } else {
        document.getElementById('published_unknown_row').classList.remove("collapse");
      }

      document.getElementById('published_unknown').checked = 0;
      published_unknown_func();
    };

    function showHideDateAccessed(value){
      if(value == 1) {
        document.getElementById('row_accessed').classList.add("collapse");
      } else {
        document.getElementById('row_accessed').classList.remove("collapse");
      }
    };

    function setRequiredElements(website, journal, book, newspaper, report, image){

      if(website == 1 ||  journal == 1 || book == 1 || newspaper == 1 || report == 1 || image){
        document.getElementById('published_year').required = true;
        document.getElementById('txt_url').required = false;
      } else {
        document.getElementById('txt_url').required = true;
        document.getElementById('published_year').required = false;
      }

      document.getElementById('website_title').required = website;
      document.getElementById('website_name').required = website;
      document.getElementById('website_url').required = website;

      document.getElementById('journal_title').required = journal;
      document.getElementById('journal_page_from').required = journal;
      document.getElementById('journal_name').required = journal;
      document.getElementById('journal_doi').required = journal;
      document.getElementById('journal_url').required = false;

      document.getElementById('book_title').required = book;
      document.getElementById('book_publisher').required = book;
      document.getElementById('book_url').required = false;

      document.getElementById('newspaper_title').required = newspaper;
      document.getElementById('newspaper_name').required = newspaper;
      document.getElementById('newspaper_url').required = newspaper;
      document.getElementById('newspaper_page_from').required = false;

      document.getElementById('report_title').required = report;
      document.getElementById('report_url').required = report;

      document.getElementById('image_title').required = image;
      document.getElementById('image_type').required = image;
      document.getElementById('image_url').required = image;

    };

    document.getElementById('category_website').onclick = function(){
      showHideElements(1,1,1,1);
      setRequiredElements(1,0,0,0,0,0);
      document.getElementById("citation_method").value = 'auto';
      document.getElementById('category_name').value = 'website';
      document.getElementById('category_label').innerHTML = 'Website';
      document.getElementById('txt_url').placeholder = 'Enter web page URL here';
      manually_show();
    };

    document.getElementById('category_journal').onclick = function(){
      showHideElements(0,0,1,0);
      setRequiredElements(0,1,0,0,0,0);
      document.getElementById("citation_method").value = 'auto';
      document.getElementById('category_name').value = 'journal';
      document.getElementById('category_label').innerHTML = 'Journal';
      document.getElementById('txt_url').placeholder = 'Enter journal DOI or URL here';
      if(document.getElementById('journal_url').value != '') document.getElementById('journal_tab_url_link').click();
      manually_show();
    };

    document.getElementById('category_book').onclick = function(){
      showHideElements(0,0,1,0);
      setRequiredElements(0,0,1,0,0,0);
      document.getElementById("citation_method").value = 'auto';
      document.getElementById('category_name').value = 'book';
      document.getElementById('category_label').innerHTML = 'Book';
      document.getElementById('txt_url').placeholder = 'Enter book article URL here';
      if(document.getElementById('book_url').value != '') document.getElementById('book_tab_url_link').click();
      manually_show();
    };

    document.getElementById('category_newspaper').onclick = function(){
      showHideElements(1,1,1,1);
      setRequiredElements(0,0,0,1,0,0);
      document.getElementById("citation_method").value = 'auto';
      document.getElementById('category_name').value = 'newspaper';
      document.getElementById('category_label').innerHTML = 'Newspaper';
      document.getElementById('txt_url').placeholder = 'Enter newspaper URL here';
      if(document.getElementById('newspaper_page_from').value != '') document.getElementById('newspaper_tab_print_link').click();
      manually_show();
    };

    document.getElementById('category_report').onclick = function(){
      showHideElements(0,1,1,1);
      setRequiredElements(0,0,0,0,1,0);
      document.getElementById("citation_method").value = 'auto';
      document.getElementById('category_name').value = 'report';
      document.getElementById('category_label').innerHTML = 'Report';
      document.getElementById('txt_url').placeholder = 'Enter report URL here';
      if(document.getElementById('report_url').value == '' && document.getElementById('report_title').value != '') document.getElementById('report_tab_print_link').click();
      manually_show();
    };

    document.getElementById('category_image').onclick = function(){
      showHideElements(1,1,1,1);
      setRequiredElements(0,0,0,0,0,1);
      document.getElementById("citation_method").value = 'auto';
      document.getElementById('category_name').value = 'image';
      document.getElementById('category_label').innerHTML = 'Image';
      document.getElementById('txt_url').placeholder = 'Enter image/video URL here';
      manually_show();
    };

    document.getElementById('journal_tab_doi_link').onclick = function(){
      showHideElements(0,0,1,0);
      document.getElementById('journal_tab_url_link').classList.remove('tab-active');
      document.getElementById('journal_tab_doi_link').classList.add('tab-active');

      document.getElementById('journal_tab_url').style.display = 'none';
      document.getElementById('journal_tab_doi').style.display = 'block';
      document.getElementById('journal_tab_url').style.display = 'none';
      document.getElementById('journal_doi').required = true;
      document.getElementById('journal_url').required = false;
    };

    document.getElementById('journal_tab_url_link').onclick = function(){
      showHideElements(0,0,1,1);
      document.getElementById('journal_tab_doi_link').classList.remove('tab-active');
      document.getElementById('journal_tab_url_link').classList.add('tab-active');

      document.getElementById('journal_tab_url').style.display = 'block';
      document.getElementById('journal_tab_doi').style.display = 'none';
      document.getElementById('journal_url').required = true;
      document.getElementById('journal_doi').required = false;
    };

    document.getElementById('book_publisher').oninput = function(){
      var str = '';
      var publishers = ["Academia Press", "Academic Service", "Acco", "Adfo Books", "AENOR","Akal", "Alfaomega", "Alianza", "Alianza Editorial", "Amorrortu", "Amsterdam University Press", "Anagrama", "Ariel", "Ars Aequi Libri", "Balans", "Bazalt", "Beltz Verlag", "Bert Bakker", "BIM Media", "BIS", "Bohn Stafleu van Loghum", "Books on Demand", "Boom", "Boom Lemma", "Boom Nelissen", "Borgerhoff &amp; Lamberigts", "Bundeszentrale für politische Bildung", "Business Contact", "Cambridge University Press", "Campus Verlag", "Carl Hanser Verlag", "Carrera Culinair", "Christofoor", "Clavis", "Concept", "Cornelsen", "Corona", "Coutinho", "CPS Onderwijsontwikkeling en advies", "Crítica", "Cátedra", "Davidsfonds", "De Bezige Bij", "De Boeck", "De Eenhoorn", "De Gruyter", "De Tijdstroom", "Deutscher Taschenbuch Verlag", "Deutscher Universitätsverlag", "Die Keure", "Diplomica Verlag", "Dykinson", "Díaz de Santos", "Döhler", "Eburon", "Ediciones Pirámide", "Editorial Médica Panamericana", "Editorial Reverté", "Editorial UOC", "Edward Elgar Publishing",, "Elsevier", "Elsevier Gezondheidszorg", "Erich Schmidt Verlag", "Ernst einhardt Verlag", "ESIC", "Fondo de Cultura Económica", "FUOC", "Gabler Verlag", "Garant", "Gedisa", "Georg Thieme Verlag", "Gestión 2000", "Gottmer", "Graó", "Gredos", "Grupo Editorial Patria", "Gustavo Gili", "Hans Huber", "Haystack", "HB", "Herder", "Hogrefe", "Hogrefe Verlag", "Huber", "INDE", "Institut d’Estudis Catalans", "Klett-Cotta", "Klinkhardt", "Kluwer", "Kohlhammer", "Koninklijke Van Gorcum", "Kosmos", "L'Erma di Bretschneider", "Lannoo", "Lemniscaat", "Leopold", "Leske + Budrich", "Limusa", "Macmillan Publishers", "Malmberg", "Masson", "Maven", "McGraw-Hill Education", "Mohr Siebeck", "Morata", "Médica Panamericana", "Narcea", "Nelissen", "Nieuw Amsterdam", "Nieuwezijds", "Nomos", "Nomos Verlagsgesellschaft", "Noordhoff", "Norma", "Oceano", "Octaedro", "Oldenbourg Verlag", "Oxford University Press", "Paidotribo", "Paidós", "Palgrave Macmillan", "Panamericana", "Paraninfo", "Patria", "Pearson", "Pearson Benelux", "Pearson Education", "Pearson Studium", "Penguin Random House", "Peter Lang", "Pica", "Piramide", "Planeta", "Plantyn", "Ploegsma", "Porrúa", "Prentice Hall", "Prometheus", "Querido", "Reclam", "Reed Business", "Reed Business Education", "Reverté", "Revon", "Routledge", "SAGE Publications", "Santillana", "Schattauer", "Schneider Verlag Hohengehren", "Schroedel", "Schäffer-Poeschel Verlag", "Scriptum", "Sdu", "Simon &amp; Schuster", "Sociaal en Cultureel Planbureau", "Spectrum", "Springer Fachmedien", "Springer Gabler", "Springer Medizin Verlag", "Springer Publishing", "Springer Vieweg", "Suhrkamp Verlag", "SWP", "Síntesis", "Taurus", "Taylor &amp; Francis", "Tecnos", "Thema", "Thieme", "ThiemeMeulenhoff", "Thomson Reuters", "Tirant lo Blanch", "Transcript Verlag", "Trillas", "Trotta", "TU Delft", "UNAM", "UNED", "UOC", "UTB", "UVK Verlagsgesellschaft", "Vahlen", "Vakmedianet", "Van Duuren Media", "Van Haren Publishing", "Van In", "Vandenhoeck &amp; Ruprecht", "Verlag Franz Vahlen", "Verlag Hans Huber", "VS Verlag", "VS Verlag für Sozialwissenschaften", "W. Kohlhammer", "Westdeutscher Verlag", "Wiley", "Wolters Kluwer", "Wolters-Noordhoff", "Worth"];
      for (var i=0; i < publishers.length;++i){str += '<option value="'+publishers[i]+'" />';}
      var my_list=document.getElementById("book_publishers_list").innerHTML = str;
    };

    document.getElementById('book_publisher').onblur = function(){
      var my_list=document.getElementById("book_publishers_list").innerHTML = '';
    };

    document.getElementById('book_tab_doi_link').onclick = function(){

      document.getElementById('book_tab_doi_link').classList.add('tab-active');
      document.getElementById('book_tab_url_link').classList.remove('tab-active');
      document.getElementById('book_tab_doi').style.display = 'block';
      document.getElementById('book_tab_url').style.display = 'none';

      document.getElementById('book_url').required = false;
      document.getElementById('book_publisher').required = true;
      document.getElementById('book_publisher_row').childNodes[0].nodeValue = "Publisher *";
    };

    document.getElementById('book_tab_url_link').onclick = function(){

      document.getElementById('book_tab_url_link').classList.add('tab-active');
      document.getElementById('book_tab_doi_link').classList.remove('tab-active');
      document.getElementById('book_tab_url').style.display = 'block';
      document.getElementById('book_tab_doi').style.display = 'none';

      document.getElementById('book_url').required = true;
      document.getElementById('book_publisher').required = false;
      document.getElementById('book_publisher_row').childNodes[0].nodeValue = "Publisher";
    };

    document.getElementById('newspaper_tab_url_link').onclick = function(){

      document.getElementById('newspaper_tab_url_link').classList.add('tab-active');
      document.getElementById('newspaper_tab_print_link').classList.remove('tab-active');
      document.getElementById('newspaper_tab_url').style.display = 'block';
      document.getElementById('newspaper_tab_print').style.display = 'none';

      document.getElementById('newspaper_url').required = true;
      document.getElementById('newspaper_page_from').required = false;
    };

    document.getElementById('newspaper_tab_print_link').onclick = function(){

      document.getElementById('newspaper_tab_print_link').classList.add('tab-active');
      document.getElementById('newspaper_tab_url_link').classList.remove('tab-active');
      document.getElementById('newspaper_tab_print').style.display = 'block';
      document.getElementById('newspaper_tab_url').style.display = 'none';

      document.getElementById('newspaper_url').required = false;
      document.getElementById('newspaper_page_from').required = true;
    };

    document.getElementById('report_tab_url_link').onclick = function(){

      document.getElementById('report_tab_url_link').classList.add('tab-active');
      document.getElementById('report_tab_print_link').classList.remove('tab-active');
      document.getElementById('report_tab_url').style.display = 'block';
      document.getElementById('report_tab_print').style.display = 'none';

      document.getElementById('report_url').required = true;
      document.getElementById('report_publisher').required = false;
      document.getElementById('report_publisher_row').childNodes[0].nodeValue = "Publisher";
    };

    document.getElementById('report_tab_print_link').onclick = function(){

      document.getElementById('report_tab_print_link').classList.add('tab-active');
      document.getElementById('report_tab_url_link').classList.remove('tab-active');
      document.getElementById('report_tab_print').style.display = 'block';
      document.getElementById('report_tab_url').style.display = 'none';

      document.getElementById('report_url').required = false;
      document.getElementById('report_publisher').required = true;
      document.getElementById('report_publisher_row').childNodes[0].nodeValue = "Publisher *";
    };

    document.getElementById('published_unknown').onclick = function(){
      if(document.getElementById('published_unknown').checked) {
        document.getElementById('published_year').required = false;
      } else {
        document.getElementById('published_year').required = true;
      }
    };

    var author_1_unknown = document.getElementById("author_1_unknown");

    var author_1_is_organization = document.getElementById("author_1_is_organization");
    var published_unknown = document.getElementById("published_unknown");
    var accessed_set_today = document.getElementById("accessed_set_today");


    function manually_show() {
      document.getElementById('row_authors').style.display = 'none';
      document.getElementById('form_bottom_fix').style.display = 'none';
      document.getElementById('citation-second-formarea').style.display = 'none';
      document.getElementById('citation-third').style.display = 'none';
    	var citation_method = document.getElementById("citation_method").value;
      tablinks = document.getElementsByClassName("tablinks");
  		for (i = 0; i < tablinks.length; i++) {
  		    tablinks[i].className = tablinks[i].className.replace("active", "");
  		}
      document.getElementById('category_'+document.getElementById('category_name').value).classList.add("active");
    }

    function author_unknown_func() {

      var author_1_fname = document.getElementById("author_1_fname");
      var author_1_lname = document.getElementById("author_1_lname");

      if(author_1_unknown.checked) {
        author_1_fname.disabled = true; author_1_fname.value = "Unknown";
        author_1_lname.disabled = true; author_1_lname.value = "Unknown";
        author_1_unknown.value = 1;
      } else {
        author_1_fname.disabled = false; author_1_fname.value = "";
        author_1_lname.disabled = false; author_1_lname.value = "";
        author_1_unknown.value = 0;
      }
    }

    function author_is_organization_func() {

      var author_1_fname_row = document.getElementById("author_1_fname_row");
      var author_1_lname_row = document.getElementById("author_1_lname_row");
      var author_1_fname = document.getElementById("author_1_fname");
      var author_1_lname = document.getElementById("author_1_lname");

      if(author_1_is_organization.checked) {
        author_1_fname_row.className = 'col col-md-12';
        author_1_fname.placeholder = "Organization Name";
        author_1_fname.classList.remove("w-175");
        author_1_lname_row.className = "col-md-3 collapse";
        author_1_is_organization.value = 1;
        author_unknown_func();
      } else {
        author_1_fname_row.className = 'col col-md-6';
        author_1_fname.placeholder = "First Name";
        author_1_lname_row.className = "col col-md-6 show";
        author_1_fname.classList.add("w-175");
        author_1_is_organization.value = 0;
      }
    }

    function published_unknown_func() {

      var published_day = document.getElementById("published_day");
      var published_month = document.getElementById("published_month");
      var published_year = document.getElementById("published_year");

      if(published_unknown.checked) {
        published_day.disabled = true;
        published_month.disabled = true;
        published_year.disabled = true;
        published_unknown.value = 1;
      } else {
        published_day.value = '';
        published_month.value = '';
        published_year.value = '';
        published_day.disabled = false;
        published_month.disabled = false;
        published_year.disabled = false;
        published_unknown.value = 0;
      }
    }

    author_unknown_func();
    author_is_organization_func();
    published_unknown_func();

    author_1_unknown.onchange = function() {author_unknown_func();};
    author_1_is_organization.onchange = function() {author_is_organization_func();};
    published_unknown.onchange = function() {published_unknown_func();};

    accessed_set_today.onclick = function() {
      var d = new Date();
      document.getElementById("accessed_day").value = ("0" + d.getDate()).slice(-2);
      document.getElementById("accessed_month").value = ("0" + (d.getMonth() + 1)).slice(-2);
      document.getElementById("accessed_year").value = d.getFullYear();
    };

  }



document.getElementById("txt_url").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("create_citation_url_submit").click();
  }
});


document.getElementById('create_citation_url_submit').onclick = function(){
  document.getElementById("citation_method").value = 'auto';
  document.getElementById("txt_url").style.border = '1px solid lightgrey';
  var txt_url = document.getElementById("txt_url").value;
  if(txt_url!='') {
      clear_inputs();
    	document.getElementById("loading").style.display = "block";
      document.getElementById("citation-third").style.display = "none";
      var process_req = 1;
      var params = '';
    	let form = document.querySelector('#citationform');
    	let formdata = new FormData(form);
    	formdata.forEach((value,key) => {
    	  params = params+key+"="+value+"&";
    	});
      var xhttp = xml_requests('POST',api_url,true,params);
    	xhttp.onreadystatechange = function() {
    		if (xhttp.status == 200 && isJsonString(xhttp.responseText) && process_req==1) {
    			  document.getElementById("loading").style.display = "none";
            document.getElementById("row_authors").style.display = "block";
            document.getElementById("citation-second-formarea").style.display = "block";
            document.getElementById("form_bottom_fix").style.display = "block";
    			  process_req = 2;
    			  var response = JSON.parse(xhttp.responseText);
    			  document.getElementById("citation_method").value = 'manual';
    			  document.getElementById("category_name").value = response.core.category;
    			  show_response_area(response);
    		}
    	}
    } else {
      document.getElementById("txt_url").style.border = '1px solid red';
    }
};



document.getElementById('create_citation_submit').onclick = function(){
    var process_req = 1;
    var params = '';
	let form = document.querySelector('#citationform');
	let formdata = new FormData(form);
	formdata.forEach((value,key) => {
	  params = params+key+"="+value+"&";
	});
    var xhttp = xml_requests('POST',api_url,true,params);
	xhttp.onreadystatechange = function() {
		if (xhttp.status == 200 && isJsonString(xhttp.responseText) && process_req==1) {
			  process_req = 2;
			  var response = JSON.parse(xhttp.responseText);
			  document.getElementById('row_authors').classList.add("collapse");
			  document.getElementById('row_bottom').classList.add("collapse");
			  document.getElementById('citation-second-formarea').style.display = 'none';
			  document.getElementById('citation-third').style.display = 'block';
			  document.getElementById("bibliography_text").innerHTML = response.status.reference;
			  document.getElementById('citation_intext').innerHTML = response.status.in_text;
		}
	}
};


document.getElementById('bibliography_text').onclick = function(){
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById('bibliography_text').innerText);
    document.body.appendChild(aux);
    console.log(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    document.getElementById("tooltip_bibliography").innerHTML = "Copied!!!";
    document.getElementById("tooltip_intext").innerHTML = "Click to copy";
};


document.getElementById('citation_intext').onclick = function(){
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById('citation_intext').innerText);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    document.getElementById("tooltip_intext").innerHTML = "Copied!!!";
    document.getElementById("tooltip_bibliography").innerHTML = "Click to copy";
};


function clear_inputs() {
  inputs = document.getElementById('citation-second-formarea').getElementsByTagName('input');
      for (index = 0; index < inputs.length; ++index) {
        if(inputs[index].type =="text")
        inputs[index].value = '';
  }
  inputs = document.getElementById('row_authors').getElementsByTagName('input');
      for (index = 0; index < inputs.length; ++index) {
        if(inputs[index].type =="text") {
        inputs[index].value = ''; }
        if(inputs[index].type =="checkbox") {
        inputs[index].checked = false; }
  }
  inputs = document.getElementById('row_bottom').getElementsByTagName('input');
      for (index = 0; index < inputs.length; ++index) {
        if(inputs[index].type =="text") {
        inputs[index].value = ''; }
        if(inputs[index].type =="checkbox") {
        inputs[index].checked = false; }
  }

}


function xml_requests(method,url,authorization=false,data=null) {
    var xhttp =  new XMLHttpRequest();
    xhttp.open(method,url,true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("accept", "application/json");
    if(method=='POST') {
        xhttp.send(data);
    } else {
        xhttp.send();
    }
    return xhttp;
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function show_response_area(response) {
	document.getElementById('row_website').classList.add("collapse");
	document.getElementById('row_journal').classList.add("collapse");
	document.getElementById('row_book').classList.add("collapse");
	document.getElementById('row_newspaper').classList.add("collapse");
	document.getElementById('row_report').classList.add("collapse");
	document.getElementById('row_image').classList.add("collapse");
	document.getElementById('row_authors').classList.remove("collapse");
	document.getElementById('row_bottom').classList.remove("collapse");
	document.getElementById('category_'+response.core.category).classList.add("active");
	document.getElementById('row_'+response.core.category).classList.remove("collapse");

	document.getElementById('author_1_fname').value = response.author[1].fname;
	document.getElementById('author_1_lname').value = response.author[1].lname;
	if(response.author[1].unknown!=null) {
		document.getElementById("author_1_unknown").author_1_unknown = true;
	}
	if(response.author[1].is_organization!=null) {
		document.getElementById("author_1_is_organization").author_1_unknown = true;
		document.getElementById('is_organization').value = response.author[1].is_organization;
	}

	document.getElementById('accessed_day').value = response.date.accessed_day;
	document.getElementById('accessed_month').value = response.date.accessed_month;
	document.getElementById('accessed_year').value = response.date.accessed_year;
	document.getElementById('published_day').value = response.date.published_day;
	document.getElementById('published_month').value = response.date.published_month;
	document.getElementById('published_year').value = response.date.published_year;


	if(response.core.category=='website') {
		document.getElementById('website_title').value = response.website.title;
		document.getElementById('website_name').value = response.website.name;
		document.getElementById('website_url').value = response.website.url;
	}
	if(response.core.category=='journal') {
		document.getElementById('journal_title').value = response.journal.title;
		document.getElementById('journal_doi').value = response.journal.doi;
		document.getElementById('journal_url').value = response.journal.url;
		document.getElementById('journal_page_from').value = response.journal.page_from;
		document.getElementById('journal_page_to').value = response.journal.page_to;
		document.getElementById('journal_volume').value = response.journal.volume;
		document.getElementById('journal_issue').value = response.journal.issue;
		document.getElementById('journal_name').value = response.journal.name;
	}
	if(response.core.category=='book') {
    console.log(response.book.edition);
		document.getElementById('book_title').value = response.book.title;
		document.getElementById('book_url').value = response.book.url;
		document.getElementById('book_doi').value = response.book.doi;
		document.getElementById('book_edition').value = response.book.edition;
		document.getElementById('book_volume').value = response.book.volume;
		document.getElementById('book_publishers_list').value = response.book.publisher;
	}
	if(response.core.category=='newspaper') {
		document.getElementById('newspaper_title').value = response.newspaper.title;
		document.getElementById('newspaper_url').value = response.newspaper.url;
		document.getElementById('newspaper_doi').value = response.newspaper.doi;
		document.getElementById('newspaper_name').value = response.newspaper.name;
		document.getElementById('newspaper_page_from').value = response.newspaper.page_from;
		document.getElementById('newspaper_page_to').value = response.newspaper.page_to;
	}
	if(response.core.category=='report') {
		document.getElementById('report_title').value = response.report.title;
		document.getElementById('report_doi').value = response.newspaper.url;
		document.getElementById('report_url').value = response.newspaper.doi;
		document.getElementById('report_number').value = response.newspaper.number;
		document.getElementById('report_publisher').value = response.newspaper.publisher;
	}
	if(response.core.category=='image') {
		document.getElementById('image_title').value = response.report.title;
		document.getElementById('image_type').value = response.newspaper.type;
		document.getElementById('image_url').value = response.newspaper.url;
	}

}


 document.body.addEventListener('click', function(evt) {
    var currentID = evt.target.id || "citation_option";
    before_id= currentID.substr(0, currentID.indexOf('-'));
    var after_id= currentID.split('-').pop();
    if(after_id=='citation_option' && currentID!='citation_option') {
        var elements = document.getElementsByClassName('tabcontent');
        document.getElementById("citation-first").style.display = "none";
        document.getElementById("citation-second").style.display = "block";
        document.getElementById("citation-second-formarea").style.display = "block";
	    document.getElementById("citation_style").value = before_id;
    }
});
