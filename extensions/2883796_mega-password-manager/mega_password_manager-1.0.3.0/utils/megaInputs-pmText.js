mega.ui.MegaInputs.prototype.pmText = mega.ui.MegaInputs.prototype.underlinedText;

mega.ui.MegaInputs.prototype.pmText._init = function() {

    'use strict';

    var {$input} = this;

    // Overwrite hide/show for Message/Error
    this.underlinedText._updateShowHideErrorAndMessage.call(this);

    // If it is already a megaInput, html preparation does not required anymore.
    if (!$input.hasClass('megaInputs')) {

        const hasTitle = !$input.hasClass('no-title-top') && ($input.attr('title') || $input.attr('placeholder'));
        const wrapperClass = hasTitle ? 'title-ontop' : '';

        // Wrap it with another div for styling and animation
        $input.wrap(`<div class="mega-input pm box-style ${wrapperClass}"></div>`);

        const $wrapper = this.$wrapper = $input.closest(`.mega-input`);

        // Hide wrapper if input has hidden class
        if ($input.hasClass('hidden')) {
            $wrapper.addClass('hidden');
            $input.removeClass('hidden');
        }

        if (hasTitle) {
            // Insert animated title
            let title = escapeHTML($input.attr('title') || $input.attr('placeholder'));

            // Adding required sign
            title += this.required ? ' <span class="required-red">*</span>' : '';

            if ($input.hasClass('optional')) {
                $input.attr('title', title.replace('[S]', '').replace('[/S]', ''));
                title = title.replace('[S]', '<span class="optional">').replace('[/S]', '</span>');
            }

            const titleBlock = `<div class="mega-input-title">${title}</div>`;

            // Insert title block
            $wrapper.safePrepend(titleBlock);

            // Bind event for animation on title
            const $titleBlock = $('.title', $input.parent());
            $titleBlock.rebind('click.underlinedText', function() {

                const $this = $(this);

                if (!$this.parent().hasClass('active')) {
                    $this.next('input').trigger('focus');
                }
            });
        }

        // Insert error message block
        $wrapper.safeAppend('<div class="message-container mega-banner"></div>');

        // Half size
        this.underlinedText._halfSize.call(this);

        // Insert password strength checker
        this.underlinedText._strengthChecker.call(this);

        // With icon or prefix (e.g. currency)
        this.underlinedText._withIconOrPrefix.call(this);

        // Add some class to wrapper
        if ($input.data('wrapper-class')) {
            $wrapper.addClass($input.data('wrapper-class'));
        }

        // Add special class for textarea with auto height
        if (this.options.autoHeight) {
            $wrapper.addClass('textarea auto-height');
        }
    }
};

mega.ui.MegaInputs.prototype.pmText._bindEvent = function() {

    'use strict';

    var $input = this.$input;

    $input.rebind('keyup.underlinedText input.underlinedText', function() {
        if ($(this).hasClass('clearButton')) {
            const $clearBtn = $('.clear-input', $(this).parent());
            // show clear button only if input is not empty or spacebar is clicked at the start
            $clearBtn[$(this).val() ? 'removeClass' : 'addClass']('hidden');
        }

        if (this.type === 'password') {
            const $pwdBtn = $('.pass-visible', $(this).parent());
            $pwdBtn[$(this).val() ? 'removeClass' : 'addClass']('hidden');
        }
    });

    $input.rebind('focus.underlinedText', function() {
        $(this).parent().addClass('active focus');

        if ($(this).hasClass('clearButton')) {
            const $clearBtn = $('.clear-input', $(this).parent());
            // show clear button only if input is not empty or spacebar is clicked at the start
            $clearBtn[$(this).val() ? 'removeClass' : 'addClass']('hidden');
        }
    });

    $input.rebind('blur.underlinedText', function() {

        var $this = $(this);

        if ($this.hasClass('clearButton') && !$this.val() || !$(this).parent().hasClass('search-bar')) {
            const $clearBtn = $('.clear-input', $this.parent());
            $clearBtn.addClass('hidden');
        }

        if (this.type === 'password') {
            const $pwdBtn = $('.pass-visible', $(this).parent());
            $pwdBtn[$(this).val().length ? 'removeClass' : 'addClass']('hidden');
        }

        if ($this.hasClass('trim')) {
            $this.val($this.val().trim());
        }

        if ($this.val()) {
            $this.parent().addClass('valued');
        }
        else {
            $this.parent().removeClass('valued');
        }

        $this.parent().removeClass('active focus');
    });

    // Hide error upon input changes
    var self = this;

    // Textarea with auto height
    if (this.options.autoHeight) {
        $input.rebind('input.autoHeight', (e) => {
            e.target.style.height = 0;
            e.target.style.height = `${this.options.maxHeight && parseInt(this.options.maxHeight) <=
                e.target.scrollHeight ? this.options.maxHeight : e.target.scrollHeight}px`;
        });
    }

    if (!$input.hasClass('strengthChecker')) {
        $input.rebind('input.pmText', () => {
            if (self.$wrapper.hasClass('error')) {
                self.hideError();
            }
        });
    }

    if (this.type === 'number') {
        $input.rebind('keydown.number', function(e) {

            // if entered key is not a number or backspace or arrow keys return false
            if (!((/[0-9]/.test(e.key)) || e.which === 8 || e.which === 37 || e.which === 39)) {
                return false;
            }
        });
    }
};


