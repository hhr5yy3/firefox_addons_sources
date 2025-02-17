'use strict';

const ЭТО_CONTENT_SCRIPT = !document.currentScript;

const АДРЕС_НЕ_ПЕРЕНАПРАВЛЯТЬ = 'twitch5=0';

const ЛЕВАЯ_КНОПКА = 0;

const СРЕДНЯЯ_КНОПКА = 1;

const ПРАВАЯ_КНОПКА = 2;

const НАЖАТА_ЛЕВАЯ_КНОПКА = 1;

const НАЖАТА_ПРАВАЯ_КНОПКА = 2;

const НАЖАТА_СРЕДНЯЯ_КНОПКА = 4;

const ПАССИВНЫЙ_ОБРАБОТЧИК = {
	passive: true
};

const МИН_ЗНАЧЕНИЕ_НАСТРОЙКИ = Number.MIN_SAFE_INTEGER + 1e3;

const МАКС_ЗНАЧЕНИЕ_НАСТРОЙКИ = Number.MAX_SAFE_INTEGER - 1e3;

const АВТОНАСТРОЙКА = Number.MIN_SAFE_INTEGER;

const МИНИМАЛЬНАЯ_ГРОМКОСТЬ = 1;

const МАКСИМАЛЬНАЯ_ГРОМКОСТЬ = 100;

const ШАГ_ПОВЫШЕНИЯ_ГРОМКОСТИ_КЛАВОЙ = 4;

const ШАГ_ПОНИЖЕНИЯ_ГРОМКОСТИ_КЛАВОЙ = 2;

const ЧАТ_ВЫГРУЖЕН = 0;

const ЧАТ_СКРЫТ = 1;

const ЧАТ_ПАНЕЛЬ = 2;

const ВЕРХНЯЯ_СТОРОНА = 1;

const ПРАВАЯ_СТОРОНА = 2;

const НИЖНЯЯ_СТОРОНА = 3;

const ЛЕВАЯ_СТОРОНА = 4;

const МИН_ДЛИТЕЛЬНОСТЬ_ПОВТОРА = 30;

const МАКС_ДЛИТЕЛЬНОСТЬ_ПОВТОРА = 300;

const МИН_РАЗМЕР_БУФЕРА = 1.5;

const МАКС_РАЗМЕР_БУФЕРА = 30;

const МИН_РАСТЯГИВАНИЕ_БУФЕРА = 9;

const МАКС_РАСТЯГИВАНИЕ_БУФЕРА = 30;

const ПЕРЕПОЛНЕНИЕ_БУФЕРА = МАКС_РАЗМЕР_БУФЕРА + МАКС_РАСТЯГИВАНИЕ_БУФЕРА;

let г_лРаботаЗавершена = false;

if (!NodeList.prototype[Symbol.iterator]) {
	NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
}

if (!HTMLCollection.prototype[Symbol.iterator]) {
	HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
}

if (!ЭТО_CONTENT_SCRIPT && !window.PointerEvent) {
	const узСкрипт = document.createElement('script');
	узСкрипт.src = 'pointerevent.js';
	document.currentScript.parentNode.appendChild(узСкрипт);
}

const ЗАГЛУШКА = () => {};

function Проверить(пУсловие) {
	if (!пУсловие) {
		throw new Error('Проверка не пройдена');
	}
}

function ДобавитьОбработчикИсключений(фФункция) {
	return function() {
		if (г_лРаботаЗавершена) {
			return;
		}
		try {
			return фФункция.apply(this, arguments);
		} catch (пИсключение) {
			м_Отладка.ПойманоИсключение(пИсключение);
		}
	};
}

function ПеревестиИсключениеВСтроку(пИсключение) {
	return пИсключение instanceof Error ? `${пИсключение}\n${пИсключение.stack}` : `[typeof ${typeof пИсключение}] ${пИсключение}\n${new Error().stack}`;
}

function Тип(пЗначение) {
	return пЗначение === null ? 'null' : typeof пЗначение;
}

function ЭтоЧисло(пЗначение) {
	return typeof пЗначение == 'number' && пЗначение == пЗначение;
}

function ЭтоОбъект(пЗначение) {
	return typeof пЗначение == 'object' && пЗначение !== null;
}

function ЭтоНепустаяСтрока(пЗначение) {
	return typeof пЗначение == 'string' && пЗначение !== '';
}

function ОграничитьДлинуСтроки(сСтрока, чМаксимальнаяДлина) {
	return сСтрока.length <= чМаксимальнаяДлина ? сСтрока : `${сСтрока.slice(0, чМаксимальнаяДлина)}---8<---${сСтрока.length - чМаксимальнаяДлина}`;
}

function получитьВерсиюДвижкаБраузера() {
	if (!получитьВерсиюДвижкаБраузера._чРезультат) {
		получитьВерсиюДвижкаБраузера._чРезультат = Number.parseInt(/Firefox\/(\d+)/.exec(navigator.userAgent)[1], 10);
	}
	return получитьВерсиюДвижкаБраузера._чРезультат;
}

