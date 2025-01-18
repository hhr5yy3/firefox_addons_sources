setTimeout(function () {
    var app = new App.Main();
});
var App;
(function (App) {
    var Article = (function () {
        function Article(data) {
            this._title = data.title;
            this._img = data.image;
            this._playLink = 'http://iogames.land/play/' + data.slug;
            this._postLink = 'http://iogames.land/game/' + data.slug;
            this._rating = data.rating;
            this._plays = data.plays;
            this._postDate = data.date;
            if (("videos" in data)) {
            }
            var r = Math.floor(Math.random() * 10) + 1;
            var show = '<article class="homepage-article grid3 ms-item col-xs-4">';
            show += '<div class="box-holder">';
            show += '<a href="' + this._playLink + '" rel="bookmark" target="_blank">';
            show += '<div class="wrapper">';
            show += '<div class="image-container small">';
            show += '<img class="media" src="' + this._img + '">';
            show += '</div>';
            show += '</div>';
            show += '</a>';
            show += '<a class="flat-button small t-r-corner bg_red"><i class="fa fa-youtube-play love" aria-hidden="true"></i></a>';
            show += '<header class="entry-header">';
            show += '<p class="entry-title">';
            show += '<a class="title" href="' + this._playLink + '" rel="bookmark" target="_blank">' + this._title + '</a>';
            show += '</p>';
            show += '<p class="hidden likes">' + this._rating + '</p>';
            show += '<p class="hidden plays">' + this._plays + '</p>';
            show += '<p class="hidden date">' + this._postDate + '</p>';
            show += '<p class="hidden name">' + this._title + '</p>';
            show += '</header>';
            show += '</div>';
            show += '</article>';
            this._display = show;
        }
        Object.defineProperty(Article.prototype, "title", {
            get: function () {
                return this._title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Article.prototype, "display", {
            get: function () {
                return this._display;
            },
            enumerable: true,
            configurable: true
        });
        Article.prototype.showVideos = function () {
            $('#videos .buttons .play-game').remove();
            var playButton = '<a class="flat-button bg_red play-game" href="' + this._playLink + '" target="_blank">Play ' + this._title + '</a> ';
            playButton += '<a class="flat-button bg_blue play-game" href="' + this._postLink + '" target="_blank">Submit Video</a> ';
            $('#videos .buttons').append(playButton);
            if (this._videos == undefined) {
                $('#videos .showVids').append('<div class="text_black col-xs-12">Sadly this game has no videos yet. You could be the first person to submit a video :)</div>');
            }
            else {
                for (var code in this._videos) {
                    if (code === '0') {
                        var vid = '<div class="col-xs-12">';
                        vid += '<div class="video-container">';
                        vid += '<iframe src="https://www.youtube.com/embed/' + this._videos[code] + '" frameborder="0" allowfullscreen=""></iframe>';
                        vid += '</div>';
                        vid += '</div>';
                    }
                    else {
                        var vid = '<div class="col-xs-6">';
                        vid += '<div class="video-container">';
                        vid += '<iframe src="https://www.youtube.com/embed/' + this._videos[code] + '" frameborder="0" allowfullscreen=""></iframe>';
                        vid += '</div>';
                        vid += '</div>';
                    }
                    $('#videos .showVids').append(vid);
                }
            }
            $('#games').hide();
            $('#videos').show();
        };
        return Article;
    }());
    App.Article = Article;
})(App || (App = {}));
var App;
(function (App) {
    var Data = (function () {
        function Data(main, cb) {
            this._main = main;
            this._cb = cb;
            this.init();
        }
        Data.prototype.init = function () {
            this.grabData();
        };
        Data.prototype.grabData = function () {
            var _this = this;
            $.getJSON("http://iogames.land/extension/json.txt?" + Date.now(), function (data) {
                var gameData = {
                    posts: []
                };
                $.each(data.posts, function (post, value) {
                    var game = data.posts[post];
                    gameData.posts[post] = {
                        title: game.title,
                        image: game.images,
                        slug: game.slug,
                        date: App.convertToMilliseconds(game.date),
                        rating: game.rating | 0,
                        plays: game.plays | 0,
                        videos: game.videos
                    };
                });
                _this.showGames(gameData);
            });
        };
        Data.prototype.showGames = function (data) {
            var _this = this;
            $('.sort-buttons').show();
            $('#loading').hide();
            $.each(data.posts, function (post, vars) {
                var article = new App.Article(data.posts[post]);
                $("#ms-container-app").append(article.display);
                _this._main.gameList[article.title] = article;
            });
            $('img').on('dragstart', function (event) { event.preventDefault(); });
            init_isotope();
            this._cb();
        };
        return Data;
    }());
    App.Data = Data;
})(App || (App = {}));
var App;
(function (App) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this._gameList = {};
            this._user = new App.User();
            this._data = new App.Data(this, function () {
                _this.click();
            });
            $('#videos a.back').on('click', function () {
                $('#videos').hide();
                $('.showVids').html('');
                $('#games').show();
            });
            $('body').ready(function () {
                $('body').css({
                    width: 600,
                    height: 500
                });
            });
        }
        Object.defineProperty(Main.prototype, "user", {
            get: function () {
                return this._user;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Main.prototype, "gameList", {
            get: function () {
                return this._gameList;
            },
            enumerable: true,
            configurable: true
        });
        Main.prototype.click = function () {
            var _this = this;
            $(".t-r-corner").on('click', function (event) {
                var box = $(event.target).closest('article');
                var name = box.find('a.title').text();
                var article = _this._gameList[name];
                article.showVideos();
            });
        };
        return Main;
    }());
    App.Main = Main;
})(App || (App = {}));
var App;
(function (App) {
    var User = (function () {
        function User() {
            this.init();
        }
        User.prototype.init = function () {
        };
        User.prototype.appendFavs = function () {
        };
        User.prototype.saveFav = function () {
        };
        User.prototype.handleLove = function (name) {
            alert(name);
        };
        return User;
    }());
    App.User = User;
})(App || (App = {}));
var App;
(function (App) {
    function convertToMilliseconds(date) {
        return new Date(date).getTime();
    }
    App.convertToMilliseconds = convertToMilliseconds;
})(App || (App = {}));
//# sourceMappingURL=app.js.map