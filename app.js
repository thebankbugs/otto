// ==========================================================================
// 1. MANUAL USER ACCOUNT DIRECTORY (No external databases)
// ==========================================================================
const premiumUserDirectory = [
    { email: "admin@trading.com", password: "tradeking2026" },
    { email: "trader1", password: "vipaccess2026" },
    { email: "member2@docs.com", password: "mypassword99" },
    { email: "member2@doc.com", password: "mypassword9" },
    { email: "admin@thebankbugs.app", password: "ddfee773429a" }
];

// ==========================================================================
// 2. DYNAMIC INTERNAL CONTENT DATABASE (With Protection Tier Markers)
// ==========================================================================
const courseContentDatabase = [
    { id: "box-intro", tier: "free", category: "Syllabus", label: "Section 1: App Introduction", title: "Welcome to the App Platform", snippet: "This middle reading zone handles your core learning materials. Tap the top hamburger menu icon to reveal your courses sidebar menu." },
    { id: "box-html", tier: "free", category: "Syllabus", label: "Section 2: HTML Foundations", title: "Section 2: HTML Structural Layouts", snippet: "The HTML layout frame code container wraps everything perfectly. It sets up rigid blocks for layouts." },
    { id: "box-css", tier: "free", category: "Syllabus", label: "Section 3: Structural CSS", title: "Section 3: Structural CSS Engineering", snippet: "CSS layout modules freeze the screen viewports entirely. We utilize flexbox layouts to lock panels." },
    { id: "box-watchlist", tier: "premium", category: "Private Data", label: "Market Watchlist", title: "Premium Watchlist Terminal", snippet: "Real-time monitored asset pairs, volume profiles, and institutional order blocks." },
    { id: "box-trades", tier: "premium", category: "Private Data", label: "Active Trade Signals", title: "Live Trades & Break-downs", snippet: "Algorithmic entries, target take-profits, and explicit stop-loss risk parameters." },
    { id: "box-journal", tier: "premium", category: "Private Data", label: "Trading Journal Workspace", title: "Private Notebook Journal", snippet: "Member trade logging mechanics, tracking rule sets, and emotional data charts." }
];

// ==========================================================================
// 3. DOM SELECTORS & STATE MANAGEMENT
// ==========================================================================
let currentUserRole = "free"; 

const authScreenLayer = document.getElementById('auth-screen-layer');
const appWorkspaceShell = document.getElementById('app-workspace-shell');
const btnFreeBeginner = document.getElementById('btn-free-beginner');
const authLoginForm = document.getElementById('auth-login-form');
const headerLogoutBtn = document.getElementById('header-logout-btn');
const lockwallReturnBtn = document.getElementById('lockwall-return-btn');

// Search & Filtering Dom Elements
const internalSearchInput = document.getElementById('internal-search-input');
const searchResultsOutput = document.getElementById('search-results-output');
const searchResultsList = document.getElementById('search-results-list');

// Sidebar Structural Selectors
const slidingLeftMenu = document.getElementById('sliding-left-menu');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const menuOpenBtn = document.getElementById('menu-open-btn');
const menuCloseBtn = document.getElementById('menu-close-btn');

// ==========================================================================
// 4. SECURE AUTHENTICATION SCREEN ENTRY & EXIT ROUTING ACTIONS
// ==========================================================================
function enterAppWorkspace(role) {
    currentUserRole = role; 
    authScreenLayer.classList.remove('active-layer');
    appWorkspaceShell.classList.add('active-layer');
    
    const brandingTitle = document.querySelector('.app-branding-title');
    if (brandingTitle) {
        if (currentUserRole === "premium") {
            brandingTitle.innerHTML = 'TheBankBugs <span style="color:#00ff00; font-size:0.75rem; font-weight:900; vertical-align:middle; letter-spacing:0.5px;">⚡ PRO</span>';
        } else {
            brandingTitle.innerHTML = 'TheBankBugs <span style="color:#929ba2; font-size:0.75rem; font-weight:900; vertical-align:middle; letter-spacing:0.5px;">🌱 FREE</span>';
        }
    }
    resetToInitialView();
}

function logoutAndExitApp() {
    appWorkspaceShell.classList.remove('active-layer');
    authScreenLayer.classList.add('active-layer');
    if (authLoginForm) authLoginForm.reset(); 
    if (internalSearchInput) internalSearchInput.value = "";
    resetToInitialView();
}

// PATH A: THE FREE BEGINNER PATH
btnFreeBeginner.addEventListener('click', (e) => {
    e.preventDefault(); 
    enterAppWorkspace("free");
});