function этоМобильноеУстройство() {
	if (!этоМобильноеУстройство.hasOwnProperty('_лРезультат')) {
		этоМобильноеУстройство._лРезультат = navigator.userAgentData ? navigator.userAgentData.mobile : navigator.userAgent.includes('Android');
	}
	return этоМобильноеУстройство._лРезультат;
}

function Узел(пЭлемент) {
	const элЭлемент = typeof пЭлемент == 'string' ? document.getElementById(пЭлемент) : пЭлемент;
	Проверить(элЭлемент.nodeType === 1);
	return элЭлемент;
}

function создатьТелоЗапросаGql(сЗапрос, оПеременные) {
	Проверить(ЭтоНепустаяСтрока(сЗапрос) && ЭтоОбъект(оПеременные));
	return `{"query":${JSON.stringify(сЗапрос)},"variables":${JSON.stringify(оПеременные)}}`;
}

function объединитьЗапросыGql(мсТелаЗапросов) {
	Проверить(мсТелаЗапросов[0][0] === '{');
	return `[${мсТелаЗапросов.join(',')}]`;
}

function ПолучитьАдресНашегоПроигрывателя(сКодКанала) {
	const сПараметры = '?channel=' + encodeURIComponent(сКодКанала);
	if (ЭТО_CONTENT_SCRIPT) {
		return сПараметры;
	}
	return chrome.runtime.getURL('player.html') + сПараметры;
}

const м_Журнал = (() => {
	const МАКС_ДЛИНА_ЗАПИСИ = 1500;
	let _мсЖурнал = null;
	let _чПоследняяЗапись = -1;
	function Добавить(сВажность, сЗапись) {
		if (_мсЖурнал) {
			Проверить(typeof сВажность == 'string' && typeof сЗапись == 'string');
			сЗапись = ОграничитьДлинуСтроки(`${сВажность} ${(performance.now() / 1e3).toFixed(3)} ${сЗапись}`, МАКС_ДЛИНА_ЗАПИСИ);
			if (++_чПоследняяЗапись === _мсЖурнал.length) {
				_чПоследняяЗапись = 0;
			}
			_мсЖурнал[_чПоследняяЗапись] = сЗапись;
		}
	}
	function ПолучитьДанныеДляОтчета() {
		if (!_мсЖурнал) {
			return null;
		}
		const чСледующаяЗапись = _чПоследняяЗапись + 1;
		if (чСледующаяЗапись === _мсЖурнал.length) {
			return _мсЖурнал;
		}
		if (_мсЖурнал[чСледующаяЗапись] === void 0) {
			return _мсЖурнал.slice(0, чСледующаяЗапись);
		}
		return _мсЖурнал.slice(чСледующаяЗапись).concat(_мсЖурнал.slice(0, чСледующаяЗапись));
	}
	function Вот(сЗапись) {
		Проверить(arguments.length === 1);
		Добавить(' ', сЗапись);
	}
	function Окак(сЗапись) {
		Проверить(arguments.length === 1);
		Добавить('~', сЗапись);
	}
	function Ой(сЗапись) {
		Проверить(arguments.length === 1);
		Добавить('@', сЗапись);
	}
	function O(пОбъект) {
		switch (Тип(пОбъект)) {
		  case 'object':
			return JSON.stringify(пОбъект);

		  case 'function':
			return `[function ${пОбъект.name}]`;

		  case 'symbol':
			return '[symbol]';

		  default:
			return String(пОбъект);
		}
	}
	function F(чТочность) {
		return чЗначение => typeof чЗначение == 'number' ? чЗначение.toFixed(чТочность) : 'NaN';
	}
	if (!ЭТО_CONTENT_SCRIPT) {
		_мсЖурнал = new Array(1500);
		Вот(`[Журнал] Журнал запущен ${performance.now().toFixed()}мс`);
	}
	return {
		Вот,
		Окак,
		Ой,
		O,
		F0: F(0),
		F1: F(1),
		F2: F(2),
		F3: F(3),
		ПолучитьДанныеДляОтчета
	};
})();

