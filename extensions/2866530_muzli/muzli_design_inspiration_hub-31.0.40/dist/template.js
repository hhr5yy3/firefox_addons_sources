angular.module('muzli-template', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('modules/feed/feed.didna.html',
    '<div class="tile" didna-iframe>\n' +
    '    <a target=\'_blank\' class="feedLink" ng-class="{\'no-backfill\': !showBackfill}" ng-click="showBackfill ? promotionClick() : null">\n' +
    '        <div class="postPhoto" ng-class="{didna: !showBackfill}">\n' +
    '            <iframe ng-src="{{didnaUrl}}" id="{{row}}" width="300" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" aria-label="Advertisement" tabindex="0" allow="attribution-reporting"></iframe>\n' +
    '            <ng-container ng-if="showBackfill">\n' +
    '                <img ng-if="!backfill.image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" alt=""/>\n' +
    '                <img ng-if="backfill.image" ng-src="{{::backfill.image}}" alt=""/>\n' +
    '                <img class="beacon" style="visibility: hidden;" ng-src="{{backfill.beacon}}" ng-if="showPixel" alt=""/>\n' +
    '            </ng-container>\n' +
    '            <img class="beacon" style="visibility: hidden;" ng-src="{{beacon}}" ng-if="showPixel" alt=""/>\n' +
    '        </div>\n' +
    '        <div class="postInfo" ng-if="showBackfill">\n' +
    '            <h3>{{::backfill.name}}</h3>\n' +
    '        </div>\n' +
    '    </a>\n' +
    '    <div class="postMeta">\n' +
    '	\n' +
    '        <div class="details angular-animate">\n' +
    '\n' +
    '            <div class="post-menu">\n' +
    '\n' +
    '                <i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '                <ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '                    <li><a href="" ng-click="vm.showAdsDialog = true; item.showMenu = false;">Why I\'m seeing Ads?</a></li>\n' +
    '                    <li><a href="" ui-sref="all.referral" ng-click="item.showMenu = false">Hide all Ads on Muzli</a></li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '\n' +
    '            <h4>PROMOTED</h4>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>')
  $templateCache.put('modules/feed/feed.drv.carbon.html',
    '<div class="tile">\n' +
    '    <a target=\'_blank\' class="feedLink" ng-href="{{::carbonAd.link}}" ng-click="::promotionClick()">\n' +
    '        <div class="postPhoto">\n' +
    '\n' +
    '            <img ng-if="!carbonAd.image"\n' +
    '                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII="\n' +
    '                alt="" />\n' +
    '            <img ng-if="carbonAd.image" ng-src="{{::carbonAd.image}}" alt="" />\n' +
    '            <img class="beacon" style="visibility: hidden;" ng-src="{{::carbonAd.beacon}}" ng-if="showAdPixel"\n' +
    '                alt="" />\n' +
    '            <img ng-repeat="pixel in carbonAd.pixels" ng-src="{{::pixel}}" style="display:none;" height="0" width="0" />\n' +
    '\n' +
    '            <ng-container ng-if="showBackfill">\n' +
    '                <img ng-if="!carbonAd.image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" alt=""/>\n' +
    '                <img ng-if="carbonAd.image" ng-src="{{::carbonAd.image}}" alt=""/>\n' +
    '                <img class="beacon" style="visibility: hidden;" ng-src="{{carbonAd.beacon}}" ng-if="showPixel" alt=""/>\n' +
    '            </ng-container>\n' +
    '        </div>\n' +
    '        <div class="postInfo">\n' +
    '            <h3>{{::carbonAd.name}}</h3>\n' +
    '        </div>\n' +
    '    </a>\n' +
    '    <div class="postMeta">\n' +
    '        <div class="details angular-animate">\n' +
    '            <div class="post-menu">\n' +
    '                <i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '                <ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '                    <li><a href="" ng-click="vm.showAdsDialog = true; item.showMenu = false;">Why I\'m seeing Ads?</a></li>\n' +
    '                    <li><a href="" ui-sref="all.referral" ng-click="item.showMenu = false">Hide all Ads on Muzli</a></li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <h4>{{carbonAd.channel === \'sponsored\' ? \'PROMOTED\' : \'AD BY CARBON\'}}</h4>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>')
  $templateCache.put('modules/feed/feed.drv.colors.html',
    '<section id="feed" class="palettes">\n' +
    '\n' +
    '<ul\n' +
    '	infinite-scroll=\'::loadMore()\'\n' +
    '	infinite-scroll-distance=\'::infiniteScrollDistance\'\n' +
    '	infinite-scroll-immediate-check=\'false\'\n' +
    '	infinite-scroll-disabled=\'!feed.length\'>\n' +
    '\n' +
    '	<li ng-repeat="item in feed track by (item.id || item.link)"\n' +
    '	ng-class="::{\n' +
    '		article: item.source.article && !item.video,\n' +
    '		visited: item.visited,\n' +
    '		hasStats: item.hasStats, pick: item.pick,\n' +
    '		feedSuggest: !!item.promotion,\n' +
    '		fallbackImage: item.fallbackImage,\n' +
    '		showSharePromo: item.displaySharePromo,\n' +
    '		outside: item.isOutside,\n' +
    '		showMenu: item.showMenu,\n' +
    '		}"\n' +
    '	class="angular-animate"\n' +
    '	data-muzli-id="{{::item.id}}">\n' +
    '\n' +
    '		<div class="tile">\n' +
    '\n' +
    '			<div class="feedLink">\n' +
    '\n' +
    '				<span class="icon-image" ng-click="item.showPhoto = !item.showPhoto"></span>\n' +
    '\n' +
    '				<div class="postPhoto">\n' +
    '					<div class="palette" style="background: {{item.palette[item.palette.length - 1]}}" ng-class="{hidden: item.showPhoto}">\n' +
    '						<span ng-repeat="color in item.palette track by $index"\n' +
    '							style="background: {{color}}"\n' +
    '							title-top="true"\n' +
    '							click-copy-color="{{::color}}"\n' +
    '							brightness="{{::color}}"\n' +
    '							prevent-click>\n' +
    '							{{color}}\n' +
    '						</span>\n' +
    '					</div>\n' +
    '					<a class="wrapper" ng-mousedown="::postClick(item, $event)" target="_blank" ng-href="{{::item.link_out}}">\n' +
    '						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '					</a>\n' +
    '				</div>\n' +
    '\n' +
    '				<div class="postInfo">\n' +
    '					<div class="download" title="Download palette (SVG)" ng-click="downloadSVG(item, $event)">Download</div>\n' +
    '				</div>\n' +
    '\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="postMeta">\n' +
    '\n' +
    '				<div class="details angular-animate">\n' +
    '\n' +
    '					<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '\n' +
    '					<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '\n' +
    '						<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '						<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '							<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '							<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '							<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '						</ul>\n' +
    '					</div>\n' +
    '\n' +
    '					<div class="stats pull-right">\n' +
    '\n' +
    '						<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '							<span class="icon-chat"></span>\n' +
    '						</span>\n' +
    '\n' +
    '						<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '							<span class="icon-ph"></span>\n' +
    '							<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '\n' +
    '						<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '							<span class="icon-view"></span>\n' +
    '							<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '						<span title="Shares" title-top="true">\n' +
    '							<span class="icon-share"></span>\n' +
    '							<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '	                </div>\n' +
    '\n' +
    '	            </div>\n' +
    '\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '	</li>\n' +
    '</ul>\n' +
    '\n' +
    '<div ng-show="feed && !feed.length && !blockEmpty && !isRendering" ng-transclude="no-data">\n' +
    '</div>\n' +
    '\n' +
    '<ul class="dummy" ng-show="!feed" ng-hide="hideGhost">\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '</ul>\n' +
    '\n' +
    '</section>\n' +
    '')
  $templateCache.put('modules/feed/feed.drv.favorites.html',
    '<section id="feed" class="palettes"><!-- Feed posts -->\n' +
    '\n' +
    '<ul\n' +
    '	infinite-scroll=\'::loadMore()\'\n' +
    '	infinite-scroll-distance=\'::infiniteScrollDistance\'\n' +
    '	infinite-scroll-immediate-check=\'false\'\n' +
    '	infinite-scroll-disabled=\'!feed.length\'>\n' +
    '\n' +
    '	<li ng-repeat="item in feed track by (item.id || item.link)"\n' +
    '	ng-class="::{\n' +
    '		article: item.source.article && !item.video,\n' +
    '		visited: item.visited,\n' +
    '		viral: !!item.viralTimes,\n' +
    '		hasStats: item.hasStats, pick: item.pick,\n' +
    '		animated: item.animated || item.webm,\n' +
    '		\'inline-video\': !!item.htmlVideo,\n' +
    '		video: !!item.video,\n' +
    '		playing: item.playing,\n' +
    '		vlog: !!item.sub_source,\n' +
    '		nsfw: !!item.nsfw || !!item.userNSFW,\n' +
    '		feedSuggest: !!item.promotion,\n' +
    '		fallbackImage: item.fallbackImage,\n' +
    '		showSharePromo: item.displaySharePromo,\n' +
    '		outside: item.isOutside,\n' +
    '		showMenu: item.showMenu,\n' +
    '		}"\n' +
    '	class="angular-animate"\n' +
    '	data-muzli-id="{{::item.id}}">\n' +
    '\n' +
    '		<!-- Color items -->\n' +
    '		<div class="tile" ng-if="::item.source.name === \'colors\'">\n' +
    '\n' +
    '			<div class="feedLink">\n' +
    '\n' +
    '				<span class="icon-image" ng-if="item.image" ng-click="item.showPhoto = !item.showPhoto"></span>\n' +
    '\n' +
    '				<div class="postPhoto">\n' +
    '					<div class="palette" style="background: {{item.palette[item.palette.length - 1]}}" ng-class="{hidden: item.showPhoto}">\n' +
    '						<span ng-repeat="color in item.palette track by $index"\n' +
    '							style="background: {{color}}"\n' +
    '							title-top="true"\n' +
    '							click-copy-color="{{::color}}"\n' +
    '							brightness="{{::color}}"\n' +
    '							prevent-click>\n' +
    '							{{color}}\n' +
    '						</span>\n' +
    '					</div>\n' +
    '					<a class="wrapper" ng-mousedown="::postClick(item, $event)" target="_blank" ng-href="{{::item.link_out}}">\n' +
    '						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '					</a>\n' +
    '				</div>\n' +
    '\n' +
    '				<div class="postInfo">\n' +
    '					<div class="download" title="Download palette (SVG)" ng-click="downloadSVG(item, $event)">Download</div>\n' +
    '				</div>\n' +
    '\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="postMeta">\n' +
    '\n' +
    '				<div class="details angular-animate">\n' +
    '\n' +
    '					<span class="remove" ng-click="::removeFavorite($event, $index, item)" title="Remove" title-top="true"></span>\n' +
    '\n' +
    '					<div class="stats pull-right">\n' +
    '\n' +
    '						<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '							<span class="icon-chat"></span>\n' +
    '						</span>\n' +
    '\n' +
    '						<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '							<span class="icon-ph"></span>\n' +
    '							<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '\n' +
    '						<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '							<span class="icon-view"></span>\n' +
    '							<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '						<span title="Shares" title-top="true">\n' +
    '							<span class="icon-share"></span>\n' +
    '							<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '	                </div>\n' +
    '\n' +
    '	            </div>\n' +
    '\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '		<!-- Simple items -->\n' +
    '		<div class="tile" ng-if="::item.source.name !== \'colors\'">\n' +
    '\n' +
    '			<a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)">\n' +
    '\n' +
    '				<div class="postPhoto" >\n' +
    '\n' +
    '					<i ng-if="item.nsfw || item.userNSFW">NSFW</i>\n' +
    '\n' +
    '					<img ng-if="::!item.video" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '\n' +
    '					<video ng-if="::item.htmlVideo" ng-src="{{::item.htmlVideo}}" video-loader playsinline loop autoplay muted></video>\n' +
    '\n' +
    '					<div class="share">\n' +
    '						<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook" title-top="true"></span>\n' +
    '						<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter" title-top="true"></span>\n' +
    '						<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn" title-top="true"></span>\n' +
    '						<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack" title-bottom="true"></span>\n' +
    '					</div>\n' +
    '\n' +
    '					<muzli-video ng-if="::item.video" ng-click="::videoClick(item, $event)"></muzli-video>\n' +
    '\n' +
    '					<div class="share-promo" ng-if="item.displaySharePromo">\n' +
    '						<div class="sharers">\n' +
    '							<h4>Nice! Maybe your friends will also enjoy this?</h4>\n' +
    '							<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook"></span>\n' +
    '							<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter"></span>\n' +
    '							<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn"></span>\n' +
    '							<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack"></span>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '\n' +
    '					<span class="badge"></span>\n' +
    '				</div>\n' +
    '\n' +
    '				<div class="postInfo">\n' +
    '					\n' +
    '					<div class="source-wrapper">\n' +
    '						<span class="source" title="{{::item.tooltip}}"\n' +
    '							ui-sref="feed(::{ name: item.source.name })"\n' +
    '							ng-click="::sourceClick($event, item.source.name)">\n' +
    '								<img ng-src="{{::item.source.icon}}" alt="{{::item.source.title}}">\n' +
    '						</span>\n' +
    '\n' +
    '						<span class="source" title="All work by {{::item.user.displayName}}" ng-if="item.user"\n' +
    '							ui-sref="feed(::{ name: \'user\', user: item.user, skipSponsored: true})"\n' +
    '							ng-click="::sourceClick($event, item.user.id)">\n' +
    '								<img ng-if="!item.user.monogram" ng-src="{{::item.user.photo}}" alt="{{::item.user.displayName}}" use-monogram="item.user">\n' +
    '								<span ng-if="item.user.monogram">{{item.user.monogram}}</span>\n' +
    '						</span>\n' +
    '					</div>\n' +
    '\n' +
    '					<div class="palette" ng-if="::item.palette && !item.source.article && enablePalettes">\n' +
    '\n' +
    '						<div ng-click="downloadSVG(item, $event)" class="icon-download"></div>\n' +
    '\n' +
    '						<span ng-repeat="color in item.palette track by $index"\n' +
    '							style="background: {{color}}; border-color: {{color}}"\n' +
    '							title="{{copySuccess ? \'Copied\' : color}}"\n' +
    '							title-top="true"\n' +
    '							click-copy-color="{{::color}}"\n' +
    '							prevent-click>\n' +
    '						</span>\n' +
    '					</div>\n' +
    '\n' +
    '					<h3 ng-bind="::item.title"></h3>\n' +
    '					<span class="created">{{item.created | timeAgo}}</span>\n' +
    '				</div>\n' +
    '			</a>\n' +
    '\n' +
    '			<div class="postMeta">\n' +
    '\n' +
    '				<div class="details angular-animate">\n' +
    '\n' +
    '					<span class="remove" ng-click="::removeFavorite($event, $index, item)" title="Remove" title-top="true"></span>\n' +
    '\n' +
    '					<div class="stats pull-right">\n' +
    '\n' +
    '						<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '							<span class="icon-chat"></span>\n' +
    '						</span>\n' +
    '\n' +
    '						<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '							<span class="icon-ph"></span>\n' +
    '							<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '\n' +
    '						<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '							<span class="icon-view"></span>\n' +
    '							<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '						<span title="Shares" title-top="true">\n' +
    '							<span class="icon-share"></span>\n' +
    '							<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '						</span>\n' +
    '	                </div>\n' +
    '\n' +
    '	            </div>\n' +
    '\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '	</li>\n' +
    '</ul>\n' +
    '\n' +
    '<div ng-show="feed && !feed.length && !blockEmpty && !isRendering" ng-transclude="no-data">\n' +
    '</div>\n' +
    '\n' +
    '<ul class="ghost" ng-hide="hideGhost" >\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '	<li></li>\n' +
    '</ul>\n' +
    '\n' +
    '</section>\n' +
    '')
  $templateCache.put('modules/feed/feed.drv.html',
    '<section id="feed">\n' +
    '\n' +
    '	<ul\n' +
    '		infinite-scroll=\'::loadMore()\'\n' +
    '		infinite-scroll-distance=\'::infiniteScrollDistance\'\n' +
    '		infinite-scroll-immediate-check=\'false\'\n' +
    '		infinite-scroll-disabled=\'!feed.length\'>\n' +
    '\n' +
    '		<li ng-if="jobs.length" class="jobs-card" ng-class="{showMenu: jobsCard.showMenu}">\n' +
    '			<div class="jobs-card-container" jobs-observer>\n' +
    '				<div class="jobs-card-header">\n' +
    '					<h2>Design Jobs</h2>\n' +
    '				</div>\n' +
    '				<a ng-repeat="item in jobs track by item.id" ng-mousedown="::postClick(item, $event, \'jobs-card\')" target="_blank" ng-href="{{::item.link_out}}">\n' +
    '					<div class="job-thumbnail">\n' +
    '						<img ng-if="::item.image" ng-src="{{::item.image}}" hide-on-error/>\n' +
    '						<div ng-if="::!item.image" class="logo-placeholder">{{item.company[0]}}</div>\n' +
    '					</div>\n' +
    '					<div class="job-info">\n' +
    '						<h3 ng-bind="::item.title"></h3>\n' +
    '						<h4>{{item.company}}</h4>\n' +
    '						<div class="job-info">{{::item.location}}{{::item.type ? \' | \' + item.type : \'\'}}</div>\n' +
    '					</div>\n' +
    '				</a>\n' +
    '			</div>\n' +
    '			<div class="jobs-card-footer">\n' +
    '				<a ui-sref="jobs" ng-click="jobsCard.goToJobs($event)">All positions</a>\n' +
    '				<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '		\n' +
    '					<i class="icon-menu" title="More options" title-top="true" ng-click="jobsCard.showMenu = !jobsCard.showMenu"></i>\n' +
    '	\n' +
    '					<ul class="dropdown" ng-if="jobsCard.showMenu" click-outside="jobsCard.showMenu = false">\n' +
    '						<li><a href="" ng-click="::jobsCard.hideJobs($event)">Hide Jobs from My feed</a></li>\n' +
    '					</ul>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '\n' +
    '		<li class="sponsored show" ng-if="feed.length && sponsored && !hideSponsored">\n' +
    '			<div class="tile">\n' +
    '				<a target=\'_blank\' class="feedLink" ng-href="{{::sponsored.link}}" ng-click="::promotionClick()">\n' +
    '					<div class="postPhoto">\n' +
    '						<img ng-if="!sponsored.image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" alt=""/>\n' +
    '						<img ng-if="sponsored.image" ng-src="{{::sponsored.image}}" alt=""/>\n' +
    '						<img class="beacon" style="visibility: hidden;" ng-src="{{::sponsored.beacon}}" ng-if="showAdPixel" alt=""/>\n' +
    '					</div>\n' +
    '					<div class="postInfo">\n' +
    '						<h3>{{::sponsored.name}}</h3>\n' +
    '					</div>\n' +
    '					<h4>PROMOTED</h4>\n' +
    '				</a>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '\n' +
    '		<li \n' +
    '			ng-include="\'modules/feed/feed.didna.html\'" \n' +
    '			class="sponsored external show" \n' +
    '			ng-class="{showMenu: item.showMenu}"\n' +
    '			ng-if="feed.length && didnaRows && !user.areAdsDisabled"\n' +
    '			ng-repeat="row in didnaRows track by $index"\n' +
    '			style="grid-row: {{row}}"\n' +
    '		></li>\n' +
    '		\n' +
    '		<li class="sponsored external show" ng-if="feed.length && !skipSponsored" ng-class="{showMenu: item.showMenu}" carbon-ad></li>\n' +
    '\n' +
    '		<li class="shorts-feed" ng-if="feed.length && enableShorts" shorts-feed></li>\n' +
    '\n' +
    '		<li ng-repeat="item in feed track by (item.id || item.link)"\n' +
    '		ng-class="::{\n' +
    '			article: item.source.article && !item.video,\n' +
    '			visited: item.visited,\n' +
    '			viral: !!item.viralTimes,\n' +
    '			hasStats: item.hasStats, pick: item.pick,\n' +
    '			animated: item.animated || item.webm,\n' +
    '			\'inline-video\': !!item.htmlVideo,\n' +
    '			video: !!item.video,\n' +
    '			playing: item.playing,\n' +
    '			vlog: !!item.sub_source,\n' +
    '			nsfw: !!item.nsfw || !!item.userNSFW,\n' +
    '			feedSuggest: !!item.promotion,\n' +
    '			fallbackImage: item.fallbackImage,\n' +
    '			showSharePromo: item.displaySharePromo,\n' +
    '			outside: item.isOutside,\n' +
    '			showMenu: item.showMenu,\n' +
    '			curated: item.isCurated,\n' +
    '			}"\n' +
    '		class="angular-animate"\n' +
    '		data-muzli-id="{{::item.id}}">\n' +
    '		\n' +
    '			<ng-container ng-switch="::item.source.name">\n' +
    '	\n' +
    '				<!-- Color items -->\n' +
    '				<div class="tile color" ng-switch-when="colors">\n' +
    '	\n' +
    '					<div class="feedLink">\n' +
    '	\n' +
    '						<span class="icon-image" ng-if="item.image" ng-click="item.showPhoto = !item.showPhoto"></span>\n' +
    '	\n' +
    '						<div class="postPhoto">\n' +
    '							<div class="palette" style="background: {{item.palette[item.palette.length - 1]}}" ng-class="{hidden: item.showPhoto}">\n' +
    '								<span ng-repeat="color in item.palette track by $index"\n' +
    '									style="background: {{color}}"\n' +
    '									title-top="true"\n' +
    '									click-copy-color="{{::color}}"\n' +
    '									brightness="{{::color}}"\n' +
    '									prevent-click>\n' +
    '									{{color}}\n' +
    '								</span>\n' +
    '							</div>\n' +
    '							<a class="wrapper" ng-mousedown="::postClick(item, $event)" target="_blank" ng-href="{{::item.link_out}}">\n' +
    '								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '							</a>\n' +
    '						</div>\n' +
    '	\n' +
    '						<div class="postInfo">\n' +
    '							<div class="download" title="Download palette (SVG)" ng-click="downloadSVG(item, $event)">Download</div>\n' +
    '						</div>\n' +
    '	\n' +
    '					</div>\n' +
    '	\n' +
    '					<div class="postMeta">\n' +
    '	\n' +
    '						<div class="details angular-animate">\n' +
    '	\n' +
    '							<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '	\n' +
    '							<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '	\n' +
    '								<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '	\n' +
    '								<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '									<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '									<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '									<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '									<li><a href="" ng-click="::demoteSource(item.source)">Hide all content from <strong>{{::item.source.title}}</strong></a></li>\n' +
    '								</ul>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="stats pull-right">\n' +
    '	\n' +
    '								<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '									<span class="icon-chat"></span>\n' +
    '								</span>\n' +
    '	\n' +
    '								<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '									<span class="icon-ph"></span>\n' +
    '									<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '	\n' +
    '								<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '									<span class="icon-view"></span>\n' +
    '									<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '								<span title="Shares" title-top="true">\n' +
    '									<span class="icon-share"></span>\n' +
    '									<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '							</div>\n' +
    '	\n' +
    '						</div>\n' +
    '	\n' +
    '					</div>\n' +
    '				</div>\n' +
    '	\n' +
    '				<!-- Jobs items -->\n' +
    '				<div class="tile jobs-tile" ng-switch-when="jobs">\n' +
    '	\n' +
    '					<a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)">\n' +
    '	\n' +
    '						<div class="postPhoto" >\n' +
    '	\n' +
    '							<div class="job-thumbnail">\n' +
    '								<div class="company">\n' +
    '									<img ng-if="::item.image" hide-on-error ng-src="{{::item.image}}" />\n' +
    '									<div ng-if="::!item.image" class="logo-placeholder">{{item.company[0]}}</div>\n' +
    '									<h4>{{item.company}}</h4>\n' +
    '								</div>\n' +
    '								<h3 ng-bind="::item.title"></h3>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="share">\n' +
    '								<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook" title-top="true"></span>\n' +
    '								<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter" title-top="true"></span>\n' +
    '								<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn" title-top="true"></span>\n' +
    '								<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack" title-bottom="true"></span>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="share-promo" ng-if="item.displaySharePromo">\n' +
    '								<div class="sharers">\n' +
    '									<h4>Nice! Maybe your friends will also enjoy this?</h4>\n' +
    '									<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook"></span>\n' +
    '									<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter"></span>\n' +
    '									<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn"></span>\n' +
    '									<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack"></span>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '	\n' +
    '							<span class="badge"></span>\n' +
    '	\n' +
    '						</div>\n' +
    '	\n' +
    '						<div class="postInfo">\n' +
    '							<div class="job-info">\n' +
    '								<span>{{::item.type}}</span>\n' +
    '								<br/>\n' +
    '								<span>{{::item.location}}</span>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '					</a>\n' +
    '	\n' +
    '					<div class="postMeta">\n' +
    '	\n' +
    '						<div class="details angular-animate">\n' +
    '	\n' +
    '							<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '	\n' +
    '							<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '	\n' +
    '								<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '	\n' +
    '								<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '									<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '									<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '									<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '									<li><a href="" ng-click="::demoteSource(item.source)">Hide all content from <strong>{{::item.source.title}}</strong></a></li>\n' +
    '								</ul>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="stats pull-right">\n' +
    '	\n' +
    '								<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '									<span class="icon-chat"></span>\n' +
    '								</span>\n' +
    '	\n' +
    '								<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '									<span class="icon-ph"></span>\n' +
    '									<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '	\n' +
    '								<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '									<span class="icon-view"></span>\n' +
    '									<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '								<span title="Shares" title-top="true">\n' +
    '									<span class="icon-share"></span>\n' +
    '									<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '							</div>\n' +
    '	\n' +
    '						</div>\n' +
    '	\n' +
    '					</div>\n' +
    '				</div>\n' +
    '\n' +
    '				<!-- Simple items -->\n' +
    '				<div class="tile" ng-switch-default>\n' +
    '	\n' +
    '					<a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)">\n' +
    '	\n' +
    '						<div class="postPhoto" >\n' +
    '	\n' +
    '							<i ng-if="item.nsfw || item.userNSFW">NSFW</i>\n' +
    '	\n' +
    '							<img ng-if="::!item.video" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '	\n' +
    '							<video ng-if="::item.htmlVideo" ng-src="{{::item.htmlVideo}}" video-loader playsinline autoplay loop muted></video>\n' +
    '	\n' +
    '							<muzli-video ng-if="::item.video" ng-click="::videoClick(item, $event)"></muzli-video>\n' +
    '	\n' +
    '							<div class="share">\n' +
    '								<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook" title-top="true"></span>\n' +
    '								<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter" title-top="true"></span>\n' +
    '								<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn" title-top="true"></span>\n' +
    '								<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack" title-bottom="true"></span>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="share-promo" ng-if="item.displaySharePromo">\n' +
    '								<div class="sharers">\n' +
    '									<h4>Nice! Maybe your friends will also enjoy this?</h4>\n' +
    '									<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook"></span>\n' +
    '									<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter"></span>\n' +
    '									<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn"></span>\n' +
    '									<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack"></span>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '	\n' +
    '							<span class="badge"></span>\n' +
    '	\n' +
    '						</div>\n' +
    '	\n' +
    '						<div class="postInfo">\n' +
    '\n' +
    '							<div class="source-wrapper">\n' +
    '								<span class="source" title="{{::item.tooltip}}"\n' +
    '									ui-sref="feed(::{ name: item.source.name })"\n' +
    '									ng-click="::sourceClick($event, item.source.name)">\n' +
    '										<img ng-src="{{::item.source.icon}}" alt="{{::item.source.title}}">\n' +
    '								</span>\n' +
    '\n' +
    '								<span class="source" title="All work by {{::item.user.displayName}}" ng-if="item.user"\n' +
    '									ui-sref="feed(::{ name: \'user\', user: item.user, skipSponsored: true})"\n' +
    '									ng-click="::sourceClick($event, item.user.id)">\n' +
    '										<img ng-if="!item.user.monogram" ng-src="{{::item.user.photo}}" alt="{{::item.user.displayName}}" use-monogram="item.user">\n' +
    '										<span ng-if="item.user.monogram">{{item.user.monogram}}</span>\n' +
    '								</span>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="palette" ng-if="::item.palette && !item.source.article && enablePalettes">\n' +
    '	\n' +
    '								<div ng-click="downloadSVG(item, $event)" class="icon-download" title="Download palette (SVG)"></div>\n' +
    '	\n' +
    '								<span ng-repeat="color in item.palette track by $index"\n' +
    '									style="background: {{color}}; border-color: {{color}}"\n' +
    '									title="{{copySuccess ? \'Copied\' : color}}"\n' +
    '									title-top="true"\n' +
    '									click-copy-color="{{::color}}"\n' +
    '									prevent-click>\n' +
    '								</span>\n' +
    '							</div>\n' +
    '	\n' +
    '							<h3 ng-bind="::item.title"></h3>\n' +
    '	\n' +
    '							<span class="created" ng-if="item.source.name !== \'store\'">{{item.created | timeAgo}}</span>\n' +
    '	\n' +
    '							<div class="store" ng-if="item.source.name === \'store\'">\n' +
    '								<span class="tag" ng-repeat="tag in ::item.tags" ng-click="::searchTag(tag, $event)">{{tag}}</span>\n' +
    '								<div class="price">{{item.price | price}}</div>\n' +
    '							</div>\n' +
    '	\n' +
    '						</div>\n' +
    '					</a>\n' +
    '	\n' +
    '					<div class="postMeta">\n' +
    '	\n' +
    '						<div class="details angular-animate">\n' +
    '	\n' +
    '							<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '	\n' +
    '							<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '	\n' +
    '								<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '	\n' +
    '								<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '									<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '									<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '									<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '									<li><a href="" ng-click="::demoteSource(item.source)">Hide all content from <strong>{{::item.source.title}}</strong></a></li>\n' +
    '								</ul>\n' +
    '							</div>\n' +
    '	\n' +
    '							<div class="stats pull-right">\n' +
    '	\n' +
    '								<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '									<span class="icon-chat"></span>\n' +
    '								</span>\n' +
    '	\n' +
    '								<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '									<span class="icon-ph"></span>\n' +
    '									<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '	\n' +
    '								<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '									<span class="icon-view"></span>\n' +
    '									<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '								<span title="Shares" title-top="true">\n' +
    '									<span class="icon-share"></span>\n' +
    '									<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '								</span>\n' +
    '							</div>\n' +
    '	\n' +
    '						</div>\n' +
    '	\n' +
    '					</div>\n' +
    '				</div>\n' +
    '\n' +
    '			</ng-container>\n' +
    '\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '\n' +
    '	<ul class="ghost" ng-hide="hideGhost">\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '	</ul>\n' +
    '\n' +
    '	<div ng-show="feed && !feed.length && !blockEmpty && !isRendering" ng-transclude="no-data">\n' +
    '	</div>\n' +
    '\n' +
    '</section>\n' +
    '')
  $templateCache.put('modules/feed/feed.drv.jobs.html',
    '<section id="feed">\n' +
    '\n' +
    '	<ul\n' +
    '		infinite-scroll=\'::loadMore()\'\n' +
    '		infinite-scroll-distance=\'::infiniteScrollDistance\'\n' +
    '		infinite-scroll-immediate-check=\'false\'\n' +
    '		infinite-scroll-disabled=\'!feed.length\'>\n' +
    '\n' +
    '		<li ng-repeat="item in feed track by (item.id || item.link)"\n' +
    '		ng-class="::{\n' +
    '			visited: item.visited,\n' +
    '			hasStats: item.hasStats, pick: item.pick,\n' +
    '			feedSuggest: !!item.promotion,\n' +
    '			fallbackImage: item.fallbackImage,\n' +
    '			showSharePromo: item.displaySharePromo,\n' +
    '			outside: item.isOutside,\n' +
    '			showMenu: item.showMenu,\n' +
    '			}"\n' +
    '		class="angular-animate"\n' +
    '		data-muzli-id="{{::item.id}}">\n' +
    '\n' +
    '			<div class="tile jobs-tile">\n' +
    '\n' +
    '				<a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)">\n' +
    '\n' +
    '					<div class="postPhoto" >\n' +
    '\n' +
    '						<div class="job-thumbnail">\n' +
    '							<div class="company">\n' +
    '								<img ng-if="::item.image" hide-on-error ng-src="{{::item.image}}" />\n' +
    '								<div ng-if="::!item.image" class="logo-placeholder">{{item.company[0]}}</div>\n' +
    '								<h4>{{item.company}}</h4>\n' +
    '							</div>\n' +
    '							<h3 ng-bind="::item.title"></h3>\n' +
    '						</div>\n' +
    '\n' +
    '						<div class="share">\n' +
    '							<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook" title-top="true"></span>\n' +
    '							<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter" title-top="true"></span>\n' +
    '							<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn" title-top="true"></span>\n' +
    '							<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack" title-bottom="true"></span>\n' +
    '						</div>\n' +
    '\n' +
    '						<div class="share-promo" ng-if="item.displaySharePromo">\n' +
    '							<div class="sharers">\n' +
    '								<h4>Nice! Maybe your friends will also enjoy this?</h4>\n' +
    '								<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook"></span>\n' +
    '								<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter"></span>\n' +
    '								<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn"></span>\n' +
    '								<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack"></span>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '\n' +
    '						<span class="badge"></span>\n' +
    '\n' +
    '					</div>\n' +
    '\n' +
    '					<div class="postInfo">\n' +
    '						<div class="job-info">\n' +
    '							<span>{{::item.type}}</span>\n' +
    '							<br/>\n' +
    '							<span>{{::item.location}}</span>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</a>\n' +
    '\n' +
    '				<div class="postMeta">\n' +
    '\n' +
    '					<div class="details angular-animate">\n' +
    '\n' +
    '						<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '\n' +
    '						<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '\n' +
    '							<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '							<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '								<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '								<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '								<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '								<li><a href="" ng-click="::demoteSource(item.source)">Hide all content from <strong>{{::item.source.title}}</strong></a></li>\n' +
    '							</ul>\n' +
    '						</div>\n' +
    '\n' +
    '						<div class="stats pull-right">\n' +
    '\n' +
    '							<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '								<span class="icon-chat"></span>\n' +
    '							</span>\n' +
    '\n' +
    '							<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '								<span class="icon-ph"></span>\n' +
    '								<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '							</span>\n' +
    '\n' +
    '							<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '								<span class="icon-view"></span>\n' +
    '								<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '							</span>\n' +
    '							<span title="Shares" title-top="true">\n' +
    '								<span class="icon-share"></span>\n' +
    '								<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '							</span>\n' +
    '		                </div>\n' +
    '\n' +
    '		            </div>\n' +
    '\n' +
    '				</div>\n' +
    '			</div>\n' +
    '\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '\n' +
    '	<ul class="ghost" ng-hide="hideGhost">\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '	</ul>\n' +
    '\n' +
    '	<div ng-show="feed && !feed.length && !blockEmpty && !isRendering" ng-transclude="no-data">\n' +
    '	</div>\n' +
    '\n' +
    '</section>\n' +
    '')
  $templateCache.put('modules/feed/feed.drv.live.html',
    '<section id="feed" class="live">\n' +
    '\n' +
    '<ul\n' +
    '	infinite-scroll=\'::loadMore()\'\n' +
    '	infinite-scroll-distance=\'::infiniteScrollDistance\'\n' +
    '	infinite-scroll-immediate-check=\'false\'\n' +
    '	infinite-scroll-disabled=\'!feed.length\'>\n' +
    '\n' +
    '	<li ng-repeat="item in feed track by (item.id || item.link)"\n' +
    '	ng-class="::{\n' +
    '		article: item.source.article && !item.video,\n' +
    '		visited: item.visited,\n' +
    '		viral: !!item.viralTimes,\n' +
    '		hasStats: item.hasStats, pick: item.pick,\n' +
    '		animated: item.animated || item.webm,\n' +
    '		\'inline-video\': !!item.htmlVideo,\n' +
    '		video: !!item.video,\n' +
    '		playing: item.playing,\n' +
    '		vlog: !!item.sub_source,\n' +
    '		nsfw: !!item.nsfw || !!item.userNSFW,\n' +
    '		feedSuggest: !!item.promotion,\n' +
    '		fallbackImage: item.fallbackImage,\n' +
    '		outside: item.isOutside,\n' +
    '		showMenu: item.showMenu,\n' +
    '		}"\n' +
    '	class="angular-animate"\n' +
    '	data-muzli-id="{{::item.id}}">\n' +
    '	\n' +
    '		<div class="tile">\n' +
    '\n' +
    '			<a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)">\n' +
    '\n' +
    '				<div class="postPhoto" >\n' +
    '\n' +
    '					<i ng-if="item.nsfw || item.userNSFW">NSFW</i>\n' +
    '\n' +
    '					<img ng-if="::!item.video" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '\n' +
    '					<video ng-if="::item.htmlVideo" ng-src="{{::item.htmlVideo}}" video-loader playsinline autoplay loop muted></video>\n' +
    '\n' +
    '					<muzli-video ng-if="::item.video" ng-click="::videoClick(item, $event)"></muzli-video>\n' +
    '\n' +
    '					<span class="badge"></span>\n' +
    '\n' +
    '				</div>\n' +
    '\n' +
    '				<div class="postInfo">\n' +
    '\n' +
    '					<h3 ng-bind="::item.title"></h3>\n' +
    '					\n' +
    '					<span class="source">{{::item.domainName}}</span>\n' +
    '					<span class="created">{{item.created | timeAgo}}</span>\n' +
    '				</div>\n' +
    '				\n' +
    '				<div class="postStats">\n' +
    '					<div class="flex-container">\n' +
    '						<i class="icon-trend" ng-if="::item.clicks >= item.clicksPreviuos"></i>\n' +
    '						<i class="icon-trend down" ng-if="::item.clicks < item.clicksPreviuos"></i>\n' +
    '						<div class="now">{{::item.clicks || 0}}</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '\n' +
    '			</a>\n' +
    '\n' +
    '			<div class="postMeta" ng-class="{active: item.showMenu}">\n' +
    '\n' +
    '				<div class="details angular-animate">\n' +
    '\n' +
    '					<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '\n' +
    '						<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '						<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '							<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '							<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '							<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '						</ul>\n' +
    '					</div>\n' +
    '\n' +
    '					<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '\n' +
    '	            </div>\n' +
    '\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '	</li>\n' +
    '</ul>\n' +
    '\n' +
    '<div class="placeholder">\n' +
    '	<h1>The most trendy content right now on Muzli</h1>\n' +
    '</div>\n' +
    '\n' +
    '<div ng-show="feed && !feed.length && !blockEmpty && !isRendering" ng-transclude="no-data">\n' +
    '</div>\n' +
    '\n' +
    '</section>\n' +
    '')
  $templateCache.put('modules/feed/feed.drv.store.html',
    '<section id="feed">\n' +
    '\n' +
    '	<ul\n' +
    '		infinite-scroll=\'::loadMore()\'\n' +
    '		infinite-scroll-distance=\'::infiniteScrollDistance\'\n' +
    '		infinite-scroll-immediate-check=\'false\'\n' +
    '		infinite-scroll-disabled=\'!feed.length\'>\n' +
    '\n' +
    '		<li ng-repeat="item in feed track by (item.id || item.link)"\n' +
    '		ng-class="::{\n' +
    '			article: item.source.article && !item.video,\n' +
    '			visited: item.visited,\n' +
    '			viral: !!item.viralTimes,\n' +
    '			hasStats: item.hasStats, pick: item.pick,\n' +
    '			animated: item.animated || item.webm,\n' +
    '			\'inline-video\': !!item.htmlVideo,\n' +
    '			video: !!item.video,\n' +
    '			playing: item.playing,\n' +
    '			vlog: !!item.sub_source,\n' +
    '			nsfw: !!item.nsfw || !!item.userNSFW,\n' +
    '			feedSuggest: !!item.promotion,\n' +
    '			fallbackImage: item.fallbackImage,\n' +
    '			showSharePromo: item.displaySharePromo,\n' +
    '			outside: item.isOutside,\n' +
    '			showMenu: item.showMenu,\n' +
    '			curated: item.isCurated,\n' +
    '			}"\n' +
    '		class="angular-animate"\n' +
    '		data-muzli-id="{{::item.id}}">\n' +
    '\n' +
    '			<div class="tile store-tile">\n' +
    '\n' +
    '				<a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)">\n' +
    '\n' +
    '					<div class="postPhoto" >\n' +
    '\n' +
    '						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '\n' +
    '						<muzli-video ng-if="::item.video" ng-click="::videoClick(item, $event)"></muzli-video>\n' +
    '\n' +
    '						<div class="share">\n' +
    '							<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook" title-top="true"></span>\n' +
    '							<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter" title-top="true"></span>\n' +
    '							<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn" title-top="true"></span>\n' +
    '							<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack" title-bottom="true"></span>\n' +
    '						</div>\n' +
    '\n' +
    '						<div class="share-promo" ng-if="item.displaySharePromo">\n' +
    '							<div class="sharers">\n' +
    '								<h4>Nice! Maybe your friends will also enjoy this?</h4>\n' +
    '								<span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook"></span>\n' +
    '								<span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter"></span>\n' +
    '								<span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn"></span>\n' +
    '								<span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack"></span>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '\n' +
    '						<span class="badge"></span>\n' +
    '\n' +
    '					</div>\n' +
    '\n' +
    '					<div class="postInfo">\n' +
    '\n' +
    '						<div class="source-wrapper">\n' +
    '							<span class="source" title="{{::item.tooltip}}"\n' +
    '								ui-sref="feed(::{ name: item.source.name })"\n' +
    '								ng-click="::sourceClick($event, item.source.name)">\n' +
    '								<img ng-src="{{::item.source.icon}}" alt="{{::item.source.title}}">\n' +
    '							</span>\n' +
    '						</div>\n' +
    '\n' +
    '						<h3 ng-bind="::item.title"></h3>\n' +
    '\n' +
    '						<div class="store">\n' +
    '							<span class="tag" ng-repeat="tag in ::item.tags" ng-click="::searchTag(tag, $event)">{{tag}}</span>\n' +
    '							<div class="price">{{::item.price | price}}</div>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</a>\n' +
    '\n' +
    '				<div class="postMeta">\n' +
    '\n' +
    '					<div class="details angular-animate">\n' +
    '\n' +
    '						<span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-if="::showFavorite" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '\n' +
    '						<div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '\n' +
    '							<i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '							<ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '								<li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '								<li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '								<li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '								<li><a href="" ng-click="::demoteSource(item.source)">Hide all content from <strong>{{::item.source.title}}</strong></a></li>\n' +
    '							</ul>\n' +
    '						</div>\n' +
    '\n' +
    '						<div class="stats pull-right">\n' +
    '\n' +
    '							<span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '								<span class="icon-chat"></span>\n' +
    '							</span>\n' +
    '\n' +
    '							<span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '								<span class="icon-ph"></span>\n' +
    '								<span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '							</span>\n' +
    '\n' +
    '							<span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '								<span class="icon-view"></span>\n' +
    '								<span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '							</span>\n' +
    '							<span title="Shares" title-top="true">\n' +
    '								<span class="icon-share"></span>\n' +
    '								<span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '							</span>\n' +
    '		                </div>\n' +
    '\n' +
    '		            </div>\n' +
    '\n' +
    '				</div>\n' +
    '			</div>\n' +
    '\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '\n' +
    '	<ul class="ghost" ng-hide="hideGhost">\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '		<li></li>\n' +
    '	</ul>\n' +
    '\n' +
    '	<div ng-show="feed && !feed.length && !blockEmpty && !isRendering" ng-transclude="no-data">\n' +
    '	</div>\n' +
    '\n' +
    '</section>\n' +
    '')
  $templateCache.put('modules/feed/feed.html',
    '<div class="feed-container">\n' +
    '  <div class="feed-title">\n' +
    '  \n' +
    '    <div class="flex-title user-title" ng-if="currentSource.user">\n' +
    '      <img ng-if="!currentSource.user.monogram" ng-src="{{::currentSource.user.photo}}" alt="{{::currentSource.user.displayName}}" use-monogram="currentSource.user">\n' +
    '      <span ng-if="currentSource.user.monogram">{{currentSource.user.monogram}}</span>\n' +
    '      <h2>Work by {{currentSource.user.displayName}}</h2>\n' +
    '    </div>\n' +
    '  \n' +
    '    <div class="flex-title" ng-if="!currentSource.user">\n' +
    '      <h2 ng-cloak ng-if="currentSource.name">\n' +
    '          \n' +
    '        <span title="{{currentSource.description}}">{{currentSource.title}}</span>\n' +
    '    \n' +
    '        <a ng-if="[\'vlogs\'].indexOf(currentSource.name) === -1" href="{{muzliShareEndpoint}}go?link=http://{{currentSource.url}}" class="titleLink">\n' +
    '          <i class="icon-link" title="Go to {{currentSource.title}}\'s website"></i>\n' +
    '        </a>\n' +
    '    \n' +
    '      </h2>\n' +
    '      <p ng-if="currentSource.description">{{currentSource.description}}</p>\n' +
    '    </div>\n' +
    '  \n' +
    '    <div class="feedSorters" ng-if="[\'search\', \'favorites\'].indexOf(currentSource) === -1 && [\'vlogs\', \'dribbble\', \'producthunt\', \'colors\', \'user\'].indexOf(currentSource.name) === -1" ng-cloak>\n' +
    '      <a ng-click="::sortFeed()"ng-class="{ active: currentFeedSort !== \'virality\' }" href="" title="Sort by date">Recent</a>\n' +
    '      <a ng-click="::sortFeed(\'virality\')" ng-class="{ active: currentFeedSort === \'virality\' }" href="" title="Sort by popularity">Popular</a>\n' +
    '    </div>\n' +
    '  \n' +
    '    <div class="colors-cta" ng-if="currentSource.name === \'colors\'">\n' +
    '      <a href="https://search.muz.li/color-palette-generator"><i class="icon-plus"></i> Create a color Palette</a>\n' +
    '    </div>\n' +
    '  \n' +
    '    <div class="shortcuts-toggle" ng-if="currentSource && !currentSource.user">\n' +
    '  \n' +
    '      <p>Pin to Sidebar</p>\n' +
    '  \n' +
    '      <label class="switch" ng-click="checkAnonymousSources($event)">\n' +
    '          <input class="preventBlur" type="checkbox" ng-model="currentSource.isShortcut" ng-change="onToggleSource(currentSource)" ng-disabled="user.anonymous && !flags.useAnonymousSources">\n' +
    '          <span class="slider"></span>\n' +
    '      </label>\n' +
    '    </div>\n' +
    '  \n' +
    '  </div>\n' +
    '  \n' +
    '  <scrollable-feed items="items" ng-hide="errors.length" sponsored="sponsored" load-on-sort show-favorite show-virality>\n' +
    '    <scrollable-feed-no-data>\n' +
    '      <div id="oops">No items yet today <a href="" ng-click="::reload()">Try again</a></div>\n' +
    '    </scrollable-feed-no-data>\n' +
    '  </scrollable-feed>\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/feed/feed.jobs.html',
    '<div class="feed-container">\n' +
    '  <div class="feed-title store-title">\n' +
    '  \n' +
    '    <div class="flex-title">\n' +
    '      <h2 ng-cloak ng-if="currentSource.name">\n' +
    '        <span title="{{currentSource.description}}">{{currentSource.title}}</span>\n' +
    '      </h2>\n' +
    '    </div>\n' +
    '  \n' +
    '    <div class="shortcuts-toggle" ng-if="currentSource">\n' +
    '  \n' +
    '      <p>Pin to Sidebar</p>\n' +
    '  \n' +
    '      <label class="switch" ng-click="checkAnonymousSources($event)">\n' +
    '          <input class="preventBlur" type="checkbox" ng-model="currentSource.isShortcut" ng-change="onToggleSource(currentSource)" ng-disabled="user.anonymous && !flags.useAnonymousSources">\n' +
    '          <span class="slider"></span>\n' +
    '      </label>\n' +
    '    </div>\n' +
    '  \n' +
    '  </div>\n' +
    '  \n' +
    '  <scrollable-feed items="items" ng-hide="errors.length" sponsored="sponsored" load-on-sort show-favorite show-virality>\n' +
    '    <scrollable-feed-no-data>\n' +
    '      <div id="oops">No items yet today <a href="" ng-click="::reload()">Try again</a></div>\n' +
    '    </scrollable-feed-no-data>\n' +
    '  </scrollable-feed>\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/feed/feed.shorts.html',
    '<div class="shorts-header">\n' +
    '    <h3>Design shorts</h3>\n' +
    '    <a ng-click="removeShorts()" title="You can always turn it back on in the Settings">Turn Off Shorts</a>\n' +
    '</div>\n' +
    '\n' +
    '<div class="shorts-container">\n' +
    '\n' +
    '    <div class="tile" ng-repeat="item in shorts" ng-if="!item.hidden">\n' +
    '\n' +
    '        <a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-click="shortsClick(item, $event)">\n' +
    '\n' +
    '            <div class="postPhoto">\n' +
    '                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII="\n' +
    '                    muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" src="" alt="" />\n' +
    '                <div class="hover-overlay">\n' +
    '                    <i class="icon-play"></i>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="postInfo">\n' +
    '                <h3 ng-bind="::item.title"></h3>\n' +
    '            </div>\n' +
    '        </a>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/feed/feed.store.html',
    '<div class="feed-container">\n' +
    '  <div class="feed-title store-title">\n' +
    '  \n' +
    '    <div class="flex-title">\n' +
    '      <h2 ng-cloak ng-if="currentSource.name">\n' +
    '        <span title="{{currentSource.description}}">{{currentSource.title}}</span>\n' +
    '      </h2>\n' +
    '    </div>\n' +
    '  \n' +
    '    <nav class="tabs inline">\n' +
    '      <a href="" ui-sref="store({ filter: \'\' })" ng-class="{ active: filter === \'\' }">All assets</a>\n' +
    '      <a href="" ui-sref="store({ filter: \'templates\' })" ng-class="{ active: filter === \'templates\' }">Website templates</a>\n' +
    '      <a href="" ui-sref="store({ filter: \'ui-kits\' })" ng-class="{ active: filter === \'ui-kits\' }">UI kits</a>\n' +
    '      <a href="" ui-sref="store({ filter: \'illustrations\' })" ng-class="{ active: filter === \'illustrations\' }">Illustrations</a>\n' +
    '      <a href="" ui-sref="store({ filter: \'icons\' })" ng-class="{ active: filter === \'icons\' }">Icons</a>\n' +
    '      <a href="" ui-sref="store({ filter: \'fonts\' })" ng-class="{ active: filter === \'fonts\' }">Fonts</a>\n' +
    '      <a href="" ui-sref="store({ filter: \'mockups\' })" ng-class="{ active: filter === \'mockups\' }">Mockups</a>\n' +
    '    </nav>\n' +
    '  \n' +
    '    <div class="shortcuts-toggle" ng-if="currentSource">\n' +
    '  \n' +
    '      <p>Pin to Sidebar</p>\n' +
    '  \n' +
    '      <label class="switch" ng-click="checkAnonymousSources($event)">\n' +
    '          <input class="preventBlur" type="checkbox" ng-model="currentSource.isShortcut" ng-change="onToggleSource(currentSource)" ng-disabled="user.anonymous && !flags.useAnonymousSources">\n' +
    '          <span class="slider"></span>\n' +
    '      </label>\n' +
    '    </div>\n' +
    '  \n' +
    '  </div>\n' +
    '  \n' +
    '  <scrollable-feed items="items" ng-hide="errors.length" sponsored="sponsored" load-on-sort show-favorite show-virality>\n' +
    '    <scrollable-feed-no-data>\n' +
    '      <div id="oops">No items yet today <a href="" ng-click="::reload()">Try again</a></div>\n' +
    '    </scrollable-feed-no-data>\n' +
    '  </scrollable-feed>\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/feed/user-sources.html',
    '<div class="cf">\n' +
    '\n' +
    '  <h2>All your feeds</h2>\n' +
    '\n' +
    '  <div class="feedSorters pull-right" ng-if="[\'search\', \'favorites\'].indexOf(currentSource) === -1 && [\'vlogs\', \'dribbble\', \'producthunt\'].indexOf(currentSource.name) === -1" ng-cloak>\n' +
    '    <a ng-click="::sortFeed()"ng-class="{ active: currentFeedSort !== \'virality\' }" href="" title="Sort by date">RECENT</a>\n' +
    '    <a ng-click="::sortFeed(\'virality\')" ng-class="{ active: currentFeedSort === \'virality\' }" href="" title="Sort by popularity">Recent</a>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<scrollable-feed items="items" sponsored="sponsored" ng-hide="errors.length" load-on-sort="viralTimes" show-favorite show-virality></scrollable-feed>\n' +
    '')
  $templateCache.put('modules/feed/video.drv.html',
    '<div ng-click="::imageClicked($event)" class="thumbnail angular-youtube-wrapper">\n' +
    '	<img ng-if="item.thumbnail" muzli-lazy="{{::item.thumbnail}}">\n' +
    '	<div ng-if="item.thumbnail" class="player-image"></div>\n' +
    '</div>')
  $templateCache.put('modules/muzli/card-carbon.drv.html',
    '<div class="tile">\n' +
    '  <a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::promotionClick(item, $event)">\n' +
    '    <div class="postPhoto">\n' +
    '      <img class="bg"\n' +
    '        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII="\n' +
    '        muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" alt="" />\n' +
    '      <img\n' +
    '        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII="\n' +
    '        muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" alt="" />\n' +
    '\n' +
    '      <img ng-repeat="pixel in item.pixels" ng-src="{{::pixel}}" style="display:none;" height="0" width="0" />\n' +
    '    </div>\n' +
    '    <div class="postMeta">\n' +
    '      <div class="postInfo">\n' +
    '        <h3 ng-bind="::item.title"></h3>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </a>\n' +
    '</div>')
  $templateCache.put('modules/muzli/card-sponsored.drv.html',
    '<div class="tile">\n' +
    '  <a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)" >\n' +
    '    <div class="postPhoto">\n' +
    '      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" alt="" />\n' +
    '      <span class="badge"></span>\n' +
    '    </div>\n' +
    '  </a>\n' +
    '\n' +
    '\n' +
    '  <div class="postMeta">\n' +
    '\n' +
    '    <div class="postInfo">\n' +
    '      <h3 ng-bind="::item.title"></h3>\n' +
    '      <span class="source" ng-bind="::item.domainName"></span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="details angular-animate">\n' +
    '\n' +
    '      <div class="post-menu">\n' +
    '\n' +
    '          <i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '          <ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '              <li><a href="" ng-click="vm.showAdsDialog = true; item.showMenu = false;">Why I\'m seeing Ads?</a></li>\n' +
    '              <li><a href="" ui-sref="all.referral" ng-click="item.showMenu = false">Hide all Ads on Muzli</a></li>\n' +
    '              <li ng-if="item.source === \'outbrain\'"><a href="https://www.outbrain.com/privacy/" target="_blank">Privacy policy</a></li>\n' +
    '          </ul>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/muzli/card.drv.html',
    '<div class="tile">\n' +
    '\n' +
    '  <a target="_blank" ng-href="{{::item.link_out}}" class="feedLink" ng-mousedown="::postClick(item, $event)" >\n' +
    '    <div class="postPhoto">\n' +
    '\n' +
    '      <i ng-if="item.nsfw || item.userNSFW">NSFW</i>\n' +
    '\n' +
    '      <img ng-if="::!item.video && !item.youtube" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=" muzli-lazy="{{::item.image}}" muzli-gif="{{::item.gif}}" muzli-is-gif="{{::item.isGif}}" alt="" />\n' +
    '\n' +
    '      <div class="share">\n' +
    '        <span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook" title-top="true"></span>\n' +
    '        <span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter" title-top="true"></span>\n' +
    '        <span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn" title-top="true"></span>\n' +
    '        <span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack" title-bottom="true"></span>\n' +
    '      </div>\n' +
    '\n' +
    '      <muzli-video ng-if="::item.video"></muzli-video>\n' +
    '\n' +
    '      <video ng-if="::item.htmlVideo" ng-src="{{::item.htmlVideo}}" video-loader playsinline autoplay loop muted></video>\n' +
    '\n' +
    '      <span class="badge"></span>\n' +
    '\n' +
    '      <div class="share-promo" ng-if="item.displaySharePromo">\n' +
    '        <div class="sharers">\n' +
    '          <h4>Nice! Maybe your friends will also enjoy this?</h4>\n' +
    '          <span class="facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', item)" title="Share on Facebook"></span>\n' +
    '          <span class="twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', item)" title="Share on Twitter"></span>\n' +
    '          <span class="linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', item)" title="Share on LinkedIn"></span>\n' +
    '          <span class="slack icon-slack" ng-click="::sendSlack($event, item)" title="Share on Slack"></span>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '  </a>\n' +
    '\n' +
    '  <div class="postMeta">\n' +
    '\n' +
    '    <div class="postInfo">\n' +
    '      <h3 ng-bind="::item.title"></h3>\n' +
    '      <span class="source" ng-bind="::item.domainName"></span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="details angular-animate">\n' +
    '\n' +
    '      <span class="favorite icon-fav" ng-click="::toggleFavorite($event, item)" ng-class="{ active: item.favorite }" title="Save item" title-top="true"></span>\n' +
    '\n' +
    '      <div class="post-menu" ng-if="user && (!user.anonymous || flags.useAnonymousSources)">\n' +
    '\n' +
    '        <i class="icon-menu" title="More options" title-top="true" ng-click="item.showMenu = !item.showMenu"></i>\n' +
    '\n' +
    '        <ul class="dropdown" ng-if="item.showMenu" click-outside="item.showMenu = false">\n' +
    '          <li ng-if="!item.nsfw && !item.userNSFW"><a href="" ng-click="::markNSFW(item)">Report NSFW</a></li>\n' +
    '          <li ng-if="item.userNSFW"><a href="" ng-click="::unmarkNSFW(item)">Mark as SFW</a></li>\n' +
    '          <li><a href="" ng-click="::markHidden(item)">Hide this from My feed</a></li>\n' +
    '          <li ng-if="::item.picksLink"><a ng-href="{{::item.picksLink}}">Visit Muzli Awards page</a></li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="stats pull-right">\n' +
    '        <span class="action" ng-click="::openDNlink($event, item.link_out_direct)" ng-if="item.source.name == \'designer_news\' && item.external_url" title="Open discussion" title-top="true">\n' +
    '          <span class="icon-chat"></span>\n' +
    '        </span>\n' +
    '\n' +
    '        <span title="Votes" title-top="true" ng-if="::item.source.name === \'producthunt\'">\n' +
    '          <span class="icon-ph"></span>\n' +
    '          <span>{{::item.stats.likes || 0 | thousandSuffix:1}}</span>\n' +
    '        </span>\n' +
    '\n' +
    '        <span title="Views" title-top="true" ng-if="::item.clicks > 0">\n' +
    '          <span class="icon-view"></span>\n' +
    '          <span>{{::item.clicks || 0 | thousandSuffix:1}}</span>\n' +
    '        </span>\n' +
    '        <span title="Shares" title-top="true">\n' +
    '          <span class="icon-share"></span>\n' +
    '          <span>{{::item.virality || 0 | thousandSuffix:1}}</span>\n' +
    '        </span>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/muzli/home.html',
    '<nav class="tabs sticky">\n' +
    '	\n' +
    '	<a href="" ng-click="::setFeedFilter(\'all\')" ng-class="{ active: currentFeedFilter === \'all\' }">Highlights</a>\n' +
    '\n' +
    '	<a href="" ng-click="::setFeedFilter(focusedTab.name)" ng-class="{ active: currentFeedFilter === focusedTab.name }">{{focusedTab.title}}</a>\n' +
    '\n' +
    '	<a href="" ng-click="::setFeedFilter(\'top\')" ng-class="{ active: currentFeedFilter === \'top\' }"><i class="icon-trend"></i> Trending</a>\n' +
    '	\n' +
    '	<!-- Repeat category tabs w/ ordering function -->\n' +
    '	<a href="" ng-repeat="nav in navTabs" ng-click="::setFeedFilter(nav.name)" ng-class="{ active: currentFeedFilter === nav.name }">{{nav.title}}</a>\n' +
    '\n' +
    '</nav>\n' +
    '\n' +
    '<div class="home-content home-speed-dial" ng-class="{\'speed-dial-enabled\': useSpeedDial}">\n' +
    '\n' +
    '	<div class="fade-in our-picks">\n' +
    '\n' +
    '		<div class="spacer">\n' +
    '			\n' +
    '			<div class="search-container" ng-class="{\n' +
    '				hidden: feedVisibleClass,\n' +
    '			}">\n' +
    '				<form ng-submit="search(searchModel[activeSearch], $event, activeSearch)" id="searchForm">\n' +
    '	\n' +
    '					<div class="input">\n' +
    '	\n' +
    '						<i class="icon-search"></i>\n' +
    '	\n' +
    '						<input name="qMuzli"\n' +
    '							class="{{defaultSearch === \'muzli\' ? \'\' : \'secondary\'}}"\n' +
    '							tabindex="{{defaultSearch === \'muzli\' ? 1 : 2}}" \n' +
    '							placeholder="{{defaultSearch === \'muzli\' ? \'Search on Muzli\' : \'or Muzli\'}}" \n' +
    '							maxlength="50" \n' +
    '							type="text" \n' +
    '							ng-model="searchModel.muzli" \n' +
    '							ng-focus="setSearch(\'muzli\')" \n' +
    '							lookahead\n' +
    '							/>\n' +
    '		\n' +
    '						<input name="qGoogle" \n' +
    '							class="{{defaultSearch === \'web\' ? \'\' : \'secondary\'}}"\n' +
    '							tabindex="{{defaultSearch === \'web\' ? 1 : 2}}" \n' +
    '							placeholder="{{defaultSearch === \'web\' ? \'Search the Web\' : \'or Web\'}}" \n' +
    '							maxlength="50" \n' +
    '							type="text" \n' +
    '							ng-model="searchModel.google" \n' +
    '							ng-focus="setSearch(\'google\', $event)" \n' +
    '							lookahead\n' +
    '							/>\n' +
    '\n' +
    '						<i class="icon-{{searchEngine}}" title="Customize search" ng-click="openMenu(\'scrollBottom\')" stop-propagation></i>\n' +
    '		\n' +
    '						<input type="submit" />\n' +
    '	\n' +
    '					</div>\n' +
    '	\n' +
    '				</form>\n' +
    '			</div>\n' +
    '	\n' +
    '			<div class="home-title" ng-if="!useSpeedDial && recentSites.length">\n' +
    '				<div class="mostVisitedContainer">	\n' +
    '					<ul class="mostVisited" ng-if="recentSites.length" ng-cloak>\n' +
    '						<li ng-repeat="site in recentSites"\n' +
    '							title=\'{{site.cleanUrl}}\'\n' +
    '							ng-class="{error: site.error}"\n' +
    '							style="{{site.imgUrl ? \'background-image: url(\' + site.imgUrl + \')\' : \'\' }}">\n' +
    '							<a ng-href=\'{{site.url}}\' ng-click="events.quickAccess.click(site.cleanUrl)"></a>\n' +
    '						</li>\n' +
    '					</ul>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '		<div class="home-title" ng-if="useSpeedDial">\n' +
    '			<style>\n' +
    '				:root {\n' +
    '					--items-per-row: {{speedDialItemsPerRow}};\n' +
    '				}\n' +
    '			</style>\n' +
    '\n' +
    '			<div class="speed-dial">\n' +
    '\n' +
    '				<ul class="speed-dial-container" ng-if="speedDialLinks.length" ng-cloak>\n' +
    '					<li ng-repeat="link in speedDialLinks track by $index"\n' +
    '						title=\'{{link.domain || link.url}}\'\n' +
    '						ng-class="{error: link.error}">\n' +
    '\n' +
    '						<a ng-href=\'{{link.url}}\' ng-click="events.speedDial.click(link.url)">\n' +
    '							<div ng-if="link.iconFallback === \'server\'" class="icon server"></div>\n' +
    '							<div ng-if="link.iconFallback === \'file\'" class="icon file"></div>\n' +
    '							<div ng-if="link.iconFallback === \'monogram\'" class="icon monogram">{{(link.title || link.domain).charAt(0)}}</div>\n' +
    '							<div ng-if="!link.iconFallback" class="icon image">\n' +
    '								<img src="{{link.icon}}" sd-image-fallback />\n' +
    '							</div>\n' +
    '							<p>{{link.title || link.domain || link.url}}</p>\n' +
    '						</a>\n' +
    '					</li>\n' +
    '					<li class="edit-speed-dial" ng-click="$state.go(\'speed-dial\')" title="Customize Speed Dial">\n' +
    '						<i class="icon-menu"></i>\n' +
    '					</li>\n' +
    '				</ul>\n' +
    '\n' +
    '				<ul ng-if="!speedDialLinks.length" ng-cloak class="placeholder">\n' +
    '\n' +
    '					<li ng-repeat="link in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] track by $index">\n' +
    '						<a>\n' +
    '							<div class="icon"></div>\n' +
    '							<p></p>\n' +
    '						</a>\n' +
    '					</li>\n' +
    '\n' +
    '					<li class="edit-speed-dial" ng-click="$state.go(\'speed-dial\')" title="Customize Speed Dial">\n' +
    '						<i class="icon-menu"></i>\n' +
    '					</li>\n' +
    '\n' +
    '					<div class="ftx-tip most-visited-promo" ng-if="vm.ftxLeft.indexOf(\'speed-dial\') !== -1">\n' +
    '\n' +
    '						<div class="ftx-pop most-visited-promo"></div>\n' +
    '\n' +
    '						<p>Do you want to keep seeing links from your old New Tab page?</p>\n' +
    '						\n' +
    '						<div class="controls">\n' +
    '							<a href="" class="dismiss" ng-click="::dismissSpeedDialPrompt()">No</a>\n' +
    '							<a href="" class="enable" ng-click="::acceptSpeedDialPrompt()">Yes</a>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</ul>\n' +
    '\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '		<section id="sticky" ng-class="{\n' +
    '			\'show\': areHomeImagesLoaded\n' +
    '		}">\n' +
    '			\n' +
    '			<!-- Sticky posts -->\n' +
    '			<ul class="picks grid">\n' +
    '				\n' +
    '				<li ng-repeat="item in muzliFeed track by (item.id || item.link)" \n' +
    '					ng-class="::{\n' +
    '						viral: item.viral,\n' +
    '						video: !!item.video,\n' +
    '						playing: item.playing,\n' +
    '						\'inline-video\': !!item.htmlVideo,\n' +
    '						animated: !!item.animated,\n' +
    '						nsfw: !!item.nsfw || !!item.userNSFW,\n' +
    '						showSharePromo: item.displaySharePromo,\n' +
    '						showMenu: item.showMenu,\n' +
    '					}"\n' +
    '					ng-if="!item.userHidden"\n' +
    '					data-muzli-id="{{::item.id}}"\n' +
    '					ng-include="\'modules/muzli/card.drv.html\'">	\n' +
    '				</li>\n' +
    '\n' +
    '				<!-- DYNAMIC SLOT -->\n' +
    '				<li class="dynamic" ng-init="item = dynamicFeed[0]" ng-if="dynamicFeed.length && feedVariation !== 2"\n' +
    '					ng-class="::{\n' +
    '						viral: item.viral,\n' +
    '						video: !!item.video,\n' +
    '						playing: item.playing,\n' +
    '						\'inline-video\': !!item.htmlVideo,\n' +
    '						animated: !!item.animated,\n' +
    '						nsfw: !!item.nsfw || !!item.userNSFW,\n' +
    '						showSharePromo: item.displaySharePromo,\n' +
    '						showMenu: item.showMenu,\n' +
    '						hidden: item.userHidden,\n' +
    '					}"\n' +
    '					data-muzli-id="{{::item.id}}"\n' +
    '					>	\n' +
    '\n' +
    '						<div ng-include="\'modules/muzli/card.drv.html\'"></div>\n' +
    '\n' +
    '						<div class="link">\n' +
    '							<a href="" ng-if="feedVariation === 0">\n' +
    '								<i class="icon-trend"></i> Trending on Muzli\n' +
    '							</a>\n' +
    '							<a href="" ng-if="feedVariation === 1">\n' +
    '								<i class="icon-hot"></i> Hot Right Now!\n' +
    '							</a>\n' +
    '						</div>\n' +
    '				</li>\n' +
    '\n' +
    '				<!-- DYNAMIC SLOT W/ ADS -->\n' +
    '\n' +
    '				<!-- Possible source options\n' +
    '					dynamic\n' +
    '					self-service\n' +
    '					outbrain\n' +
    '					carbon-native \n' +
    '				-->\n' +
    '\n' +
    '				<li class="dynamic sponsored-single" \n' +
    '					ng-init="item = dynamicFeed[0]; isCarbon = item.source === \'carbon-native\';" \n' +
    '					ng-if="feedVariation === 2 && dynamicFeed.length"\n' +
    '					ng-class="::{\n' +
    '						\'muli-ad\': !isCarbon,\n' +
    '						\'carbon-ad\': isCarbon,\n' +
    '						\'animated\': item.isGif,\n' +
    '					}"\n' +
    '					data-muzli-id="{{::item.id}}"\n' +
    '					>	\n' +
    '						\n' +
    '						<div ng-if="!isCarbon" ng-include="\'modules/muzli/card-sponsored.drv.html\'"></div>\n' +
    '						<div ng-if="isCarbon" ng-include="\'modules/muzli/card-carbon.drv.html\'"></div>\n' +
    '\n' +
    '						<div class="link">\n' +
    '\n' +
    '							<a ng-if="!user.referralCode" ng-click="vm.showAdsDialog = true">\n' +
    '								<span ng-if="item.source === \'dynamic\' || item.source === \'self-service\'">Ad by Muzli <span class="chevron">›</span></span>\n' +
    '								<span ng-if="item.source === \'carbon-native\'">Ad by Carbon <span class="chevron">›</span></span>\n' +
    '								<span ng-if="item.source === \'outbrain\'">Ad by <span class="icon-outbrain"></span></span>\n' +
    '							</a>\n' +
    '							\n' +
    '							<ad-free ng-if="user.referralCode"></ad-free>\n' +
    '							\n' +
    '							<img ng-if="item.beacon" class="beacon" style="visibility: hidden;" ng-src="{{::item.beacon}}" alt="Sponsored" />\n' +
    '							\n' +
    '						</div>\n' +
    '				</li>\n' +
    '\n' +
    '			</ul>\n' +
    '\n' +
    '			<ul class="picks skeleton">\n' +
    '				<li ng-repeat="item in [1, 2, 3, 4, 5, 6, 7, 8]">\n' +
    '					<div class="tile"></div>\n' +
    '				</li>\n' +
    '			</ul>\n' +
    '\n' +
    '		</section>\n' +
    '\n' +
    '		<div class="spacer"></div>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="lock-height" ng-class="{\'home-visible\': feedVisibleClass}">\n' +
    '\n' +
    '		<nav class="tabs inline">\n' +
    '			<a href="" ng-click="::setFeedFilter(\'all\')" ng-class="{ active: currentFeedFilter === \'all\' }">Your Highlights</a>\n' +
    '\n' +
    '			<a href="" ng-click="::setFeedFilter(focusedTab.name)" ng-class="{ active: currentFeedFilter === focusedTab.name }">{{focusedTab.title}}</a>\n' +
    '			\n' +
    '			<a href="" ng-click="::setFeedFilter(\'top\')" ng-class="{ active: currentFeedFilter === \'top\' }"><i class="icon-trend"></i> Trending</a>\n' +
    '			\n' +
    '			<!-- Repeat category tabs w/ ordering function -->\n' +
    '			<a href="" ng-repeat="nav in navTabs | orderBy:\'order\'" ng-click="::setFeedFilter(nav.name)" ng-class="{ active: currentFeedFilter === nav.name }">{{nav.title}}</a>\n' +
    '			\n' +
    '			<a href="" ui-sref="store" ng-click="::setFeedFilter(\'store\')">Store</a>\n' +
    '\n' +
    '			<a href="" ui-sref="jobs" ng-click="::setFeedFilter(\'jobs\')">Jobs</a>\n' +
    '		\n' +
    '			<a href="" ng-click="toggleSidebar()" class="preferences" title="Customise feed">\n' +
    '				<i class="icon-prefs"></i>\n' +
    '				<div class="ftx-pop sidebar-promo" ng-if="vm.ftxLeft.indexOf(\'sidebar\') !== -1" ng-cloak></div>\n' +
    '			</a>\n' +
    '\n' +
    '		</nav>\n' +
    '		\n' +
    '		<scrollable-feed ng-if="currentFeedFilter === \'top\'" items="allFeed" sponsored="sponsored" filter="currentFeedFilter" jobs="jobs" ng-hide="errors.length" load-on-sort="viralTimes" show-favorite show-virality ng-cloak></scrollable-feed>\n' +
    '\n' +
    '		<scrollable-feed ng-if="currentFeedFilter !== \'top\'" items="allFeed" sponsored="sponsored" filter="currentFeedFilter" jobs="jobs" ng-hide="errors.length" load-on-sort="viralTimes" show-favorite show-virality ng-cloak></scrollable-feed>\n' +
    '\n' +
    '	</div>\n' +
    '\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/muzli/version-info.html',
    '<div class="version-info" ng-class="{active: showAdmin}" ng-cloak>\n' +
    '	\n' +
    '	<div class="toggle" ng-click="showAdmin = !showAdmin" ng-class="{true: showAdmin}"><i></i></div>\n' +
    '\n' +
    '	<div class="pull-left" ng-if="showAdmin">\n' +
    '		<p>Environment: <strong>{{currentEnvironment}}</strong> | \n' +
    '			<a ng-repeat="environment in environments" href="" ng-click="setEnvironment(environment)">{{environment}}</a> \n' +
    '		</p>\n' +
    '		<p>API version: <strong>{{user.apiVersion}}</strong> | \n' +
    '			<a href="javascript:(function()%7Bfunction%20loadScript(url%2C%20callback)%0A%7B%0A%0A%20%20%20%20var%20head%20%3D%20document.getElementsByTagName(%22head%22)%5B0%5D%3B%0A%20%20%20%20var%20script%20%3D%20document.createElement(%22script%22)%3B%0A%20%20%20%20script.src%20%3D%20url%3B%0A%0A%20%20%20%20%2F%2F%20Attach%20handlers%20for%20all%20browsers%0A%20%20%20%20var%20done%20%3D%20false%3B%0A%0A%20%20%20%20script.onload%20%3D%20script.onreadystatechange%20%3D%20function()%20%7B%0A%20%20%20%20%20%20%20%20if(%20!done%20%26%26%20(%20!this.readyState%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%7C%20this.readyState%20%3D%3D%20%22loaded%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%7C%20this.readyState%20%3D%3D%20%22complete%22)%20)%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20done%20%3D%20true%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Continue%20your%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20callback()%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Handle%20memory%20leak%20in%20IE%0A%20%20%20%20%20%20%20%20%20%20%20%20script.onload%20%3D%20script.onreadystatechange%20%3D%20null%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20head.removeChild(%20script%20)%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20alert(\'Item%20added%20to%20Queue\')%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20head.appendChild(script)%3B%0A%7D%0A%0A(()%20%3D%3E%20%7B%0A%0A%20%20%20%20var%20item%20%3D%20%7B%0A%20%20%20%20%20%20%20%20link%3A%20window.location.href%2C%0A%20%20%20%20%20%20%20%20title%3A%20document.title%2C%0A%20%20%20%20%20%20%20%20source%3A%20\'curated\'%2C%0A%20%20%20%20%20%20%20%20delay%3A%2060%0A%20%20%20%20%7D%0A%0A%20%20%20%20var%20sringified%20%3D%20JSON.stringify(item)%0A%0A%20%20%20%20loadScript(\'https%3A%2F%2Fmuzli-crawler-es-prod.herokuapp.com%2Fqueue%2Fadd%3Fitem%3D\'%20%2B%20encodeURIComponent(sringified)%2C%20function()%20%7B%7D)%3B%0A%20%20%20%20%2F%2F%20loadScript(\'http%3A%2F%2Flocalhost%3A3351%2Fqueue%2Fadd%3Fitem%3D\'%20%2B%20encodeURIComponent(sringified)%2C%20function()%20%7B%7D)%3B%0A%0A%7D)()%3B%7D)()%3B">Curated Bookmarklet</a></p>\n' +
    '		</p>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="pull-right" ng-if="showAdmin">\n' +
    '		<div class="pull-left">\n' +
    '			<p>\n' +
    '				FTX: \n' +
    '				<a href="" ng-click="resetFTX()"> Trigger FTX</a>\n' +
    '				<a href="" ng-click="resetHomeScroll()"> Reset Home Scroll</a>\n' +
    '				<a href="" ng-click="resetFTX(true)"> Trigger FTX with Speed Dial</a>\n' +
    '				<a href="" ui-sref="safari"> Safari FTX</a>\n' +
    '				<br/>\n' +
    '				<br/>\n' +
    '				Post-config steps:\n' +
    '				<a href="" ng-click="resetBubbles()">Reset FTX bubbles</a>\n' +
    '				<a href="" ng-click="resetPermissions()">Reset Permissions</a>\n' +
    '				<a href="" ng-click="resetJobs()">Reset Jobs</a>\n' +
    '				<a href="" ng-click="vm.showFtx = \'scroll\'">Trigger final step</a>\n' +
    '				<a href="" ui-sref="lite-check">Lite check</a>\n' +
    '			</p>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '\n' +
    '</div>')
  $templateCache.put('modules/referral/referral-reward.modal.html',
    '<dialog class="referral" click-outside="$state.go(\'all\')">\n' +
    '\n' +
    '    <div class="wrapper reward">\n' +
    '\n' +
    '        <style>\n' +
    '          .advertise {\n' +
    '            padding: 40px;\n' +
    '          }\n' +
    '        </style>\n' +
    '      \n' +
    '        <h1>Nice! You\'ve invited enough friends.</h1>\n' +
    '      \n' +
    '        <p>\n' +
    '          You\'ve invited {{targetUserCount}} friends to Muzli! Click <strong>\'Remove all ads\'</strong> to enjoy an ad-free experience.\n' +
    '        </p>\n' +
    '\n' +
    '        <img class="illustration" src="/images/referral-reward.png" alt="Referral reward">\n' +
    '        \n' +
    '        <div class="cta">\n' +
    '          <button ng-click="removeAds()">Remove All Ads</button>\n' +
    '        </div>\n' +
    '      \n' +
    '      </div>\n' +
    '\n' +
    '</dialog>\n' +
    '\n' +
    '')
  $templateCache.put('modules/referral/referral.indicator.html',
    '<div class="progress" ng-click="$state.go(\'all.referral\')">\n' +
    '    <span>\n' +
    '        Ad-Free Muzli {{targetUserCount}}\n' +
    '    </span>\n' +
    '    <div class="ticks">\n' +
    '        <div class="tick" ng-class="{active: $index < referredUserCount}" ng-repeat="tick in ticks track by $index"></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '')
  $templateCache.put('modules/referral/referral.modal.html',
    '<dialog class="referral" click-outside="$state.go(\'all\')">\n' +
    '\n' +
    '    <div class="wrapper">\n' +
    '\n' +
    '        <style>\n' +
    '          .advertise {\n' +
    '            padding: 40px;\n' +
    '          }\n' +
    '        </style>\n' +
    '      \n' +
    '        <h1>Unlock Ad-Free Muzli</h1>\n' +
    '      \n' +
    '        <p>\n' +
    '            Enjoy a seamless browsing experience by inviting your friends.\n' +
    '        </p>\n' +
    '\n' +
    '        <ol>\n' +
    '            <li>Get your unique Muzli invitation link.</li>\n' +
    '            <li>Share this link with your friends, coworkers or social media.</li>\n' +
    '            <li>Once 5 friends sign up, say goodbye to ads!</li>\n' +
    '        </ol>\n' +
    '        \n' +
    '        <form ng-if="referralCode">\n' +
    '            <input type="text" ng-model="referralUrl" name="referralUrl" readonly select-on-click/>  \n' +
    '            <button ng-class="{success: copySuccess}" click-copy="{{referralUrl}}">{{copySuccess ? \'Link copied to Clipboard\' : \'Copy link\'}}</button> \n' +
    '        </form>\n' +
    '\n' +
    '        <p ng-if="referralCode" class="sharers">\n' +
    '            <span>Or share over:</span>\n' +
    '            <span class="share facebook icon-facebook" ng-click="::openSharer($event, \'facebook\', shareOptions)" title="Share on Facebook" title-dark="true"></span>\n' +
    '            <span class="share twitter icon-twitter" ng-click="::openSharer($event, \'twitter\', shareOptions)" title="Share on Twitter" title-dark="true"></span>\n' +
    '            <span class="share linkedin icon-linkedin" ng-click="::openSharer($event, \'linkedin\', shareOptions)" title="Share on LinkedIn" title-dark="true"></span>\n' +
    '            <span class="share slack icon-slack" ng-click="::sendSlack($event, shareOptions)" title="Share on Slack" title-dark="true"></span>\n' +
    '        </p>\n' +
    '\n' +
    '        <div ng-if="!referralCode" class="cta">\n' +
    '          <button ng-click="generateReferralCode()" ng-if="!user.anonymous">Get your referral link</button>\n' +
    '          <button ng-click="$state.go(\'sign-in\')" ng-if="user.anonymous">Sign In to Continue</button>\n' +
    '        </div>\n' +
    '      \n' +
    '      </div>\n' +
    '\n' +
    '      <div ng-if="referralCode" class="wrapper">\n' +
    '\n' +
    '        <div class="progress">\n' +
    '            <div class="ticks">\n' +
    '                <div ng-repeat="user in referredUsers track by $index" class="tick" ng-class="{active: !!user.id}">\n' +
    '                  <img ng-if="user.photo" src="{{user.photo}}" alt="{{user.displayName}}" title="{{user.displayName}}" title-top="true" title-dark="true">\n' +
    '                  <span ng-if="user.displayName && !user.photo" class="mono" title="{{user.displayName}}" title-top="true" title-dark="true">{{user.displayName.at(0)}}</span>\n' +
    '                  <i ng-if="$index === targetUserCount - 1 && !user.id" class="icon-star"></i>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <span>{{currentUserCount}} of {{targetUserCount}} signed up</span>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div class="cta">\n' +
    '          <button ng-disabled="currentUserCount < targetUserCount" ng-click="removeAds()">\n' +
    '            <i class="icon-lock" ng-if="currentUserCount < targetUserCount"></i> Remove All Ads\n' +
    '          </button>\n' +
    '        </div>\n' +
    '\n' +
    '      </div>\n' +
    '\n' +
    '</dialog>\n' +
    '\n' +
    '')
  $templateCache.put('modules/search/search.html',
    '<div class="feed-container">\n' +
    '  <nav class="tabs search">\n' +
    '  \n' +
    '    <h2 class="resultsHeading">\n' +
    '      <span>Found {{total}} results for <strong>{{query}}</strong></span>\n' +
    '    </h2>\n' +
    '  \n' +
    '    <div class="center">\n' +
    '      <a href="" ui-sref="search(::{ filter: \'all\' })" ui-sref-opts="{reload: true, notify: true}" ng-class="{ active: currentSearchFilter === \'all\' }">All results</a>\n' +
    '    \n' +
    '      <a href="" ui-sref="search(::{ filter: focusedTab.name })" ui-sref-opts="{reload: true, notify: true}" ng-class="{ active: currentSearchFilter === focusedTab.name }">{{focusedTab.title}}</a>\n' +
    '      \n' +
    '      <!-- Repeat category tabs w/ ordering function -->\n' +
    '      <a href="" ng-repeat="nav in navTabs | orderBy:\'order\'" ui-sref="search(::{ filter: nav.name })" ui-sref-opts="{reload: true, notify: true}" ng-class="{ active: currentSearchFilter === nav.name }">{{nav.title}}</a>\n' +
    '    </div>\n' +
    '  \n' +
    '  </nav>\n' +
    '  \n' +
    '  <div class="search-page-container">\n' +
    '    <scrollable-feed items="items" ng-hide="errors.length" show-favorite>\n' +
    '      <scrollable-feed-no-data>\n' +
    '        <div id="oops" class="emptySearch">Nothing found</div>\n' +
    '      </scrollable-feed-no-data>\n' +
    '    </scrollable-feed>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '')
  $templateCache.put('modules/shorts/shorts.html',
    '<div class="blocker shorts">\n' +
    '\n' +
    '    <i class="icon-muzlitv"></i>\n' +
    '\n' +
    '    <a ng-click="closeVideoPreview($event)" class="close">\n' +
    '        <i class="icon-close"></i>\n' +
    '    </a>\n' +
    '\n' +
    '    <div class="flex-container {{videoType}}">\n' +
    '\n' +
    '        <div class="frame" ng-if="!shorts.length">\n' +
    '            <div class="iframe-placeholder">\n' +
    '                <div class="preloader-wrapper active" ng-if="!item.renderIframe">\n' +
    '                    <div class="spinner-layer" [ngStyle]="{\'border-color\': color}">\n' +
    '                        <div class="circle-clipper left">\n' +
    '                        <div class="circle"></div>\n' +
    '                        </div><div class="gap-patch">\n' +
    '                        <div class="circle"></div>\n' +
    '                        </div><div class="circle-clipper right">\n' +
    '                        <div class="circle"></div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div ng-repeat="item in shorts" class="frame">\n' +
    '            <iframe id="{{item.youtube}}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" webkitallowfullscreen=""\n' +
    '                mozallowfullscreen="" ng-src="{{::item.embedUrl}}" \n' +
    '                iframe-onload="registerLoad($index, item)"\n' +
    '                ng-if="item.renderIframe"\n' +
    '                click-outside="closeVideoPreview()"\n' +
    '            ></iframe>\n' +
    '            <div class="iframe-placeholder">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '')
  $templateCache.put('modules/sources/welcome-safari.html',
    '<div class="blocker welcome safari">\n' +
    '	<div class="split">\n' +
    '		<video src="https://files.muzli.cloud/muzli5.mp4" autoplay>\n' +
    '	</div>\n' +
    '	<div class="split">\n' +
    '		<h2>Make muzli your Homepage</h2>\n' +
    '		<p>\n' +
    '			Muzli is designed to serve as your Homepage! <br>\n' +
    '			To get the full experience, you need to set <strong>https://safari.muz.li/</strong> as your default Homepage manually, by following instructions.\n' +
    '		</p>\n' +
    '		<ul>\n' +
    '			<li>Click <strong>“Safari" ⇒ "Preferences”</strong> in the menu on the top-left corner of the screen.</li>\n' +
    '			<li>Select the <strong>“General”</strong> tab on the Preferences pop up window.</li>\n' +
    '			<li>Choose <strong>"Homepage"</strong> in the “New windows open with” drop down.</li>\n' +
    '			<li>Choose <strong>"Homepage"</strong> in the “New tab open with” drop down.</li>\n' +
    '			<li>Type <strong click-copy="https://safari.muz.li/" title="{{copySuccess ? \'Copied\' : \'Copy to clipboard\'}}" title-top="true">https://safari.muz.li/ <i class="icon-copy"></i></strong> in the “Homepage” text box and press ⏎ Return.</li>\n' +
    '			<li>Close the preferences window, and <strong>open a New tab</strong></li>\n' +
    '		</ul>\n' +
    '	\n' +
    '		<button class="cta" ng-click="$state.go(\'all\')">Got it!</button>\n' +
    '		<a href="" ng-click="$state.go(\'all\')">I\'ll do it later</a>\n' +
    '	</div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('modules/sources/welcome.html',
    '<div class="blocker welcome" ng-controller="welcomeController">\n' +
    '	\n' +
    '	<div class="frame">\n' +
    '		\n' +
    '		<div class="content">\n' +
    '			<i class="icon-muzli"></i>\n' +
    '		\n' +
    '			<h2>Welcome to Muzli, your new tab!</h2>\n' +
    '			<p>Muzli is new-tab, design-oriented magazine that surfaces the most inspiring and engaging content out there.</p>\n' +
    '			\n' +
    '			<button class="cta" ng-click="nextFrame(\'welcome\')">Let\'s go!</button>\n' +
    '		</div>\n' +
    '		\n' +
    '		\n' +
    '		<div class="bg">\n' +
    '			<div class="face face-1"></div>\n' +
    '			<div class="face face-2"></div>\n' +
    '			<div class="face face-3"></div>\n' +
    '		</div>\n' +
    '	\n' +
    '	</div>\n' +
    '\n' +
    '\n' +
    '	<div class="frame">\n' +
    '		<h3>Choose the type of content you want Muzli to focus on</h3>\n' +
    '		<p>Don\'t worry, you can always change it later and we\'ll make sure you won\'t miss the big things.</p>\n' +
    '		\n' +
    '		<ul class="bundles">\n' +
    '			<li ng-class="{active: activeBundle === \'design\'}">\n' +
    '				<i class="icon-check"></i>\n' +
    '				<a href="" ng-click="selectBundle(\'design\', false, true)">Design & inspiration</a>\n' +
    '			</li>\n' +
    '			<li ng-class="{active: activeBundle === \'tech\'}">\n' +
    '				<i class="icon-check"></i>\n' +
    '				<a href="" ng-click="selectBundle(\'tech\', false, true)">Technology & code</a>\n' +
    '			</li>\n' +
    '			<li ng-class="{active: activeBundle === \'news\'}">\n' +
    '				<i class="icon-check"></i>\n' +
    '				<a href="" ng-click="selectBundle(\'news\', false, true)">News & business</a>\n' +
    '			</li>\n' +
    '			<li ng-class="{active: activeBundle === \'culture\'}">\n' +
    '				<i class="icon-check"></i>\n' +
    '				<a href="" ng-click="selectBundle(\'culture\', false, true)">Culture</a>\n' +
    '			</li>\n' +
    '		</ul>\n' +
    '\n' +
    '		<button class="cta" ng-click="nextFrame(\'save-focus\')">Save</button>\n' +
    '\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="frame last">\n' +
    '\n' +
    '		<div class="auth" is-eu-user>\n' +
    '\n' +
    '			<h3>Sign in or Create an account to save your content preferences and fully enjoy Muzli</h3>\n' +
    '			\n' +
    '			<div class="buttons">\n' +
    '				<a class="button google" href="" ng-click="v3SignIn(loginGoogle)">Sign up with Google</a>\n' +
    '				<a class="button facebook" href="" ng-click="v3SignIn(loginFacebook)">Sign up with Facebook</a>\n' +
    '				<a class="button twitter" href="" ng-click="v3SignIn(loginTwitter)">Sign up with Twitter</a>\n' +
    '				<a class="button email" href="" ng-click="v3SignIn(user.showEmailSignIn = true)"><i class="icon-email"></i>  Sign up with Email</a>\n' +
    '				\n' +
    '				<a class="skip" ng-click="skipSignIn()" ng-if="user.allowAnonymous">Try Muzli without signing up</a>\n' +
    '				\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="notes">\n' +
    '				<p>\n' +
    '					By signing in I agree to Muzli\'s <a href="https://muz.li/terms" target="_blank">Terms of Service</a> and <a href="https://muz.li/privacy" target="_blank">Privacy Policy</a>.\n' +
    '				</p>\n' +
    '				<p>\n' +
    '					<strong>We\'ll never</strong> post to Twitter, Facebook or Google on your behalf or without permission.\n' +
    '				</p>\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="auth-email" ng-if="user.showEmailSignIn == true">\n' +
    '			    <dialog ng-include="\'templates/dialog.email.html\'" class="auth-email" ng-if="true" click-outside="user.showEmailSignIn = false" ng-controller="emailAuthController" ng-cloak></dialog>\n' +
    '			</div>\n' +
    '\n' +
    '		</div>\n' +
    '\n' +
    '\n' +
    '	</div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '')
  $templateCache.put('modules/speed-dial/speed-dial.html',
    '<div class="blocker speed-dial-page">\n' +
    '\n' +
    '    <a href="/" ui-sref="all" class="close">\n' +
    '        <i class="icon-close"></i>\n' +
    '    </a>\n' +
    '\n' +
    '    <div class="settings-container">\n' +
    '\n' +
    '        <div class="settings">\n' +
    '            <h1>Customize Speed Dial</h1>\n' +
    '            <p>On this side you can select the links you see in your new tab.</p>\n' +
    '\n' +
    '            <section ng-if="!speedDial.hasPermissions.topSites">\n' +
    '\n' +
    '                <h2>Import links from your browser</h2>\n' +
    '\n' +
    '                <div class="container">\n' +
    '                    <p>Use your frequently visited sites (same as your browser\'s new tab)</p>\n' +
    '                    <div class="cta large">\n' +
    '                        <button ng-click="requestPermissions(\'topSites\')"><i class="icon-time-hollow"></i> Import most visited links</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            \n' +
    '            </section>\n' +
    '\n' +
    '            <section ng-if="speedDial.hasPermissions.topSites">\n' +
    '                <h2>Import links from your browser</h2>\n' +
    '\n' +
    '                <div class="section-header">\n' +
    '                    <div>\n' +
    '                        <span><i class="icon-time-hollow pane-icon"></i> Most visited websites ({{topSites.length}})</span>\n' +
    '                        <p>Add sites you frequently visit.</p>\n' +
    '                    </div>\n' +
    '                    <label class="switch" ng-if="speedDial.hasMostVisitedAdded">\n' +
    '                        <input class="preventBlur" type="checkbox" ng-model="speedDial.showMostVisitedList"\n' +
    '                            ng-change="toggleMostVisited(speedDial.showMostVisitedList)">\n' +
    '                        <span class="slider"></span>\n' +
    '                    </label>\n' +
    '                    <div class="cta" ng-if="!speedDial.hasMostVisitedAdded">\n' +
    '                        <button ng-click="toggleMostVisited(true)">Add</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="section-content" ng-class="{hidden: !speedDial.showMostVisitedList}">\n' +
    '                    <ul>\n' +
    '                        <li ng-repeat="link in topSites track by $index" \n' +
    '                            ng-click="toggleLink(link)"\n' +
    '                            ng-class="{\n' +
    '                                active: isLinkActive(link)\n' +
    '                            }">\n' +
    '\n' +
    '                            <img ng-if="link.imgUrl" src="{{link.imgUrl}}" alt="{{link.url}}">\n' +
    '                            <span>{{link.title}}</span>\n' +
    '                            <i class="icon-check"></i>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </section>\n' +
    '\n' +
    '            <section ng-if="!speedDial.hasPermissions.bookmarks">\n' +
    '\n' +
    '                <div class="container">\n' +
    '                    <p>Import links from your Bookmarks bar.</p>\n' +
    '                    <div class="cta large">\n' +
    '                        <button ng-click="requestPermissions(\'bookmarks\')"><i class="icon-favorite-hollow"></i> Import bookmarks bar</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </section>\n' +
    '\n' +
    '\n' +
    '            <section ng-if="speedDial.hasPermissions.bookmarks">\n' +
    '\n' +
    '                <div class="section-header">\n' +
    '                    <div>\n' +
    '                        <span><i class="icon-fav-hollow pane-icon"></i> Your Bookmarks bar ({{bookmarks.length}})</span>\n' +
    '                        <p>Add links from your Bookmarks Bar.</p>\n' +
    '                    </div>\n' +
    '                    <label class="switch" ng-if="speedDial.hasBookmarksAdded">\n' +
    '                        <input class="preventBlur" type="checkbox" ng-model="speedDial.showBookmarksList"\n' +
    '                            ng-change="toggleBookmarks(speedDial.showBookmarksList)">\n' +
    '                        <span class="slider"></span>\n' +
    '                    </label>\n' +
    '                    <div class="cta" ng-if="!speedDial.hasBookmarksAdded">\n' +
    '                        <button ng-click="toggleBookmarks(true)">Add</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="section-content" ng-class="{hidden: !speedDial.showBookmarksList}">\n' +
    '                    <ul>\n' +
    '                        <li ng-repeat="link in bookmarks track by $index" \n' +
    '                            ng-click="toggleLink(link)"\n' +
    '                            ng-class="{\n' +
    '                                active: isLinkActive(link)\n' +
    '                            }">\n' +
    '\n' +
    '                            <img ng-if="link.imgUrl" src="{{link.imgUrl}}" alt="{{link.url}}">\n' +
    '                            <span>{{link.title || link.url}}</span>\n' +
    '                            <i class="icon-check"></i>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '            </section>\n' +
    '\n' +
    '            <section>\n' +
    '                <h2>Manually add links</h2>\n' +
    '\n' +
    '                <form ng-submit="::addCustomLink(newLink.link, $event)" id="linkForm">\n' +
    '\n' +
    '                    <input tabindex="1" type="url" ng-model="newLink.link" placeholder="Enter page URL"\n' +
    '                        name="newLink.link" />\n' +
    '                        \n' +
    '                    <p class="error" ng-if="badUrl">Please provide a valid link</p>\n' +
    '\n' +
    '                    <div class="cta relative">\n' +
    '                        <button type="submit">Add</button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </form>\n' +
    '\n' +
    '                <ul>\n' +
    '                    <li ng-repeat="link in speedDialLinks | filter: { type: \'custom\' } track by $index">\n' +
    '                        <img src="{{link.icon}}" alt="{{link.url}}">\n' +
    '                        <span>{{link.url}}</span>\n' +
    '                        <i class="icon-close" ng-click="removeLink(link)"></i>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '\n' +
    '                <small class="privacy"><i class="icon-lock"></i> We care about your privacy. We do not track your\n' +
    '                    browsing activity.</small>\n' +
    '            </section>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="preview">\n' +
    '\n' +
    '        <div class="overlay" ng-if="currentEditLink"></div>\n' +
    '        <dialog ng-if="currentEditLink" click-outside="::closeLinkModal()">\n' +
    '            <form id="linkForm" ng-submit="::saveLink()">\n' +
    '                \n' +
    '                <h1>Edit link</h1>\n' +
    '                \n' +
    '                <input tabindex="1" type="text" ng-model="currentEditLink.title" placeholder="Link title" name="linkTitle" autofocus="100"/>\n' +
    '                <input tabindex="1" type="text" ng-model="currentEditLink.url" placeholder="Link URL" name="linkUrl"/>\n' +
    '                \n' +
    '                <h3 class="error" ng-if="emptyError">Please provide a link</h3>\n' +
    '                \n' +
    '                <div class="cta">\n' +
    '                    <button type="submit">Done</button>\n' +
    '                </div>\n' +
    '        \n' +
    '            </form>\n' +
    '        </dialog>\n' +
    '\n' +
    '\n' +
    '        <div class="content">\n' +
    '            <h2>Muzli Speed Dial</h2>\n' +
    '            <p>Just like in your original New Tab Page, you can select any links you want to see when you open a new tab. Or leave it empty for a super clean look.</p>\n' +
    '        </div>\n' +
    '\n' +
    '        <style>\n' +
    '            :root {\n' +
    '                --items-per-row: {{ speedDialItemsPerRow }};\n' +
    '            }\n' +
    '        </style>\n' +
    '\n' +
    '        <div class="home-title speed-dial">\n' +
    '\n' +
    '            <div class="speed-dial">\n' +
    '\n' +
    '                <ul ng-if="speedDialLinks.length" ui-sortable="speedDialSortableOptions" ng-model="speedDialLinks" ng-cloak>\n' +
    '\n' +
    '                    <li ng-repeat="link in speedDialLinks track by $index"\n' +
    '                        ng-class="{error: site.error}">\n' +
    '\n' +
    '                        <a ng-click="events.speedDial.click(link.url)" title=\'{{link.url}}\'>\n' +
    '                            <div ng-if="link.iconFallback === \'server\'" class="icon server"></div>\n' +
    '							<div ng-if="link.iconFallback === \'file\'" class="icon file"></div>\n' +
    '							<div ng-if="link.iconFallback === \'monogram\'" class="icon monogram">{{(link.title || link.domain).charAt(0)}}</div>\n' +
    '                            <div ng-if="!link.iconFallback" class="icon image">\n' +
    '								<img src="{{link.icon}}" sd-image-fallback />\n' +
    '							</div>\n' +
    '							<p>{{link.title || link.domain || link.url}}</p>\n' +
    '                        </a>\n' +
    '\n' +
    '                        <i class="icon-close" ng-click="removeLink(link)"></i>\n' +
    '                        <i class="icon-edit" ng-click="editLink(link)"></i>\n' +
    '                    </li>\n' +
    '\n' +
    '                </ul>\n' +
    '\n' +
    '                <ul ng-if="!speedDialLinks.length" ng-cloak class="placeholder">\n' +
    '                    <li ng-repeat="link in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] track by $index">\n' +
    '                        <a>\n' +
    '                            <div class="icon"></div>\n' +
    '                            <p></p>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="cta large">\n' +
    '            <button ng-click="saveSpeedDial()" ng-class="{empty: !speedDialLinks.length}">{{speedDialLinks.length ? \'Looks good\' : \'Do not use Speed Dial\'}}</button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="options">\n' +
    '            <label class="switch" ng-click="checkAnonymous($event)" ng-class="{disabled: user.anonymous}">\n' +
    '                <input class="preventBlur" type="checkbox" ng-model="syncSDLinks" ng-change="onsyncSDLinksChange()" ng-disabled="user.anonymous">\n' +
    '                <span class="slider"></span>\n' +
    '            </label>\n' +
    '            <div>\n' +
    '                <p>Sync links with your Muzli account</p>\n' +
    '                <p class="info">\n' +
    '                    <small ng-if="!syncSDLinks && !showSignInPrompt">Your links are saved locally right now. They will be lost if you reinstall your browser or Muzli.</small>\n' +
    '                    <small ng-if="syncSDLinks && !showSignInPrompt"><i class="icon-lock"></i> Your links are synched with your Muzli account. We will keep them encrypted for extra security.</small>\n' +
    '                    <small ng-if="showSignInPrompt">You have to <a href="" ui-sref="sign-in({returnTo: \'speed-dial\'})">sign-in</a> to sync links.</small>\n' +
    '                </p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<style>\n' +
    '</style>')
  $templateCache.put('modules/user/favorites.html',
    '<div class="feed-container">\n' +
    '  <div class="feed-title">\n' +
    '    <h2>Your Saved Items <span ng-show="user && user.favoriteCount"></h2>\n' +
    '      <a href="" ng-hide="showFavoritesClearAll" class="clearAllStarred pull-right" ng-click="showFavoritesClearAll = true">Delete all</a>\n' +
    '      <div class="confirm pull-right" ng-show="showFavoritesClearAll">Are you sure you want to delete all your saved items? <span class="true" ng-click="clearAllFavorites()">Yes</span> or <span class="false" ng-click="showFavoritesClearAll = false">Cancel</span></div></span>\n' +
    '  </div>\n' +
    '  \n' +
    '  <scrollable-feed items="items" ng-hide="errors.length" load-on-sort check-delete-length>\n' +
    '    <scrollable-feed-no-data>\n' +
    '      <div class="noFavs">\n' +
    '        <h5>You have no items you like yet</h5>\n' +
    '      </div>\n' +
    '    </scrollable-feed-no-data>\n' +
    '  </scrollable-feed>\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/auth.html',
    '<div class="blocker welcome auth overlay">\n' +
    '  \n' +
    '  <div class="auth-email" ng-if="user.showEmailSignIn == true">\n' +
    '    <dialog ng-include="\'templates/dialog.email.html\'" class="auth-email" ng-if="true" click-outside="user.showEmailSignIn = false" ng-controller="emailAuthController" ng-cloak></dialog>\n' +
    '  </div>\n' +
    '  \n' +
    '  <div class="frame">\n' +
    '\n' +
    '    <a href="" ui-sref="all" class="close" ng-if="!user.hasUserLogin && user.allowAnonymous">\n' +
    '      <i class="icon-close"></i>\n' +
    '    </a>\n' +
    '\n' +
    '    <div ng-if="user.hasUserLogin">\n' +
    '\n' +
    '      <p>Sign back in to fetch your preferences.</p>\n' +
    '      \n' +
    '      <div class="buttons">\n' +
    '        <a class="button google" href="" ng-click="loginGoogle()" ng-if="!user.provider || user.provider === \'google\'">Sign in with Google</a>\n' +
    '        <a class="button facebook" href="" ng-click="loginFacebook()" ng-if="!user.provider || user.provider === \'facebook\'">Sign in with Facebook</a>\n' +
    '        <a class="button twitter" href="" ng-click="loginTwitter()" ng-if="!user.provider || user.provider === \'twitter\'">Sign in with Twitter</a>\n' +
    '        <a class="button email" href="" ng-click="user.showEmailSignIn = true" ng-if="!user.provider || user.provider === \'email\'"><i class="icon-email"></i>  Sign in with Email</a>\n' +
    '      </div>\n' +
    '\n' +
    '      <p>Other Sign In options:</p>\n' +
    '      <div class="buttons alt-auth" ng-if="user.provider">\n' +
    '        <i class="icon-google" ng-click="loginGoogle()" ng-if="user.provider !== \'google\'"></i>\n' +
    '        <i class="icon-facebook" ng-click="loginFacebook()" ng-if="user.provider !== \'facebook\'"></i>\n' +
    '        <i class="icon-twitter" ng-click="loginTwitter()" ng-if="user.provider !== \'twitter\'"></i>\n' +
    '        <i class="icon-email" ng-click="user.showEmailSignIn = true" ng-if="user.provider !== \'email\'"></i>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="notes">\n' +
    '        <p><strong>We\'ll never</strong> post to Twitter, Facebook or Google on your behalf or without permission.</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="!user.hasUserLogin" is-eu-user>\n' +
    '\n' +
    '      <p>Create an account to unlock all the benefits of Muzli - easily save, like, or submit your favorite content.</p>\n' +
    '      \n' +
    '      <div class="buttons">\n' +
    '        <a class="button google" href="" ng-click="loginGoogle()">Sign up with Google</a>\n' +
    '        <a class="button facebook" href="" ng-click="loginFacebook()">Sign up with Facebook</a>\n' +
    '        <a class="button twitter" href="" ng-click="loginTwitter()">Sign up with Twitter</a>\n' +
    '\n' +
    '        <span class="separator"></span>\n' +
    '\n' +
    '        <a class="button email" href="" ng-click="user.showEmailSignIn = true"><i class="icon-email"></i> Sign up via Email</a>\n' +
    '        \n' +
    '      </div>\n' +
    '\n' +
    '      <div class="notes">\n' +
    '        <p>\n' +
    '          By signing in I agree to Muzli\'s <a href="https://muz.li/terms" target="_blank">Terms of Service</a> and <a href="https://muz.li/privacy" target="_blank">Privacy Policy</a>.\n' +
    '        </p>\n' +
    '        <p>\n' +
    '          <strong>We\'ll never</strong> post to Twitter, Facebook or Google on your behalf or without permission.\n' +
    '        </p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="bg">\n' +
    '      <div class="face face-1"></div>\n' +
    '      <div class="face face-3"></div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/dialog.advertise.html',
    '<div class="wrapper">\n' +
    '\n' +
    '  <style>\n' +
    '    .advertise {\n' +
    '      padding: 40px;\n' +
    '    }\n' +
    '  </style>\n' +
    '\n' +
    '  <h1>Why I am seeing Ads on Muzli?</h1>\n' +
    '\n' +
    '  <p>\n' +
    '    We understand that ads may be disruptive, but for now, it\'s our way to cover server expenses and keep Muzli free for everyone. \n' +
    '    Our team endeavor to curate ads that are relevant to the design community and are non-intrusive. \n' +
    '  </p>\n' +
    '  <!-- <p>\n' +
    '    Thank you for being a part of the Muzli family!\n' +
    '  </p> -->\n' +
    '\n' +
    '  <h2>Are ads too annoying?</h2>\n' +
    '\n' +
    '  <div class="cta first">\n' +
    '    <a href="" ng-click="vm.showAdsDialog = false; $state.go(\'all.referral\');">Invite friends to Remove ads</a>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<div class="wrapper">\n' +
    '  <h2>Advertising on Muzli</h2>\n' +
    '  <p>\n' +
    '    If you are looking for a way to reach hundreds of thousands of creatives within the Muzli ecosystem, we offer multiple tiers of the promotion options.\n' +
    '  </p>\n' +
    '\n' +
    '  <div class="cta">\n' +
    '    <a href="https://muz.li/advertisers/">Explore Partnership options</a>\n' +
    '    <a class="secondary" href="https://advertise.muz.li/checkout/new">Buy Ads on Muzli directly</a>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '')
  $templateCache.put('templates/dialog.blocker.html',
    '<div class="wrapper" ng-if="!blocker.loading">\n' +
    '  <div class="avatar">\n' +
    '    <span class="icon-muzli" ng-if="::!blocker.avatar"></span>\n' +
    '    <img ng-src="{{blocker.avatar}}" alt="{{blocker.name}}" ng-if="::blocker.avatar">\n' +
    '  </div>\n' +
    '  <h4>{{blocker.name}}</h4>\n' +
    '  <p>{{blocker.content}}</p>\n' +
    '  <button ng-click="updateExtension($event)"><i class="icon-refresh"></i>UPDATE NOW</button>\n' +
    '</div>\n' +
    '<div class="wrapper" ng-if="blocker.loading">\n' +
    '  <div class="avatar">\n' +
    '    <div class="spinner"></div>\n' +
    '  </div>\n' +
    '  <h4>Just one moment...</h4>\n' +
    '  <p>\n' +
    '    This notification should disappear automatically after the update. If it doesn\'t - try reloading this tab.\n' +
    '    <br>\n' +
    '    <small>\n' +
    '      Still not updating?\n' +
    '      <a href="https://medium.muz.li/how-to-update-muzli-for-the-latest-version-5f237dd7f18a" target="_bank">\n' +
    '      Update manually\n' +
    '      </a>\n' +
    '    </small>\n' +
    '  </p>\n' +
    '</div>')
  $templateCache.put('templates/dialog.create.html',
    '<div class="wrapper" ng-if="!isLoading" ng-cloak>\n' +
    '\n' +
    '  <form ng-submit="::submitItem(item.link, $event)" id="itemForm">\n' +
    '\n' +
    '    <h1>Share something great with us</h1>\n' +
    '    <p>New and awesome design content will be added to our network, and may even end up on the Muzli Picks feed.</p>\n' +
    '    \n' +
    '    <input tabindex="1" type="text" ng-model="item.link" placeholder="Page URL" name="itemLink" autofocus="400"/>\n' +
    '    \n' +
    '\n' +
    '\n' +
    '    <h3 class="error" ng-if="displayError">{{displayError}}</h3>\n' +
    '    <h3 class="error" ng-if="existingUrl">You can check out the existing link <a href="{{existingUrl}}" target="_blank">here</a>.</h3>\n' +
    '\n' +
    '    <label>\n' +
    '      <input type="checkbox" ng-model="item.ownContent" ng-true-value="true" ng-false-value="false">\n' +
    '      <span class="checkbox"><i class="icon-check"></i></span>\n' +
    '      <span>I’ve created this</span>\n' +
    '    </label>\n' +
    '    \n' +
    '    <div class="cta">\n' +
    '      <button type="submit" ng-disabled="!item.ownContent">Share</button>\n' +
    '    </div>\n' +
    '\n' +
    '  </form>\n' +
    '\n' +
    '  <div class="guidelines">\n' +
    '    <h3>Sharing guidelines</h3>\n' +
    '    <p> We accept quality design/visual projects, animations, 3D, UI/UX prototypes, or any other visual design project.</p>\n' +
    '    <p>We don’t accept content that is promotional, copyrighted, trademarked, or inappropriate.</p>\n' +
    '    <p>Read the full <a href="http://muz.li/content-guidelines/" target="_blank">content guidelines</a></p>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<div class="loading" ng-if="isLoading" ng-cloak>\n' +
    '\n' +
    '  <div class="loader">\n' +
    '\n' +
    '    <h1>Fetching content, please hold...</h1>\n' +
    '\n' +
    '    <div class="preloader-wrapper active">\n' +
    '      <div class="spinner-layer" [ngStyle]="{\'border-color\': color}">\n' +
    '        <div class="circle-clipper left">\n' +
    '          <div class="circle"></div>\n' +
    '        </div><div class="gap-patch">\n' +
    '          <div class="circle"></div>\n' +
    '        </div><div class="circle-clipper right">\n' +
    '          <div class="circle"></div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '</div>')
  $templateCache.put('templates/dialog.discord.html',
    '<div class="wrapper discord-modal" ng-cloak>\n' +
    '\n' +
    '  <h1>Reach us out on Muzli Community Discord</h1>\n' +
    '\n' +
    '  <p>Come on over and join our Discord server! It\'s a great place to connect with us and meet other creative folks.</p>\n' +
    '\n' +
    '  <div class="cta">\n' +
    '    <a href="https://discord.gg/JufdrnxpyA" target="_blank"><i class="icon-discord"></i> Join Muzli on Discord</a>\n' +
    '  </div>\n' +
    '  \n' +
    '  <p>\n' +
    '    Here\'s what you can do in our Discord server:\n' +
    '    <ul>\n' +
    '      <li>Share your creative projects with the community <a href="https://discord.com/channels/1122528345716957347/1122528346258026508" target="_blank">#general</a></li>\n' +
    '      <li>Recommend content ideas for Muzli <a href="https://discord.com/channels/1122528345716957347/1122533610285703189" target="_blank">#content-suggestions</a></li>\n' +
    '      <li>Suggest new features <a href="https://discord.com/channels/1122528345716957347/1122532913024618595" target="_blank">#feature-requests</a></li>\n' +
    '      <li>Let us know if you find any bugs <a href="https://discord.com/channels/1122528345716957347/1122533096382795777" target="_blank">#bug-reports</a></li>\n' +
    '      <li>Find or post about creative job opportunities <a href="https://discord.com/channels/1122528345716957347/1122533495802171512" target="_blank">#jobs</a></li>\n' +
    '    </ul>\n' +
    '  </p>\n' +
    '\n' +
    '  <p>\n' +
    '    <small>Keep in mind that we\'re based in European time zones, so we might not be online right when you are, but we\'ll do our best to respond to you. Looking forward to chatting with you!</small>\n' +
    '  </p>\n' +
    '\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/dialog.email.html',
    '<div class="wrapper" ng-if="!isLoading" ng-cloak>\n' +
    '\n' +
    '  <!-- Sign In -->\n' +
    '  <form ng-submit="::emailSignUp(signUpModel, $event)" class="sign-in" id="sign-in-form" ng-if="state === \'sign-in\'">\n' +
    '\n' +
    '    <p>Welcome back!</p>\n' +
    '\n' +
    '    <p class="small">Enter your email to continue…</p>\n' +
    '    \n' +
    '    <input type="email" ng-model="signUpModel.email" placeholder="Your Email" name="email" required autofocus="400"/>\n' +
    '    \n' +
    '    <p class="error" ng-if="doesNotExist">Oops, it seems account with such email does not exist.</p>\n' +
    '    \n' +
    '    <button type="submit" class="cta">Continue</button>\n' +
    '\n' +
    '    <a href="" class="toggle-signin" ng-click="switchState(\'sign-up\', $event, $event)">I\'m new to Muzli</a>\n' +
    '\n' +
    '  </form>\n' +
    '  \n' +
    '\n' +
    '  <!-- Sign Up -->\n' +
    '  <form ng-submit="::emailSignUp(signUpModel, $event)" id="sign-up-form" ng-if="state === \'sign-up\'" is-eu-user>\n' +
    '\n' +
    '    <p>Enter your email to Sign up</p>\n' +
    '    \n' +
    '    <input type="text" ng-model="signUpModel.name" placeholder="Your Name" name="name" required autofocus="400"/>\n' +
    '    <input type="email" ng-model="signUpModel.email" placeholder="Email" name="email" required />\n' +
    '    \n' +
    '    <button type="submit" class="cta">Sign Up</button>\n' +
    '\n' +
    '    <a href="" class="toggle-signin" ng-click="switchState(\'sign-in\', $event)">I already have Muzli account</a>\n' +
    '\n' +
    '  </form>\n' +
    '\n' +
    '\n' +
    '  <!-- Verify -->\n' +
    '  <form ng-submit="::emailVerify(signUpModel, $event)" id="sign-in-form" ng-if="state === \'verify\'">\n' +
    '\n' +
    '    <p>Verify your email</p>\n' +
    '\n' +
    '    <p class="small">We just sent your activation code to <strong>{{signUpModel.email}}</strong><br>Enter the code below to confirm your email address.</p>\n' +
    '    \n' +
    '    <div class="verify" verify-input>\n' +
    '      <input type="text" ng-model="signUpModel.verification[0]" placeholder="0" name="verification1" autofocus="400"/>\n' +
    '      <input type="text" ng-model="signUpModel.verification[1]" placeholder="0" name="verification2"/>\n' +
    '      <input type="text" ng-model="signUpModel.verification[2]" placeholder="0" name="verification3"/>\n' +
    '      <input type="text" ng-model="signUpModel.verification[3]" placeholder="0" name="verification4"/>\n' +
    '      <input type="text" ng-model="signUpModel.verification[4]" placeholder="0" name="verification5"/>\n' +
    '      <input type="text" ng-model="signUpModel.verification[5]" placeholder="0" name="verification6"/>\n' +
    '    </div>\n' +
    '\n' +
    '    <p class="error" ng-if="tooManyAttempts">That\'s too many attempts for your code. Try Sign In later.</p>\n' +
    '    <p class="error" ng-if="badVerification">Incorrect code.</p>\n' +
    '    \n' +
    '    <button type="submit" class="cta">Done</button>\n' +
    '\n' +
    '    <small>Make sure to keep this window open while <br> you check your inbox. \n' +
    '        <a href="" ng-click="::emailResend($event)" ng-if="!signUpModel.isResending">Resend code</a>\n' +
    '        <strong ng-if="signUpModel.isResending">Code was sent again, check your inbox.</strong>\n' +
    '    </small>\n' +
    '\n' +
    '  </form>\n' +
    '\n' +
    '  <div class="notes">\n' +
    '    <p>\n' +
    '      By signing in I agree to Muzli\'s <a href="https://muz.li/terms" target="_blank">Terms of Service</a> and <a href="https://muz.li/privacy" target="_blank">Privacy Policy</a>.\n' +
    '    </p>\n' +
    '    <p>\n' +
    '      <strong>We\'ll never</strong> post to Twitter, Facebook or Google on your behalf or without permission.\n' +
    '    </p>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<div class="loading" ng-if="isLoading" ng-cloak>\n' +
    '\n' +
    '  <div class="loader">\n' +
    '\n' +
    '    <h1>Fetching content, please hold...</h1>\n' +
    '\n' +
    '    <div class="preloader-wrapper active">\n' +
    '      <div class="spinner-layer" [ngStyle]="{\'border-color\': color}">\n' +
    '        <div class="circle-clipper left">\n' +
    '          <div class="circle"></div>\n' +
    '        </div><div class="gap-patch">\n' +
    '          <div class="circle"></div>\n' +
    '        </div><div class="circle-clipper right">\n' +
    '          <div class="circle"></div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '</div>')
  $templateCache.put('templates/dialog.keep-it-prep.html',
    '<div class="wrapper">\n' +
    '  <h1>Keep Muzli as your default tab</h1>\n' +
    '  <p>\n' +
    '    <strong>Quick tip:</strong> next time you open your new tab, Google will ask you to "Change back to Google"\n' +
    '    <br>\n' +
    '    To fully experience Muzli, make sure to select <strong>“Keep it”</strong> to maintain it as your default choice.\n' +
    '  </p>\n' +
    '  <div class="arrow-container">\n' +
    '    <img src="images/keep_it_prep.png" alt="Keep it">\n' +
    '    <i class="icon-arrow-curly"></i>\n' +
    '  </div>\n' +
    '  <div class="cta">\n' +
    '    <a href="" ng-click="vm.showKeepItPrepDialog = false;">Got it</a>\n' +
    '  </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/dialog.keep-it.html',
    '<div class="wrapper">\n' +
    '  <div class="cta" ng-click="vm.showKeepItDialog = false">Already did that!</div>\n' +
    '  <img src="images/keep_it.png" alt="">  \n' +
    '  <div class="flex">\n' +
    '    <i class="icon-muzli"></i>\n' +
    '    <div>\n' +
    '      <p>Muzli - Design inspiration hub</p>\n' +
    '      <h2>Click “Keep it”</h2>\n' +
    '    </div>\n' +
    '    <button ng-click="vm.showKeepItDialog = false">Keep it</button>\n' +
    '  </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/ftx.walktrough.html',
    '<div class="ftx-tip sidebar-promo fade-in" ng-if="vm.showFtx === \'sidebar\' && !flags.useAnonymousSources" click-outside="vm.showFtx = false" ng-cloak>\n' +
    '	<h3>Add or remove shortcuts for quickly accessing your favorite channels.</h3>\n' +
    '	<p>We already have added some, based on content preferences you have previously selected.</p>\n' +
    '</div>\n' +
    '\n' +
    '<div class="ftx-tip sidebar-promo fade-in" ng-if="vm.showFtx === \'sidebar\' && flags.useAnonymousSources" ng-cloak>\n' +
    '	<h3>You can customize all the content you see</h3>\n' +
    '	<p>\n' +
    '		Here, you can turn specific content sources on and off. <br/>\n' +
    '		We\'ve already turned some on based on your content preferences.\n' +
    '	</p>\n' +
    '	<div class="controls">\n' +
    '		<a href="" ng-click="showFtx(\'scroll\')">Skip tutorial</a>\n' +
    '		<a href="" ng-click="showFtx(\'settings\');">Next</a>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="ftx-tip settings-promo fade-in" ng-if="vm.showFtx === \'settings\' && !flags.useAnonymousSources" click-outside="vm.showFtx = false" ng-class="{open: !menuOpen}" ng-cloak>\n' +
    '	<h3>Customize your preferences</h3>\n' +
    '	<p>You can change display settings, content preferences, add shortcuts to your most visited sites, change color theme and more...</p>\n' +
    '</div>\n' +
    '\n' +
    '<div class="ftx-tip settings-promo fade-in" ng-if="vm.showFtx === \'settings\' && flags.useAnonymousSources" ng-class="{open: !menuOpen}" ng-cloak>\n' +
    '	<h3>Customize your preferences</h3>\n' +
    '	<p>You can change display settings, content preferences, add shortcuts to your most visited sites, change color theme and more...</p>\n' +
    '	<div class="controls">\n' +
    '		<a href="" ng-click="showFtx(\'scroll\')">Skip tutorial</a>\n' +
    '		<a href="" ng-click="showFtx(\'scroll\')">Next</a>\n' +
    '	</div>\n' +
    '	<a class="user-icon" href="" ng-cloak ng-click="openMenu(null, $event)" title="Settings" ng-if="!menuOpen">\n' +
    '		<img class="avatar" ng-src="{{::user.photo}}" alt="" ng-if="user.photo" avatar-error />\n' +
    '		<i class="icon-user" ng-if="!user.photo"></i>\n' +
    '	</a>\n' +
    '</div>\n' +
    '\n' +
    '<div class="ftx-tip scroll-promo" ng-if="vm.showFtx === \'scroll\'" ng-cloak>\n' +
    '	<h3>You are all set!</h3>\n' +
    '	<p>Scroll down or click here to dive in and see more</p>\n' +
    '</div>\n' +
    '\n' +
    '<div class="ftx-tip speed-dial-promo" ng-if="vm.showFtx === \'speed-dial\'" click-outside="vm.showFtx = false" ng-cloak>\n' +
    '	<h3>Start here</h3>\n' +
    '	<p>This is the easiest way to keep the same links from your old New Tab page.</p>\n' +
    '	<div class="ftx-pop speed-dial-promo"></div>\n' +
    '</div>')
  $templateCache.put('templates/header.html',
    '<div class="logo-wrapper" click-outside="dropdownActive = false;">\n' +
    '\n' +
    '  <a class="logo" href="" ng-class="{active: dropdownActive}" prevent-click>\n' +
    '    <i class="icon-muzli" ng-click="clickLogo()"></i>\n' +
    '    <div class="title">\n' +
    '      <span>Muzli Inspiration</span>\n' +
    '      <i class="icon-play" ng-click="dropdownActive = !dropdownActive"></i>\n' +
    '    </div>\n' +
    '  </a>\n' +
    '\n' +
    '  <div class="dropdown">\n' +
    '    <ul ng-class="{active: dropdownActive}">\n' +
    '      <li class="link-search">\n' +
    '        <a href="https://search.muz.li"><i class="icon-muzli search"></i> <span>Search</span></a>\n' +
    '      </li>\n' +
    '      <li class="link-colors">\n' +
    '        <a href="https://colors.muz.li"><i class="icon-muzli colors"></i> <span>Colors</span></a>\n' +
    '      </li>\n' +
    '      <li class="link-collections">\n' +
    '        <a href="https://search.muz.li/inspiration/"><i class="icon-muzli collections"></i> <span>Collections</span></a>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<div class="search-container" \n' +
    '  ng-if="feedVisibleClass"\n' +
    '  ng-class="{ \'recent-sites\': recentSites.length }">\n' +
    '\n' +
    '  <form ng-submit="search(searchModel[activeSearch], $event, activeSearch)" id="searchForm">\n' +
    '\n' +
    '    <div class="input">\n' +
    '	\n' +
    '      <i class="icon-search"></i>\n' +
    '\n' +
    '      <input name="qMuzli"\n' +
    '        class="{{defaultSearch === \'muzli\' ? \'\' : \'secondary\'}}"\n' +
    '        tabindex="{{defaultSearch === \'muzli\' ? 3 : 4}}" \n' +
    '        placeholder="{{defaultSearch === \'muzli\' ? \'Search on Muzli\' : \'or Muzli\'}}" \n' +
    '        maxlength="50" \n' +
    '        type="text" \n' +
    '        ng-model="searchModel.muzli" \n' +
    '        ng-focus="setSearch(\'muzli\')" \n' +
    '        lookahead\n' +
    '        />\n' +
    '\n' +
    '      <input name="qGoogle" \n' +
    '        class="{{defaultSearch === \'web\' ? \'\' : \'secondary\'}}"\n' +
    '        tabindex="{{defaultSearch === \'web\' ? 3 : 4}}" \n' +
    '        placeholder="{{defaultSearch === \'web\' ? \'Search the Web\' : \'or Web\'}}" \n' +
    '        maxlength="50" \n' +
    '        type="text" \n' +
    '        ng-model="searchModel.google" \n' +
    '        ng-focus="setSearch(\'google\', $event)" \n' +
    '        lookahead\n' +
    '        />\n' +
    '\n' +
    '      <i class="icon-{{searchEngine}}" title="Customize search" ng-click="openMenu(\'scrollBottom\')" stop-propagation></i>\n' +
    '\n' +
    '      <input type="submit" />\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '  </form>\n' +
    '</div>\n' +
    '\n' +
    '<div class="nav">\n' +
    '\n' +
    '  <div class="nav-icon create" ng-click="toggleCreateModal($event)">\n' +
    '    <span class="link" title="Share something with us!">Submit your work</span>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="nav-icon favorites"\n' +
    '     ng-cloak\n' +
    '     ng-show="user && !user.anonymous"\n' +
    '     ng-click="::clickUser()"\n' +
    '     ng-class="{active: user.favoriteCount}"\n' +
    '     >\n' +
    '    <i class="icon icon-fav" title="Saved items"></i>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="nav-icon notifications" ng-class="{active: user.unreadNotificationCount}">\n' +
    '\n' +
    '    <div class="icon" ng-click="toggleNotifications()" title="Notifications">\n' +
    '      <i class="icon-notification"></i>\n' +
    '      <span class="count" ng-bind="user.unreadNotificationCount" ng-if="user.unreadNotificationCount" ng-cloak></span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="dropdown" ng-if="areNotificationsOpen" ng-cloak click-outside="toggleNotifications()" ng-class="{\'all-loaded\': notifications.length <= 4}">\n' +
    '\n' +
    '      <div class="title">\n' +
    '        <p class="pull-left">You have {{user.unreadNotificationCount || 0}} new message<span ng-if="user.unreadNotificationCount !== 1">s</span></p>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="messages">\n' +
    '        <ul scroll-events scroll-events-init="manual">\n' +
    '\n' +
    '          <li ng-repeat="notification in notifications | orderBy:\'-pushedAt\' | limitTo:notificationDisplayLimit " ng-class="{\n' +
    '            \'unread\': notification.isUnread,\n' +
    '            \'static\': notification.static\n' +
    '          }">\n' +
    '            <div class="avatar">\n' +
    '              <span class="icon-muzli" ng-if="::!notification.avatar"></span>\n' +
    '              <img ng-src="{{notification.avatar}}" alt="{{notification.name}}" ng-if="::notification.avatar">\n' +
    '            </div>\n' +
    '            <div class="message cf" ng-class="{\'has-image\': notification.itemImage}">\n' +
    '              <div class="timestamp">{{::notification.pushedAt | date:\'MMM d\'}}</div>\n' +
    '              <p bind-html-compile="notification.content"></p>\n' +
    '              <img ng-if="notification.itemImage" ng-src="{{::notification.itemImage}}" alt="{{::notification.name}}">\n' +
    '              <div class="cta" ng-if="notification.cta" bind-html-compile="notification.cta" ng-click="logNotificationCta(notification, $event)"></div>\n' +
    '            </div>\n' +
    '          </li>\n' +
    '\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="messages-empty" ng-if="!notifications.length">\n' +
    '        <span>There are no messages for you</span>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="footnote" ng-if="notifications.length > 4">\n' +
    '        <a href="" ng-click="showAllNotifications()">See all</a>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="nav-icon google-apps" ng-if="enableGoogleApps" ng-class="{active: areGoogleAppsOpen}">\n' +
    '\n' +
    '    <div class="icon" ng-click="toggleGoogleAppsDropdown()" title="Google Apps">\n' +
    '      <i class="icon-grid-small"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="dropdown apps" ng-if="areGoogleAppsOpen" ng-cloak click-outside="toggleGoogleAppsDropdown()">\n' +
    '      <div class="app-scroll">\n' +
    '        <ul>\n' +
    '          <li>\n' +
    '            <a href="https://myaccount.google.com/?utm_source=OGB&amp;utm_medium=app&amp;authuser=0">\n' +
    '              <span class="g-avatar" ng-if="user.photo && user.provider === \'google\'" ng-style="{\'background-image\': \'url(\' + user.photo + \')\'}"></span>\n' +
    '              <span ng-if="!user.photo || user.provider !== \'google\'" style="background-position: 0 460px;"></span>\n' +
    '              <h3>Account</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -406px;"></span>\n' +
    '              <h3>Search</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://business.google.com/?gmbsrc=ww-ww-ot-gs-z-gmb-l-z-h~z-ogb-u&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -2320px;"></span>\n' +
    '              <h3>Business Profile Manager</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://maps.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -1566px;"></span>\n' +
    '              <h3>Maps</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.youtube.com?authuser=0">\n' +
    '              <span style="background-position: 0 0;"></span>\n' +
    '              <h3>YouTube</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://gemini.google.com?authuser=0">\n' +
    '              <span style="background-position: 0 -464px;"></span>\n' +
    '              <h3>Gemini</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://news.google.com?authuser=0">\n' +
    '              <span style="background-position: 0 -348px;"></span>\n' +
    '              <h3>News</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://mail.google.com/mail/?authuser=0">\n' +
    '              <span style="background-position: 0 -2030px;"></span>\n' +
    '              <h3>Gmail</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://meet.google.com?hs=197&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -1102px;"></span>\n' +
    '              <h3>Meet</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://chat.google.com?authuser=0">\n' +
    '              <span style="background-position: 0 -1682px;"></span>\n' +
    '              <h3>Chat</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://contacts.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -696px;"></span>\n' +
    '              <h3>Contacts</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://drive.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -58px;"></span>\n' +
    '              <h3>Drive</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://calendar.google.com/calendar?authuser=0">\n' +
    '              <span style="background-position: 0 -2610px;"></span>\n' +
    '              <h3>Calendar</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://play.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -1972px;"></span>\n' +
    '              <h3>Play</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://translate.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -1218px;"></span>\n' +
    '              <h3>Translate</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://photos.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -1450px;"></span>\n' +
    '              <h3>Photos</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://myadcenter.google.com/?ref=app-launcher&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -986px;"></span>\n' +
    '              <h3>My Ad Centre</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.google.com/shopping?source=og&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -1856px;"></span>\n' +
    '              <h3>Shopping</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.google.com/finance?authuser=0">\n' +
    '              <span style="background-position: 0 -116px;"></span>\n' +
    '              <h3>Finance</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://docs.google.com/document/?usp=docs_alc&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -1392px;"></span>\n' +
    '              <h3>Docs</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://docs.google.com/spreadsheets/?usp=sheets_alc&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -1160px;"></span>\n' +
    '              <h3>Sheets</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://docs.google.com/presentation/?usp=slides_alc&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -2494px;"></span>\n' +
    '              <h3>Slides</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://books.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -522px;"></span>\n' +
    '              <h3>Books</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.blogger.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -2552px;"></span>\n' +
    '              <h3>Blogger</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://keep.google.com?authuser=0">\n' +
    '              <span style="background-position: 0 -2262px;"></span>\n' +
    '              <h3>Keep</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://classroom.google.com/?authuser=0">\n' +
    '              <span style="background-position: 0 -2436px;"></span>\n' +
    '              <h3>Classroom</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://earth.google.com/web/?authuser=0">\n' +
    '              <span style="background-position: 0 -754px;"></span>\n' +
    '              <h3>Earth</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.google.com/save?authuser=0">\n' +
    '              <span style="background-position: 0 -812px;"></span>\n' +
    '              <h3>Saved</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://artsandculture.google.com/?utm_source=ogs.google.com&amp;utm_medium=referral&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -580px;"></span>\n' +
    '              <h3>Arts and Culture</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://ads.google.com/home/?subid=ww-ww-xs-ip-awhc-a-ogb_cons!o2&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -290px;"></span>\n' +
    '              <h3>Google Ads</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://one.google.com?utm_source=app_launcher&amp;utm_medium=web&amp;utm_campaign=all&amp;utm_content=google_oo&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -174px;"></span>\n' +
    '              <h3>Google One</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://www.google.com/travel/?dest_src=al&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -870px;"></span>\n' +
    '              <h3>Travel</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://docs.google.com/forms/?authuser=0">\n' +
    '              <span style="background-position: 0 -2146px;"></span>\n' +
    '              <h3>Forms</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://chrome.google.com/webstore?utm_source=app-launcher&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -1334px;"></span>\n' +
    '              <h3>Chrome Web Store</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://passwords.google.com?utm_source=OGB&amp;utm_medium=AL&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -638px;"></span>\n' +
    '              <h3>Password Manager</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="https://analytics.google.com/analytics/web?utm_source=OGB&amp;utm_medium=app&amp;authuser=0">\n' +
    '              <span style="background-position: 0 -2088px;"></span>\n' +
    '              <h3>Google Analytics</h3>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <a class="user-icon"\n' +
    '     href=""\n' +
    '     ng-cloak\n' +
    '     ng-click="openMenu()"\n' +
    '     id="menuOpener"\n' +
    '     title="Settings"\n' +
    '     >\n' +
    '     <img class="avatar" ng-src="{{::user.photo}}" alt="" ng-if="user.photo" avatar-error/>\n' +
    '     <i class="icon-user" ng-if="!user.photo"></i>\n' +
    '     <div class="ftx-pop settings-promo" ng-if="vm.ftxLeft.indexOf(\'settings\') !== -1" ng-cloak></div>\n' +
    '  </a>\n' +
    '\n' +
    '</div>')
  $templateCache.put('templates/lite-check.html',
    '<div class="blocker welcome dark lite-check">\n' +
    '\n' +
    '    <div class="prompt">\n' +
    '        <i class="icon-arrow-curly"></i>\n' +
    '        <p>Look for the <i class="icon-muzli"></i> in this area</p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="title">\n' +
    '        <i class="icon-muzli"></i>\n' +
    '        <h2>We haven’t seen you in a while</h2>\n' +
    '    </div>\n' +
    '\n' +
    '	<div class="content">\n' +
    '\n' +
    '        <div class="split">\n' +
    '            <img src="images/lite-toolbar.png" alt="Muzli Lite">\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="split">\n' +
    '            <p>You have Muzli Lite installed and haven’t used it in a while.<br />This is just a reminder that you can access Muzli from its <i class="icon-muzli"></i> icon. </p>\n' +
    '            <p class="small">Muzli is designed to work best as your new-tab, maybe give it another try?</p>\n' +
    '\n' +
    '            <button class="cta" ng-click="toggleFullVersion()">Make Muzli my new tab</button>\n' +
    '            <a href="" ui-sref="all">Open Muzli</a>\n' +
    '        </div>\n' +
    '\n' +
    '	</div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/lite-enable.html',
    '<div class="blocker welcome dark lite-check">\n' +
    '\n' +
    '    <div class="prompt">\n' +
    '        <i class="icon-arrow-curly"></i>\n' +
    '        <p>\n' +
    '            Look for the <i class="icon-muzli"></i> in this area. \n' +
    '            <br>\n' +
    '            It could be hidden under <i class="icon-puzzle"></i> menu.\n' +
    '        </p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="title">\n' +
    '        <i class="icon-muzli"></i>\n' +
    '        <h2>Use Muzli without replacing your new tab?</h2>\n' +
    '    </div>\n' +
    '\n' +
    '	<div class="content">\n' +
    '\n' +
    '        <div class="split">\n' +
    '            <img src="images/lite-toolbar.png" alt="Muzli Lite">\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="split">\n' +
    '            <p>\n' +
    '                You have Muzli Lite installed. Do you want to activate it now?\n' +
    '                <br /> \n' +
    '                Muzli will be available under the <i class="icon-muzli"></i> icon in your browsers toolbar. \n' +
    '            </p>\n' +
    '            <p class="small">You can decide later. Muzli Lite will be available in your Settings the entire time.</p>\n' +
    '\n' +
    '            <button class="cta" ng-click="toggleLiteVersion()">Activate Muzli Lite</button>\n' +
    '            <a href="" ng-click="keepFullVersion($event)">Keep Muzli as your Homepage</a>\n' +
    '        </div>\n' +
    '\n' +
    '	</div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('templates/settings.html',
    '<!-- Settings -->\n' +
    '<div id="settings" class="cf" ng-class="{ isLite: isLiteVersion === true || isLiteVersion === false }">\n' +
    '\n' +
    '  <div id="user" ng-cloak>\n' +
    '\n' +
    '    <div class="loggedIn" ng-show="user && !user.anonymous">\n' +
    '\n' +
    '      <a tabindex="-1" href="" ng-click="::logOut()">Logout</a>\n' +
    '\n' +
    '      <div class="userInfo">\n' +
    '        <h5>\n' +
    '          {{::(user.displayName || user.email)}}\n' +
    '          <br>\n' +
    '          <span>via {{::(user.provider && (user.provider[0].toUpperCase() + user.provider.substr(1)))}}</span>\n' +
    '        </h5>\n' +
    '        <img class="avatar" ng-src="{{::user.photo}}" alt="" ng-if="user.photo" ng-click="::closeMenu()" />\n' +
    '        <i class="icon-user" ng-if="!user.photo" ng-click="::closeMenu()"></i>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="anonymous" ng-show="(user.anonymous || !user) && isUserResolved">\n' +
    '      <a href="" ui-sref="sign-in">Sign in</a>\n' +
    '      <div class="userInfo">\n' +
    '        <h5>Sign in to get more from Muzli</h5>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-if="isLiteVersion === true || isLiteVersion === false" class="makeHome">\n' +
    '    <label class="switch">\n' +
    '      <input type="checkbox" ng-model="isMuzliHomepage" ng-change="toggleIsLiteVersion()"\n' +
    '        class="ng-pristine ng-untouched ng-valid ng-not-empty">\n' +
    '      <span class="slider force-light"></span>\n' +
    '      Make Muzli your homepage\n' +
    '    </label>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="layout" ng-if="!hideEnableAuthRecentSitesSetting || toggleMinimalView">\n' +
    '\n' +
    '    <h5>View Preferences</h5>\n' +
    '\n' +
    '    <ul class="appUtils">\n' +
    '\n' +
    '      <li ng-if="!hideEnableAuthRecentSitesSetting">\n' +
    '        <label class="switch">\n' +
    '          <input type="checkbox" id="showRecentSites" ng-model="showRecentSites"\n' +
    '            ng-change="authRecentSitesAction(showRecentSites)" class="ng-pristine ng-untouched ng-valid ng-not-empty">\n' +
    '          <span class="slider"></span>\n' +
    '          Enable most visited (legacy)\n' +
    '        </label>\n' +
    '      </li>\n' +
    '\n' +
    '      <li ng-if="!hideEnableAuthRecentSitesSetting">\n' +
    '        <label class="switch">\n' +
    '          <input type="checkbox" id="useSpeedDial" ng-model="useSpeedDial"\n' +
    '            ng-change="toggleSpeedDial(useSpeedDial)" class="ng-pristine ng-untouched ng-valid ng-not-empty">\n' +
    '          <span class="slider"></span>\n' +
    '          Use Speed Dial\n' +
    '        </label>\n' +
    '      </li>\n' +
    '\n' +
    '      <li ng-if="toggleMinimalView">\n' +
    '        <label class="switch">\n' +
    '          <input type="checkbox" ng-model="isSwitchedToHalfViewIndicator" ng-change="toggleMinimalView()"\n' +
    '            class="ng-pristine ng-untouched ng-valid ng-not-empty">\n' +
    '          <span class="slider"></span>\n' +
    '          Full view on load\n' +
    '        </label>\n' +
    '      </li>\n' +
    '\n' +
    '    </ul>\n' +
    '\n' +
    '    <div class="preview">\n' +
    '\n' +
    '      <ul class="preview-sites" ng-class="{\n' +
    '        active: recentSites || useSpeedDial,\n' +
    '        speed_dial: useSpeedDial,\n' +
    '      }">\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '        <li></li>\n' +
    '      </ul>\n' +
    '\n' +
    '      <ul class="preview-grid">\n' +
    '\n' +
    '        <li class="active"></li>\n' +
    '        <li class="active"></li>\n' +
    '        <li class="active"></li>\n' +
    '        <li class="active"></li>\n' +
    '        <li class="active"></li>\n' +
    '\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '        <li ng-class="{active: isSwitchedToHalfView}"></li>\n' +
    '\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="ad-free">\n' +
    '\n' +
    '    <div>\n' +
    '      <h5 ng-if="!isAdsToggleEnabled">Invite friends to Unlock <br>Ad-Free Muzli</h5>\n' +
    '      <label class="switch" ng-class="{disabled: !isAdsToggleEnabled}" ng-click="checkDisableAds()">\n' +
    '        <input type="checkbox" ng-model="areAdsDisabled" ng-change="toggleDisableAds()"\n' +
    '          ng-disabled="!isAdsToggleEnabled"\n' +
    '          class="ng-pristine ng-untouched ng-valid ng-not-empty">\n' +
    '        <span class="slider force-light"></span>\n' +
    '        Hide all Ads on Muzli\n' +
    '      </label>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="cta" ng-if="!isAdsToggleEnabled">\n' +
    '      <button ng-if="!user.anonymous" ng-click="$state.go(\'all.referral\')">Invite</button>\n' +
    '      <button ng-if="user.anonymous" ng-click="$state.go(\'sign-in\')">Sign In</button>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="defaults">\n' +
    '\n' +
    '    <div class="setting focusGroup">\n' +
    '\n' +
    '      <label>Preferred content</label>\n' +
    '\n' +
    '      <div class="dropdown" ng-click="showFocusGroupDD = !showFocusGroupDD">\n' +
    '        <div>{{user.selectedBundle || \'Design\'}}</div>\n' +
    '        <i class="icon-play"></i>\n' +
    '        <ul ng-show="showFocusGroupDD">\n' +
    '          <li ng-click="selectBundle(\'design\', true)">Design</li>\n' +
    '          <li ng-click="selectBundle(\'tech\', true)">Technology</li>\n' +
    '          <li ng-click="selectBundle(\'news\', true)">News</li>\n' +
    '          <li ng-click="selectBundle(\'culture\', true)">Culture</li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="separator"></div>\n' +
    '\n' +
    '  <div class="defaults">\n' +
    '\n' +
    '    <div class="setting themeToggle">\n' +
    '      <label>Color theme</label>\n' +
    '      <div class="theme">\n' +
    '        <span ng-click="::setTheme(\'dark\')" class="dark" title="Dark theme" title-dark="true"\n' +
    '          ng-class="{active: theme === \'dark\'}"><i class="icon-check"></i></span>\n' +
    '        <span ng-click="::setTheme(\'white\')" title="Light theme" title-dark="true" class="light"\n' +
    '          ng-class="{active: theme === \'white\'}"><i class="icon-check"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="setting sharebleToggle">\n' +
    '      <label>Show content suggestions for outgoing links</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="toggleSharebleLinks(true)" class="show" title="Show suggestions" title-dark="true"\n' +
    '          ng-class="{active: enableSharebleLinks === true}"><i class="icon-check"></i></span>\n' +
    '        <span ng-click="::toggleSharebleLinks(false)" title="Don\'t show suggestions" title-dark="true" class="hide"\n' +
    '          ng-class="{active: enableSharebleLinks === false}"><i class="icon-close"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="setting paletteToggle">\n' +
    '      <label>Show color palettes on cards</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="togglePalettes(true)" class="show" title="Show palettes" title-dark="true"\n' +
    '          ng-class="{active: enablePalettes === true}"><i class="icon-check"></i></span>\n' +
    '        <span ng-click="::togglePalettes(false)" title="Don\'t show palettes" title-dark="true" class="hide"\n' +
    '          ng-class="{active: enablePalettes === false}"><i class="icon-close"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="setting sharebleToggle">\n' +
    '      <label>Show Trending tile in the Home screen</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="toggleTrendingTile(true)" class="show" title="Show trending" title-dark="true"\n' +
    '          ng-class="{active: enableTrendingTile === true}"><i class="icon-check"></i></span>\n' +
    '        <span ng-click="::toggleTrendingTile(false)" title="Don\'t show trending" title-dark="true" class="hide"\n' +
    '          ng-class="{active: enableTrendingTile === false}"><i class="icon-close"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="setting sharebleToggle">\n' +
    '      <label>Show Short Videos section in Highlights</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="toggleShorts(true)" class="show" title="Show shorts" title-dark="true"\n' +
    '          ng-class="{active: enableShorts === true}"><i class="icon-check"></i></span>\n' +
    '        <span ng-click="::toggleShorts(false)" title="Don\'t show shorts" title-dark="true" class="hide"\n' +
    '          ng-class="{active: enableShorts === false}"><i class="icon-close"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="setting sharebleToggle">\n' +
    '      <label>Show Google Apps in the Header</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="toggleGoogleApps(true)" class="show" title="Show Google apps" title-dark="true"\n' +
    '          ng-class="{active: enableGoogleApps === true}"><i class="icon-check"></i></span>\n' +
    '        <span ng-click="::toggleGoogleApps(false)" title="Don\'t show Google apps" title-dark="true" class="hide"\n' +
    '          ng-class="{active: enableGoogleApps === false}"><i class="icon-close"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="separator"></div>\n' +
    '\n' +
    '  <div class="defaults">\n' +
    '\n' +
    '    <h5>Search settings</h5>\n' +
    '\n' +
    '    <div class="setting">\n' +
    '      <label>Default search</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="::setDefaultSearch(\'web\')" title="Web search" title-dark="true" class="default"\n' +
    '          ng-class="{active: defaultSearch === \'web\'}"><i class="icon-web"></i></span>\n' +
    '        <span ng-click="::setDefaultSearch(\'muzli\')" class="default" title="Muzli search" title-dark="true"\n' +
    '          ng-class="{active: defaultSearch === \'muzli\'}"><i class="icon-muzli"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="setting sharebleToggle">\n' +
    '      <label>Default search engine for Web search</label>\n' +
    '      <div class="control">\n' +
    '        <span ng-click="setSearchEngine(\'google\')" class="default" title="Use Google" title-dark="true"\n' +
    '          ng-class="{active: searchEngine === \'google\'}"><i class="icon-google"></i></span>\n' +
    '        <span ng-click="::setSearchEngine(\'bing\')" title="Use Bing" title-dark="true" class="default"\n' +
    '        ng-class="{active: searchEngine === \'bing\'}"><i class="icon-bing"></i></span>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="separator"></div>\n' +
    '\n' +
    '  <div class="links">\n' +
    '    <div class="contact">\n' +
    '      <ul>\n' +
    '        <li ng-repeat="item in contactLinks"><a ng-href="{{::item.href}}"\n' +
    '            ng-click="::events.settingsMenu.clickLink(item.text)" ng-bind="item.text"></a></li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="social">\n' +
    '\n' +
    '    <p class="pull-left">Also follow Muzli in</p>\n' +
    '\n' +
    '    <div class="list pull-right">\n' +
    '      <a class="instagram icon-instagram" href="https://www.instagram.com/usemuzli/" title="Follow on Instagram"\n' +
    '        title-dark="true"></a>\n' +
    '      <a class="medium icon-medium" href="https://medium.com/@usemuzli" title="Check on Medium" title-dark="true"></a>\n' +
    '      <a class="fb icon-facebook" href="https://facebook.com/usemuzli" title="Check on Facebook" title-dark="true"></a>\n' +
    '      <a class="twitter icon-twitter" ng-click="::twitterFollow()" href="" title="Follow on Twitter"\n' +
    '        title-dark="true"></a>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="subscribe">\n' +
    '      <a class="muzli" href="https://muz.li">https://muz.li</a>\n' +
    '      <a href="" class="copy" click-copy="https://muz.li" ng-class="{success: copySuccess}">Copy to clipboard</a>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '</div>\n' +
    '<!-- / Settings -->')
  $templateCache.put('templates/sidebar.html',
    '<div class="container" ng-class="{ disabled: user.anonymous && !flags.useAnonymousSources }">\n' +
    '\n' +
    '  <div class="sourceSearch" ng-hide="sourcesDragged">\n' +
    '    <div class="searchContainer">\n' +
    '      <input type="text" ng-model="searchSources" ng-model-options="{ debounce: 150 }" placeholder="Search for sources">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="controls" ng-if="!user.anonymous || flags.useAnonymousSources">\n' +
    '    <p>{{user.shortcuts.length}} sources selected</p>\n' +
    '    <a href="" ng-click="clearShortcuts($event)" ng-if="!clearedShortcuts.length && user.shortcuts.length">Clear all</a>\n' +
    '    <a href="" ng-click="restoreShortcuts($event)" ng-if="clearedShortcuts.length">Undo</a>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="anonymous" ng-if="user.anonymous && !flags.useAnonymousSources">\n' +
    '    <p><a ui-sref="sign-in">Sign in</a> to save your preferences</p>\n' +
    '  </div>\n' +
    '\n' +
    '  <ul class="sources" ui-sortable="sideBarSortableOptions" ng-model="sources">\n' +
    '\n' +
    '    <li ng-repeat="source in sources | sourcesFilter:searchSources as filteredSources track by source.name"\n' +
    '        data-source="{{::source.name}}"\n' +
    '        ng-class="{\n' +
    '        enabled: source.isShortcut,\n' +
    '        demoted: source.isDemoted,\n' +
    '        active: (currentSource && source.name === currentSource.name)\n' +
    '      }">\n' +
    '\n' +
    '      <i class="icon-menu"></i>\n' +
    '\n' +
    '      <i href=""\n' +
    '      class="source"\n' +
    '      ng-style="::{\'background-image\': \'url({{source.icon}})\'}"></i>\n' +
    '\n' +
    '      <span class="title" ng-click="clickSidebarSource(source, $event)">\n' +
    '        \n' +
    '        {{::source.title}} \n' +
    '        \n' +
    '        <a ng-if="::source.url" ng-href="{{muzliShareEndpoint}}go?link=http://{{::source.url}}/" target="_blank" ng-click="events.sidebar.clickLink(source.name, $event)" title="Go to {{::source.title}}\'s website">\n' +
    '          <i class="icon-link"></i>\n' +
    '        </a>\n' +
    '\n' +
    '      </span>\n' +
    '\n' +
    '      <i class="icon-demoted" \n' +
    '        ng-class="{\n' +
    '          \'icon-hide\': source.isDemoted,\n' +
    '          \'icon-view\': !source.isDemoted,\n' +
    '        }"\n' +
    '        ng-click="toggleSourceDemotion(source)" \n' +
    '        title="Show in Highlights"\n' +
    '        ></i>\n' +
    '\n' +
    '      <label class="switch" ng-click="checkAnonymousSources()">\n' +
    '        <input type="checkbox" ng-model="source.isShortcut" ng-change="onToggleSource(source)" ng-disabled="user.anonymous && !flags.useAnonymousSources">\n' +
    '        <span class="slider"></span>\n' +
    '      </label>\n' +
    '\n' +
    '    </li>\n' +
    '\n' +
    '  </ul>\n' +
    '  \n' +
    '</div>\n' +
    '\n' +
    '<div class="overlay" ng-click="::toggleSidebar()" ng-if="vm.showFtx !== \'sidebar\' || !flags.useAnonymousSources">\n' +
    '  \n' +
    '  <div class="content" ng-if="vm.showFtx !== \'sidebar\'" ng-cloak>\n' +
    '    <h2>Customize your shortcuts and content preferences.</h2>\n' +
    '    <p>We do our best to show content that may interest you on the Highlights feed automatically. However, if you turn on a shortcut, we give that feed a small boost.</p>\n' +
    '    <p>You can always hide any unwanted content from your feed by clicking on <i class="icon-view"></i> icon while hovering.</p>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<div class="overlay" ng-if="vm.showFtx === \'sidebar\' && flags.useAnonymousSources"></div>')

  }]);
