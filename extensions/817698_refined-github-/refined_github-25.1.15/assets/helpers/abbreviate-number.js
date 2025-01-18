import { d as distExports } from '../_virtual/index.js';

function abbreviateNumber(number, digits = 1) {
	return distExports.abbreviateNumber(number, digits, {padding: false}).toLowerCase();
}

export { abbreviateNumber as default };