mega.ui.MegaInputs.prototype.pmText._withIconOrPrefix = function() {

    'use strict';

    var $input = this.$input;
    var $wrapper = this.$wrapper;

    // Copy to clipboard button
    if ($input.hasClass('copyButton')) {

        const icon = 'sprite-pm-ext-mono icon-copy-thin-outline';

        $wrapper.safeAppend(`<i class="${icon} copy-input-value icon"></i>`);

        const $copyBtn = $('.copy-input-value', $wrapper);

        const copyButton = () => {
            copyToClipboard(
                $input.val(),
                this.options.copyToastText ? escapeHTML(this.options.copyToastText) : l.clipboard_copied
            );

            if ($input[0].title === 'Username') {
                eventlog(590009);
            }
            else if ($input[0].title === 'Password') {
                eventlog(590011);
            }
        };

        $copyBtn.rebind('click.copyInputValue tap.copyInputValue', () => {
            copyButton();
        });

        $input.rebind('keyup.copyInputValue', (e) => {
            if (e.keyCode === 13) {
                copyButton();
                $input.trigger('focus');
            }
        });
    }

    if ($input.hasClass('clearButton')) {
        const icon = 'sprite-pm-ext-mono icon-x-thin-outline';

        $wrapper.safeAppend(`<i class="${icon} clear-input icon"></i>`);

        const $clearBtn = $('.clear-input', $wrapper);

        $clearBtn.rebind('mousedown.clearInput click.clearInput tap.clearInput ', () => {
            $input.trigger('focus');

            if ($input.hasClass('errored')) {
                this.hideError();
            }
            this.setValue('');
        });
    }

    if ($input.hasClass('external-link')) {
        const icon = 'sprite-pm-ext-mono icon-external-link-thin-outline';

        $wrapper.safeAppend(`<i class="${icon} external-link icon"></i>`);

        const $externalLinkBtn = $('.external-link', $wrapper);

        const openUrl = () => {
            let url = $input.val();
            const matches = /^(https?:\/{2})?(?:[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}|(?:\d{1,3}.?){4})\b[\w#%&+./:=?@~-]*$/
                .exec(url);
            if (matches && typeof matches[1] === 'undefined') {
                url = `https://${url}`;
            }
            window.open(url, '_blank', 'noopener,noreferrer');
        };

        $externalLinkBtn.rebind('click.externalLink tap.externalLink', () => {
            openUrl();
            eventlog(590012);
            return false;
        });

        $input.rebind('keyup.externalLink', (e) => {
            if (e.keyCode === 13) {
                openUrl();
            }
        });
    }

    if (this.type === 'password') {
        const iconSprite = 'sprite-pm-ext-mono';
        const showTextIcon = 'icon-eye-thin-outline';
        const hideTextIcon = 'icon-eye-off-thin-outline';

        $wrapper.safeAppend(`<i class="${iconSprite} ${showTextIcon} pass-visible
            ${this.options.iconClass || 'icon'}"></i>`);

        const $pwdBtn = $('.pass-visible', $wrapper);

        $pwdBtn.rebind('click.togglePassV', function() {
            const wrapper = $wrapper.get(0);
            const viewPassword = wrapper.querySelector('.password-colorized');

            if (this.classList.contains(showTextIcon)) {
                if ($input.hasClass('colorized-password')) {
                    viewPassword.classList.remove('hidden');
                }
                else {
                    $input.attr('type', 'text');
                }
                this.classList.remove(showTextIcon);
                this.classList.add(hideTextIcon);
                eventlog(590010);
            }
            else {
                if ($input.hasClass('colorized-password')) {
                    viewPassword.classList.add('hidden');
                }
                else {
                    $input.attr('type', 'password');
                }
                this.classList.add(showTextIcon);
                this.classList.remove(hideTextIcon);
            }
        });

        if ($input.hasClass('colorized-password')) {
            const wrapper = $wrapper.get(0);
            const viewPassword = document.createElement('div');
            viewPassword.className = 'password-colorized hidden';
            wrapper.appendChild(viewPassword);

            $input.rebind('input.colorizedPassword change.colorizedPassword', () => {
                const viewPassword = wrapper.querySelector('.password-colorized');
                viewPassword.textContent = '';
                viewPassword.appendChild(colorizedPassword($input.val()));
            });
        }
    }

    if ($input.data('icon')) {
        $wrapper.addClass('with-icon');
        $wrapper.safePrepend(`<i class="${($input.data('icon') || '')}"></i>`);
    }
    else if ($input.data('prefix')) {
        $wrapper.addClass('with-icon');
        $wrapper.safePrepend(`<span class="prefix">${$input.data('prefix')}</span>`);
    }
};

mega.ui.MegaInputs.prototype.pmText._strengthChecker = function() {

    'use strict';

    var {$input} = this;
    var {$wrapper} = this;
    var self = this;
    const wrapperElement = $wrapper.get(0);

    if (this.type === 'password' && $input.hasClass('strengthChecker')) {

        // Strength wording
        $wrapper.safeAppend('<div class="account password-status">' +
            '<span class="strength-icon"></span>' +
            '<span class="strength-text"></span>' +
            '</div>');

        var _bindStrengthChecker = function() {

            // Hide loading icon
            $wrapper.removeClass('loading');

            $input.rebind('keyup.strengthChecker input.strengthChecker change.strengthChecker', function(e) {

                if (e.keyCode === 13) {
                    return false;
                }

                self.hideError();

                var $passStatus = $wrapper.find('.password-status');
                var $strengthIcon = wrapperElement.querySelector('.strength-icon');
                var $strengthText = wrapperElement.querySelector('.strength-text');

                $passStatus
                    .removeClass('weak strong moderate checked');

                $strengthIcon.classList
                    .remove('icon-check-circle-thin-outline',
                            'icon-alert-circle-thin-outline',
                            'icon-alert-triangle-thin-outline');

                const strength = classifyPassword($(this).val());

                if (typeof strength === 'object') {
                    $passStatus.addClass(`${strength.className} checked`);
                    $strengthIcon.className = strength.icon;
                    $strengthText.textContent = strength.string1;
                }
                else {
                    $input.data('MegaInputs').hideMessage();
                }
            });

            // Show strength upon zxcvbn loading is finished or Reset strength after re-rendering.
            $input.trigger('input.strengthChecker');
        };

        if (typeof zxcvbn === 'undefined') {

            // Show loading icon
            $wrapper.addClass('loading');
            M.require('zxcvbn_js').done(_bindStrengthChecker);
        }
        else {
            _bindStrengthChecker();
        }

        $wrapper.addClass('strengthChecker');
    }
};

mega.ui.MegaInputs.prototype.pmText._botSpaceCalc = function() {

    'use strict';

    var $wrapper = this.$input.parent();
    const form = this.$input.first().closest('form')[0];

    if ($wrapper.hasClass('msg')) {
        if (this.origBotSpace === undefined) {
            this.origBotSpace = parseInt($wrapper.css('margin-bottom'));
        }

        $wrapper.css('margin-bottom',
                     this.origBotSpace
                     + $('.message-container', $wrapper).outerHeight());

        if (form && form.classList.contains('mega-pm-save-dialog-form')) {
            $wrapper.css('margin-bottom', 48);
        }
    }
};
