'use strict'

const testServices = [
	{
		id: 'blacklight',
		title: 'Blacklight',
		url: 'https://themarkup.org/blacklight/?url='
	},
	{
		id: 'blocklist-tools',
		title: 'Blocklist Tools',
		url: 'https://blocklist-tools.developerdan.com/entries/search?q='
	},
	{
		id: 'categorify',
		title: 'Categorify',
		url: 'https://categorify.org/api?website='
	},
	{
		id: 'crt.sh',
		title: 'crt.sh',
		url: 'https://crt.sh/?q='
	},
	{
		id: 'cryptcheck',
		title: 'CryptCheck',
		url: 'https://tls.imirhil.fr/https/'
	},
	{
		id: 'dnsblacklist',
		title: 'DNS Blacklist',
		url: 'https://dnsblacklist.org/?domain='
	},
	{
		id: 'hardenize',
		title: 'Hardenize',
		url: 'https://www.hardenize.com/?host='
	},
	{
		id: 'internet.nl',
		title: 'Internet.nl',
		url: 'https://en.internet.nl/site/'
	},
	{
		id: 'keycdn',
		title: 'KeyCDN',
		url: 'https://tools.keycdn.com/geo?host='
	},
	{
		id: 'observatory',
		title: 'Mozilla Observatory',
		url: 'https://observatory.mozilla.org/analyze/'
	},
	{
		id: 'njalla',
		title: 'Njalla',
		url: 'https://check.njal.la/dns/?name='
	},
	{
		id: 'ssllabs',
		title: 'Qualys SSL Labs',
		url: 'https://www.ssllabs.com/ssltest/analyze.html?hideResults=on&d='
	},
	{
		id: 'sucuri-sitecheck',
		title: 'Sucuri SiteCheck',
		url: 'https://sitecheck.sucuri.net/results/'
	},
	{
		id: 'securityheaders',
		title: 'Security Headers',
		url: 'https://securityheaders.com/?hide=on&followRedirects=on&q='
	},
	{
		id: 'shodan',
		title: 'Shodan',
		url: 'https://www.shodan.io/search?query='
	},
	{
		id: 'ssl-tools',
		title: 'SSL-Tools',
		url: 'https://ssl-tools.net/webservers/'
	},
	{
		id: 'talos-lookup',
		title: 'Talos Reputation Lookup',
		url: 'https://talosintelligence.com/reputation_center/lookup?search='
	},
	{
		id: 'trackingthetrackers',
		title: 'Tracking the Trackers',
		url: 'https://trackingthetrackers.com/site/'
	},
	{
		id: 'urlscan',
		title: 'urlscan.io',
		url: 'https://urlscan.io/domain/'
	},
	{
		id: 'virustotal',
		title: 'VirusTotal',
		url: 'https://www.virustotal.com/gui/domain/'
	},
	{
		id: 'webbkoll',
		title: 'Webbkoll',
		url: 'https://webbkoll.dataskydd.net/en/check?url='
	},
	{
		id: 'whois',
		title: 'Whois.com',
		url: 'https://www.whois.com/whois/'
	}
]

const openTestServiceInTab = (id, url) => {
	if (id === 'all') {
		testServices.forEach((testService) => {
			extensionApi.tabs.create({
				active: false,
				url: `${testService.url}${url}`
			})
		})
	} else {
		const testService = testServices.filter(a => a.id === id)[0]

		// Currently Njalla errors out when a URL contains www.
		if (id === 'njalla' && url.includes('www.')) {
			url = url.replace('www.', '')
		}

		extensionApi.tabs.create({
			active: false,
			url: `${testService.url}${url}`
		})
	}
}
