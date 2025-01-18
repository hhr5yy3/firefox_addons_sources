/* executeInPage takes a function defined in this context, converts it to a string
 *  and inserts it into the page context inside a <script>. It is placed in an IIFE and
 *  passed all of the additional parameters passed to executeInPage.
 *  Parameters:
 *    func          The function which you desire to execute in the page. 
 *    leaveInPage   If this does not evaluate to a truthy value, then the <script> is
 *                    immediately removed from the page after insertion. Immediately
 *                    removing the script can normally be done. In some corner cases,
 *                    it's desirable for the script to remain in the page. However,
 *                    even for asynchronous functionality it's usually not necessary, as
 *                    the context containing the code will be kept with any references
 *                    (e.g. the reference to a callback function).
 *    id            If this is a non-blank string, it is used as the ID for the <script>
 *    All additional parameters   are passed to the function executing in the page.
 *                    This is done by converting them to JavaScript code-text and back.
 *                    All such parameters must be Object, Array, functions, RegExp,
 *                    Date, and/or other primitives (Boolean, null, undefined, Number,
 *                    String, but not Symbol). Circular references are not supported.
 *                    If you need to communicate DOM elements, you will need to
 *                    pass selectors, or other descriptors of them (e.g. temporarily
 *                    assign them a unique class), or otherwise communicate them to the
 *                    script (e.g. you could dispatch a custom event once the script is
 *                    inserted into the page context).
 */
function executeInPage(functionToRunInPage, leaveInPage, id) {
    //Execute a function in the page context.
    // Any additional arguments passed to this function are passed into the page to the
    // functionToRunInPage.
    // Such arguments must be JSON-ifiable (also Date, Function, and RegExp) (prototypes
    // are not copied).
    // Using () => doesn't set arguments, so can't use it to define this function.
    // This has to be done without jQuery, as jQuery creates the script
    // within this context, not the page context, which results in
    // permission denied to run the function.
    function convertToText(args) {
        //This uses the fact that the arguments are converted to text which is
        //  interpreted within a <script>. That means we can create other types of
        //  objects by recreating their normal JavaScript representation.
        //  It's actually easier to do this without JSON.strigify() for the whole
        //  Object/Array.
        var asText = '';
        var level = 0;
        function lineSeparator(adj, isntLast) {
            level += adj - ((typeof isntLast === 'undefined' || isntLast) ? 0 : 1);
            asText += (isntLast ? ',' : '') +'\n'+ (new Array(level * 2 + 1)).join('');
        }
        function recurseObject(obj) {
            if (Array.isArray(obj)) {
                asText += '[';
                lineSeparator(1);
                obj.forEach(function(value, index, array) {
                    recurseObject(value);
                    lineSeparator(0, index !== array.length - 1);
                });
                asText += ']';
            } else if (obj === null) {
                asText +='null';
            //undefined
            } else if (obj === void(0)) {
                asText +='void(0)';
            //Special cases for Number
            } else if (Number.isNaN(obj)) {
                asText +='Number.NaN';
            } else if (obj === 1/0) {
                asText +='1/0';
            } else if (obj === 1/-0) {
                asText +='1/-0';
            //function
            } else if (obj instanceof RegExp || typeof obj === 'function') {
                asText +=  obj.toString();
            } else if (obj instanceof Date) {
                asText += 'new Date("' + obj.toJSON() + '")';
            } else if (typeof obj === 'object') {
                asText += '{';
                lineSeparator(1);
                Object.keys(obj).forEach(function(prop, index, array) {
                    asText += JSON.stringify(prop) + ': ';
                    recurseObject(obj[prop]);
                    lineSeparator(0, index !== array.length - 1);
                });
                asText += '}';
            } else if (['boolean', 'number', 'string'].indexOf(typeof obj) > -1) {
                asText += JSON.stringify(obj);
            } else {
                console.log('Didn\'t handle: typeof obj:', typeof obj, '::  obj:', obj);
            }
        }
        recurseObject(args);
        return asText;
    }
    var newScript = document.createElement('script');
    if(typeof id === 'string' && id) {
        newScript.id = id;
    }
    var args = [];
    //using .slice(), or other Array methods, on arguments prevents optimization
    for(var index=3;index<arguments.length;index++){
        args.push(arguments[index]);
    }
    newScript.textContent = '(' + functionToRunInPage.toString() + ').apply(null,'
                            + convertToText(args) + ");";
    (document.head || document.documentElement).appendChild(newScript);
    if(!leaveInPage) {
        //Synchronous scripts are executed immediately and can be immediately removed.
        //Scripts with asynchronous functionality of any type must remain in the page
        //  until complete.
        document.head.removeChild(newScript);
    }
    return newScript;
};