class Options {

    /**
	 * Конструктор
     */
    constructor() {
        this.enable = (typeof PlayerUI !== 'undefined' && typeof jQuery !== 'undefined');
		this.player = (this.enable) ? PlayerUI.prototype : null;
		this.ext    = (this.enable) ? $('#chrome-ext-the-radio-ru') : null;

		this.init();
    }

    /**
	 * Включение выбранных опций
     */
    init() {
        if (this.enable && this.ext != null && this.ext.length) {
            this.count(); // Установка количества потоков

			if (this.active('autovolume'))
                this.volume();

			if (this.active('sidebarcollapse'))
				this.expand();

			if (this.active('restartstream'))
                restartMode.init();
        }
    }

    /**
	 * Если нужно выровнить громкость
     */
    volume() {
    	let self = this;

        if (typeof this.player.toolbar.track.volumeSet === 'function')
            this.player.on('play', () => {
                self.player.toolbar.track.volumeSet(100);
            });
    }

    /**
	 * Разворот стилей при наведении
     */
    expand() {
        if (typeof Sidebar !== 'undefined' && typeof jQuery.fn.hoverIntent !== 'undefined') {
            let Expand = Sidebar.style.expand;

            $('#style-block').hoverIntent({
                over: () => {
                    if (!Expand.expanded)
                        Expand.open();
                },
                out: () => {
                    if (Expand.expanded)
                        Expand.close();
                },
                interval: 250,
                timeout: 250
            });
        }
    }

    /**
	 * Подсчет потоков (Запишет их количество)
     */
    count() {
        if (typeof this.player.vars.current.streams === 'object') {
            let streams = this.player.vars.current.streams.length || 0;

            this.player.on('load', () => {
                this.ext.attr('stream-count', streams.toString());
            });
        }
    }




    /**
	 * Текущая настройка
	 *
     * @param key
     * @returns {boolean}
     */
    active(key) {
        return (this.ext != null) ? this.ext.attr('data-' + key) === "true" : false;
    }
}


/**
 * Перезапуск радиостанции при длительном разрыве соединения
 * @type {{handle: number, time: number, first: boolean, interval: number, init(): void}}
 */
const restartMode = {
    handle: 0,
    time: 0,
    first: true,
    interval: 8000,

    init() {
        if (typeof PlayerUI.prototype.on !== 'undefined') {
            let self = this;
            let player = PlayerUI.prototype;

            player.on('play', () => self.run());
            player.on('stop', () => self.stop());
            player.on('error',() => self.run());
            player.on('broken',() => self.run());
        }
    },


    run() {
        let self = this;

        if (this.handle > 0)
            this.stop();

        this.handle = setInterval(() => self.check(), self.interval);
    },


    stop() {
        clearInterval(this.handle);

        this.handle = 0;
        this.time = 0;
        this.first = true;
    },


    check() {
        if (typeof PlayerUI !== 'undefined' && typeof PlayerCore !== 'undefined') {
            let core = PlayerCore.prototype;

            // Если плеер не существует, то останавливаем
            if (typeof core.buffer === 'undefined') {
                this.stop();
                return false;
            }

            let player = PlayerUI.prototype;
            let buffer = parseInt(core.buffer);

            // Если загрузка потока идет стабильно
            if (buffer !== this.time && buffer !== -1) {
                this.time = buffer;
            }
            // Если загрузка потока не идет, то пробуем перезапустить плеер
            else {
                 if (buffer > 3 || buffer === -1) {
                    player.cast.stop();

                    setTimeout(() => player.cast.play(), 1000);

                    Global.msg.warn('The-Radio расширение обнаружило разрыв соединения. Производится переподключение радиостанции!!!', 7000);
                 }
            }

        }
    }
};


new Options();
