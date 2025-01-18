class MegaToggleButton extends MegaComponent {

    constructor(options) {

        super(options);

        if (!this.domNode) {
            return;
        }

        this.setButtonState = (val) => {
            if (!this.input) {
                return false;
            }

            this.checked = val;
            this.input.ariaChecked = this.checked;
            this.toggle.classList.remove('icon-check-regular-solid-after', 'icon-minimise-regular-solid-after');
            this.toggle.classList.add(`icon-${this.checked ? 'check-regular-solid' : 'minimise-regular-solid'}-after`);
            this.domNode.classList.remove('on');

            if (this.checked) {
                this.domNode.classList.add('on');
            }
        };

        let targetNode = this.domNode;

        if (options.label) {
            const subNode = document.createElement('div');
            targetNode.appendChild(subNode);
            subNode.className = 'toggle-label';
            subNode.textContent = options.label;
        }

        targetNode = this.domNode;

        let subNode = this.toggle = document.createElement('div');
        subNode.className = 'toggle-wrapper sprite-pm-ext-mono-after';
        targetNode.appendChild(subNode);

        targetNode = this.toggle;
        subNode = this.input = document.createElement('input');
        subNode.name = options.value;
        subNode.ariaChecked = options.checked;
        subNode.type = 'checkbox';
        subNode.role = options.role;
        subNode.id = options.id;
        subNode.disabled = options.disabled;
        targetNode.appendChild(subNode);

        this.disabled = options.disabled || false;
        this.setButtonState(options.checked || false);

        const _checkToggle = ({target}) => {
            // Only continue if the toggle button is tapped and it isn't disabled
            if (this.disabled || target !== this.toggle || (options.beforeToggle && !options.beforeToggle())) {
                return;
            }

            this.setButtonState(!this.checked);

            if (typeof options.onChange === 'function') {
                options.onChange.call(this);
            }

            if (options.events && Array.isArray(options.events)) {
                eventlog(options.events[this.checked ? 0 : 1]);
            }
        };

        this.on('click.toggleButton', _checkToggle);
        this.on('change.toggleButton', _checkToggle);
    }

    get checked() {
        return this.input ? this.input.checked : false;
    }

    set checked(checked) {
        if (this.input) {
            this.input.checked = checked;
        }
    }

    get value() {
        return this.input ? this.input.value : '';
    }

    set value(value) {
        if (this.input) {
            this.input.value = value;
        }
    }

    get disabled() {
        return this.input ? this.input.disabled : false;
    }

    set disabled(disabled) {
        if (this.input) {
            this.input.disabled = disabled;
        }
    }
}
