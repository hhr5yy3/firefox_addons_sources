const PASSIVE_EVENTS = ['touchstart', 'touchmove'];
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}

export { is_passive_event };
