var Decrypter = (function() {
	const FUNC_NAME_REGEXP_LIST = [
		/[a|d]\.set\s*\(\s*"alr"\s*,\s*"yes"\s*\)\s*;[\s\S]*?[c|d]\s*?&&[\s\S]*?\(\w=(.*)?\(decodeURIComponent/ig,
		/[a|d]\.set\s*\(\s*"alr"\s*,\s*"yes"\s*\)\s*;[\s\S]*?[c|d]\s*?&&[\s\S]*?\.set?\s*\(.*?,.*?\((.*?)\(/ig,
		/yt\.akamaized\.net[\s\S]*?[c|d]\s*&&[\s\S]*?\.set\(.*,.*?\((.*?)\(/ig,
		/yt\.akamaized\.net[\s\S]*?[c|d]\s*&&[\s\S]*?\.set\(.*,\s*?(\(.*?\)\((.*?)\()/ig
	];

	const VALIDATE_FUNC_NAME_REGEXP = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

	const FUNC_BODY_DYNAMIC_REGEXP = {
		REGEXP_STRING: "^{{funcName}}\\s*=\\s*function\\s*\\(.*?\\)\\s*{.*?}\\s*;",	// '{{funcName}}' gets replaced
		FLAGS: "mg"
	};
	const OBJ_NAME_REGEXP = /^([$A-Z_](?:[0-9A-Z_$]){1,2})\.[$A-Z_](?:[0-9A-Z_$]){1,2}\s*\(.*,.*?\)\s*/i;
	const OBJ_BODY_DYNAMIC_REGEXP = {
		REGEXP_STRING: "var\\s*{{objName}}\\s*=\\s*\\{((.*?:function\\(.*?\\)\\s*\\{.*\\}\\s*,?\\s*\\n?)+)}",	// '{{objName}}' gets replaced
		FLAGS: ""
	};

	const SPLIT_METHODS_REGEXP = /(.*?):(function\(.*?\)\s*\{.*?\}),?/g;
	const DETERMINE_OPERATION_REGEXP = /^.{2,3}\.(.+?)\s*\(.+,\s*(.+?)\s*\)/g;

	const POSSIBLE_OPERATIONS_MAP = {
		reverse: function(a) { 
			a.reverse(); 
		},
		splice: function(a, b) { 
			a.splice(0, b); 
		},
		modulo: function(a, b) {
			var c = a[0];
			a[0] = a[b % a.length];
			a[b % a.length] = c;
	    }
	};

	class Decrypter {
		constructor(baseCode = null) {
			this.baseCode = baseCode;	// should not be passed around functions!
			this.funcName = null;
			this.funcBody = null;
			this.funcSplitMethods = null;
			this.operationMapToPerform = null;
			this.objName = null;
			this.objDetails = null;
			this.objSplitMethods = null;
			this.operationTypes = null;
		}

		setBaseCode(baseCode) { this.baseCode = baseCode; }

		isReady() { return !!this.funcName; }

		create() {
			try {
				this.funcName = this.getFuncName();
				this.funcBody = this.getFuncBody(this.funcName);
				this.funcSplitMethods = this.getFuncSplitMethods(this.funcBody);
				this.operationMapToPerform = this.getOperationMapToPerform(this.funcSplitMethods.main);
				this.objName = this.getObjName(this.funcBody);
				this.objDetails = this.getObjDetails(this.objName);
				this.objSplitMethods = this.getObjSplitMethods(this.objDetails.methods);
				this.operationTypes = this.mapObjOperationTypes(this.objSplitMethods);	
			} catch(ex) {
				error(ex);
			}
		}

		verify() {
			return !!(this.funcName && 
				this.funcBody && 
				this.funcSplitMethods &&
				this.operationMapToPerform &&
				this.objName &&
				this.objDetails && 
				this.objSplitMethods &&
				this.operationTypes);
		}

		export() {
			try {
				let exportObject = {
					funcName: this.funcName,
					funcBody: this.funcBody,
					funcSplitMethods: this.funcSplitMethods,
					operationMapToPerform: this.operationMapToPerform,
					objName: this.objName,
					objDetails: this.objDetails,
					objSplitMethods: this.objSplitMethods,
					operationTypes: this.operationTypes
				};

				return btoa(JSON.stringify(exportObject));
			} catch(ex) {
				error(ex);
			}
		}

		escapeSpecialCharacters(str) {
    		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
		}

		import(exportObject) {
			try {
				let imported = JSON.parse(atob(exportObject));

				for (let key in imported) {
					let value = imported[key];
					this[key] = value;
				}

				this.operationTypes = this.mapObjOperationTypes(this.objSplitMethods);
			} catch(ex) {
				error(ex);
			}
		}

		validateFuncName(funcName) {
			return !!VALIDATE_FUNC_NAME_REGEXP.exec(funcName);
		}

		getFuncName() {
			for (let funcNameRegExp of FUNC_NAME_REGEXP_LIST) {
				let failSafe = 0;
				let funcNameResults;

				while (funcNameResults = funcNameRegExp.exec(this.baseCode)) {
					failSafe++
					if (failSafe >= 100) {
						warn("Decrypter.getFuncName(): failSafe activated, regular expression failed");
						break;
					}

					let funcName = null;

					if (funcNameResults && funcNameResults[funcNameResults.length-1]) {
						funcName = funcNameResults[funcNameResults.length-1];
					}

					if (funcName && this.validateFuncName(funcName)) {
						return funcName;
					}

					if (!funcNameRegExp.global) {
						break;
					}
				}
			}

			return null;
		}

		getFuncBody(funcName) {
			funcName = this.escapeSpecialCharacters(funcName);
			let regExpGetFunc = this.createRegexpDynamic(FUNC_BODY_DYNAMIC_REGEXP, { "{{funcName}}": funcName });
			let func = regExpGetFunc.exec(this.baseCode);
			func = func[0];
			let funcBody = /\{(.*)}/.exec(func);
			
			return funcBody[funcBody.length-1];
		}

		getFuncSplitMethods(funcBody) {
			let methods = {};

			methods.all = funcBody.split(";");
			methods.main = [...methods.all];
			methods.main = methods.main.slice(1, methods.main.length-1);

			return methods;
		}

		getOperationMapToPerform(methods) {
			let operationMapToPerform = [];

			for (let method of methods) {
				let operation = this.determineOperation(method);
				operationMapToPerform.push(operation);
			}

			return operationMapToPerform;
		}

		determineOperation(method) {
			method = method.trim();
			var result = /^.{2,3}\.(.+?)\s*\(.+,\s*(.+?)\s*\)/g.exec(method);

			return { 
				operationName: result[1], 
				operationSecondParam: result[2] 
			};
		}

		decrypt(
			sig, 
			operationMapToPerform = this.operationMapToPerform, 
			operationTypes = this.operationTypes) {
			try {
				sig = decodeURIComponent(sig);
				
				if (!operationMapToPerform) {
					throw new Error("Decrypter.decrypt: 'operationMapToPerform' is undefined");
				}
				if (!operationTypes) {
					throw new Error("Decrypter.decrypt: 'operationTypes' is undefined");
				}

				sig = sig.split("");

				for (let operation of operationMapToPerform) {
					let { operationName, operationSecondParam } = operation;

					operationTypes[operationName](sig, operationSecondParam);
				}

				sig = sig.join("");

				return sig;
			} catch(ex) {
				error(ex);

				return "";
			}
		}

		decryptBatch(sigBatchArray) {
			for (let sigItem of sigBatchArray) {
				sigItem.decS = this.decrypt(sigItem.s);
			}

			return sigBatchArray;
		}

		getObjName(funcBody) {
			let statements = funcBody.split(";");
			let secondStatement = statements[1];
			let thirdStatement = statements[2];		// for validation

			let result = OBJ_NAME_REGEXP.exec(secondStatement);
			let objNameSecondStatment = result[1];
			result = OBJ_NAME_REGEXP.exec(thirdStatement);
			let objNameThirdStatment =  result[1];

			return objNameSecondStatment === objNameThirdStatment ? objNameSecondStatment : null;
		}

		getObjDetails(objName) {
			objName = this.escapeSpecialCharacters(objName);
			let objBodyRegExp = this.createRegexpDynamic(OBJ_BODY_DYNAMIC_REGEXP, { "{{objName}}": objName });
			let result = objBodyRegExp.exec(this.baseCode);
			result[1] = result[1].replace(/\n/g, ""); // remove new lines

			return { obj: result[0], methods: result[1] };
		}

		getObjSplitMethods(objMethods) {
			const LIMIT = 10;

			let count = 0;	// fail safe
			let methods = {};
			let match = null;

			while ((match = SPLIT_METHODS_REGEXP.exec(objMethods)) !== null) {
				if (count >= LIMIT) { break; }
				count++;
				log(match);
				let name = match[1];
				let body = match[2];
				methods[name] = body;
			}

			return methods;
		}

		 determineOperationType(method) {
			if (method.includes("splice")) {
				return POSSIBLE_OPERATIONS_MAP.splice;
			} else if (method.includes("reverse")) {
				return POSSIBLE_OPERATIONS_MAP.reverse;
			} else {
				return POSSIBLE_OPERATIONS_MAP.modulo;
			}

			throw new Error("Decrypter.determineOperationType: undetermined operation");
		}

		mapObjOperationTypes(objSplitMethods) {
			let operationTypes = {};

			for (let methodName in objSplitMethods) {
				let method = objSplitMethods[methodName];

				operationTypes[methodName] = this.determineOperationType(method);
			}

			return operationTypes;
		}

		createRegexpDynamic(dynamicRegexp, replaceMap) {
			let { REGEXP_STRING: regexpString, FLAGS: flags } = dynamicRegexp;
			let regexp = new RegExp(Object.keys(replaceMap).join("|"),"gi");
			
			regexpString = regexpString.replace(regexp, matched => replaceMap[matched]);

			return new RegExp(regexpString, flags);
		}
	}

	return Decrypter;
})();