// PATH B: THE PREMIUM FORM AUTH PROCESSOR
authLoginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const emailField = document.getElementById('login-email').value.trim();
    const passwordField = document.getElementById('login-password').value;

    const accountMatch = premiumUserDirectory.find(user => 
        user.email.toLowerCase() === emailField.toLowerCase() && 
        user.password === passwordField
    );

    if (accountMatch) {
        enterAppWorkspace("premium"); 
    } else {
        alert("🔒 Access Denied: Incorrect premium account name or password keys. Please try again.");
    }
});

headerLogoutBtn.addEventListener('click', logoutAndExitApp);
if (lockwallReturnBtn) lockwallReturnBtn.addEventListener('click', logoutAndExitApp);

// ==========================================================================
// 5. NAV ROUTER WITH GATEKEEPER LOCK INTERCEPTOR
// ==========================================================================
const navTriggers = document.querySelectorAll('.nav-trigger');

navTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');
        const targetTier = trigger.getAttribute('data-tier');

        // Clean UI active states for clicked tab buttons
        navTriggers.forEach(btn => {
            if(btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else if (btn.classList.contains('bottom-nav-item') === trigger.classList.contains('bottom-nav-item')) {
                btn.classList.remove('active');
            }
        });

        // Gatekeeper logic check
        if (currentUserRole === "free" && targetTier === "premium") {
            showContentBox('box-premium-lock');
        } else {
            showContentBox(targetId);
        }
        closeSidebar();
    });
});

// ==========================================================================
// 6. SLIDING NAVIGATION SIDEBAR MECHANICS
// ==========================================================================
function openSidebar() { slidingLeftMenu.classList.add('open'); sidebarBackdrop.classList.add('open'); }
function closeSidebar() { slidingLeftMenu.classList.remove('open'); sidebarBackdrop.classList.remove('open'); }

menuOpenBtn.addEventListener('click', openSidebar);
menuCloseBtn.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

// ==========================================================================
// 7. LIVE GATEKEEPER SEARCH ROUTER
// ==========================================================================
internalSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") { 
        resetToInitialView(); 
        return; 
    }

    const filteredMatches = courseContentDatabase.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) || 
                             item.snippet.toLowerCase().includes(query) ||
                             item.label.toLowerCase().includes(query);
        
        if (currentUserRole === "free") {
            return matchesQuery && item.tier === "free"; 
        }
        return matchesQuery;
    });

    renderSearchResults(filteredMatches);
});

// Helper function to safely output search engine results to HTML
function renderSearchResults(matches) {
    if (!searchResultsList || !searchResultsOutput) return;
    searchResultsList.innerHTML = "";

       // Hide standard modules to clear space for search rendering
    const allContentBoxes = document.querySelectorAll('.interior-content-box');
    allContentBoxes.forEach(box => box.classList.remove('active-box'));

    if (matches.length === 0) {
        searchResultsList.innerHTML = '<p style="color: var(--text-muted-gray); padding: 10px 0;">No matching course or system logs found.</p>';
        searchResultsOutput.classList.add('active-box');
        return;
    }

    matches.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.style.padding = "14px";
        itemElement.style.marginBottom = "10px";
        itemElement.style.backgroundColor = "var(--bg-card-element)";
        itemElement.style.border = "1px solid var(--border-dim-gray)";
        itemElement.style.borderRadius = "8px";
        itemElement.style.cursor = "pointer";

        itemElement.innerHTML = `
            <small style="color: var(--laser-lime-green); font-weight: bold; text-transform: uppercase;">${item.category} • ${item.label}</small>
            <h3 style="margin: 4px 0; color: #fff;">${item.title}</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted-gray);">${item.snippet}</p>
        `;

        itemElement.addEventListener('click', () => {
            showContentBox(item.id);
            internalSearchInput.value = "";
            searchResultsOutput.classList.remove('active-box');
        });

        searchResultsList.appendChild(itemElement);
    });

    searchResultsOutput.classList.add('active-box');
}

// System reset layout execution script
function resetToInitialView() {
    if (searchResultsOutput) searchResultsOutput.classList.remove('active-box');
    showContentBox('box-intro');
}

// Primary layout frame view switcher script
function showContentBox(boxId) {
    const allContentBoxes = document.querySelectorAll('.interior-content-box');
    allContentBoxes.forEach(box => {
        if (box.id === boxId) {
            box.classList.add('active-box'); // Synchronized to match CSS
        } else {
            box.classList.remove('active-box');
        }
    });
}

