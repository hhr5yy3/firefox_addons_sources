class Deferred {
	constructor() {
		this.resolve = null;
		this.reject = null;
		this.promise = null;

		this.initPromise();
	}

	initPromise() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});		
	}

	then() { this.promise.then.apply(this.promise, arguments); };
	catch() { this.promise.catch.apply(this.promise, arguments); };
}