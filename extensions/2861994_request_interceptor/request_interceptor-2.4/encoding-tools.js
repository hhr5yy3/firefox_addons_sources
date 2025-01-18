export const EncodingTools = {
    init() {
        // Initialize all buttons
        this.base64EncodeButton = document.getElementById('base64EncodeButton');
        this.base64DecodeButton = document.getElementById('base64DecodeButton');
        this.urlEncodeButton = document.getElementById('urlEncodeButton');
        this.urlDecodeButton = document.getElementById('urlDecodeButton');
        this.urlDoubleEncodeButton = document.getElementById('urlDoubleEncodeButton');
        this.urlDoubleDecodeButton = document.getElementById('urlDoubleDecodeButton');
        this.htmlEncodeButton = document.getElementById('htmlEncodeButton');
        this.htmlDecodeButton = document.getElementById('htmlDecodeButton');
        this.hexEncodeButton = document.getElementById('hexEncodeButton');
        this.hexDecodeButton = document.getElementById('hexDecodeButton');
        this.unicodeEncodeButton = document.getElementById('unicodeEncodeButton');
        this.unicodeDecodeButton = document.getElementById('unicodeDecodeButton');
        this.jwtEncodeButton = document.getElementById('jwtEncodeButton');
        this.jwtDecodeButton = document.getElementById('jwtDecodeButton');
		this.jsonBeautifyButton = document.getElementById('jsonBeautifyButton');
        this.jsonMinifyButton = document.getElementById('jsonMinifyButton');
		this.percentEncodeButton = document.getElementById('percentEncodeButton');
        this.percentDecodeButton = document.getElementById('percentDecodeButton');

        this.setupEventListeners();
    },

    handleError(outputElement, error) {
        outputElement.value = `Error: ${error.message}`;
        outputElement.style.color = 'red';
        setTimeout(() => {
            outputElement.style.color = '';
        }, 3000);
    },

    setupEventListeners() {
        // Base64 handlers
        this.base64EncodeButton.addEventListener('click', () => {
            const input = document.getElementById('base64Input').value;
            const output = document.getElementById('base64Output');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = btoa(unescape(encodeURIComponent(input)));
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.base64DecodeButton.addEventListener('click', () => {
            const input = document.getElementById('base64Input').value;
            const output = document.getElementById('base64Output');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = decodeURIComponent(escape(atob(input)));
            } catch (error) {
                this.handleError(output, error);
            }
        });

        // URL encoding handlers
        this.urlEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('urlInput').value;
            const output = document.getElementById('urlOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = encodeURIComponent(input)
                    .replace(/'/g, '%27')
                    .replace(/"/g, '%22');
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.urlDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('urlInput').value;
            const output = document.getElementById('urlOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = decodeURIComponent(input.replace(/\+/g, ' '));
            } catch (error) {
                this.handleError(output, error);
            }
        });

        // URL Double encoding handlers
        this.urlDoubleEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('urlDoubleInput').value;
            const output = document.getElementById('urlDoubleOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = encodeURIComponent(encodeURIComponent(input));
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.urlDoubleDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('urlDoubleInput').value;
            const output = document.getElementById('urlDoubleOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = decodeURIComponent(decodeURIComponent(input));
            } catch (error) {
                this.handleError(output, error);
            }
        });

        // HTML encoding handlers
        this.htmlEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('htmlInput').value;
            const output = document.getElementById('htmlOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = input
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.htmlDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('htmlInput').value;
            const output = document.getElementById('htmlOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                const textarea = document.createElement('textarea');
                textarea.innerHTML = input;
                output.value = textarea.value;
            } catch (error) {
                this.handleError(output, error);
            }
        });

        // Hex encoding handlers
        this.hexEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('hexInput').value;
            const output = document.getElementById('hexOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = Array.from(input)
                    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('');
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.hexDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('hexInput').value;
            const output = document.getElementById('hexOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                const hexString = input.replace(/\s+/g, '');
                output.value = hexString
                    .match(/.{1,2}/g)
                    .map(byte => String.fromCharCode(parseInt(byte, 16)))
                    .join('');
            } catch (error) {
                this.handleError(output, error);
            }
        });

        // Unicode encoding handlers
        this.unicodeEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('unicodeInput').value;
            const output = document.getElementById('unicodeOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = input
                    .split('')
                    .map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`)
                    .join('');
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.unicodeDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('unicodeInput').value;
            const output = document.getElementById('unicodeOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = input.replace(/\\u([0-9a-fA-F]{4})/g, 
                    (match, group1) => String.fromCharCode(parseInt(group1, 16)));
            } catch (error) {
                this.handleError(output, error);
            }
        });

        // JWT handlers
        this.jwtEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('jwtInput').value;
            const output = document.getElementById('jwtOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                // Create a simple JWT with default header
                const header = { alg: "HS256", typ: "JWT" };
                const payload = JSON.parse(input);
                
                const encodedHeader = btoa(JSON.stringify(header));
                const encodedPayload = btoa(JSON.stringify(payload));
                
                output.value = `${encodedHeader}.${encodedPayload}.`;
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.jwtDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('jwtInput').value;
            const output = document.getElementById('jwtOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                const [headerB64, payloadB64] = input.split('.');
                
                const header = JSON.parse(atob(headerB64));
                const payload = JSON.parse(atob(payloadB64));
                
                output.value = JSON.stringify(
                    { header, payload },
                    null,
                    2
                );
            } catch (error) {
                this.handleError(output, error);
            }
        });
		
		 // JSON handlers
        this.jsonBeautifyButton.addEventListener('click', () => {
            const input = document.getElementById('jsonInput').value;
            const output = document.getElementById('jsonOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                const parsed = JSON.parse(input);
                output.value = JSON.stringify(parsed, null, 2);
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.jsonMinifyButton.addEventListener('click', () => {
            const input = document.getElementById('jsonInput').value;
            const output = document.getElementById('jsonOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                const parsed = JSON.parse(input);
                output.value = JSON.stringify(parsed);
            } catch (error) {
                this.handleError(output, error);
            }
        });
		
		        this.percentEncodeButton.addEventListener('click', () => {
            const input = document.getElementById('percentInput').value;
            const output = document.getElementById('percentOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = Array.from(input)
                    .map(char => '%' + char.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('').toUpperCase();
            } catch (error) {
                this.handleError(output, error);
            }
        });

        this.percentDecodeButton.addEventListener('click', () => {
            const input = document.getElementById('percentInput').value;
            const output = document.getElementById('percentOutput');
            
            if (!input.trim()) {
                output.value = '';
                return;
            }

            try {
                output.value = input.replace(/%([0-9A-Fa-f]{2})/g,
                    (match, hex) => String.fromCharCode(parseInt(hex, 16)));
            } catch (error) {
                this.handleError(output, error);
            }
        });
		
    }
};