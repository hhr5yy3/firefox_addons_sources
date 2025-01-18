import { PUBLIC_VERSION } from './svelte-version.js';

if (typeof window !== 'undefined')
	(window.__svelte ||= { v: new Set() }).v.add(PUBLIC_VERSION);
