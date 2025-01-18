
class gamesDOMBuilder 
{
    constructor(games) {
        if(!(games instanceof Object)) {
            return false;
        }

        this.data      = games.data;
        this.sectionId = games.sectionId;
    }

    make() {
        console.log(this.data);
        console.log(this.sectionId);

        var parentElement = document.getElementById(this.sectionId+'-jeux');
        var nodes         = document.createDocumentFragment();
        var gamesData     = this.data;

        // Emptying the parent element
        this.removeElementsFrom(parentElement);

        // Create a new node for each game
        for (var i = 0, length = gamesData.length; i < length; i++) {
            this.buildNode(gamesData[i], nodes);
        };

        // Append the nodes to the parent element
        parentElement.appendChild(nodes);

        // Make every <a> elements clickable
        this.clickEventListener();
    }

    removeElementsFrom(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    buildNode(data, node) {
        // Create Elements
        var li     = document.createElement('li');
        var a      = document.createElement('a');
        var img    = document.createElement('img');
        var strong = document.createElement('strong');

        // Create Text
        var title = document.createTextNode(data.title);

        // Set Attributes
        a.setAttribute('href',  data.href + '?utm_source=TjfFirefoxExtension&utm_medium=Extension&utm_campaign='+this.sectionId);
        a.setAttribute('title', data.title);
        img.setAttribute('src', data.img)

        // Append Elements
        strong.appendChild(title);
        a.appendChild(img);
        a.appendChild(strong);
        li.appendChild(a);

        // Append the final element to the node
        node.appendChild(li);
    }

    clickEventListener() {
        var el = document.getElementsByTagName('a');

        for (var i = 0; i < el.length; i++) {
            el[i].addEventListener('click', this.openLink);
        };
    }

    openLink(e) {
        chrome.tabs.create({ url: this.getAttribute('href') });
        window.close();
        e.preventDefault();
    }
}

class Pagination 
{
    constructor(games) {
        if(!(games instanceof Object)) {
            return false;
        }

        this.games = games;

        this.page      = 0;
        this.maxPage   = Math.ceil((this.games.gamesData.length / this.games.gamesPerPage)) - 1;

        this.games.from = this.games.gamesPerPage * this.page;
        this.games.to   = this.games.gamesPerPage * (this.page + 1);
    }

    make() {
        var bts = [
            {'id': 'previous', 'text' : '\u003C'}, 
            {'id': 'next',     'text' : '\u003E'}
        ];

        var fragment = document.createDocumentFragment();

        for (var i = 0; i < bts.length; i++) {
            // Create Element
            var button = document.createElement('button');

            // Create Text
            var text = document.createTextNode(bts[i].text);

            // Append text
            button.appendChild(text);

            // Set Attributes
            button.setAttribute('class', 'bt');
            button.setAttribute('id', bts[i].id+'-'+this.games.sectionId);

            fragment.appendChild(button);
        };

        // fragment is not empty
        if(fragment.firstChild) {
            var buttons = document.getElementById(this.games.sectionId).getElementsByClassName('buttons');
            buttons[0].insertBefore(fragment, buttons[0].firstChild);

            this.clickEventListener();           
        }
    }

    clickEventListener() {
        var next     = document.getElementById('next-'+this.games.sectionId);
        var previous = document.getElementById('previous-'+this.games.sectionId);

        next.addEventListener('click', this.nextPage.bind(this));
        previous.addEventListener('click', this.previousPage.bind(this));
    }

    updateGamesRange() {
        this.games.from = this.games.gamesPerPage * this.page;
        this.games.to   = this.games.gamesPerPage * (this.page + 1);        
    }

    nextPage() {
        this.page++;
        this.page = (this.page <= this.maxPage) ? this.page : 0;
        this.updateGamesRange();
        this.games.show();
    }

    previousPage() {
        this.page--;
        this.page = (this.page >= 0) ? this.page : this.maxPage;
        this.updateGamesRange();
        this.games.show();
    }
}


class Games 
{
    constructor(gamesData, gamesPerPage, sectionId) {
        //if object
        this.gamesData    = gamesData;
        this.gamesPerPage = gamesPerPage;
        this.sectionId    = sectionId;

        this.from = 0;
        this.to   = this.gamesPerPage;
    }

    get data() {
        return this.gamesData.slice(this.from, this.to);
    }

    show() {
        var nodesMaker = new gamesDOMBuilder(this);
        nodesMaker.make();
    }

    paginate() {
        var pagination = new Pagination(this);
        pagination.make();
    }
}


function init() {
    chrome.runtime.getBackgroundPage(function(bg) {
        bg.loadGames(function(data) {
            var lastGames = new Games(data.last, 5, 'nouveaux');
            lastGames.show();
            lastGames.paginate();

            var topGames = new Games(data.top, 5, 'meilleurs');
            topGames.show();
            topGames.paginate();
        });
    });

    document.getElementById('search-form').addEventListener('submit', function(e) {
        window.close();
        // e.preventDefault();
    });
}

document.addEventListener('DOMContentLoaded', init);

