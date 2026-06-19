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

    if (query === "") { resetToInitialView(); return; }

    const filteredMatches = courseContentDatabase.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) || 
                             item.snippet.toLowerCase().includes(query) ||
                             item.label.toLowerCase().includes(query);
        
        if (currentUserRole === "free") {
            return matchesQuery && item.tier === "free"; 
        }
        return matchesQuery;
    });

    hideAllInteriorBoxes();
    searchResultsOutput.classList.add('active-box');

    if (filteredMatches.length === 0) {
        searchResultsList.innerHTML = `<p style="color: #64748b; padding: 12px 0;">No matching results found.</p>`;
    } else {
        searchResultsList.innerHTML = filteredMatches.map(item => `
            <div class="search-result-item" style="cursor:pointer; margin-bottom:12px; padding:10px; border-bottom:1px solid #f1f5f9;" onclick="handleSearchResultClick('${item.id}', '${item.tier}')">
                <span class="result-category" style="font-size:0.7rem; background:#e2e8f0; padding:2px 6px; border-radius:4px;">${item.category}</span>
                <h4 style="margin:4px 0 2px 0;">${item.title}</h4>
                <p style="font-size:0.85rem; color:#64748b; margin:0;">${item.snippet}</p>
            </div>
        `).join('');
    }
});

// Click processor wrapper specifically for dynamic search elements
window.handleSearchResultClick = function(targetId, targetTier) {
    if (currentUserRole === "free" && targetTier === "premium") {
        showContentBox('box-premium-lock');
    } else {
        showContentBox(targetId);
    }
};

// ==========================================================================
// 8. INTERIOR INTERFACE VIEW SHIFTERS (Helper Functions)
// ==========================================================================
function hideAllInteriorBoxes() {
    const contentBoxes = document.querySelectorAll('.interior-content-box');
    contentBoxes.forEach(box => box.classList.remove('active-box'));
}

function showContentBox(boxId) {
    hideAllInteriorBoxes();
    if (searchResultsOutput) searchResultsOutput.classList.remove('active-box');
    
    const targetBox = document.getElementById(boxId);
    if (targetBox) {
