import { run_all } from './svelte-internal-shared-utils.js';

const request_idle_callback =
	typeof requestIdleCallback === 'undefined'
		? ( cb) => setTimeout(cb, 1)
		: requestIdleCallback;
let is_micro_task_queued = false;
let is_idle_task_queued = false;
let current_queued_micro_tasks = [];
let current_queued_idle_tasks = [];
function process_micro_tasks() {
	is_micro_task_queued = false;
	const tasks = current_queued_micro_tasks.slice();
	current_queued_micro_tasks = [];
	run_all(tasks);
}
function process_idle_tasks() {
	is_idle_task_queued = false;
	const tasks = current_queued_idle_tasks.slice();
	current_queued_idle_tasks = [];
	run_all(tasks);
}
function queue_micro_task(fn) {
	if (!is_micro_task_queued) {
		is_micro_task_queued = true;
		queueMicrotask(process_micro_tasks);
	}
	current_queued_micro_tasks.push(fn);
}
function queue_idle_task(fn) {
	if (!is_idle_task_queued) {
		is_idle_task_queued = true;
		request_idle_callback(process_idle_tasks);
	}
	current_queued_idle_tasks.push(fn);
}
function flush_tasks() {
	if (is_micro_task_queued) {
		process_micro_tasks();
	}
	if (is_idle_task_queued) {
		process_idle_tasks();
	}
}

export { flush_tasks, queue_idle_task, queue_micro_task };
