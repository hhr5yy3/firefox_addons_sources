class Observer {
	constructor() {
		this.subscribers = [];
	}

	subscribe(subscriber) {
		this.subscribers.push(subscriber);
	}

	unsubscribe(subscriber) {
		for (let i in this.subscribers) {
			if (this.subscribers[i] === subscriber) {
				this.subscribers.splice(i, 1);
			}
		}
	}

	notify(topic, data) {
		for (let i in this.subscribers) {
			if (this.subscribers[i].topic === topic) {
				this.subscribers[i].callback(data, topic);
			}
		}
	}
}