const м_i18n = (() => {
	const НАЗВАНИЯ_ЯЗЫКОВ = {
		AR: 'العربية',
		ASE: 'American Sign Language',
		ASL: 'American Sign Language',
		BG: 'Български',
		CA: 'Català',
		CS: 'Čeština',
		DA: 'Dansk',
		DE: 'Deutsch',
		EL: 'Ελληνικά',
		EN: 'English',
		EN_GB: 'English (UK)',
		ES: 'Español',
		ES_MX: 'Español (Latinoamérica)',
		FI: 'Suomi',
		FR: 'Français',
		HI: 'हिन्दी',
		HU: 'Magyar',
		ID: 'Bahasa Indonesia',
		IT: 'Italiano',
		JA: '日本語',
		KO: '한국어',
		MS: 'بهاس ملايو',
		NL: 'Nederlands',
		NO: 'Norsk',
		PL: 'Polski',
		PT: 'Português',
		PT_BR: 'Português (Brasil)',
		RO: 'Română',
		RU: 'Русский',
		SK: 'Slovenčina',
		SV: 'Svenska',
		TH: 'ภาษาไทย',
		TL: 'Tagalog',
		TR: 'Türkçe',
		UK: 'Українська',
		VI: 'Tiếng Việt',
		ZH: '中文',
		ZH_HK: '中文（香港）',
		ZH_CN: '简体中文',
		ZH_TW: '繁體中文'
	};
	const _амФорматироватьЧисло = new Map();
	let _фФорматироватьДату = null;
	function GetMessage(sMessageName, sSubstitution) {
		Проверить(ЭтоНепустаяСтрока(sMessageName));
		Проверить(sSubstitution === void 0 || typeof sSubstitution == 'string');
		const sMessageText = chrome.i18n.getMessage(sMessageName, sSubstitution);
		if (!sMessageText) {
			throw new Error(`Не найден текст ${sMessageName}`);
		}
		return sMessageText;
	}
	function FastInsertAdjacentHtmlMessage(elInsertTo, sPosition, sMessageName) {
		
		//! HTML content is taken from the file messages.json. See GetMessage().
		elInsertTo.insertAdjacentHTML(sPosition, GetMessage(sMessageName));
	}
	function InsertAdjacentHtmlMessage(vInsertTo, sPosition, sMessageName) {
		const elInsertTo = Узел(vInsertTo);
		if (sPosition === 'content') {
			sPosition = 'beforeend';
			elInsertTo.textContent = '';
		}
		FastInsertAdjacentHtmlMessage(elInsertTo, sPosition, sMessageName);
		return elInsertTo;
	}
	function TranslateDocument(оДокумент) {
		м_Журнал.Вот('[i18n] Перевод документа');
		for (let elTranslate, celTranslate = оДокумент.querySelectorAll('*[data-i18n]'), i = 0; elTranslate = celTranslate[i]; ++i) {
			const sNames = elTranslate.getAttribute('data-i18n');
			const sNamesDelimiter = sNames.indexOf('^');
			if (sNamesDelimiter !== 0) {
				FastInsertAdjacentHtmlMessage(elTranslate, 'afterbegin', sNamesDelimiter === -1 ? sNames : sNames.slice(0, sNamesDelimiter));
			}
			if (sNamesDelimiter !== -1) {
				elTranslate.title = GetMessage(sNames.slice(sNamesDelimiter + 1));
			}
		}
	}
	function ФорматироватьЧисло(пЧисло, кДробныхРазрядов) {
		Проверить(кДробныхРазрядов === void 0 || typeof кДробныхРазрядов == 'number' && кДробныхРазрядов >= 0);
		let фФорматировать = _амФорматироватьЧисло.get(кДробныхРазрядов);
		if (!фФорматировать) {
			фФорматировать = new Intl.NumberFormat([], кДробныхРазрядов === void 0 ? void 0 : {
				minimumFractionDigits: кДробныхРазрядов,
				maximumFractionDigits: кДробныхРазрядов
			}).format;
			_амФорматироватьЧисло.set(кДробныхРазрядов, фФорматировать);
		}
		return фФорматировать(пЧисло);
	}
	function ФорматироватьДату(пДата) {
		Проверить(Number.isFinite(пДата) || Number.isFinite(пДата.getTime()));
		if (!_фФорматироватьДату) {
			_фФорматироватьДату = new Intl.DateTimeFormat([], {
				timeZone: 'UTC'
			}).format;
		}
		return _фФорматироватьДату(пДата);
	}
	function ПеревестиСекундыВСтроку(кСекунды, лНужныСекунды) {
		let ч = Math.floor(кСекунды / 60 % 60);
		let с = Math.floor(кСекунды / 60 / 60) + (ч < 10 ? ' : 0' : ' : ') + ч;
		if (лНужныСекунды) {
			ч = Math.floor(кСекунды % 60);
			с += (ч < 10 ? ' : 0' : ' : ') + ч;
		}
		return с;
	}
	function ПолучитьНазваниеЯзыка(сКодЯзыка) {
		const сНазваниеЯзыка = НАЗВАНИЯ_ЯЗЫКОВ[сКодЯзыка.toUpperCase()];
		if (!сНазваниеЯзыка) {
			throw new Error(`Неизвестный код языка: ${сКодЯзыка}`);
		}
		return сНазваниеЯзыка;
	}
	return {
		GetMessage,
		InsertAdjacentHtmlMessage,
		TranslateDocument,
		ФорматироватьЧисло,
		ФорматироватьДату,
		ПеревестиСекундыВСтроку,
		ПолучитьНазваниеЯзыка
	};
})();

