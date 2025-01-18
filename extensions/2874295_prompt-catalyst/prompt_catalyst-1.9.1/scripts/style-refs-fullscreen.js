let authToken = null;
let isPremiumUser = false; // Add this at the top

// Initialize authentication - now handles unauthenticated users
async function initializeAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const newToken = urlParams.get('token');
    const newPremiumStatus = urlParams.get('premium') === '1';
    
    // Check if auth status has changed
    if (newToken !== authToken || newPremiumStatus !== isPremiumUser) {
        // Clear cache if auth status changes
        clearStyleReferencesCache();
    }
    
    authToken = newToken;
    isPremiumUser = newPremiumStatus;
    
    if (!authToken) {
        console.log('No token provided - continuing as free user');
        isPremiumUser = false;
        return true;
    }

    try {
        const response = await fetch('https://catalystmedia.ai/promptcatalystfreedemo/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: authToken })
        });

        if (!response.ok) {
            console.warn('Token refresh failed - continuing as free user');
            authToken = null;
            isPremiumUser = false;
            clearStyleReferencesCache(); // Clear cache on auth failure
            return true;
        }

        const data = await response.json();
        authToken = data.token;
        return true;
    } catch (error) {
        console.warn('Token refresh error - continuing as free user:', error);
        authToken = null;
        isPremiumUser = false;
        clearStyleReferencesCache(); // Clear cache on error
        return true;
    }
}

// Loading state management
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'flex';
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'none';
}

// Load style references from the API
const STYLE_REFS_CACHE_KEY = 'styleReferencesCache';
const STYLE_REFS_CACHE_EXPIRY_KEY = 'styleReferencesCacheExpiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Update the loadStyleReferences function
async function loadStyleReferences(forceRefresh = false) {
    showLoading();
    
    try {
        // Check cache first, unless force refresh is requested
        if (!forceRefresh) {
            const cachedData = localStorage.getItem(STYLE_REFS_CACHE_KEY);
            const cacheExpiry = localStorage.getItem(STYLE_REFS_CACHE_EXPIRY_KEY);
            const now = Date.now();

            // If we have valid cached data that hasn't expired
            if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
                console.log('Loading style references from cache');
                const parsedData = JSON.parse(cachedData);
                displayStyleReferences(parsedData);
                return;
            }
        }

        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        console.log('Request headers:', headers);

        const response = await fetch('https://catalystmedia.ai/promptcatalystfreedemo/api/style-references', {
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Failed to load style references');
        }

        const data = await response.json();
        console.log('Received styles:', data);
        console.log('Premium styles received:', data.styleReferenceCodes.filter(s => s.isPremium).length);
        console.log('Free styles received:', data.styleReferenceCodes.filter(s => !s.isPremium).length);

        // Cache the new data
        localStorage.setItem(STYLE_REFS_CACHE_KEY, JSON.stringify(data.styleReferenceCodes));
        localStorage.setItem(STYLE_REFS_CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());

        displayStyleReferences(data.styleReferenceCodes);
    } catch (error) {
        console.error('Error loading style references:', error);
        
        // Try to display cached data as fallback if available
        const cachedData = localStorage.getItem(STYLE_REFS_CACHE_KEY);
        if (cachedData) {
            console.log('Loading from cache after error');
            const parsedData = JSON.parse(cachedData);
            displayStyleReferences(parsedData);
        } else {
            displayError('Failed to load style references. Please try again.');
        }
    } finally {
        hideLoading();
    }
}

// Add cache management functions
function clearStyleReferencesCache() {
    localStorage.removeItem(STYLE_REFS_CACHE_KEY);
    localStorage.removeItem(STYLE_REFS_CACHE_EXPIRY_KEY);
}

function invalidateStyleReferencesCache() {
    clearStyleReferencesCache();
    loadStyleReferences(true); // Force refresh
}

