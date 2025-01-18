import { LEGACY_PROPS } from './svelte-internal-client-constants.js';
import { get, flush_sync } from './svelte-internal-client-runtime.js';
import { set, mutable_source } from './svelte-internal-client-reactivity-sources.js';
import './esm-env-dev-fallback.js';
import { define_property } from './svelte-internal-shared-utils.js';
import { hydrate, mount, unmount } from './svelte-internal-client-render.js';

function createClassComponent(options) {
	return new Svelte4Component(options);
}
class Svelte4Component {
	#events;
	#instance;
	constructor(options) {
		var sources = new Map();
		var add_source = (key, value) => {
			var s = mutable_source(value);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy(
			{ ...(options.props || {}), $$events: {} },
			{
				get(target, prop) {
					return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
				},
				has(target, prop) {
					if (prop === LEGACY_PROPS) return true;
					get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
					return Reflect.has(target, prop);
				},
				set(target, prop, value) {
					set(sources.get(prop) ?? add_source(prop, value), value);
					return Reflect.set(target, prop, value);
				}
			}
		);
		this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: options.intro ?? false,
			recover: options.recover
		});
		if (!options?.props?.$$host || options.sync === false) {
			flush_sync();
		}
		this.#events = props.$$events;
		for (const key of Object.keys(this.#instance)) {
			if (key === '$set' || key === '$destroy' || key === '$on') continue;
			define_property(this, key, {
				get() {
					return this.#instance[key];
				},
				set(value) {
					this.#instance[key] = value;
				},
				enumerable: true
			});
		}
		this.#instance.$set =  (next) => {
			Object.assign(props, next);
		};
		this.#instance.$destroy = () => {
			unmount(this.#instance);
		};
	}
	$set(props) {
		this.#instance.$set(props);
	}
	$on(event, callback) {
		this.#events[event] = this.#events[event] || [];
		const cb = (...args) => callback.call(this, ...args);
		this.#events[event].push(cb);
		return () => {
			this.#events[event] = this.#events[event].filter( (fn) => fn !== cb);
		};
	}
	$destroy() {
		this.#instance.$destroy();
	}
}

export { createClassComponent };