const м_Настройки = (() => {
	const ВЕРСИЯ_НАСТРОЕК = 2;
	const _амПредустановкиБуферизации = new Map([ [ 'J0126', {
		кОдновременныхЗагрузок: 1,
		чНачалоВоспроизведения: 3,
		чРазмерБуфера: 5,
		чРастягиваниеБуфера: 15
	} ], [ 'J0127', {
		кОдновременныхЗагрузок: 2,
		чНачалоВоспроизведения: 3,
		чРазмерБуфера: 8.5,
		чРастягиваниеБуфера: 20
	} ], [ 'J0128', {
		кОдновременныхЗагрузок: 2,
		чНачалоВоспроизведения: 17,
		чРазмерБуфера: 9.5,
		чРастягиваниеБуфера: 30
	} ] ]);
	const _амПредустановкиОформления = new Map([ [ 'J0122', {
		сЦветФона: '#282828',
		сЦветГрадиента: '#d4d4d4',
		сЦветКнопок: '#d3be96',
		сЦветЗаголовка: '#cdbdec',
		сЦветВыделения: '#ffd862',
		чПрозрачность: 25
	} ], [ 'J0121', {
		сЦветФона: '#405b77',
		сЦветГрадиента: '#aaccf2',
		сЦветКнопок: '#ffffff',
		сЦветЗаголовка: '#c2e4ff',
		сЦветВыделения: '#fef17c',
		чПрозрачность: 30
	} ], [ 'J0138', {
		сЦветФона: '#4b4b4b',
		сЦветГрадиента: '#aaaaaa',
		сЦветКнопок: '#bad4f8',
		сЦветЗаголовка: '#e2ebb4',
		сЦветВыделения: '#75a9f0',
		чПрозрачность: 5
	} ], [ 'J0125', {
		сЦветФона: '#161616',
		сЦветГрадиента: '#a0a0a0',
		сЦветКнопок: '#f0f0f0',
		сЦветЗаголовка: '#baccda',
		сЦветВыделения: '#6cb6ff',
		чПрозрачность: 20
	} ] ]);
	const _моМетаданныеПредустановок = [ {
		амДанные: _амПредустановкиБуферизации,
		сНастраиваемая: 'J0129',
		сВыбрана: 'сПредустановкаВыбрана_буферизация',
		сЗаполнена: 'лПредустановкаЗаполнена_буферизация',
		сСписок: 'предустановка-буферизация',
		сСобытие: 'настройки-измениласьпредустановка-буферизация'
	}, {
		амДанные: _амПредустановкиОформления,
		сНастраиваемая: 'J0123',
		сВыбрана: 'сПредустановкаВыбрана_оформление',
		сЗаполнена: 'лПредустановкаЗаполнена_оформление',
		сСписок: 'предустановка-оформление',
		сСобытие: 'настройки-измениласьпредустановка-оформление'
	} ];
	const _мноПостоянныеНастройки = new Set([ 'чВерсияНастроек', 'чСлучайноеЧисло', 'сПредыдущаяВерсия', 'чПоследняяПроверкаОбновленияРасширения', 'лАвтоперенаправлениеЗамечено' ]);
	const _мноНеСветить = new Set();
	class Настройка {
		constructor(пНачальное, мпПеречисление, чМинимальное, чМаксимальное, сАвтонастройка) {
			this.пТекущее = void 0;
			this.пНачальное = пНачальное;
			this.мпПеречисление = мпПеречисление;
			this.чМинимальное = чМинимальное;
			this.чМаксимальное = чМаксимальное;
			this.сАвтонастройка = сАвтонастройка;
		}
		static Создать(пНачальное) {
			return new this(пНачальное, null, МИН_ЗНАЧЕНИЕ_НАСТРОЙКИ, МАКС_ЗНАЧЕНИЕ_НАСТРОЙКИ, '');
		}
		static СоздатьПеречисление(пНачальное, мпПеречисление) {
			return new this(пНачальное, мпПеречисление, МИН_ЗНАЧЕНИЕ_НАСТРОЙКИ, МАКС_ЗНАЧЕНИЕ_НАСТРОЙКИ, '');
		}
		static СоздатьДиапазон(пНачальное, чМинимальное, чМаксимальное, сАвтонастройка = '') {
			return new this(пНачальное, null, чМинимальное, чМаксимальное, сАвтонастройка);
		}
		static ПроверитьЗначение(пЗначение) {
			Проверить(пЗначение == пЗначение && пЗначение !== Infinity && пЗначение !== -Infinity && пЗначение !== void 0 && typeof пЗначение != 'function' && typeof пЗначение != 'symbol' && typeof пЗначение != 'object');
		}
		ИсправитьЗначение(пЗначение) {
			Настройка.ПроверитьЗначение(пЗначение);
			Проверить(typeof пЗначение == typeof this.пНачальное);
			if (this.мпПеречисление) {
				if (!this.мпПеречисление.includes(пЗначение)) {
					пЗначение = this.пНачальное;
				}
			} else if (typeof пЗначение == 'number') {
				if (пЗначение === АВТОНАСТРОЙКА) {
					if (this.сАвтонастройка === '') {
						пЗначение = this.пНачальное;
					}
				} else if (пЗначение < this.чМинимальное) {
					пЗначение = this.чМинимальное;
				} else if (пЗначение > this.чМаксимальное) {
					пЗначение = this.чМаксимальное;
				}
			}
			return пЗначение;
		}
	}
	const _оНастройки = {
		чВерсияНастроек: Настройка.Создать(ВЕРСИЯ_НАСТРОЕК),
		чСлучайноеЧисло: Настройка.Создать(Math.random()),
		сПредыдущаяВерсия: Настройка.Создать('2000.1.1'),
		чПоследняяПроверкаОбновленияРасширения: Настройка.Создать(0),
		чГромкость2: Настройка.СоздатьДиапазон(МАКСИМАЛЬНАЯ_ГРОМКОСТЬ / 2, МИНИМАЛЬНАЯ_ГРОМКОСТЬ, МАКСИМАЛЬНАЯ_ГРОМКОСТЬ),
		лПриглушить: Настройка.Создать(false),
		сИдАудиоустройства: Настройка.Создать(''),
		сНазваниеВарианта: Настройка.Создать('CoolCmd'),
		чБитрейтВарианта: Настройка.Создать(МАКС_ЗНАЧЕНИЕ_НАСТРОЙКИ),
		чДлительностьПовтора2: Настройка.СоздатьДиапазон(60, МИН_ДЛИТЕЛЬНОСТЬ_ПОВТОРА, МАКС_ДЛИТЕЛЬНОСТЬ_ПОВТОРА, 'J0124'),
		лМасштабироватьИзображение: Настройка.Создать(true),
		чСостояниеЧата: Настройка.СоздатьПеречисление(ЧАТ_ВЫГРУЖЕН, [ ЧАТ_ВЫГРУЖЕН, ЧАТ_СКРЫТ, ЧАТ_ПАНЕЛЬ ]),
		чСостояниеЗакрытогоЧата: Настройка.СоздатьПеречисление(ЧАТ_ВЫГРУЖЕН, [ ЧАТ_ВЫГРУЖЕН, ЧАТ_СКРЫТ ]),
		лАвтоПоложениеЧата: Настройка.Создать(этоМобильноеУстройство()),
		чГоризонтальноеПоложениеЧата: Настройка.СоздатьПеречисление(ПРАВАЯ_СТОРОНА, [ ПРАВАЯ_СТОРОНА, ЛЕВАЯ_СТОРОНА ]),
		чВертикальноеПоложениеЧата: Настройка.СоздатьПеречисление(НИЖНЯЯ_СТОРОНА, [ ВЕРХНЯЯ_СТОРОНА, НИЖНЯЯ_СТОРОНА ]),
		чПоложениеПанелиЧата: Настройка.СоздатьПеречисление(ПРАВАЯ_СТОРОНА, [ ВЕРХНЯЯ_СТОРОНА, ПРАВАЯ_СТОРОНА, НИЖНЯЯ_СТОРОНА, ЛЕВАЯ_СТОРОНА ]),
		чШиринаПанелиЧата: Настройка.СоздатьДиапазон(340, 100, МАКС_ЗНАЧЕНИЕ_НАСТРОЙКИ),
		чВысотаПанелиЧата: Настройка.СоздатьДиапазон(250, 100, МАКС_ЗНАЧЕНИЕ_НАСТРОЙКИ),
		лПолноценныйЧат: Настройка.Создать(true),
		лЗатемнитьЧат: Настройка.Создать(false),
		чРазмерИнтерфейса: Настройка.СоздатьДиапазон(этоМобильноеУстройство() ? 115 : 100, 50, 200),
		чИнтервалАвтоскрытия: Настройка.СоздатьДиапазон(4, .5, 60),
		лАнимацияИнтерфейса: Настройка.Создать(!этоМобильноеУстройство()),
		лМенятьГромкостьКолесом: Настройка.Создать(true),
		чШагИзмененияГромкостиКолесом: Настройка.СоздатьДиапазон(5, -10, 10),
		лПоказатьСтатистику: Настройка.Создать(false),
		сПредустановкаВыбрана_буферизация: Настройка.Создать('J0127'),
		лПредустановкаЗаполнена_буферизация: Настройка.Создать(false),
		кОдновременныхЗагрузок: Настройка.СоздатьДиапазон(0, 1, 3),
		чНачалоВоспроизведения: Настройка.СоздатьДиапазон(0, МИН_РАЗМЕР_БУФЕРА, МАКС_РАЗМЕР_БУФЕРА),
		чРазмерБуфера: Настройка.СоздатьДиапазон(0, МИН_РАЗМЕР_БУФЕРА, МАКС_РАЗМЕР_БУФЕРА),
		чРастягиваниеБуфера: Настройка.СоздатьДиапазон(0, МИН_РАСТЯГИВАНИЕ_БУФЕРА, МАКС_РАСТЯГИВАНИЕ_БУФЕРА),
		сПредустановкаВыбрана_оформление: Настройка.Создать('J0122'),
		лПредустановкаЗаполнена_оформление: Настройка.Создать(false),
		сЦветФона: Настройка.Создать(''),
		сЦветГрадиента: Настройка.Создать('#ffffff'),
		сЦветКнопок: Настройка.Создать(''),
		сЦветЗаголовка: Настройка.Создать(''),
		сЦветВыделения: Настройка.Создать(''),
		чПрозрачность: Настройка.СоздатьДиапазон(0, 0, 80),
		лАвтоперенаправлениеРазрешено: Настройка.Создать(true),
		лАвтоперенаправлениеЗамечено: Настройка.Создать(false)
	};
	const ОТКЛАДЫВАТЬ_СОХРАНЕНИЕ_НА = ЭТО_CONTENT_SCRIPT ? 50 : 500;
	let _чТаймерОтложенногоСохранения = 0;
	let _оОтложенноеСохранение = null;
	let _лОтложенноеУдаление = false;
	function Восстановить() {
		м_Журнал.Вот('[Настройки] Восстанавливаю настройки');
		return new Promise((фВыполнить, фОтказаться) => {
			chrome.storage.local.get(null, оВосстановленныеНастройки => {
				if (г_лРаботаЗавершена) {
					return;
				}
				try {
					if (chrome.runtime.lastError) {
						console.error('storage.local.get', chrome.runtime.lastError.message);
						м_Отладка.ЗавершитьРаботуИПоказатьСообщение('J0221');
					}
					м_Журнал.Вот(`[Настройки] Настройки прочитаны из хранилища: ${м_Журнал.O(оВосстановленныеНастройки)}`);
					ЗавершитьВосстановление(оВосстановленныеНастройки);
					фВыполнить();
				} catch (пИсключение) {
					фОтказаться(пИсключение);
				}
			});
		});
	}
	function ЗавершитьВосстановление(оВосстановленныеНастройки) {
		Проверить(ЭтоОбъект(оВосстановленныеНастройки));
		Проверить(!_оНастройки.чВерсияНастроек.пТекущее);
		const оСохранить = {};
		const лОстальноеУдалить = ПроверитьВерсиюНастроек(оВосстановленныеНастройки, оСохранить);
		for (let сИмя of Object.keys(_оНастройки)) {
			if (оВосстановленныеНастройки.hasOwnProperty(сИмя)) {
				const пЗначение = _оНастройки[сИмя].ИсправитьЗначение(оВосстановленныеНастройки[сИмя]);
				if (пЗначение !== оВосстановленныеНастройки[сИмя]) {
					оСохранить[сИмя] = пЗначение;
				}
				_оНастройки[сИмя].пТекущее = пЗначение;
			} else {
				if (_мноПостоянныеНастройки.has(сИмя)) {
					оСохранить[сИмя] = _оНастройки[сИмя].пНачальное;
				}
				_оНастройки[сИмя].пТекущее = _оНастройки[сИмя].пНачальное;
			}
		}
		НачатьСохранение(оСохранить, лОстальноеУдалить);
	}
	function ПроверитьВерсиюНастроек(оНастройки, оСохранить) {
		if (!Number.isInteger(оНастройки.чВерсияНастроек) || оНастройки.чВерсияНастроек < 1 || оНастройки.чВерсияНастроек > ВЕРСИЯ_НАСТРОЕК) {
			for (let сИмя of Object.keys(оНастройки)) {
				delete оНастройки[сИмя];
			}
			return true;
		}
		for (let оМетаданные of _моМетаданныеПредустановок) {
			let сИмя = оНастройки[оМетаданные.сВыбрана];
			if (сИмя !== void 0 && сИмя !== оМетаданные.сНастраиваемая) {
				for (let сИмяПредустановки of оМетаданные.амДанные.keys()) {
					if (сИмя === сИмяПредустановки) {
						сИмя = void 0;
						break;
					}
				}
				if (сИмя !== void 0) {
					оСохранить[оМетаданные.сВыбрана] = оНастройки[оМетаданные.сВыбрана] = _оНастройки[оМетаданные.сВыбрана].пНачальное;
				}
			}
		}
		if (оНастройки.чСостояниеЗакрытогоЧата !== оНастройки.чСостояниеЧата && (оНастройки.чСостояниеЧата === ЧАТ_ВЫГРУЖЕН || оНастройки.чСостояниеЧата === ЧАТ_СКРЫТ)) {
			оСохранить.чСостояниеЗакрытогоЧата = оНастройки.чСостояниеЗакрытогоЧата = оНастройки.чСостояниеЧата;
		}
		if (оНастройки.чВерсияНастроек === ВЕРСИЯ_НАСТРОЕК) {
			return false;
		}
		оСохранить.чВерсияНастроек = оНастройки.чВерсияНастроек = ВЕРСИЯ_НАСТРОЕК;
		return false;
	}
	function НачатьСохранение(оСохранить, лОстальноеУдалить) {
		Проверить(ЭтоОбъект(оСохранить));
		if (Object.keys(оСохранить).length !== 0 || лОстальноеУдалить) {
			if (_чТаймерОтложенногоСохранения === 0) {
				м_Журнал.Вот(`[Настройки] Откладываю сохранение настроек на ${ОТКЛАДЫВАТЬ_СОХРАНЕНИЕ_НА}мс`);
				_оОтложенноеСохранение = оСохранить;
				_лОтложенноеУдаление = лОстальноеУдалить;
				_чТаймерОтложенногоСохранения = setTimeout(ДобавитьОбработчикИсключений(ЗавершитьСохранение), ОТКЛАДЫВАТЬ_СОХРАНЕНИЕ_НА);
			} else if (лОстальноеУдалить) {
				_оОтложенноеСохранение = оСохранить;
				_лОтложенноеУдаление = лОстальноеУдалить;
			} else {
				Object.assign(_оОтложенноеСохранение, оСохранить);
			}
		}
	}
	function ЗавершитьСохранение() {
		м_Журнал.Вот('[Настройки] Завершаю отложенное сохранение');
		Проверить(_чТаймерОтложенногоСохранения !== 0);
		_чТаймерОтложенногоСохранения = 0;
		Проверить(ЭтоОбъект(_оОтложенноеСохранение));
		Сохранить(_оОтложенноеСохранение, _лОтложенноеУдаление);
		_оОтложенноеСохранение = null;
	}
	function Сохранить(оСохранить, лОстальноеУдалить) {
		if (лОстальноеУдалить) {
			chrome.storage.local.clear(ПроверитьРезультатСохранения);
			м_Журнал.Вот('[Настройки] Все настройки удалены из хранилища');
		}
		chrome.storage.local.set(оСохранить, ПроверитьРезультатСохранения);
		м_Журнал.Вот(`[Настройки] Настройки записаны в хранилище: ${м_Журнал.O(оСохранить)}`);
	}
	function ПроверитьРезультатСохранения() {
		if (chrome.runtime.lastError) {
			console.error('storage.local.set', chrome.runtime.lastError.message);
			м_Отладка.ЗавершитьРаботуИПоказатьСообщение('J0221');
		}
	}
	function Сбросить() {
		м_Журнал.Окак('[Настройки] Сбрасываю настройки');
		Проверить(_оНастройки.чВерсияНастроек.пТекущее);
		const оСохранить = {};
		for (let сИмя of _мноПостоянныеНастройки) {
			оСохранить[сИмя] = _оНастройки[сИмя].пТекущее;
		}
		НачатьСохранение(оСохранить, true);
		window.location.reload(true);
	}
	function Экспорт() {
		м_Журнал.Окак('[Настройки] Экспортирую настройки');
		Проверить(_оНастройки.чВерсияНастроек.пТекущее);
		const оЭкспорт = {
			чВерсияНастроек: ВЕРСИЯ_НАСТРОЕК
		};
		for (let сИмя of Object.keys(_оНастройки)) {
			if (!_мноПостоянныеНастройки.has(сИмя) && !_мноНеСветить.has(сИмя)) {
				оЭкспорт[сИмя] = _оНастройки[сИмя].пТекущее;
			}
		}
		м_Журнал.Вот(`[Настройки] Отобраны настройки для экспорта: ${м_Журнал.O(оЭкспорт)}`);
		ЗаписатьТекстВЛокальныйФайл(JSON.stringify(оЭкспорт), 'application/json', Текст('J0133'));
	}
	function Импорт(оИзФайла) {
		м_Журнал.Окак(`[Настройки] Импортирую настройки из файла ${оИзФайла.name}`);
		Проверить(_оНастройки.чВерсияНастроек.пТекущее);
		if (оИзФайла.size === 0 || оИзФайла.size > 1e4) {
			м_Журнал.Ой(`[Настройки] Размер файла: ${оИзФайла.size}`);
			м_Уведомление.ПоказатьЖопу();
			return;
		}
		const оЧиталка = new FileReader();
		оЧиталка.addEventListener('loadend', ДобавитьОбработчикИсключений(() => {
			if (!ЭтоНепустаяСтрока(оЧиталка.result)) {
				м_Журнал.Ой(`[Настройки] Результат чтения файла: ${оЧиталка.result}`);
				м_Уведомление.ПоказатьЖопу();
				return;
			}
			м_Журнал.Вот(`[Настройки] Настройки прочитаны из файла: ${оЧиталка.result}`);
			let оСохранить;
			try {
				оСохранить = JSON.parse(оЧиталка.result);
				if (!ЭтоОбъект(оСохранить)) {
					throw 1;
				}
				if (ПроверитьВерсиюНастроек(оСохранить, оСохранить)) {
					throw 2;
				}
				for (let сИмя of Object.keys(оСохранить)) {
					if (!_оНастройки.hasOwnProperty(сИмя) || _мноНеСветить.has(сИмя)) {
						delete оСохранить[сИмя];
					} else {
						оСохранить[сИмя] = _оНастройки[сИмя].ИсправитьЗначение(оСохранить[сИмя]);
						if (оСохранить[сИмя] === _оНастройки[сИмя].пНачальное) {
							delete оСохранить[сИмя];
						}
					}
				}
			} catch (пИсключение) {
				м_Журнал.Ой(`[Настройки] Поймано исключение во время разбора настроек: ${пИсключение}`);
				м_Уведомление.ПоказатьЖопу();
				return;
			}
			for (let сИмя of _мноПостоянныеНастройки) {
				оСохранить[сИмя] = _оНастройки[сИмя].пТекущее;
			}
			НачатьСохранение(оСохранить, true);
			window.location.reload(true);
		}));
		оЧиталка.readAsText(оИзФайла);
	}
	function Получить2(сИмя) {
		Проверить(typeof сИмя == 'string');
		Проверить(_оНастройки.hasOwnProperty(сИмя));
		Проверить(_оНастройки.чВерсияНастроек.пТекущее);
		for (let оМетаданные of _моМетаданныеПредустановок) {
			const оПредустановка = оМетаданные.амДанные.get(_оНастройки[оМетаданные.сВыбрана].пТекущее);
			if (оПредустановка) {
				const пЗначение = оПредустановка[сИмя];
				if (пЗначение !== void 0) {
					return пЗначение;
				}
			}
		}
		return _оНастройки[сИмя].пТекущее;
	}
	function Получить(сИмя) {
		if (сИмя === 'чМаксРазмерБуфера') {
			return Math.max(Получить2('чНачалоВоспроизведения'), Получить2('чРазмерБуфера'));
		}
		return Получить2(сИмя);
	}
	function Изменить(сИмя, пЗначение, лНеСохранять = false) {
		Проверить(typeof сИмя == 'string');
		Проверить(_оНастройки[сИмя].ИсправитьЗначение(пЗначение) === пЗначение);
		const оСохранить = {};
		for (let оМетаданные of _моМетаданныеПредустановок) {
			const оПредустановка = оМетаданные.амДанные.get(_оНастройки[оМетаданные.сВыбрана].пТекущее);
			if (оПредустановка && оПредустановка.hasOwnProperty(сИмя)) {
				if (пЗначение === оПредустановка[сИмя]) {
					return;
				}
				Проверить(!лНеСохранять);
				оСохранить[оМетаданные.сВыбрана] = _оНастройки[оМетаданные.сВыбрана].пТекущее = оМетаданные.сНастраиваемая;
				оСохранить[оМетаданные.сЗаполнена] = _оНастройки[оМетаданные.сЗаполнена].пТекущее = true;
				for (let сИмяПредустановки of Object.keys(оПредустановка)) {
					оСохранить[сИмяПредустановки] = _оНастройки[сИмяПредустановки].пТекущее = оПредустановка[сИмяПредустановки];
				}
				ОбновитьСписокПредустановок(оМетаданные);
				break;
			}
		}
		if (_оНастройки[сИмя].пТекущее !== пЗначение) {
			оСохранить[сИмя] = _оНастройки[сИмя].пТекущее = пЗначение;
		}
		if (!лНеСохранять) {
			НачатьСохранение(оСохранить, false);
		}
	}
	function ОбновитьСписокПредустановок(оМетаданные) {
		const узСписок = Узел(оМетаданные.сСписок);
		узСписок.length = 0;
		const сВыбрать = _оНастройки[оМетаданные.сВыбрана].пТекущее;
		for (let сИмя of оМетаданные.амДанные.keys()) {
			узСписок.add(new Option(Текст(сИмя), сИмя, сИмя === сВыбрать, сИмя === сВыбрать));
		}
		if (_оНастройки[оМетаданные.сЗаполнена].пТекущее) {
			узСписок.add(new Option(Текст(оМетаданные.сНастраиваемая), оМетаданные.сНастраиваемая, оМетаданные.сНастраиваемая === сВыбрать, оМетаданные.сНастраиваемая === сВыбрать));
		}
		Проверить(узСписок.value);
		return узСписок;
	}
	const ОбработатьИзменениеПредустановки = ДобавитьОбработчикИсключений(оСобытие => {
		for (let оМетаданные of _моМетаданныеПредустановок) {
			if (оМетаданные.сСписок === оСобытие.target.id) {
				Проверить(оСобытие.target.value);
				Изменить(оМетаданные.сВыбрана, оСобытие.target.value);
				м_События.ПослатьСобытие(оМетаданные.сСобытие);
				return;
			}
		}
		Проверить(false);
	});
	function НастроитьСпискиПредустановок() {
		for (let оМетаданные of _моМетаданныеПредустановок) {
			ОбновитьСписокПредустановок(оМетаданные).addEventListener('change', ОбработатьИзменениеПредустановки);
		}
	}
	function ПолучитьПараметрыНастройки(сИмя) {
		Проверить(typeof сИмя == 'string');
		Проверить(_оНастройки.hasOwnProperty(сИмя));
		return _оНастройки[сИмя];
	}
	function ПолучитьДанныеДляОтчета() {
		const оОтчет = {};
		for (let сИмя of Object.keys(_оНастройки)) {
			if (!_мноНеСветить.has(сИмя) && (_мноПостоянныеНастройки.has(сИмя) || _оНастройки[сИмя].пТекущее !== _оНастройки[сИмя].пНачальное)) {
				оОтчет[сИмя] = _оНастройки[сИмя].пТекущее;
			}
		}
		return оОтчет;
	}
	function СохранитьИзменения() {
		if (_чТаймерОтложенногоСохранения !== 0) {
			clearTimeout(_чТаймерОтложенногоСохранения);
			ЗавершитьСохранение();
		}
	}
	window.addEventListener('beforeunload', СохранитьИзменения);
	return {
		Восстановить,
		Сбросить,
		Экспорт,
		Импорт,
		Получить,
		Изменить,
		СохранитьИзменения,
		ПолучитьПараметрыНастройки,
		НастроитьСпискиПредустановок,
		ПолучитьДанныеДляОтчета
	};
})();