// Display style references in the grid
function displayStyleReferences(styles) {
    const grid = document.getElementById('styleGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    // Display available style references
    styles.forEach(style => {
        const card = createStyleCard(style);
        grid.appendChild(card);
    });

    // Get premium status from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const isPremium = urlParams.get('premium') === '1';
    
    // Add premium teaser if user is not authenticated or not premium
    if (!authToken || !isPremium) {
        addPremiumTeaser(grid);
    }

    // Update filter buttons based on available categories
    updateFilterButtons(styles);
}

// Create individual style reference card
function createStyleCard(style) {
    const card = document.createElement('div');
    card.className = 'style-card';
    card.setAttribute('data-category', style.category || 'all');

    // Add premium badge if applicable
    const premiumBadge = style.isPremium ? 
        '<div class="premium-badge">Premium</div>' : '';

    card.innerHTML = `
        ${premiumBadge}
        <div class="card-image">
            <img src="${style.image}" alt="${style.description}" loading="lazy">
        </div>
        <div class="card-content">
            <p class="style-description">${style.description}</p>
            <div class="code-container">
                <code class="style-code">${style.code}</code>
                <button class="copy-btn" data-code="${style.code}">
                    <img src="icons/copy-icon.svg" alt="Copy">
                    <span>Copy</span>
                </button>
            </div>
        </div>
    `;

    // Add copy functionality
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
        copyToClipboard(style.code);
    });

    return card;
}

// Add premium teaser section with login/upgrade options
function addPremiumTeaser(grid) {
    const teaser = document.createElement('div');
    teaser.className = 'premium-teaser';
    
   const button = authToken ?
    `<a href="https://catalystmedia.ai/prompt-catalyst-premium/" 
        class="premium-upgrade-btn" target="_blank">
        <span class="shine"></span>
        Upgrade to Premium
    </a>` :
    `<a href="https://catalystmedia.ai/prompt-catalyst-premium/" 
        class="premium-upgrade-btn" target="_blank">
        <span class="shine"></span>
        Get Premium
    </a>`;

teaser.innerHTML = `
    <div class="premium-teaser-background"></div>
    <div class="premium-teaser-content">
        <h3>Unlock 100+ Premium Style Reference Codes</h3>
        <p>Upgrade to access the complete collection of curated style references.</p>
        ${button}
    </div>
`;
    
    grid.appendChild(teaser);
}
// Update category filter buttons
function updateFilterButtons(styles) {
    const categories = new Set(['all']);
    styles.forEach(style => categories.add(style.category));

    const filters = document.querySelector('.filters');
    if (!filters) return;

    filters.innerHTML = '';
    categories.forEach(category => {
        if (!category) return;
        
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-category', category);
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        
        if (category === 'all') button.classList.add('active');
        
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            filterStyles(category);
        });
        
        filters.appendChild(button);
    });
}

// Filter styles by category
function filterStyles(category) {
    const cards = document.querySelectorAll('.style-card');
    const teaser = document.querySelector('.premium-teaser');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Show teaser only for 'all' category or when no cards are visible
    if (teaser) {
        const visibleCards = document.querySelectorAll('.style-card[style*="display: flex"]');
        teaser.style.display = (category === 'all' || visibleCards.length === 0) ? 'flex' : 'none';
    }
}

// Copy code to clipboard
async function copyToClipboard(code) {
    try {
        await navigator.clipboard.writeText(code);
        showToast('Code copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy code', 'error');
    }
}

// Display error message
function displayError(message) {
    const grid = document.getElementById('styleGrid');
    if (!grid) return;

    grid.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button onclick="loadStyleReferences()" class="retry-btn">
                Try Again
            </button>
        </div>
    `;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Set up search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.style-card');
            const teaser = document.querySelector('.premium-teaser');
            
            let hasVisibleCards = false;
            cards.forEach(card => {
                const description = card.querySelector('.style-description').textContent.toLowerCase();
                const code = card.querySelector('.style-code').textContent.toLowerCase();
                
                if (description.includes(searchTerm) || code.includes(searchTerm)) {
                    card.style.display = 'flex';
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show teaser only if no cards are visible
            if (teaser) {
                teaser.style.display = hasVisibleCards ? 'none' : 'flex';
            }
        });
    }

    // Initialize and load content
    await initializeAuth(); // Will continue even without token
    await loadStyleReferences(); // Will load free content for unauthenticated users
});