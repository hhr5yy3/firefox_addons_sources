const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const loadMap = id => {
	const map = new atlas.Map(id, {
		zoom: 14,
		view: 'Auto',

		//Add authentication details for connecting to Azure Maps.
		authOptions: {
			authType: 'subscriptionKey',
			subscriptionKey: 'Mh9e4vUGkIz3YZXHboxqCfCSsagNoeR3N857oi2LaL0',
		},
	});
	const time = formatAMPM(new Date());
	const currDate = new Date();
	headerDate.innerText = `${Days[currDate.getDay()]}, ${Months[currDate.getMonth()]} ${currDate.getDate()}`;
	headerTime.innerText = time;
	return map;
};

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

setInterval(() => {
	const time = formatAMPM(new Date());
	headerTime.innerText = time;
}, 60000);
