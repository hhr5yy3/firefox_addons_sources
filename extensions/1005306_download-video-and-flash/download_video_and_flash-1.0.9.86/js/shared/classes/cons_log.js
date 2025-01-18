let log, warn, error, info;

class ConsoleLogger {
	static constructor() {
		if (DEBUG_SETTINGS.DEBUG_ON) {
			ConsoleLogger.enable();

			if (!DEBUG_SETTINGS.LOG_WARNINGS) {
				ConsoleLogger.disableWarnings();
			}
		} else {
			ConsoleLogger.disable();
		}
	}

	static enable() {
		log = console.log;
		error = console.error;
		warn = console.warn;
		info = console.info;
	}

	static disable() {
		log = warn = error = info = () => {}; 
	}

	static disableWarnings() {
		warn = () => {};
	}
}

ConsoleLogger.constructor();