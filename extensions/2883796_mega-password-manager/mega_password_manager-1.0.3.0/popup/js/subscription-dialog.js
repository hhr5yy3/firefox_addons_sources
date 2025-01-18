mega.ui.pm.subscription = {
    freeTrialFlag: 0,
    daysLeft: 14,
    freeTrialContainer: null,
    featurePlanContainer: null,
    freeTrial() {
        'use strict';

        if (!this.freeTrialContainer) {
            const startDate = time2date(Date.now() / 1000 + this.daysLeft * 24 * 60 * 60, 2);

            const timelineData = [
                {
                    icon: 'sprite-pm-ext-mono icon-lock-thin-outline',
                    day: l[1301],
                    description: l.free_trial_today_desc
                },
                {
                    icon: 'sprite-pm-ext-mono icon-bell-thin-outline',
                    day: mega.icu.format(l.on_day_n, 10),
                    description: l.email_before_trial_end
                },
                {
                    icon: 'sprite-pm-ext-mono icon-star-thin-outline',
                    day: mega.icu.format(l.on_day_n, 14),
                    description: l.free_trial_end_desc.replace('%1', startDate)
                }
            ];

            const container = document.createElement('div');
            container.className = 'timeline-container';

            const subtitle = document.createElement('h3');
            subtitle.textContent = l.heres_how_it_works;
            container.appendChild(subtitle);

            const timeline = document.createElement('div');
            timeline.className = 'timeline';

            for (let i = 0; i < timelineData.length; i++) {
                const item = timelineData[i];
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';

                const icon = document.createElement('i');
                icon.className = `timeline-icon ${item.icon}`;

                const verticalBar = document.createElement('div');
                verticalBar.className = 'timeline-bar';

                const day = document.createElement('p');
                day.className = 'timeline-day';
                day.textContent = item.day;

                const description = document.createElement('p');
                description.className = 'timeline-description';
                description.textContent = item.description;

                timelineItem.appendChild(icon);
                timelineItem.appendChild(day);
                if (i !== timelineData.length - 1) {
                    timelineItem.appendChild(verticalBar);
                }
                timelineItem.appendChild(description);

                timeline.appendChild(timelineItem);
            }

            container.appendChild(timeline);

            this.freeTrialContainer = [container];
        }

        this.freeTrialFlag = 1;
        this.initDialog(this.freeTrialContainer);
    },

    featurePlan() {
        'use strict';

        if (!this.featurePlanContainer) {
            const contentTitle = document.createElement('div');
            contentTitle.className = 'subscription-content-title';
            contentTitle.textContent = l.benefits_label;

            const benefitsList = [];
            const items = [
                {
                    icon: 'sprite-pm-ext-mono icon-devices-thin-outline',
                    text: l.benefit_one
                },
                {
                    icon: 'sprite-pm-ext-mono icon-magic-wand-thin-outline',
                    text: l.benefit_two
                },
                {
                    icon: 'sprite-pm-ext-mono icon-globe-americas-thin-outline',
                    text: l.benefit_three
                }
            ];

            for (let i = 0; i < items.length; i++) {
                const item = document.createElement('div');
                item.className = 'benefits-list';

                const icon = document.createElement('i');
                icon.className = items[i].icon;
                item.appendChild(icon);

                const text = document.createElement('span');
                text.textContent = items[i].text;
                item.appendChild(text);

                benefitsList.push(item);
            }

            this.featurePlanContainer = [contentTitle, ...benefitsList];
        }

        this.freeTrialFlag = 0;
        this.initDialog(this.featurePlanContainer);
    },

    async initDialog(content) {
        'use strict';

        let name = 'feature-plan-dialog';
        let title =  l.subscribe_title;
        let classList = ['subscription-dialog'];
        let ctaText = l.subscribe_btn;
        let eventId = 590044;
        const transferHash = await chrome.runtime.sendMessage({type: 'site-transfer-hash'});
        mega.ui.pm.comm.logout(true);

        if (this.freeTrialFlag) {
            name = 'free-trial-dialog';
            title = l.try_mega_pass;
            classList = ['free-trial'];
            ctaText = l.start_free_trial;
            eventId = 590045;
        }

        const ctaBinding = async() => {
            eventlog(eventId);
            chrome.tabs.create({url: `https://mega.nz/#sitetransfer!${transferHash}`});
        };

        mega.ui.dialog.show({
            name,
            title,
            titleType: 'h1',
            classList,
            contents: content,
            centered: false,
            showClose: false,
            actions: [
                {
                    type: 'normal',
                    text: l[148],
                    componentClassname: 'secondary',
                    onClick: () => {
                        mega.ui.dialog.hide();
                        mega.ui.pm.comm.logout(true);
                    }
                },
                {
                    type: 'normal',
                    text: ctaText,
                    onClick: ctaBinding
                }
            ]
        });
    }
};
