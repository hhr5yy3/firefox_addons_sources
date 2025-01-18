(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var sites = [
		{
			$README: true,
			$comment: [
				"To add a new site, add an entry to the list below following the structure",
				"described below this comment.",
				"",
				"This is a JSON document, therefore no dangling commas are allowed after any",
				"LAST field of an array '[...]' or an object '{...}'. All fields must also",
				"have a comma after their value if a field follows right after within the",
				"same array/object. Not abiding by this rule results in syntax errors.",
				"",
				"Objects contain pairs consisting of a TEXT KEY and a VALUE. The key and the",
				"value are separated with a colon. Not abiding by this format results in",
				"syntax errors.",
				"",
				"A BOOLEAN may only be 'true' or 'false', without quotes. A NUMBER shall not",
				"be wrapped with any quotes, and a point '.' is the decimal separator. TEXT",
				"(i.e. STRINGS) must be surrounded with double quotes.",
				"",
				"Right below is a description of a site entry, with all fields (that are in",
				"use) listed and described. Optional fields are denoted by having their key",
				"wrapped in square brackets '[...]' - these fields do not have to be included",
				"if not needed. Do not include those square brackets in the final object, they",
				"are only for your information.",
				"",
				"Each field description follows a format of 'type (default value or 'unset' if",
				"field is optional): purpose'.",
				"",
				"Entries may be grouped up in an array - this currently is only for human",
				"information and has no impact on the extension's behaviour.",
				"",
				"Headings can be added to the popup by adding an object to the list below with",
				"only a string field 'spacer'."
			],
			entryStructure: {
				"[parentRef]": "string (unset): ID of another entry if you're only adding an alternative redirect. 'oldId' MUST be changed if this is set. Other fields are copied from the referenced entry, and may be modified if needed.",
				id: "string: The domain of the wiki.gg wiki",
				"[oldId]": "string (same as 'id'): The domain of the Fandom wiki, if different from the wiki.gg ID",
				name: "string: The name of the wiki.gg wiki",
				"[official]": "boolean (false): Whether the new wiki is considered official by the developers",
				"[uiClass]": "...: Display style in the settings view. Only 'wiki-indent' is accepted, which adds space to the left of the entry.",
				"[search]": {
					"[oldName]": "string (same as 'name'): Name of the Fandom wiki, if different from the wiki.gg name.",
					"[newIncludesWiki]": "boolean (false): Whether the 'Wiki' word should not be expected in the old name when rewriting Fandom results."
				}
			}
		},
		{
			id: "13sentinels",
			oldId: "13-sentinels-aegis-rim",
			name: "13 Sentinels"
		},
		{
			id: "7daystodie",
			name: "7 Days to Die",
			official: true
		},
		{
			id: "acecombat",
			name: "Ace Combat",
			official: true,
			search: {
				oldName: "Acepedia"
			}
		},
		{
			id: "aground",
			name: "Aground"
		},
		{
			id: "ahatintime",
			oldId: "ahatintime",
			name: "A Hat in Time"
		},
		{
			id: "almostahero",
			oldId: "almost-a-hero",
			name: "Almost a Hero"
		},
		{
			id: "aloft",
			name: "Aloft",
			official: true
		},
		{
			id: "airportceo",
			name: "Airport CEO",
			official: true
		},
		{
			id: "albion",
			oldId: "albionworld",
			name: "Albion"
		},
		{
			id: "alekon",
			name: "Alekon"
		},
		{
			id: "altverz",
			name: "Alternate UniverZ"
		},
		{
			id: "andromedamod",
			oldId: "andromeda-mod",
			name: "AndromedA Mod",
			search: {
				oldName: "Andromeda Mod"
			}
		},
		{
			id: "animalwell",
			oldId: "animal-well",
			name: "Animal Well",
			official: true
		},
		{
			id: "animalcrossingpocketcamp",
			name: "Animal Crossing: Pocket Camp"
		},
		[
			{
				id: "ark",
				name: "ARK",
				official: true,
				search: {
					oldName: "ARK: Survival Evolved",
					newTitle: "ARK Official Community Wiki"
				}
			},
			{
				parentRef: "ark",
				oldId: "ark-survival-evolved",
				search: {
					oldName: "ARK: Survival Evolved"
				}
			},
			{
				parentRef: "ark",
				oldId: "ark-survival-evolved-archive",
				search: {
					oldName: "ARK: Survival Evolved"
				}
			}
		],
		{
			id: "aground",
			name: "Aground"
		},
		{
			id: "airbornekingdom",
			name: "Airborne Kingdom"
		},
		{
			id: "animallica",
			name: "Animallica"
		},
		{
			id: "apexracer",
			name: "APEX Racer"
		},
		{
			id: "appel",
			name: "Appel"
		},
		{
			id: "arknights",
			name: "Arknights"
		},
		{
			id: "atelier",
			name: "Atelier"
		},
		{
			id: "townshiptale",
			name: "A Township Tale",
			official: true
		},
		{
			id: "ashestown",
			name: "Ashes Town"
		},
		{
			id: "astroneer",
			name: "Astroneer"
		},
		{
			id: "astrea",
			oldId: "astrea-sso",
			name: "Astrea"
		},
		{
			id: "autoforge",
			name: "AutoForge",
			official: true
		},
		{
			id: "aurora",
			oldId: "aurorawebcomic",
			name: "Aurora"
		},
		{
			id: "ahc",
			name: "Anime Hunter Canon"
		},
		{
			id: "apexlegends",
			name: "Apex Legends"
		},
		{
			id: "astralparty",
			oldId: "starparty",
			name: "Astral Party"
		},
		{
			id: "backpackbattles",
			oldId: "backpack-battles",
			name: "Backpack Battles"
		},
		{
			id: "backpackhero",
			oldId: "backpack-hero",
			name: "Backpack Hero"
		},
		{
			id: "bakegg",
			name: "Bake.gg"
		},
		{
			id: "bananapedia",
			oldId: "supermonkeyball",
			name: "Bananapedia",
			search: {
				oldName: "Super Monkey Ball"
			}
		},
		{
			id: "battlebit",
			oldId: "battlebit",
			name: "BattleBit",
			official: true
		},
		{
			id: "battlecrush",
			oldId: "battle-crush",
			name: "Battle Crush"
		},
		{
			id: "battletabs",
			oldId: "battletabs-io",
			name: "BattleTabs",
			official: true,
			search: {
				oldName: "BattleTabs.io"
			}
		},
		{
			id: "beforedarknessfalls",
			oldId: "before-darkness-falls",
			name: "Before Darkness Falls"
		},
		{
			id: "bendy",
			name: "Bendy"
		},
		[
			{
				id: "bigfoot",
				oldId: "bigfootgame",
				name: "BIGFOOT"
			},
			{
				parentRef: "bigfoot",
				oldId: "finding-bigfoot-game"
			}
		],
		{
			id: "bindingofisaacrebirth",
			oldId: "bindingofisaacrebirth",
			name: "The Binding of Isaac: Rebirth",
			search: {
				oldName: "Binding of Isaac: Rebirth"
			}
		},
		{
			id: "bitcraft",
			name: "BitCraft"
		},
		{
			id: "bejeweled",
			name: "Bejeweled"
		},
		{
			id: "bfdibranches",
			oldId: "bfdi-branches",
			name: "BFDI: Branches",
			official: true
		},
		{
			id: "blackreliquary",
			name: "The Black Reliquary"
		},
		{
			id: "bleed",
			oldId: "bleed-game",
			name: "Bleed"
		},
		{
			id: "blockfront",
			oldId: "blockfrontmc",
			name: "BlockFront",
			search: {
				oldName: "BlockFrontMC"
			}
		},
		{
			id: "boomslingers",
			oldId: "boom-slingers",
			name: "Boom Slingers"
		},
		{
			id: "bookoftravels",
			name: "Book Of Travels",
			official: true
		},
		{
			id: "bopathoftheteallotus",
			name: "Bō Path of the Teal Lotus",
			official: true
		},
		{
			id: "blightsurvival",
			oldId: "blight",
			name: "Blight Survival",
			official: true
		},
		{
			id: "blockstarplanet",
			name: "BlockStarPlanet"
		},
		{
			id: "brawlhalla",
			name: "Brawlhalla",
			official: true
		},
		{
			id: "bellasara",
			oldId: "thebellasara",
			name: "Bella Sara",
			search: {
				oldName: "The Bella Sara"
			}
		},
		{
			id: "cbs",
			name: "CBS"
		},
		{
			id: "cladecraft",
			name: "CladeCraft"
		},
		{
			id: "cherryforest",
			oldId: "cherry-forest",
			name: "Cherry Forest",
			official: true
		},
		{
			id: "changed",
			name: "Changed"
		},
		{
			id: "chippy",
			name: "Chippy"
		},
		{
			id: "chivalry",
			name: "Chivalry",
			official: true,
			search: {
				oldName: "Chivalry: Medieval Warfare"
			}
		},
		{
			id: "cookieclicker",
			name: "Cookie Clicker"
		},
		{
			id: "coromon",
			name: "Coromon",
			official: true
		},
		{
			id: "crowsworn",
			name: "Crowsworn"
		},
		{
			id: "corporateclash",
			oldId: "toontown-corporate-clash",
			name: "Toontown Corporate Clash"
		},
		{
			id: "cobaltcore",
			oldId: "cobalt-core",
			name: "Cobalt Core"
		},
		{
			id: "conflictofnations",
			name: "Conflict of Nations"
		},
		{
			id: "counterpact",
			name: "Counterpact"
		},
		{
			id: "cosmicreach",
			name: "Cosmic Reach",
			official: true
		},
		{
			id: "cosmoteer",
			name: "Cosmoteer",
			official: true
		},
		{
			id: "craftersmc",
			oldId: "craftersmc-skyblock",
			name: "CraftersMC"
		},
		{
			id: "crossimpact",
			oldId: "crossimpactoffical",
			name: "Cross Impact",
			official: true
		},
		{
			id: "cuphead",
			name: "Cuphead"
		},
		{
			id: "cuisineer",
			name: "Cuisineer",
			official: true
		},
		{
			id: "contentwarning",
			oldId: "content-warning-landfall",
			name: "Content Warning"
		},
		{
			id: "continentalwarserver",
			name: "Continental War Server"
		},
		{
			id: "darza",
			oldId: "darzas",
			name: "Darza's Dominion"
		},
		{
			id: "darkdeity",
			name: "Dark Deity",
			official: true
		},
		{
			id: "darkestdungeon",
			name: "Darkest Dungeon",
			official: true
		},
		{
			id: "deadahead",
			oldId: "dead-ahead",
			name: "Dead Ahead"
		},
		{
			id: "deadbydaylight",
			name: "Dead by Daylight",
			official: true
		},
		{
			id: "deadcells",
			name: "Dead Cells",
			official: true
		},
		{
			id: "deadestate",
			name: "Dead Estate",
			official: true
		},
		{
			id: "deadlink",
			name: "Deadlink"
		},
		{
			id: "deathbulge",
			name: "Deathbulge",
			official: true
		},
		{
			id: "d2mc",
			name: "Destiny 2 Minecraft Edition"
		},
		{
			id: "deltatraveler",
			name: "DELTATRAVELER",
			search: {
				oldName: "The Unofficial Deltatraveler"
			}
		},
		{
			id: "dredge",
			name: "Dredge"
		},
		{
			id: "deeprockgalactic",
			name: "Deep Rock Galactic",
			official: true
		},
		{
			id: "dicefolk",
			name: "Dicefolk",
			official: true
		},
		{
			id: "disfigure",
			name: "Disfigure"
		},
		{
			id: "dotage",
			oldId: "dotage-game",
			name: "DotAGE",
			official: true
		},
		{
			id: "domekeeper",
			oldId: "dome-keeper",
			name: "Dome Keeper"
		},
		{
			id: "donotfeedthemonkeys2099",
			oldId: "do-not-feed-the-monkeys",
			name: "Do Not Feed The Monkeys 2099",
			official: true
		},
		{
			id: "dragonfable",
			name: "DragonFable"
		},
		{
			id: "dungeonnowloading",
			oldId: "dungeon-now-loading",
			name: "Dungeon Now Loading"
		},
		{
			id: "dragoncourt",
			name: "Dragon Court"
		},
		{
			id: "dragonvillageseries",
			oldId: "dragon-village-series",
			name: "Dragon Village Series"
		},
		{
			id: "dreamscaper",
			name: "Dreamscaper",
			official: true
		},
		[
			{
				id: "dontstarve",
				name: "Don't Starve",
				official: true
			},
			{
				id: "islandadventures",
				oldId: "island-adventures",
				name: "Island Adventures",
				uiClass: "wiki-indent"
			},
			{
				id: "uncompromisingmode",
				oldId: "uncompromising-mode",
				name: "Uncompromising Mode",
				uiClass: "wiki-indent"
			}
		],
		{
			id: "drugdealersimulator2",
			oldId: "drug-dealer-simulator-2",
			name: "Drug Dealer Simulator 2"
		},
		{
			id: "dyinglight",
			name: "Dying Light",
			official: true
		},
		{
			id: "schoolofdragons",
			oldId: "dreamworks-school-of-dragons",
			name: "DreamWorks School of Dragons",
			official: true
		},
		{
			id: "eastscarp",
			name: "East Scarp",
			official: true
		},
		{
			id: "eclipsesmp",
			oldId: "eclipse-smp",
			name: "EclipseSMP",
			search: {
				oldName: "Eclipse SMP"
			}
		},
		{
			id: "emberknights",
			oldId: "ember-knights-game",
			name: "Ember Knights",
			search: {
				oldName: "Ember Knights - Game"
			}
		},
		{
			id: "equestriaatwar",
			oldId: "equestria-at-war",
			name: "Equestria at War",
			official: true
		},
		{
			id: "ena",
			oldId: "enajoelg",
			name: "ENA"
		},
		{
			id: "erenshor",
			name: "Erenshor",
			official: true
		},
		{
			id: "exapico",
			oldId: "artonelico",
			name: "EXA PICO"
		},
		{
			id: "enterthegungeon",
			name: "Enter The Gungeon",
			official: true
		},
		{
			id: "eternitydev",
			oldId: "eternitydev-games",
			name: "EternityDev"
		},
		{
			id: "everdreamvalley",
			name: "Everdream Valley",
			official: true
		},
		{
			id: "fantasylife",
			oldId: "fantasy-life",
			name: "Fantasy Life"
		},
		{
			id: "farworldpioneers",
			name: "Farworld Pioneers",
			official: true
		},
		[
			{
				id: "farmingsimulator",
				name: "Farming Simulator"
			},
			{
				parentRef: "farmingsimulator",
				oldId: "farming-simulator-2017"
			}
		],
		{
			id: "fearandhunger",
			name: "Fear and Hunger",
			official: true,
			search: {
				oldName: "\"Fear and Hunger: the Tormentpedia\""
			}
		},
		{
			id: "fearstofathom",
			name: "Fears to Fathom",
			official: true
		},
		{
			id: "felvidek",
			name: "Felvidek"
		},
		[
			{
				_: "Fandom ID was changed, and has been added as a separate redirect rule (both may appear in search indexes)",
				id: "fiendfolio",
				oldId: "fiend-folio",
				name: "Fiend Folio",
				official: true
			},
			{
				parentRef: "fiendfolio",
				oldId: "fiend-folio-afterbirth",
				search: {
					oldName: "Fiend Folio Afterbirth+"
				}
			}
		],
		{
			id: "epicbattlefantasy",
			name: "Epic Battle Fantasy",
			official: true
		},
		{
			id: "fieldsofmistria",
			oldId: "fields-of-mistria",
			name: "Fields of Mistria"
		},
		{
			id: "flight",
			name: "Flight Sim"
		},
		{
			id: "forgottenseas",
			oldId: "forgotten-seas",
			name: "Forgotten Seas",
			official: true
		},
		{
			id: "fortheking",
			name: "For The King",
			official: true
		},
		{
			id: "foxhole",
			name: "Foxhole",
			official: true
		},
		{
			id: "frackinuniverse",
			name: "Frackin' Universe"
		},
		{
			id: "fridaynightfunkin",
			name: "Friday Night Funkin'"
		},
		{
			id: "gangbeasts",
			oldId: "gang-beasts",
			name: "Gang Beasts"
		},
		{
			id: "galaxylife",
			name: "Galaxy Life"
		},
		{
			id: "galaxyonfire",
			name: "Galaxy on Fire"
		},
		{
			id: "getawayshootout",
			oldId: "getaway-shootout",
			name: "Getaway Shootout"
		},
		{
			id: "ghostrunner",
			name: "Ghostrunner"
		},
		{
			id: "ghostwatchers",
			oldId: "ghost-watchers",
			name: "Ghost Watchers",
			official: true
		},
		{
			id: "gigantic",
			name: "Gigantic"
		},
		{
			id: "gmce",
			oldId: "gm-ce",
			name: "Ghost Master: Complete Edition"
		},
		{
			id: "gnorp",
			oldId: "gnorp-apologue",
			name: "Gnorp Apologue"
		},
		{
			id: "godofweapons",
			oldId: "god-of-weapons",
			name: "God of Weapons"
		},
		{
			id: "gttod",
			name: "Get To The Orange Door"
		},
		{
			id: "guiltygear",
			name: "Guilty Gear"
		},
		{
			id: "hawked",
			name: "Hawked"
		},
		{
			id: "headsoccer",
			name: "Head Soccer"
		},
		{
			id: "hearthstone",
			name: "Hearthstone"
		},
		{
			id: "heavygear",
			oldId: "heavy-gear",
			name: "Heavy Gear"
		},
		{
			id: "herosiege",
			name: "Hero Siege",
			official: true
		},
		[
			{
				id: "helldivers",
				oldId: "helldivers",
				name: "Helldivers"
			},
			{
				parentRef: "helldivers",
				oldId: "helldivers-ii"
			},
			{
				parentRef: "helldivers",
				oldId: "helldivers-archive"
			},
			{
				parentRef: "helldivers",
				oldId: "helldivers-2"
			}
		],
		{
			id: "helloneighbor",
			oldId: "hello-neighbor",
			name: "Hello Neighbor",
			official: true
		},
		{
			id: "haveanicedeath",
			oldId: "have-a-nice-death",
			name: "Have a Nice Death",
			official: true
		},
		{
			id: "holocure",
			name: "Holocure"
		},
		{
			id: "horticular",
			name: "Horticular"
		},
		{
			id: "hyboriangates",
			name: "Hyborian Gates",
			search: {
				oldName: "Hyborian gates"
			}
		},
		{
			id: "hybridanimals",
			name: "Hybrid Animals"
		},
		{
			id: "hytale",
			name: "Hytale"
		},
		{
			id: "idlewizard",
			name: "Idle Wizard",
			oldId: "idle-wizard",
			official: true
		},
		{
			id: "illusioncarnival",
			oldId: "illusion-carnival",
			name: "Illusion Carnival"
		},
		{
			id: "immortallife",
			oldId: "immortal-life",
			name: "Immortal Life",
			official: true
		},
		{
			id: "inconvenientmodpack",
			oldId: "inconvenient-modpack",
			name: "Inconvenient Modpack"
		},
		{
			id: "incrementalfactory",
			oldId: "incremental-factory",
			name: "Incremental Factory"
		},
		{
			id: "infectionfreezone",
			oldId: "infection-free-zone",
			name: "Infection Free Zone"
		},
		{
			id: "instarsandtime",
			oldId: "in-stars-and-time",
			name: "In Stars and Time"
		},
		{
			id: "tboiipecac",
			oldId: "ipecacmod",
			name: "IPECAC Community Mod",
			official: true
		},
		{
			id: "jurassicworld",
			oldId: "jurassic-world-the-mobile-game",
			name: "Jurassic World"
		},
		{
			id: "junkjack",
			name: "Junk Jack",
			official: true
		},
		{
			id: "kairosoft",
			name: "Kairosoft"
		},
		{
			id: "kalterkrieg",
			name: "Kalterkrieg"
		},
		{
			id: "kingdomcomedeliverance",
			oldId: "kingdom-come-deliverance",
			name: "Kingdom Come: Deliverance"
		},
		{
			id: "lastorigin",
			name: "Last Origin"
		},
		{
			id: "lancer",
			oldId: "omninet",
			name: "LANCER"
		},
		{
			id: "leafblowerrevolution",
			oldId: "leaf-blower-revolution",
			name: "Leaf Blower Revolution"
		},
		[
			{
				id: "lightnofire",
				oldId: "light-no-fire",
				name: "Light No Fire",
				isFork: false
			},
			{
				parentRef: "lightnofire",
				oldId: "lightnofire"
			}
		],
		{
			id: "liftlands",
			oldId: "liftlands",
			name: "Liftlands"
		},
		{
			id: "littlecornerteahouse",
			oldId: "little-corner-tea-house",
			name: "Little Corner Tea House"
		},
		{
			id: "littlekingsstory",
			name: "Little King's Story"
		},
		{
			id: "livealive",
			oldId: "live-a-live",
			name: "Live a Live"
		},
		{
			id: "legiontd2",
			name: "Legion TD 2"
		},
		{
			id: "legendsofequestria",
			name: "Legends of Equestria"
		},
		{
			id: "letitdie",
			name: "Let It Die"
		},
		{
			id: "levelzeroextraction",
			oldId: "level-zero-extraction",
			name: "Level Zero: Extraction",
			official: true,
			search: {
				oldName: "Level Zero: Extraction"
			}
		},
		{
			id: "lifeinadventure",
			oldId: "life-in-adventure",
			name: "Life In Adventure"
		},
		{
			id: "limbuscompany",
			name: "Limbus Company"
		},
		{
			id: "libraryofruina",
			oldId: "library-of-ruina",
			name: "Library of Ruina"
		},
		{
			id: "lkg",
			oldId: "littleknown-galaxy",
			name: "Little-Known Galaxy"
		},
		{
			id: "lordofembers",
			oldId: "the-lord-of-embers",
			name: "The Lord of Embers",
			official: true
		},
		{
			id: "lynked",
			name: "Lynked",
			official: true
		},
		{
			id: "kaetram",
			name: "Kaetram",
			official: true
		},
		{
			id: "karmazoo",
			name: "KarmaZoo",
			official: true
		},
		[
			{
				id: "kartriderdrift",
				oldId: "kartrider-drift",
				name: "KartRider: Drift"
			},
			{
				parentRef: "kartriderdrift",
				oldId: "kartrider"
			}
		],
		{
			id: "cardsandcastles",
			name: "Cards and Castles",
			official: true
		},
		{
			id: "kameo",
			oldId: "wotnot",
			name: "Kameo Elements of Power"
		},
		{
			id: "katanazero",
			oldId: "katana-zero",
			name: "Katana ZERO"
		},
		{
			id: "knighthood",
			name: "Knighthood"
		},
		{
			id: "kryeit",
			name: "Kryeit"
		},
		{
			id: "mahjongsoul",
			name: "Mahjong Soul"
		},
		{
			id: "mainframedefenders",
			oldId: "mainframe-defenders",
			name: "Mainframe Defenders"
		},
		{
			id: "marvelrivals",
			name: "Marvel Rivals"
		},
		{
			id: "marvelsuperheroesmod",
			oldId: "marvel-superheroes-mod",
			name: "Marvel Superheroes Mod"
		},
		{
			id: "mewgenics",
			name: "Mewgenics"
		},
		{
			id: "megidoabyss",
			oldId: "megido-abyss",
			name: "Megido Abyss"
		},
		{
			id: "meridian59",
			oldId: "meridian-59",
			name: "Meridian 59"
		},
		{
			id: "metalstorm",
			name: "MetalStorm",
			official: true
		},
		{
			id: "metalhellsinger",
			oldId: "metal-hellsinger",
			name: "Metal Hellsinger"
		},
		{
			id: "mili",
			oldId: "project-mili",
			name: "Mili"
		},
		{
			id: "mindhack",
			name: "MINDHACK"
		},
		[
			{
				spacer: "Minecraft Wikis (minecraft.wiki)"
			},
			{
				id: "aether",
				name: "Aether Mod",
				official: true
			},
			{
				id: "darkagebizarre",
				oldId: "darkage-bizarre",
				name: "DarkAge Bizarre",
				official: true,
				uiClass: "wiki-indent"
			},
			{
				id: "doggytalentsnext",
				oldId: "doggytalents",
				name: "Doggy Talents",
				official: true,
				uiClass: "wiki-indent"
			},
			{
				id: "thechocolateedition",
				oldId: "the-chocolate-edition",
				name: "The Chocolate Edition",
				uiClass: "wiki-indent"
			},
			{
				id: "mcdf",
				oldId: "mcdiscontinued",
				farm: "miraheze",
				name: "MC Discontinued Features",
				uiClass: "wiki-indent"
			},
			{
				id: "midnight",
				oldId: "the-midnight-mod",
				name: "The Midnight Mod",
				uiClass: "wiki-indent"
			}
		],
		{
			id: "minehut",
			oldId: "minehutmc",
			name: "Minehut"
		},
		{
			id: "minihealer",
			name: "MiniHealer",
			official: true
		},
		{
			id: "misttraingirls",
			oldId: "mist-train-girls",
			name: "Mist Train Girls"
		},
		{
			id: "mmvremastered",
			oldId: "mmvremastered",
			name: "MMV:Remastered",
			official: true
		},
		{
			id: "momodora",
			name: "Momodora"
		},
		{
			id: "monsternevercry",
			name: "Monster Never Cry",
			search: {
				oldName: "Monsternevercry"
			}
		},
		{
			id: "monumenta",
			oldId: "monumentammo",
			name: "Monumenta"
		},
		{
			id: "moonlightpeaks",
			oldId: "moonlightpeaks",
			name: "Moonlight Peaks"
		},
		{
			id: "multiversus",
			name: "Multiversus"
		},
		{
			id: "needystreameroverload",
			oldId: "needy-streamer-overload",
			name: "NEEDY STREAMER OVERLOAD"
		},
		{
			id: "necromerger",
			name: "NecroMerger"
		},
		{
			id: "neutronized",
			name: "Neutronized"
		},
		{
			id: "nightmarereaper",
			oldId: "nightmare-reaper",
			name: "Nightmare Reaper"
		},
		{
			id: "nightsofazure",
			name: "Nights of Azure"
		},
		{
			id: "mightyparty",
			name: "Mighty Party"
		},
		{
			id: "ninesols",
			name: "Nine Sols",
			search: {
				oldName: "NineSols"
			}
		},
		{
			id: "nitrome",
			oldId: "nitrome",
			name: "Nitrome",
			search: {
				oldName: "Nitrome"
			}
		},
		{
			id: "nivalis",
			oldId: "nivalisgame",
			name: "Nivalis"
		},
		{
			id: "noita",
			name: "Noita"
		},
		{
			id: "oddrealm",
			oldId: "oddrealm",
			name: "Odd Realm",
			official: true
		},
		{
			id: "offpeak",
			name: "Off-Peak"
		},
		{
			id: "oguandthesecretforest",
			oldId: "ogu-and-the-secret-forest",
			name: "Ogu and the Secret Forest"
		},
		{
			id: "oldworldblues",
			oldId: "old-world-blues",
			name: "Old World Blues",
			search: {
				oldName: "HOI4 total conversion mod"
			}
		},
		{
			id: "omegastrikers",
			name: "Omega Strikers",
			official: true
		},
		{
			id: "outward",
			name: "Outward",
			official: true
		},
		{
			id: "oxygennotincluded",
			name: "Oxygen Not Included"
		},
		{
			id: "paperlily",
			oldId: "paper-lily",
			name: "Paper Lily"
		},
		{
			id: "paperplanet",
			oldId: "paper-planet",
			name: "Paper Planet"
		},
		{
			id: "pathologic",
			name: "Pathologic",
			official: true
		},
		{
			id: "palia",
			name: "Palia",
			official: true
		},
		{
			id: "palworld",
			name: "Palworld"
		},
		{
			id: "pathofachra",
			oldId: "path-of-achra",
			name: "Path of Achra"
		},
		{
			id: "peaksofyore",
			oldId: "peaks-of-yore",
			name: "Peaks of Yore"
		},
		{
			id: "peglin",
			name: "Peglin",
			official: true
		},
		{
			id: "pg3d",
			oldId: "pixelgun",
			name: "Pixel Gun 3D",
			search: {
				oldName: "Pixel Gun"
			}
		},
		{
			id: "pico",
			name: "Pico"
		},
		{
			id: "planetlife",
			oldId: "planet-life",
			name: "Planet Life"
		},
		{
			id: "plagueinc",
			name: "Plague Inc",
			official: true
		},
		{
			id: "pubg",
			name: "PUBG",
			official: true
		},
		{
			id: "predecessor",
			name: "Predecessor",
			official: true
		},
		{
			id: "projectarrhythmia",
			name: "Project Arrhythmia",
			official: true
		},
		{
			id: "projectmalice",
			name: "Project Malice"
		},
		{
			id: "projectwingman",
			name: "Project Wingman"
		},
		{
			id: "planetaryannihilation",
			name: "Planetary Annihilation"
		},
		{
			id: "plantsvszombies",
			name: "Plants vs. Zombies"
		},
		{
			id: "quasimorph",
			name: "Quasimorph",
			official: true
		},
		{
			id: "realspace4animation",
			oldId: "real-space-4-animation",
			name: "Real Space 4 Pivot Animation"
		},
		{
			id: "rebelinc",
			oldId: "rebel-inc",
			name: "Rebel Inc"
		},
		{
			id: "redflood",
			oldId: "red-flood",
			name: "Red Flood",
			official: true
		},
		{
			id: "rejuvenation",
			name: "Rejuvenation"
		},
		{
			id: "roboquest",
			name: "Roboquest"
		},
		{
			id: "revita",
			oldId: "revitagame",
			name: "Revita",
			official: true
		},
		{
			id: "riseofcultures",
			oldId: "rise-of-cultures",
			name: "Rise of Cultures"
		},
		[
			{
				id: "riskofrain",
				name: "Risk of Rain",
				official: true
			},
			{
				id: "riskofrain2",
				name: "Risk of Rain 2",
				official: true
			}
		],
		[
			{
				id: "roody2d",
				name: "Roody:2D"
			},
			{
				parentRef: "roody2d",
				oldId: "roody-2d",
				search: {
					oldName: "Roody:2D ReEdit"
				}
			}
		],
		{
			id: "pvzneighborhooddefense",
			oldId: "pvz-neighborhood-defense",
			name: "PvZ Neighborhood Defense",
			official: true
		},
		{
			id: "rlcraft",
			name: "RLCraft"
		},
		{
			id: "rogueadventure",
			name: "Rogue Adventure"
		},
		{
			id: "rootsofpacha",
			name: "Roots of Pacha",
			official: true
		},
		{
			id: "rsmc",
			name: "RSMC"
		},
		{
			id: "samuraigunn2",
			oldId: "samurai-gunn-2",
			name: "Samurai Gunn 2"
		},
		{
			id: "sandboxels",
			name: "Sandboxels",
			official: true
		},
		{
			id: "sandsofaura",
			name: "Sands of Aura",
			official: true
		},
		{
			id: "scrabdackle",
			name: "Scrabdackle",
			official: true
		},
		{
			id: "satisfactory",
			name: "Satisfactory",
			official: true
		},
		{
			id: "scriptwelder",
			oldId: "dont-escape",
			name: "Scriptwelder"
		},
		{
			id: "seaofthieves",
			name: "Sea of Thieves"
		},
		[
			{
				id: "secretsofgrindea",
				name: "Secrets of Grindea"
			},
			{
				parentRef: "secretsofgrindea",
				oldId: "secrets-of-grindea"
			}
		],
		{
			id: "originrealms",
			name: "Origin Realms"
		},
		{
			id: "scorn",
			name: "Scorn"
		},
		{
			id: "shadowsofabaddon",
			name: "Shadows of Abaddon",
			official: true,
			search: {
				oldName: "Shadows of Abaddon Mod"
			}
		},
		{
			id: "sheltered2",
			oldId: "sheltered-2",
			name: "Sheltered 2"
		},
		{
			id: "shogunshowdown",
			oldId: "shogun-showdown",
			name: "Shogun Showdown",
			official: true
		},
		{
			id: "signalis",
			name: "SIGNALIS"
		},
		{
			id: "slarpg",
			name: "Super Lesbian Animal RPG"
		},
		{
			id: "slycooper",
			name: "Sly Cooper"
		},
		{
			id: "smallandsurvivethewilds",
			oldId: "smalland-survive-the-wilds",
			name: "Smalland: Survive the Wilds"
		},
		{
			id: "smileforme",
			oldId: "smile-for-me",
			name: "Smile For Me"
		},
		{
			id: "solinvictus",
			oldId: "sol-invictus",
			name: "Sol Invictus"
		},
		{
			id: "soulknightprequel",
			oldId: "soul-knight-prequel",
			name: "Soul Knight Prequel"
		},
		{
			id: "sonsoftheforest",
			name: "Sons of the Forest"
		},
		{
			id: "southpark",
			name: "South Park Archives"
		},
		{
			id: "speedrunners",
			name: "Speedrunners"
		},
		{
			id: "spellforce",
			name: "Spellforce"
		},
		{
			id: "spaceengineers",
			name: "Space Engineers",
			official: true
		},
		{
			id: "spiderheck",
			name: "SpiderHeck"
		},
		{
			id: "spellrogue",
			name: "Spellrogue"
		},
		{
			id: "starsector",
			name: "Starsector"
		},
		{
			id: "steamworld",
			name: "Steamworld",
			official: true
		},
		{
			id: "stickwarfarebloodstrike",
			oldId: "stick-warfare-blood-strike",
			name: "Stick Warfare: Blood Strike"
		},
		{
			id: "strinova",
			name: "Strinova",
			official: true
		},
		{
			id: "subnauticamodding",
			oldId: "subnautica-mods",
			name: "Subnautica Modding",
			search: {
				oldName: "Subnautica Mods"
			}
		},
		{
			id: "synthetikuniverse",
			oldId: "synthetik",
			name: "SYNTHETIK"
		},
		{
			id: "sugaryspire",
			oldId: "sugary-spire",
			name: "Sugary Spire"
		},
		{
			id: "sunhaven",
			oldId: "sun-haven",
			name: "Sun Haven",
			official: true
		},
		{
			id: "sunnyside",
			oldId: "sunnysidegame",
			name: "SunnySide",
			search: {
				oldName: "SunnySide Game"
			}
		},
		{
			id: "superautopets",
			name: "Super Auto Pets"
		},
		{
			id: "supersnail",
			oldId: "super-snail",
			name: "Super Snail"
		},
		[
			{
				id: "starstable",
				oldId: "jorvikipedia",
				name: "Star Stable"
			},
			{
				parentRef: "starstable",
				oldId: "starstable-archive"
			}
		],
		{
			id: "tabs",
			oldId: "totally-accurate-battle-simulator",
			name: "Totally Accurate Battle Simulator"
		},
		{
			id: "trailmakers",
			name: "Trailmakers",
			official: true
		},
		{
			id: "teamabnormals",
			oldId: "minecraftabnormals",
			name: "Team Abnormals",
			official: true
		},
		{
			id: "teamrun",
			oldId: "team-run",
			name: "Team Run"
		},
		{
			id: "temtem",
			name: "Temtem",
			official: true
		},
		{
			id: "tempestrising",
			name: "Tempest Rising"
		},
		[
			{
				id: "terraria",
				name: "Terraria",
				official: true
			},
			{
				parentRef: "terraria",
				oldId: "terraria-archive"
			},
			{
				id: "calamitymod",
				name: "Calamity Mod",
				official: true,
				uiClass: "wiki-indent"
			},
			{
				id: "spiritmod",
				name: "Spirit Mod",
				uiClass: "wiki-indent"
			},
			{
				id: "thoriummod",
				name: "Thorium Mod",
				official: true,
				uiClass: "wiki-indent"
			},
			{
				id: "terrariamods",
				name: "Terraria Mods",
				official: true,
				uiClass: "wiki-indent"
			}
		],
		[
			{
				spacer: "The Binding of Isaac mods"
			},
			{
				id: "moddingofisaac",
				oldId: "moddingofisaac",
				name: "Modding of Isaac",
				uiClass: "wiki-indent"
			},
			{
				id: "tboicompliance",
				oldId: "compliance",
				name: "Compliance",
				uiClass: "wiki-indent"
			},
			{
				id: "tboiepiphany",
				oldId: "tboi-epiphany",
				name: "Epiphany",
				uiClass: "wiki-indent",
				search: {
					oldName: "TBOI: The Epiphany Mod"
				}
			},
			{
				id: "forgottenfables",
				name: "Forgotten Fables",
				official: true,
				uiClass: "wiki-indent",
				search: {
					oldName: "The Binding of Isaac: Forgotten Fables"
				}
			},
			{
				id: "tboirevelations",
				name: "Revelations",
				uiClass: "wiki-indent"
			}
		],
		{
			id: "teambytethebackrooms",
			oldId: "teambytebackrooms",
			name: "Team Byte The Backrooms",
			search: {
				oldName: "Team Byte's Backrooms"
			}
		},
		{
			id: "theinnerworld",
			oldId: "the-inner-world",
			name: "The Inner World"
		},
		{
			id: "thevoid",
			name: "The Void"
		},
		{
			id: "tno",
			oldId: "the-new-order-last-days-of-europe",
			name: "The New Order: Last Days of Europe"
		},
		{
			id: "themagicalmixturemill",
			oldId: "the-magical-mixture-mill",
			name: "The Magical Mixture Mill",
			official: true
		},
		[
			{
				id: "titanfall",
				name: "Titanfall",
				official: true
			},
			{
				parentRef: "titanfall",
				oldId: "titanfall2"
			}
		],
		{
			id: "smashlegends",
			oldId: "smash-legends",
			name: "Smash Legends"
		},
		{
			id: "thespellbrigade",
			name: "The Spell Brigade"
		},
		{
			id: "surroundead",
			name: "SurrounDead",
			official: true
		},
		{
			id: "thecrust",
			oldId: "the-crust",
			name: "The Crust"
		},
		{
			id: "theforeverwinter",
			oldId: "foreverwinter",
			name: "The Forever Winter",
			search: {
				oldName: "Forever Winter"
			}
		},
		{
			id: "theinfected",
			oldId: "the-infected",
			name: "The Infected"
		},
		{
			id: "theprecinct",
			oldId: "the-precinct",
			name: "The Precinct",
			official: true
		},
		{
			id: "thewolf",
			oldId: "the-wolf-simulator",
			name: "The Wolf"
		},
		{
			id: "timberborn",
			name: "Timberborn",
			official: true
		},
		{
			id: "tomclancy",
			oldId: "jackryan",
			name: "Tom Clancy",
			search: {
				oldName: "Jack Ryan"
			}
		},
		{
			id: "toontown",
			name: "Toontown"
		},
		{
			id: "totherescue",
			name: "To The Rescue"
		},
		{
			id: "towerfall",
			name: "TowerFall"
		},
		[
			{
				id: "trucksimulator",
				oldId: "truck-simulator",
				name: "Truck Simulator"
			},
			{
				parentRef: "trucksimulator",
				oldId: "trucksim"
			}
		],
		{
			id: "tridedash",
			name: "Tride Dash"
		},
		{
			id: "tsukisodyssey",
			oldId: "tsuki-odyssey",
			name: "Tsuki's Odyssey",
			official: true
		},
		{
			id: "twistedwonderland",
			oldId: "twisted-wonderland",
			name: "Twisted Wonderland"
		},
		{
			id: "ultrakill",
			name: "ULTRAKILL",
			official: true
		},
		{
			id: "undermine",
			name: "UnderMine",
			official: true
		},
		{
			id: "undertaleyellow",
			name: "Undertale Yellow"
		},
		{
			id: "unturned",
			name: "Unturned",
			official: true
		},
		[
			{
				id: "vibrantventure",
				oldId: "vibrantventure",
				name: "Vibrant Venture"
			},
			{
				parentRef: "vibrantventure",
				oldId: "vibrant-venture"
			}
		],
		{
			id: "vectorio",
			name: "Vectorio",
			official: true
		},
		{
			id: "voidcrew",
			oldId: "void-crew",
			name: "Void Crew",
			official: true
		},
		{
			id: "tvruhh",
			oldId: "the-void-rains-upon-her-heart",
			name: "The Void Rains Upon Her Heart"
		},
		[
			{
				id: "loathing",
				oldId: "westofloathing",
				name: "Wiki of Loathing",
				search: {
					oldName: "West of Loathing",
					newIncludesWiki: true
				}
			},
			{
				parentRef: "loathing",
				oldId: "shadowsoverloathing",
				search: {
					oldName: "Shadows Over Loathing"
				},
				rewritePages: {
					Shadows_Over_Loathing_Wiki: "Wiki_of_Loathing"
				}
			}
		],
		{
			id: "uhctherenaissance",
			oldId: "uhc-the-renaissance",
			name: "Minecraft UHC: The Renaissance",
			official: true
		},
		{
			id: "unbeatable",
			name: "UNBEATABLE"
		},
		{
			id: "vtolvr",
			oldId: "vtol-vr",
			name: "VTOL VR",
			official: true
		},
		{
			id: "voidigo",
			name: "Voidigo"
		},
		{
			id: "wakfu",
			name: "Wakfu"
		},
		{
			id: "warcommander",
			name: "War Commander"
		},
		[
			{
				id: "warcraft",
				oldId: "wowpedia",
				name: "Warcraft",
				search: {
					oldName: "Wowpedia",
					newIncludesWiki: true
				}
			},
			{
				parentRef: "warcraft",
				oldId: "wowwiki-archive",
				search: {
					oldName: "WowWiki"
				}
			}
		],
		{
			id: "wautah",
			name: "Weird and Unfortunate Things Are Happening"
		},
		{
			id: "wildfire",
			name: "Wildfire"
		},
		{
			id: "wynncraft",
			name: "Wynncraft",
			official: true
		},
		{
			id: "willyousnail",
			name: "Will You Snail?",
			official: true
		},
		{
			id: "windowkill",
			name: "Windowkill",
			official: true
		},
		{
			id: "witchfire",
			name: "Witchfire"
		},
		{
			id: "wizardry",
			name: "Wizardry"
		},
		{
			id: "worship",
			oldId: "worshipcrg",
			name: "Worship"
		},
		{
			id: "worldofbabel",
			oldId: "world-of-babel",
			name: "World of Babel"
		},
		{
			id: "yohanebid",
			oldId: "yohane-deepblue",
			name: "Yohane the Parhelion -BLAZE in the DEEPBLUE-"
		},
		[
			{
				id: "yourchronicle",
				oldId: "your-chronicle",
				name: "Your Chronicle"
			},
			{
				parentRef: "yourchronicle",
				oldId: "anotherchronicle"
			}
		],
		{
			id: "worldofgrimm",
			name: "World of Grimm"
		},
		{
			id: "xformgames",
			oldId: "xform-games",
			name: "Xform Games"
		},
		{
			id: "yaoling",
			oldId: "yaoling-mythical-journey",
			name: "Yaoling Mythical Journey",
			official: true,
			search: {
				oldName: "Yaoling: Mythical Journey"
			}
		},
		{
			id: "yokaiwatch",
			name: "Yo-kai Watch"
		},
		{
			id: "zeldacraft",
			name: "Zeldacraft"
		}
	];

	/**
	 * @typedef {Object} SearchModuleSettings
	 * @property {'filter'|'rewrite'|'none'|'disarm'} mode
	 */


	/**
	 * @typedef {Object} ExtensionSettings
	 * @property {number} version
	 * @property {false|banner|true} isRedirectDisabled Whether Fandom sites should be redirected.
	 * @property {string[]} disabledWikis List of disabled wikis, by ID.
	 * @property {boolean} useTabRedirect Whether legacy redirection method should be used. Not implemented.
	 * @property {Record<string, SearchModuleSettings>} sfs Search filtering settings, per module.
	 * @property {'none'|'filter'|'rewrite'} searchMode [DEPRECATED] Search integration behaviour choice.
	 * @property {boolean} ddgEnable [DEPRECATED] Whether DuckDuckGo search integration should be enabled.
	 */


	/**
	 * Returns default extension settings.
	 *
	 * @return {ExtensionSettings}
	 */
	function createFreshSet() {
	    return {
	        version: 0,

	        isRedirectDisabled: false,
	        disabledWikis: [],

	        // Developer settings - subject to change
	        useTabRedirect: true,
	        useRuntimeLists: false,
	        rtListLastSyncTime: 0,
	        ffUseOptimisedSearchCore: false,

	        // Legacy search engine settings - this should be migrated and dropped in 1.7.0
	        searchMode: 'rewrite',
	        ddgEnable: true,

	        // Search filtering settings - this should match SearchFilterSettings.engines
	        sfs: {
	            google: {
	                mode: 'rewrite'
	            },
	            ddg: {
	                mode: 'rewrite'
	            }
	        },

	        // Runtime sites list
	        rtList: {
	            version: 0,
	            data: null,
	            hasAutoSyncConsent: false,
	            lastSyncTime: 0
	        }
	    };
	}


	createFreshSet.SHARED = Object.freeze( createFreshSet() );

	/** @type {( SiteListEntity | SiteListEntity[] )[]} */


	// TODO: ditch uiClass, have spacers contain entries instead so popup is able to render the list sanely.


	/**
	 * @typedef {Object} SiteRecord
	 * Record of an individual wiki.
	 * @property {string} id wiki.gg domain name.
	 * @property {string} [oldId] Fandom domain name, if different from wiki.gg.
	 * @property {string} name Site name shown in page titles.
	 * @property {boolean} [official=false] Whether official wiki.
	 * @property {undefined|'wiki-indent'} [uiClass]
	 * @property {SiteSearchSettings} [search]
	 */

	/**
	 * @typedef {Object} SiteSearchSettings
	 * Re-configures the search rewrite module if needed.
	 * @property {string} [oldName] Fandom site name shown in page titles.
	 */

	/**
	 * @typedef {Object} _DerivedSiteRecordExtension
	 * @property {string} parentRef wiki.gg domain name of another wiki record on the list.
	 * @property {string} oldId Fandom domain name.
	 */
	/**
	 * @typedef {SiteRecord & _DerivedSiteRecordExtension} DerivedSiteRecord
	 * Additional record of an individual wiki. This will not be shown in the UI, and should only be used to redirect more
	 * domains.
	 */

	/**
	 * @typedef {Object} SiteListSpacer
	 * Divides the wiki list in the settings UI, with a custom heading. Records that should be visually "grouped up" under
	 * this spacer should use the 'wiki-indent' UI class.
	 * @property {string} spacer Title.
	 */

	/**
	 * @typedef {SiteRecord|DerivedSiteRecord|SiteListSpacer} SiteListEntity
	 */

	/**
	 * @typedef {Object} SiteListUnpackOptions
	 * @property {boolean} [withSpacers=false] Whether spacers should be included.
	 * @property {boolean} [withVirtuals=false] Whether derived records should be included.
	 * @property {boolean} [compacted=true]
	 */


	/**
	 * Converts an unprocessed sites list to a shallow, single level, filtered array.
	 *
	 * @package
	 * @param {( SiteListEntity | SiteListEntity[] )[]} entities Unprocessed sites list.
	 * @param {SiteListUnpackOptions} options
	 * @return {SiteListEntity[]} Filtered, single level sites list.
	 */
	function _unpackSiteArray( entities, options ) {
	    options = options || {};

	    let out = [];
	    for ( const entity of entities ) {
	        // Skip the instructions at the top of the file
	        if ( '$README' in entity ) {
	            continue;
	        }

	        // Skip spacers if they have not been requested
	        if ( ( !options.withSpacers && 'spacer' in entity ) || ( !options.withVirtuals && 'parentRef' in entity ) ) {
	            continue;
	        }

	        // Recurse if an array, or append
	        if ( Array.isArray( entity ) ) {
	            const unpacked = _unpackSiteArray( entity, options );
	            if ( options.compacted ?? true ) {
	                out = out.concat( unpacked );
	            } else {
	                out.push( unpacked );
	            }
	        } else {
	            out.push( entity );
	        }
	    }

	    return out;
	}


	/**
	 * Processes raw sites list: converts into a shallow array, filters per settings, expands derived records.
	 *
	 * TODO: Use SiteListUnpackOptions.
	 *
	 * @public
	 * @param {boolean} [withSpacers=false]
	 * @param {boolean} [withVirtuals=false]
	 * @param {boolean} [compacted=true]
	 * @return {SiteListEntity[]}
	 */
	function getWikis( withSpacers, withVirtuals, compacted ) {
	    const out = _unpackSiteArray( sites, {
	        withSpacers,
	        withVirtuals,
	        compacted
	    } );

	    if ( withVirtuals ) {
	        for ( const entity of out ) {
	            // Resolve the parent reference for virtual entries (wiki alternative redirects). Copy properties that
	            // aren't specified.
	            // Additionally, this reference should be a string, which means it has not been resolved yet. The site list
	            // may be reused in memory.
	            if ( 'parentRef' in entity && typeof entity.parentRef === 'string' ) {
	                entity.parentRef = out.find( x => x.id === entity.parentRef );
	                entity.id = entity.parentRef.id;
	                entity.name = entity.parentRef.name;
	                entity.official = entity.parentRef.official;
	            }
	        }
	    }

	    return out;
	}


	/**
	 * Returns the extension's storage interface.
	 *
	 * TODO: Untyped return value.
	 *
	 * @deprecated since 20241011, use chrome.storage directly
	 * @return {any}
	 */
	function getNativeSettings() {
	    return chrome && chrome.storage || window.storage;
	}

	const Versions = {
	    FIRST_VERSIONED_AND_SFS: 2024_02_1_7_001
	};
	const LatestVersion = Versions.FIRST_VERSIONED_AND_SFS;


	function applyMigrations( data ) {
	    let wasModified = false;

	    if ( !data.version ) {
	        // Storage version has not been initialised yet, this is either a fresh install or pre-SFS
	        wasModified = true;
	        data.version = Versions.FIRST_VERSIONED_AND_SFS;

	        if ( 'ddgEnable' in data ) {
	            delete data.ddgEnable;
	        }

	        if ( 'searchMode' in data ) {
	            data.sfs = {
	                google: {
	                    mode: data.searchMode
	                },
	                ddg: {
	                    mode: data.searchMode
	                }
	            };
	            delete data.searchMode;
	        }
	    }

	    if ( wasModified ) {
	        data.version = LatestVersion;
	        chrome.storage.local.set( data );
	    }
	}

	getNativeSettings();
	    const wikis = getWikis( false, true );


	function _buildDomainRegex( template ) {
	    // eslint-disable-next-line security/detect-non-literal-regexp
	    return new RegExp( template.replace( '$domains', wikis.map( item => {
	        return item.oldId || item.id;
	    } ).join( '|' ) ), 'i' );
	}


	const RTW = {
	    DNR_RULE_ID: 1,

	    settings: createFreshSet(),
	    domainRegex: _buildDomainRegex( '^($domains)\\.(?:(?:fandom|gamepedia)\\.com|wikia\\.org)$' ),
	    intlDomainRegex: _buildDomainRegex( '^($domains)-([a-z]+)\\.(?:gamepedia)\\.com$' ),
	    oldToNumIdMap: ( () => {
	        const out = {};
	        for ( const [ index, wiki ] of Object.entries( wikis ) ) {
	            out[ wiki.oldId || wiki.id ] = index;
	        }
	        return out;
	    } )(),


	    updateIcon() {
	        const icon = {
	            path: ( this.settings.isRedirectDisabled ? '/icons/128_off.png' : '/icons/128.png' )
	        };
	        if ( chrome && chrome.action && chrome.action.setIcon ) {
	            chrome.action.setIcon( icon );
	        } else {
	            chrome.browserAction.setIcon( icon );
	        }
	    },


	    decideRedirect( info ) {
	        if ( this.settings.isRedirectDisabled ) {
	            return;
	        }

	        const url = new URL( info.url );

	        // Check if the URL matches our regex
	        // [0]: full host, [1]: old wiki ID, [2]?: language
	        const match = this.domainRegex.exec( url.host ) || this.intlDomainRegex.exec( url.host );
	        if ( !match ) {
	            return;
	        }

	        const oldWikiId = match[ 1 ];
	        // Map the old ID to an internal numeric one
	        const internalWikiId = this.oldToNumIdMap[ oldWikiId ];
	        if ( internalWikiId === undefined ) {
	            return;
	        }
	        const newWiki = wikis[ internalWikiId ];
	        // Check if redirect is disabled
	        if ( newWiki.bannerOnly || this.settings.disabledWikis.includes( newWiki.id ) ) {
	            return;
	        }
	        // Copy path
	        let newPath = url.pathname;
	        // Convert international Gamepedia URL format
	        if ( match.length >= 3 ) {
	            let languageCode = match[ 2 ];
	            if ( languageCode === 'ptbr' ) {
	                languageCode = 'pt-br';
	            }
	            newPath = `/${languageCode}${newPath}`;
	        }

	        // Redirect
	        chrome.tabs.update( info.tabId, {
	            url: `https://${newWiki.id}.wiki.gg${newPath}`
	        } );
	    },


	    _onBeforeNavigate( info ) {
	        RTW.decideRedirect( info );
	    },


	    updateMV3DynamicRuleSets() {
	        // TODO: unused for now
	        if ( !this.settings.useTabRedirect ) {
	            chrome.declarativeNetRequest.updateDynamicRules( {
	                addRules: [ {
	                    id: RTW.DNR_RULE_ID,
	                    action: {
	                        type: 'redirect',
	                        redirect: {
	                            regexSubstition: ''
	                        }
	                    },
	                    condition: {
	                        regexFilter: '',
	                        resourceTypes: [ 'main_frame' ]
	                    }
	                } ]
	            } );
	        }
	    },


	    updateEventHandlers() {
	        this.settings.useTabRedirect = true;

	        if ( this.settings.useTabRedirect ) {
	            chrome.webNavigation.onBeforeNavigate.addListener( this._onBeforeNavigate );
	            this._isTabRedirectInstalled = true;
	        } else if ( this._isTabRedirectInstalled ) {
	            chrome.webNavigation.onBeforeNavigate.removeListener( this._onBeforeNavigate );
	            this._isTabRedirectInstalled = false;
	        }
	    },


	    mergeStorageChunk( chunk ) {
	        const oldIRD = this.settings.isRedirectDisabled;
	        for ( const key in chunk ) {
	            this.settings[ key ] = chunk[ key ];
	        }
	        if ( this.settings.isRedirectDisabled !== oldIRD ) {
	            this.updateIcon();
	        }

	        this.updateEventHandlers();
	    },


	    mergeStorageDiffChunk( chunk ) {
	        const obj = {};
	        for ( const key in chunk ) {
	            obj[ key ] = chunk[ key ].newValue;
	        }
	        this.mergeStorageChunk( obj );
	    }
	};


	chrome.storage.onChanged.addListener( changes => RTW.mergeStorageDiffChunk( changes ) );
	chrome.storage.local.get( Object.keys( RTW.settings ), result => {
	    applyMigrations( result );
	    RTW.mergeStorageChunk( result );
	} );

	globalThis.RTW = RTW;

}));
