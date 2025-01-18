(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.expressionsMacro = {}));
})(this, (function (exports) { 'use strict';

    exports.BUILTIN = void 0;
    (function (BUILTIN) {
        BUILTIN["STRING"] = "string";
        BUILTIN["NUMBER"] = "number";
        BUILTIN["BOOLEAN"] = "boolean";
        BUILTIN["NULL"] = "null";
        BUILTIN["UNDEFINED"] = "undefined";
        BUILTIN["OBJECT"] = "object";
        BUILTIN["ARRAY"] = "array";
        BUILTIN["FUNCTION"] = "function";
        BUILTIN["ANY"] = "any";
    })(exports.BUILTIN || (exports.BUILTIN = {}));
    const RESERVED = [
        exports.BUILTIN.STRING, exports.BUILTIN.NUMBER, exports.BUILTIN.BOOLEAN, exports.BUILTIN.FUNCTION,
        exports.BUILTIN.NULL, exports.BUILTIN.UNDEFINED, exports.BUILTIN.OBJECT, exports.BUILTIN.ARRAY
    ];

    const { NUMBER, BOOLEAN, STRING } = exports.BUILTIN;
    const Numerical = {
        '+': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: NUMBER,
            fn: (_context) => (a, b) => a + b
        },
        '-': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: NUMBER,
            fn: (_context) => (a, b) => a - b
        },
        '*': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: NUMBER,
            fn: (_context) => (a, b) => a * b
        },
        '/': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: NUMBER,
            fn: (_context) => (a, b) => a / b
        },
        '%': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: NUMBER,
            fn: (_context) => (a, b) => a % b
        },
    };
    const Comparison = {
        '==': {
            argTypes: [['any'], ['any']],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a === b
        },
        '!=': {
            argTypes: [['any'], ['any']],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a !== b
        },
        '>': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a > b
        },
        '<': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a < b
        },
        '>=': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a >= b
        },
        '<=': {
            argTypes: [[NUMBER], [NUMBER]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a <= b
        },
    };
    const Logical = {
        '&&': {
            argTypes: [[BOOLEAN], [BOOLEAN]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a && b
        },
        '||': {
            argTypes: [[BOOLEAN], [BOOLEAN]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a || b
        },
        '!': {
            argTypes: [[BOOLEAN]],
            returnType: BOOLEAN,
            fn: (_context) => (a) => !a
        }
    };
    const Text = {
        'concat': {
            argTypes: [[STRING], [STRING]],
            returnType: STRING,
            fn: (_context) => (a, b) => a + b
        },
        'contains': {
            argTypes: [[STRING], [STRING]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a.includes(b)
        },
        'starts_with': {
            argTypes: [[STRING], [STRING]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a.startsWith(b)
        },
        'ends_with': {
            argTypes: [[STRING], [STRING]],
            returnType: BOOLEAN,
            fn: (_context) => (a, b) => a.endsWith(b)
        },
        'length': {
            argTypes: [[STRING]],
            returnType: NUMBER,
            fn: (_context) => (a) => a.length
        },
        'index_of': {
            argTypes: [[STRING], [STRING]],
            returnType: NUMBER,
            fn: (_context) => (a, b) => a.indexOf(b)
        },
        'to_upper_case': {
            argTypes: [[STRING]],
            returnType: STRING,
            fn: (_context) => (a) => a.toUpperCase()
        },
        'to_lower_case': {
            argTypes: [[STRING]],
            returnType: STRING,
            fn: (_context) => (a) => a.toLowerCase()
        }
    };

    const BuiltInTypes = {};
    BuiltInTypes[exports.BUILTIN.NUMBER] = {
        checkType: (value) => typeof value === "number"
    };
    BuiltInTypes[exports.BUILTIN.STRING] = {
        checkType: (value) => typeof value === "string"
    };
    BuiltInTypes[exports.BUILTIN.BOOLEAN] = {
        checkType: (value) => typeof value === "boolean"
    };
    BuiltInTypes[exports.BUILTIN.ARRAY] = {
        checkType: (value) => Array.isArray(value)
    };
    BuiltInTypes[exports.BUILTIN.OBJECT] = {
        checkType: (value) => value.constructor === {}.constructor
    };
    BuiltInTypes[exports.BUILTIN.FUNCTION] = {
        checkType: (value) => typeof value === "function"
    };
    BuiltInTypes[exports.BUILTIN.ANY] = {
        checkType: (_value) => true
    };

    class EventEmitter {
        constructor() {
            this.__ee_listeners = {};
        }
        emit(name, ...args) {
            (this.__ee_listeners[name] || []).forEach(l => l(...args));
        }
        hasListener(name) {
            return (this.__ee_listeners[name] || []).length > 0;
        }
        off(name, listener) {
            let listeners = this.__ee_listeners[name];
            if (listeners == void 0) {
                listeners = this.__ee_listeners[name] = [];
            }
            let index = listeners.indexOf(listener);
            while (index >= 0) {
                listeners.splice(index, 1);
                index = listeners.indexOf(listener);
            }
            return this;
        }
        on(name, listener) {
            let listeners = this.__ee_listeners[name];
            if (listeners == void 0) {
                listeners = this.__ee_listeners[name] = [];
            }
            listeners.push(listener);
            return this;
        }
        once(name, listener) {
            const l2 = (...args) => {
                this.off(name, l2);
                listener(...args);
            };
            this.on(name, l2);
            return this;
        }
        reset() {
            this.__ee_listeners = {};
        }
        waitForEvent(name, ...selectors) {
            return new Promise(resolve => {
                const l2 = (...args) => {
                    for (let i = 0, length = selectors.length; i < length; i += 1) {
                        if (selectors[i] !== args[i]) {
                            return;
                        }
                    }
                    resolve(args[0]);
                };
                this.on(name, l2);
            });
        }
    }

    class Registry {
        constructor(params = {}) {
            this.funcs = {};
            this.types = { ...BuiltInTypes };
            if (params.funcs) {
                this.addFuncs(params.funcs);
            }
            if (params.types) {
                this.addTypes(params.types);
            }
        }
        addFunc(name, funcDef) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as function name`);
            }
            if (this.hasFunc(name)) {
                throw new Error(`name "${name}" already exists in registry`);
            }
            for (let args of funcDef.argTypes) {
                for (let arg of args) {
                    if (!this.hasType(arg)) {
                        throw new Error(`type "${arg}" not found in registry`);
                    }
                }
            }
            if (funcDef.returnType !== 'void' && !this.hasType(funcDef.returnType)) {
                throw new Error(`Type "${funcDef.returnType}" not found in registry`);
            }
            this.funcs[name] = funcDef;
        }
        addFuncs(funcDefs) {
            if (Array.isArray(funcDefs)) {
                funcDefs.forEach((funcDef) => {
                    this.addFuncs(funcDef);
                });
            }
            else {
                for (const [key, value] of Object.entries(funcDefs)) {
                    this.addFunc(key, value);
                }
            }
        }
        addType(name, typeDef) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as type name`);
            }
            if (this.hasType(name)) {
                throw new Error(`type "${name}" already exists in registry`);
            }
            this.types[name] = typeDef;
        }
        addTypes(typeDefs) {
            if (Array.isArray(typeDefs)) {
                typeDefs.forEach((typeDef) => {
                    this.addTypes(typeDef);
                });
            }
            else {
                for (const [key, value] of Object.entries(typeDefs)) {
                    this.addType(key, value);
                }
            }
        }
        clone() {
            return new Registry({
                funcs: this.funcs,
            });
        }
        getFunc(name) {
            if (this.hasFunc(name)) {
                return this.funcs[name];
            }
            else {
                throw new Error(`Function ${name} not found in registry`);
            }
        }
        hasFunc(name) {
            return name in this.funcs;
        }
        hasType(name) {
            return name in this.types;
        }
    }
    class VariableSpace {
        constructor(registry) {
            this._space = {};
            this._space = {};
            this._registry = registry;
        }
        set(name, value) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as variable name`);
            }
            if (name in this._space) {
                throw new Error(`Variable ${name} already exists`);
            }
            if (!(value.type in this._registry.types)) {
                throw new Error(`Variable type ${value.type} not found in registry`);
            }
            if (!this._registry.types[value.type].checkType(value.value)) {
                throw new Error(`Error setting variable: "${name}". Value: "${JSON.stringify(value.value)}" doesn't match the schema of variable type: "${value.type}"`);
            }
            this._space[name] = value;
        }
        get(name) {
            if (name in this._space) {
                return this._space[name];
            }
            else {
                throw new Error(`Variable ${name} does not exist`);
            }
        }
        update(name, value) {
            let valueObj = this.get(name);
            if (!this._registry.types[valueObj.type].checkType(value)) {
                throw new Error(`Error updating variable: "${name}". Value: "${JSON.stringify(value)}" doesn't match the schema of variable type.`);
            }
            this._space[name].value = value;
        }
        has(name) {
            return name in this._space;
        }
    }
    class VM extends EventEmitter {
        constructor(params = {}) {
            super();
            this.preStatementHook = undefined;
            this._interrupt = false;
            this._statementList = [];
            this._context = {};
            this._registry = new Registry();
            this._variables = new VariableSpace(this._registry);
            if (params.types)
                this._registry.addTypes(params.types);
            if (params.funcs)
                this._registry.addFuncs(params.funcs);
        }
        addFunc(name, func) {
            this._registry.addFunc(name, func);
        }
        addFuncs(funcs) {
            this._registry.addFuncs(funcs);
        }
        addType(name, type) {
            this._registry.addType(name, type);
        }
        addTypes(types) {
            this._registry.addTypes(types);
        }
        addVariable(name, value) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as variable name`);
            }
            if (this._registry.hasFunc(name)) {
                throw new Error(`Identifier already exists: ${name}`);
            }
            this._variables.set(name, value);
        }
        addStatement(statement) {
            this._statementList.push(statement);
        }
        addStatements(statements) {
            statements.forEach((statement) => {
                this.addStatement(statement);
            });
        }
        async evalAssignment(assignment) {
            Validate.assignment(assignment, this._registry, this._variables);
            let value = await this.evalExpression(assignment[2]);
            this._variables.update(assignment[1].slice(1), value);
            return value;
        }
        async evalConditional(conditional, path) {
            Validate.conditional(conditional);
            let res;
            for (let i = 1; i < conditional.length; i++) {
                let [condition, body] = conditional[i];
                if (await this.evalExpression(condition)) {
                    for (let i = 0; i < body.length; i++) {
                        let nestedStatement = body[i];
                        res = await this.evalStatement(nestedStatement, [...path, i]);
                    }
                    break;
                }
            }
            return res;
        }
        async evalDeclaration(declaration) {
            Validate.declaration(declaration, this._registry, this._variables);
            let varName = declaration[1];
            let value = {
                value: await this.evalExpression(declaration[2]),
                type: getType(declaration[2], this._registry, this._variables)
            };
            this.addVariable(varName, value);
            return value;
        }
        async evalExpression(expression) {
            try {
                if (expression === undefined || expression === null)
                    return expression;
                if (typeof expression === 'string' && expression.length > 1 && expression[0] === '$') {
                    return this.evalVariableAccess(expression);
                }
                if (isPlainObject(expression) || isPrimitive(expression)) {
                    return expression;
                }
                if (Array.isArray(expression) && expression.length > 0 && Array.isArray(expression[0])) {
                    return expression[0];
                }
                if (Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string') {
                    return await this.evalFunction(expression);
                }
                throw new Error(`Expression syntax is invalid`);
            }
            catch (e) {
                throw new Error(`${e.message}\nError evaluating expression: ${JSON.stringify(expression)}`);
            }
        }
        async evalFunction(expression) {
            var _a;
            Validate.functionExpression(expression, this._registry, this._variables);
            let [type, ...args] = expression;
            let fn = this.getFunc(type);
            let evaluatedArgs = await Promise.all(args.map((arg) => this.evalExpression(arg)));
            let res = await fn(...evaluatedArgs);
            let funcDef = this._registry.getFunc(type);
            if (funcDef.returnType !== 'void' && !((_a = this._registry.types[funcDef.returnType]) === null || _a === void 0 ? void 0 : _a.checkType(res))) {
                throw new Error(`Value "${JSON.stringify(res)}" returned by function does not match declared return type "${funcDef.returnType}".`);
            }
            return res;
        }
        async evalStatement(statement, path) {
            let res;
            if (this._interrupt)
                return;
            try {
                this.emit('beforestatementeval', { statement });
                if (this.preStatementHook)
                    await this.preStatementHook({ statement });
                if (Array.isArray(statement) && statement.length > 0 && statement[0] === 'var') {
                    res = await this.evalDeclaration(statement);
                }
                else if (Array.isArray(statement) && statement.length > 0 && statement[0] === 'cond') {
                    res = await this.evalConditional(statement, path);
                }
                else if (Array.isArray(statement) && statement.length > 0 && statement[0] === '=') {
                    res = await this.evalAssignment(statement);
                }
                else {
                    res = await this.evalExpression(statement);
                }
                this.emit('afterstatementeval', { statement });
                return res;
            }
            catch (e) {
                throw new Error(`${e.message}\nError evaluating statement: "${this.getStatementRepr(statement)}", at Position: ${JSON.stringify(path)}`);
            }
        }
        evalVariableAccess(expression) {
            Validate.variableAccess(expression, this._variables);
            let varName = expression.slice(1);
            return this._variables.get(varName).value;
        }
        getStatementRepr(statement) {
            if (Array.isArray(statement)) {
                if (statement[0] === 'var') {
                    return `var ${statement[1]} ${statement[2]}`;
                }
                else if (typeof statement[0] === 'string') {
                    return statement[0];
                }
                else {
                    return JSON.stringify(statement[0]);
                }
            }
            else {
                return JSON.stringify(statement);
            }
        }
        get registry() {
            return this._registry;
        }
        get statementList() {
            return [...this._statementList];
        }
        getFunc(name) {
            if (!this._registry.hasFunc(name))
                throw new Error(`Function ${name} not found in registry`);
            if (!this._variables.has(name)) {
                let fn = this._registry.getFunc(name).fn;
                this._variables.set(name, { value: fn(this._context), type: 'function' });
            }
            let variable = this._variables.get(name);
            if (variable.type !== 'function')
                throw new Error(`Variable ${name} is not a function`);
            return variable.value;
        }
        interrupt() {
            this._interrupt = true;
        }
        async run() {
            this._interrupt = false;
            let lastStatementValue = null;
            for (let i = 0; i < this._statementList.length; i++) {
                let statement = this._statementList[i];
                lastStatementValue = await this.evalStatement(statement, [i]);
            }
            return lastStatementValue;
        }
        setContext(context) {
            for (let key of Object.keys(context)) {
                this._context[key] = context[key];
            }
        }
    }
    class Validate {
        static declaration(statement, registry, variables) {
            if (!Array.isArray(statement) || statement.length === 0 || statement[0] !== 'var') {
                throw new Error(`Invalid declaration statement: ${JSON.stringify(statement)}`);
            }
            if (statement.length !== 3) {
                throw new Error(`Invalid number of tokens for variable declaration. Expected 3, got ${statement.length}`);
            }
            if (typeof statement[1] !== 'string') {
                throw new Error(`Variable name must be a string`);
            }
            if (variables.has(statement[1]) || registry.hasFunc(statement[1])) {
                throw new Error(`Variable ${statement[1]} already exists`);
            }
        }
        static conditional(statement) {
            if (!Array.isArray(statement) || statement.length === 0 || statement[0] !== 'cond') {
                throw new Error(`Invalid conditional statement: ${JSON.stringify(statement)}`);
            }
            if (statement.length < 2) {
                throw new Error(`Conditional statement requires at least one condition`);
            }
            for (let i = 1; i < statement.length; i++) {
                if (!Array.isArray(statement[i]))
                    throw new Error(`Invalid conditional clause`);
                if (statement[i].length !== 2)
                    throw new Error(`Invalid conditional clause`);
                if (!Array.isArray(statement[i][1]))
                    throw new Error(`Invalid conditional body`);
            }
        }
        static assignment(statement, registry, variables) {
            if (!Array.isArray(statement) || statement.length === 0 || statement[0] !== '=') {
                throw new Error(`Invalid statement statement: ${JSON.stringify(statement)}`);
            }
            if (statement.length !== 3) {
                throw new Error(`Assignment statement requires a variable name and an expression`);
            }
            if (typeof statement[1] !== 'string') {
                throw new Error(`Variable name must be a string`);
            }
            let varName = statement[1].slice(1);
            if (!variables.has(varName)) {
                throw new Error(`Variable ${statement[1]} does not exist`);
            }
            let variable = variables.get(varName);
            if (variable.readonly) {
                throw new Error(`Variable ${statement[1]} is readonly`);
            }
            let expressionType = getType(statement[2], registry, variables);
            if (variable.type !== expressionType) {
                throw new Error(`Invalid assignment: Variable ${statement[1]} is of type ${variable.type}, but expression is of type ${expressionType}`);
            }
        }
        static variableAccess(expression, variables) {
            if (typeof expression !== 'string' || expression.length < 2 || expression[0] !== '$') {
                throw new Error(`Invalid variable: ${JSON.stringify(expression)}`);
            }
            let varName = expression.slice(1);
            if (!variables.has(varName)) {
                throw new Error(`Variable ${varName} does not exist`);
            }
        }
        static functionExpression(expression, registry, variables) {
            var _a;
            if (!Array.isArray(expression) || expression.length === 0) {
                throw new Error(`Invalid function expression: ${JSON.stringify(expression)}`);
            }
            if (typeof expression[0] !== 'string') {
                throw new Error(`Invalid function expression: function name must be a string`);
            }
            let [type, ...args] = expression;
            if (!registry.hasFunc(type)) {
                throw new Error(`Invalid function expression: function "${type}" does not exist`);
            }
            let funcDef = registry.getFunc(type);
            let argDiff = args.length - funcDef.argTypes.length;
            if (argDiff > 1 || (argDiff === 1 && (!funcDef.optionalArg || ((_a = args[args.length - 1]) === null || _a === void 0 ? void 0 : _a.constructor) !== {}.constructor))) {
                throw new Error(`Invalid number of arguments for function ${type}, expected ${funcDef.argTypes.length} but got ${args.length}`);
            }
            this.funcArgReturn(expression, registry, variables);
        }
        static funcArgReturn(expression, registry, variables) {
            let [type, ...values] = expression;
            let funcDef = registry.getFunc(type);
            for (let i = 0; i < funcDef.argTypes.length; i++) {
                let allowedTypes = funcDef.argTypes[i];
                if (allowedTypes.includes('any'))
                    continue;
                let expressionType = getType(values[i], registry, variables);
                if (!allowedTypes.includes(expressionType)) {
                    throw new Error(`Invalid argument for function ${type}, argument ${i} is of type ${expressionType}, but expected one of ${JSON.stringify(allowedTypes)}`);
                }
            }
        }
    }
    function getType(expression, registry, variables) {
        if (expression === null)
            return 'null';
        else if (expression === undefined)
            return 'undefined';
        else if (typeof expression === 'string' && expression.length > 1 && expression[0] === '$') {
            return variables.get(expression.slice(1)).type;
        }
        else if (Array.isArray(expression)) {
            if (expression.length === 0) {
                throw new Error("Invalid expression: Empty array");
            }
            else if (typeof expression[0] === 'string') {
                if (registry.hasFunc(expression[0])) {
                    return registry.getFunc(expression[0]).returnType;
                }
                else {
                    throw new Error(`Function "${expression[0]}" not found in registry`);
                }
            }
            else if (Array.isArray(expression[0])) {
                return 'array';
            }
            else {
                throw new Error(`Invalid expression: ${JSON.stringify(expression)}`);
            }
        }
        else {
            return typeof expression;
        }
    }
    function isPrimitive(value) {
        return (value !== Object(value));
    }
    function isPlainObject(value) {
        if (typeof value !== 'object' || value.toString() !== '[object Object]') {
            return false;
        }
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }
        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function containsText(text1, text2) {
        return text1.toLowerCase().includes(text2.toLowerCase());
    }
    function isVariable(obj) {
        return typeof obj === 'string' && obj.startsWith('$');
    }

    let timeLimit = 30 * 1000;
    const stepDefs = {};
    stepDefs["click"] = {
        argTypes: [["selector"], [exports.BUILTIN.OBJECT]],
        optionalArg: true,
        returnType: "void",
        default: ["click", ["selector", { type: "css", value: "body", meta: {} }], { x: 0, y: 0 }, {}],
        getDetail: (step) => {
            return isVariable(step[1][1]) ? step[1][1] : step[1][1].value;
        },
        fn: (context) => async (selector, pos, opts) => {
            await context.browser.click(selector, pos, opts);
        }
    };
    stepDefs["wait_doc"] = {
        argTypes: [],
        optionalArg: true,
        returnType: "void",
        default: ["wait_doc", {}],
        getDetail: (_step) => '',
        fn: (context) => async (opts) => {
            await context.browser.waitForDoc(opts);
        }
    };
    stepDefs["select"] = {
        argTypes: [["selector"], ['string']],
        optionalArg: true,
        returnType: "void",
        default: ["select", ["selector", { type: "css", value: "body", meta: {} }], ""],
        getDetail: step => {
            return (isVariable(step[1][1]) ? step[1][1] : step[1][1].value) + '--' + step[2];
        },
        fn: (context) => async (selector, value, opts) => {
            await context.browser.select(selector, value, opts);
        }
    };
    stepDefs["keypress"] = {
        argTypes: [['string'], ['number']],
        optionalArg: true,
        returnType: "void",
        default: ["keypress", 'Enter', 0],
        getDetail: step => step[1] + '--' + step[2],
        fn: (context) => async (code, count, opts) => {
            await context.browser.keypress(code, count, opts);
        }
    };
    stepDefs["mousemove"] = {
        argTypes: [["selector"], ['object']],
        optionalArg: true,
        returnType: "void",
        default: ["mousemove", ["selector", { type: "css", value: "body", meta: {} }], { x: 0, y: 0 }],
        getDetail: (step) => {
            return ((isVariable(step[1][1]) ? step[1][1] : step[1][1].value)
                + '(' + (isVariable(step[2]) ? step[2] : (step[2].x + ',' + step[2].y)) + ')');
        },
        fn: (context) => async (selector, pos, opts) => {
            await context.browser.mousemove(selector, pos, opts);
        }
    };
    stepDefs["drag"] = {
        argTypes: [["selector"], [exports.BUILTIN.OBJECT], ["selector"], [exports.BUILTIN.OBJECT]],
        optionalArg: true,
        returnType: "void",
        default: [
            "drag",
            ["selector", { type: "css", value: "body", meta: {} }],
            { x: 0, y: 0 },
            ["selector", { type: "css", value: "body", meta: {} }],
            { x: 0, y: 0 },
            {}
        ],
        getDetail: step => {
            return ((isVariable(step[1][1]) ? step[1][1] : step[1][1].value)
                + '(' + (isVariable(step[2]) ? step[2] : (step[2].x + ',' + step[2].y)) + ')'
                + '-->'
                + (isVariable(step[3][1]) ? step[3][1] : step[3][1].value)
                + '(' + (isVariable(step[4]) ? step[4] : (step[4].x + ',' + step[4].y)) + ')');
        },
        fn: (context) => async (selector, pos, targetSelector, targetPos, opts) => {
            await context.browser.drag(selector, pos, targetSelector, targetPos, opts);
        }
    };
    stepDefs["focus"] = {
        argTypes: [["selector"]],
        optionalArg: true,
        returnType: "void",
        default: ["focus", ["selector", { type: "css", value: "body", meta: {} }], {}],
        getDetail: (step) => {
            return isVariable(step[1][1]) ? step[1][1] : step[1][1].value;
        },
        fn: (context) => async (selector, opts) => {
            await context.browser.focus(selector, opts);
        }
    };
    stepDefs["type"] = {
        argTypes: [["selector"], ['string']],
        optionalArg: true,
        returnType: "void",
        default: ["type", ["selector", { type: "css", value: "body", meta: {} }], "", {}],
        getDetail: step => {
            return (isVariable(step[1][1]) ? step[1][1] : step[1][1].value) + '--' + step[2];
        },
        fn: (context) => async (selector, value, opts) => {
            await context.browser.type(selector, value, opts);
        }
    };
    stepDefs["scroll"] = {
        argTypes: [["selector"], ['number'], ['number']],
        optionalArg: true,
        returnType: "void",
        default: ["scroll", ["selector", { type: "css", value: "body", meta: {} }], 0, 0, {}],
        getDetail: step => {
            return (isVariable(step[1][1]) ? step[1][1] : step[1][1].value) + '--' + step[2] + ',' + step[3];
        },
        fn: (context) => async (selector, left, top, opts) => {
            await context.browser.scroll(selector, left, top, opts);
        }
    };
    stepDefs["wait_for_duration"] = {
        argTypes: [['number']],
        optionalArg: false,
        returnType: "void",
        default: ["wait_for_duration", 1],
        getDetail: step => {
            return isVariable(step[1][1]) ? step[1][1] : (step[1] + 's');
        },
        fn: (_context) => async (duration) => {
            await wait(duration * 1000);
        }
    };
    stepDefs["wait_for_element"] = {
        argTypes: [["selector"]],
        optionalArg: true,
        returnType: "void",
        default: ["wait_for_element", ["selector", { type: "css", value: "body", meta: {} }], {}],
        getDetail: (step) => {
            return isVariable(step[1][1]) ? step[1][1] : step[1][1].value;
        },
        fn: (context) => async (selector, opts) => {
            let elementsCount = await context.browser.getElementsCount(selector, opts);
            let timeOut = Date.now() + timeLimit;
            while (elementsCount === 0 && timeOut > Date.now()) {
                await wait(500);
                elementsCount = await context.browser.getElementsCount(selector, opts);
            }
            if (elementsCount === 0) {
                throw new Error(`Element ${selector.value} not found`);
            }
        }
    };
    stepDefs["open"] = {
        argTypes: [['string']],
        optionalArg: true,
        returnType: "void",
        default: ["open", "https://example.com", {}],
        getDetail: step => step[1],
        fn: (context) => async (url, opts) => {
            await context.browser.open(url, opts);
        }
    };
    const selectorDefs = {};
    selectorDefs["selector"] = {
        argTypes: [[exports.BUILTIN.OBJECT]],
        optionalArg: false,
        returnType: "selector",
        default: ["selector", { type: "css", value: "body", meta: {} }],
        getDetail: (step) => {
            return isVariable(step[1]) ? step[1] : step[1].value;
        },
        fn: (_context) => async (params) => {
            return params;
        }
    };
    const conditionDefs = {};
    conditionDefs["el_exists"] = {
        argTypes: [["selector"]],
        optionalArg: true,
        returnType: exports.BUILTIN.BOOLEAN,
        default: ["el_exists", ["selector", { type: "css", value: "body", meta: {} }], {}],
        getDetail: (step) => `${"el_exists"}(${isVariable(step[1][1]) ? step[1][1] : step[1][1].value})`,
        fn: (context) => async (selector, opts) => {
            let elementsCount = await context.browser.getElementsCount(selector, opts);
            return elementsCount > 0;
        }
    };
    conditionDefs["el_has_text"] = {
        argTypes: [["selector"], ['string']],
        optionalArg: true,
        returnType: exports.BUILTIN.BOOLEAN,
        default: ["el_has_text", ["selector", { type: "css", value: "body", meta: {} }], "", {}],
        getDetail: (step) => `${"el_has_text"}(${isVariable(step[1][1]) ? step[1][1] : step[1][1].value}, ${step[2]})`,
        fn: (context) => async (selector, text, opts) => {
            let elementText = await context.browser.getElementText(selector, opts);
            return containsText(elementText, text);
        }
    };
    const typeDefs = {
        'selector': {
            checkType: (_value) => {
                return true;
            }
        }
    };

    class Player extends EventEmitter {
        constructor(statements, browser) {
            super();
            this.emitStatusActive = (params) => {
                this.emit('statusChange', { status: 'ACTIVE', step: params.statement });
            };
            this.emitStatusDone = (params) => {
                this.emit('statusChange', { status: 'DONE', step: params.statement, lastStatementValue: params.lastStatementValue });
            };
            this.vm = new VM({
                funcs: [stepDefs, selectorDefs, conditionDefs],
                types: [typeDefs]
            });
            this.vm.setContext({ browser });
            this.vm.addStatements(statements);
            this.vm.preStatementHook = async (params) => {
                let { statement } = params;
                if (Array.isArray(statement)
                    && statement.length > 0
                    && typeof statement[0] === 'string'
                    && ["click", "select", "keypress", "mousemove", "drag", "type", "scroll", "open"].includes(statement[0])) {
                    await wait(1000);
                }
            };
        }
        interrupt() {
            this.vm.interrupt();
        }
        async play() {
            try {
                this.vm.on('beforestatementeval', this.emitStatusActive);
                this.vm.on('afterstatementeval', this.emitStatusDone);
                return await this.vm.run();
            }
            finally {
                this.vm.off('beforestatementeval', this.emitStatusActive);
                this.vm.off('afterstatementeval', this.emitStatusDone);
            }
        }
    }

    exports.Comparison = Comparison;
    exports.EventEmitter = EventEmitter;
    exports.Logical = Logical;
    exports.Numerical = Numerical;
    exports.Player = Player;
    exports.Text = Text;
    exports.VM = VM;
    exports.conditionDefs = conditionDefs;
    exports.selectorDefs = selectorDefs;
    exports.stepDefs = stepDefs;
    exports.typeDefs = typeDefs;

}));
