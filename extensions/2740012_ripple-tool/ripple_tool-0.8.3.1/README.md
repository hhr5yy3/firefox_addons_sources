# Mixpanel

Mixpanel integration is a little fiddly to setup and update. The mixpanel lib itself
depends on some other script being executed first. The script that gets executed first
however, is responsible for downloading the main library which is not permitted with the
v3 manifest. To work around this, the extension includes a customised file which contains
both the pre-script that has been modified NOT to download the main script, and then
the main script itself.

## Initial script 

The original initial script can be found [here](https://github.com/mixpanel/mixpanel-js/blob/master/mixpanel-jslib-snippet.js).
We only need to make one change to this code, and that is to remove the script tag creation.
Near the bottom of that snippet, there is some code that should look a bit like this

```javascript
script = document.createElement("script");
script.type = "text/javascript";
script.async = true;

if (typeof MIXPANEL_CUSTOM_LIB_URL !== 'undefined') {
    script.src = MIXPANEL_CUSTOM_LIB_URL;
} else if (document.location.protocol === 'file:' && MIXPANEL_LIB_URL.match(/^\/\//)) {
    script.src = 'https:' + MIXPANEL_LIB_URL;
} else {
    script.src = MIXPANEL_LIB_URL;
}

first_script = document.getElementsByTagName("script")[0];
first_script.parentNode.insertBefore(script, first_script);
```

Find this, and remove it all.

Following that, you can now minify the code and it can be added to the top of the
`js/mixpanel.js` file.

## Main script

Now that the initial script is ready, get the main mixpanel script from [here](https://github.com/mixpanel/mixpanel-js/blob/master/dist/mixpanel.min.js)
and copy/paste it below the previous script in the same `js/mixpanel.js` file.

# Testing

The extension has cypress.js tests, but to run them you will need to generate
a file based on data from the server. This file contains a list of every single
trigger phrase the is expected to open the extension and the language in which
it relates to.

To generate the file, run the following command on the server

```ruby
query = <<~SQL
	SELECT TRIM(BOTH from value) trigger, locale
	FROM mobility_string_translations t
	WHERE t.translatable_type = 'Trigger'
	AND key = 'phrase'
	AND locale in ('#{Ripple.available_locales.join("','")}')
SQL

trigger_phrases = Trigger.connection.select_all(query)
json = trigger_phrases.to_json
```

The JSON produced needs to be saved into a file called `cypress.env.json` in
the `cypress` folder. This file should contain a JSON object, with the key
`"triggers"` and the value as the output from the previous command

```json
{
  "triggers": <JSON content from before>
}
```

**Running the tests**

Now you've got this file prepared, you can run the tests using one of the
commands below

```bash
yarn run cypress run --browser chrome
yarn run cypress run --browser brave
yarn run cypress run --browser firefox
```
