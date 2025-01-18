
/**
 *
 * Created with NetBeans IDE
 *
 * Code     : Icon Select JS
 * Version  : 1.0
 *
 * User     : Bugra OZDEN
 * Site     : http://www.bugraozden.com
 * Mail     : bugra.ozden@gmail.com
 *
 * Date     : 10/30/13
 * Time     : 01:10 PM
 *
 */


IconSelect.COMPONENT_ICON_FILE_PATH = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAMAAAAmGUT3AAAABlBMVEX///8oKCgLdMJ2AAAAAXRSTlMAQObYZgAAABVJREFUeAFjQAKMEABnwkXhChhQAAACgAARzJ4d1gAAAABJRU5ErkJggg==";

function IconSelect($$elementID, $$parameters) {
    
	var _icons = [];
	var _selectedIndex = -1;
	var _boxScroll;

	var options;

    function _init() {
        
        //parametreler boş gelirse
        if(!$$parameters) $$parameters = {};
		
		options = $$parameters;
		
        //En üst elementi seç
        if(_View.setIconSelectElement($$elementID)){
            
            //create UI
            var ui = _View.createUI($$parameters, $$elementID);

            _View.iconSelectElement.onclick = function(){
                _View.showBox();
            };
            
            //Başlangıçta gizle
            _View.showBox(false);

            //Nesneye basıldığında gizlemeyi iptal et.
            _View.iconSelectElement.addEventListener('click', function($event){
                $event.stopPropagation();             
            });
            
            //dışarı basıldığında gizle.
            window.addEventListener('click', function(){
                _View.showBox(false);
            });
           
        }else{
            alert("Element not found.");
        }
        
    }
    
    this.refresh = function($icons){
        
        _icons = [];

        var that = this;
		
        for(var i = 0; i < $icons.length; i++){
            $icons[i].element = _View.createIcon($icons[i].iconFilePath, $icons[i].iconValue, i, $$parameters);
            $icons[i].element.onclick = function() {
                that.setSelectedIndex(this.childNodes[0].getAttribute('icon-index'), false);
            };
            _icons.push($icons[i]);
            
        }
        
        var horizontalIconNumber = Math.round(($icons.length) / $$parameters.vectoralIconNumber);
        
        _View.boxElement.style.height = (($$parameters.iconsHeight + 2) * horizontalIconNumber) +  ((horizontalIconNumber + 1) * $$parameters.boxIconSpace);
        this.setSelectedIndex(0, true);
    };
    
    this.getIcons = function(){ return _icons; };
    

	this.setSelected = function(iconValue){
		for(key in _icons) {
			if (_icons[key].iconValue == iconValue) {
				this.setSelectedIndex(key, true);
			}
		}
	}
	
	
    this.setSelectedIndex = function($index, defRun){
        
		defRun = defRun || false;
        var icon;
        
        if(_icons.length > $index) icon = _icons[$index];
        
        if(icon){
            //eski icondan seçilme özelliğini kaldır.
            if(_selectedIndex != -1) _icons[_selectedIndex].element.setAttribute('class','icon');
            _selectedIndex = $index;
            _View.selectedIconImgElement.setAttribute('src', icon.iconFilePath);
            if(_selectedIndex != -1) _icons[_selectedIndex].element.setAttribute('class','icon selected');
        }
        
        _View.iconSelectElement.dispatchEvent(new Event('changed'));
		
		if (!defRun) options.changed(_icons[_selectedIndex]);
    };
    
    this.getSelectedIndex = function(){ return _selectedIndex; };
    this.getSelectedValue = function(){ return _icons[_selectedIndex].iconValue };
    this.getSelectedFilePath = function(){ return _icons[_selectedIndex].iconFilePath };
    
    
    
    //### VIEW CLASS ###
        
    function _View(){}
    
    _View.iconSelectElement;
    _View.boxElement;
    _View.boxScrollElement;
    _View.selectedIconImgElement;
    _View.selectedIconElement;
    
    _View.showBox = function($isShown){
                
         if($isShown == null) {
             $isShown = (_View.boxElement.style.display == "none") ? true : false;
         }
                
        if($isShown) {
            _View.boxElement.style.display = "block";
            _View.boxScrollElement.style.display = "block";
            //_boxScroll = (_boxScroll) ? _boxScroll : new iScroll($$elementID + "-box-scroll");
        }else{
            _View.boxElement.style.display = "none";
            _View.boxScrollElement.style.display = "none";
        }
        
        _View.boxElement.style.display = ($isShown) ? "block" : "none";

    };
    
    _View.setIconSelectElement = function($elementID){
        _View.iconSelectElement = document.getElementById($elementID);
        return _View.iconSelectElement;
    };
    
    _View.clearUI = function(){
        _View.iconSelectElement.textContent = '';
    };
    
    _View.clearIcons = function(){
        _View.boxElement.textContent  = '';
    };
    
    _View.createUI = function($parameters){
        
        _View.clearUI();
        
        _View.iconSelectElement.setAttribute('class', 'icon-select');
        
        var selectedBoxElement = document.createElement('div');
        selectedBoxElement.setAttribute('class' ,'selected-box');
        
        var selectedIconElement = document.createElement('div');
        selectedIconElement.setAttribute('class' ,'selected-icon');
        
        _View.selectedIconImgElement = document.createElement('img');
        _View.selectedIconImgElement.setAttribute('src', '');
        selectedIconElement.appendChild(_View.selectedIconImgElement);
        
        var componentIconElement = document.createElement('div');
        componentIconElement.setAttribute('class', 'component-icon');
        
        var componentIconImgElement = document.createElement('img');
        componentIconImgElement.setAttribute('src', IconSelect.COMPONENT_ICON_FILE_PATH );
        componentIconElement.appendChild(componentIconImgElement);
        
        _View.boxScrollElement = document.createElement('div');
        _View.boxScrollElement.setAttribute('id',$$elementID + "-box-scroll");
        _View.boxScrollElement.setAttribute('class', 'box');
        
        _View.boxElement = document.createElement('div');
        
        //_View.boxElement.setAttribute('class', 'box');
        _View.boxScrollElement.appendChild(_View.boxElement);
        
        _View.selectedIconImgElement.setAttribute('width', $parameters.selectedIconWidth);
        _View.selectedIconImgElement.setAttribute('height', $parameters.selectedIconHeight);
        selectedIconElement.style.width = $parameters.selectedIconWidth;
        selectedIconElement.style.height = $parameters.selectedIconHeight;
        selectedBoxElement.style.width = $parameters.selectedIconWidth + $parameters.selectedBoxPadding + $parameters.selectedBoxPaddingRight;
        selectedBoxElement.style.height = $parameters.selectedIconHeight + ($parameters.selectedBoxPadding * 2);
        selectedIconElement.style.top = $parameters.selectedBoxPadding;
        selectedIconElement.style.left = $parameters.selectedBoxPadding;
        componentIconElement.style.bottom = 4 + $parameters.selectedBoxPadding;
        
        _View.boxScrollElement.style.left = parseInt(selectedBoxElement.style.width) + 1;
        
        _View.boxScrollElement.style.width = (($parameters.iconsWidth + 2) * $parameters.vectoralIconNumber) + 
                (($parameters.vectoralIconNumber + 1) * $parameters.boxIconSpace);
        _View.boxScrollElement.style.height = (($parameters.iconsHeight + 2) * $parameters.horizontalIconNumber) + 
                (($parameters.horizontalIconNumber + 1) * $parameters.boxIconSpace);
         
        _View.boxElement.style.left = _View.boxScrollElement.style.left;
        _View.boxElement.style.width = _View.boxScrollElement.style.width;
        
        _View.iconSelectElement.appendChild(selectedBoxElement);
        selectedBoxElement.appendChild(selectedIconElement);
        selectedBoxElement.appendChild(componentIconElement);
        selectedBoxElement.appendChild(_View.boxScrollElement);
        
        
        var results = {};
        results['iconSelectElement'] = _View.iconSelectElement;
        results['selectedBoxElement'] = selectedBoxElement;
        results['selectedIconElement'] = selectedIconElement;
        results['selectedIconImgElement'] = _View.selectedIconImgElement;
        results['componentIconElement'] = componentIconElement;
        results['componentIconImgElement'] = componentIconImgElement;
        
        return results;
        
        
       //trigger: created ( run setValues )
        
    };
        
    _View.createIcon = function($iconFilePath, $iconValue, $index, $parameters){
        
        /* HTML MODEL 
         
         <div class="icon"><img src="images/icons/i1.png"></div>
         
         */
        
        var iconElement = document.createElement('div');
        iconElement.setAttribute('class', 'icon');
        iconElement.style.width = $parameters.iconsWidth;
        iconElement.style.height = $parameters.iconsHeight;
        iconElement.style.marginLeft = $parameters.boxIconSpace;
        iconElement.style.marginTop = $parameters.boxIconSpace;
        
        var iconImgElement = document.createElement('img');
        iconImgElement.setAttribute('src', $iconFilePath);
        iconImgElement.setAttribute('icon-value', $iconValue);
        iconImgElement.setAttribute('icon-index', $index);
        iconImgElement.setAttribute('width', $parameters.iconsWidth);
        iconImgElement.setAttribute('height', $parameters.iconsHeight);
        
        iconElement.appendChild(iconImgElement);
        _View.boxElement.appendChild(iconElement);
        
        return iconElement;
        
    };
    
    //### MODEL CLASS ###
    
    function _Model(){}
    
    
    _init();
    
}