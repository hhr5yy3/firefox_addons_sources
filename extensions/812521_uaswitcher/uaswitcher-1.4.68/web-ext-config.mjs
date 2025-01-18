export default {
	ignoreFiles: [
		// Hidden files are ignored by default
		
		/*****************************
		 * Files also ignored by GIT *
		 *****************************/
		// Ignore temporary files used by some editors
		"**/*.swp",
		"**/*~",
		
		// Project storage of some editors
		".idea/",
		".project/",
		".settings/",
		
		// Stuff created by some desktop environments
		"**/Thumbs.db",
		"**/Desktop.ini",
		
		// Stuff that never was meant to be public
		"+junk/",
		
		// Modules used during development (dependencies used GIT submodules instead)
		"yarn.lock",
		"**/node_modules/",
		
		// API key and secret
		"web-ext-api-secret.txt",
		
		/***************************************
		 * Other files not included in release *
		 ***************************************/
		
		// Ignore documentation resources
		"docs/",
		
		// Ignore screenshots
		"screenshots/",
		
		// Ignore build system files
		"scripts/",
		"web-ext-config.js",
		
		// Ignore TypeScript and related development files
		"**/*.ts",
		"jsconfig.json",
		"package.json",
		
		// Only include the pre-assembled, non-minimized distribution file of browscap-js
		"deps/browscap/",
		"deps/browscap-js-cache-fetch/",
		"deps/browscap-json-generator/",
		"deps/browscap-json-cache-files/build/cache/",
		"deps/browscap-json-cache-files/build/test/",
		"deps/browscap-json-cache-files/build/*.*",
		"deps/update-browscap.sh",
		
		// Only include the pre-assembled, non-minimized distribution file of the PSL
		"deps/public-suffix-list/*.*",
		"deps/public-suffix-list/data/",
		"deps/public-suffix-list/examples/",
		"deps/public-suffix-list/test/",
		"deps/public-suffix-list/dist/psl.min.js",
		
		// Only include wext-options main files
		"deps/wext-options/example/",
		"deps/wext-options/screenshots/",
	]
};
