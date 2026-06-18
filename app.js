// ==========================================================================
// 1. MANUAL USER ACCOUNT DIRECTORY (No external databases)
// ==========================================================================
const premiumUserDirectory = [
    { email: "admin@trading.com", password: "tradeking2026" },
    { email: "trader1", password: "vipaccess2026" },
    { email: "member2@docs.com", password: "mypassword99" }
    { email: "@thebankbugs", password: "12345678" }
    // You can manually drop new premium user combinations right here!
];

// ==========================================================================
// 1. DYNAMIC INTERNAL CONTENT DATABASE (With Protection Tier Markers)
// ==========================================================================
const courseContentDatabase = [
    { id: "box-intro", tier: "free", category: "Syllabus", label: "Section 1: App Introduction", title: "Welcome to the App Platform", snippet: "This middle reading zone handles your core learning materials. Tap the top hamburger menu icon to reveal your courses sidebar menu." },
    { id: "box-html", tier: "free", category: "Syllabus", label: "Section 2: HTML Foundations", title: "Section 2: HTML Structural Layouts", snippet: "The HTML layout frame code container wraps everything perfectly. It sets up rigid blocks for layouts." },
    { id: "box-css", tier: "free", category: "Syllabus", label: "Section 3: Structural CSS", title: "Section 3: Structural CSS Engineering", snippet: "CSS layout modules freeze the screen viewports entirely. We utilize flexbox layouts to lock panels." },
    
    // Private Trading Infrastructure Content Layers
    { id: "box-watchlist", tier: "premium", category: "Private Data", label: "Market Watchlist", title: "Premium Watchlist Terminal", snippet: "Real-time monitored asset pairs, volume profiles, and institutional order blocks." },
    { id: "box-trades", tier: "premium", category: "Private Data", label: "Active Trade Signals", title: "Live Trades & Break-downs", snippet: "Algorithmic entries, target take-profits, and explicit stop-loss risk parameters." },
    { id: "box-journal", tier: "premium", category: "Private Data", label: "Trading Journal Workspace", title: "Private Notebook Journal", snippet: "Member trade logging mechanics, tracking rule sets, and emotional data charts." }
];

// ==========================================================================
// 2. DOM SELECTORS & STATE MANAGEMENT
// ==========================================================================
let currentUserRole = "free"; // Global State: Stores "free" or "premium"

const authScreenLayer = document.getElementById('auth-screen-layer');
const appWorkspaceShell = document.getElementById('app-workspace-shell');
const btnFreeBeginner = document.getElementById('btn-free-beginner');
const authLoginForm = document.getElementById('auth-login-form');
const headerLogoutBtn = document.getElementById('header-logout-btn');

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
// 3. SECURE AUTHENTICATION SCREEN ENTRY & EXIT ROUTING ACTIONS
// ==========================================================================
function enterAppWorkspace(role) {
    currentUserRole = role; // "free" or "premium"
    authScreenLayer.classList.remove('active-layer');
    appWorkspaceShell.classList.add('active-layer');
    
    // Auto-adjust header branding to reflect membership state safely
    const brandingTitle = document.querySelector('.app-branding-title');
    if (currentUserRole === "premium") {
        brandingTitle.innerHTML = 'EduDocs <span style="color:#eab308; font-size:0.75rem; vertical-align:middle;">⚡ PRO</span>';
    } else {
        brandingTitle.innerHTML = 'EduDocs <span style="color:#64748b; font-size:0.75rem; vertical-align:middle;">🌱 FREE</span>';
    }
    
    resetToInitialView();
}

function logoutAndExitApp() {
    appWorkspaceShell.classList.remove('active-layer');
    authScreenLayer.classList.add('active-layer');
    authLoginForm.reset(); // Safely clear old input fields
    internalSearchInput.value = "";
    resetToInitialView();
}

// ──────────────────────────────────────────────────────────
// PATH A: THE FREE BEGINNER PATH (No Username/Password Needed)
// ──────────────────────────────────────────────────────────
btnFreeBeginner.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    console.log("Free beginner path triggered. Bypassing login credentials entirely.");
    enterAppWorkspace("free"); // Grant quick access to free content sections only
});

// ──────────────────────────────────────────────────────────
// PATH B: THE PREMIUM FORM AUTH PROCESSOR
// ──────────────────────────────────────────────────────────
authLoginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from submitting and refreshing the page
    
    const emailField = document.getElementById('login-email').value.trim();
    const passwordField = document.getElementById('login-password').value;

    // Scan your hardcoded directory array list for matches
    const accountMatch = premiumUserDirectory.find(user => 
        user.email.toLowerCase() === emailField.toLowerCase() && 
        user.password === passwordField
    );

    if (accountMatch) {
        // Success match! 
        console.log("Manual verification passed. Access Granted.");
        enterAppWorkspace("premium"); // Unlocks your private trading data infrastructure tabs
    } else {
        // Access Denied path
        alert("🔒 Access Denied: Incorrect premium account name or password keys. Please try again.");
    }
});

headerLogoutBtn.addEventListener('click', logoutAndExitApp);


// ==========================================================================
// 4. SLIDING NAVIGATION SIDEBAR MECHANICS
// ==========================================================================
function openSidebar() { slidingLeftMenu.classList.add('open'); sidebarBackdrop.classList.add('open'); }
function closeSidebar() { slidingLeftMenu.classList.remove('open'); sidebarBackdrop.classList.remove('open'); }

menuOpenBtn.addEventListener('click', openSidebar);
menuCloseBtn.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

// ==========================================================================
// 5. LIVE GATEKEEPER SEARCH ROUTER
// ==========================================================================
internalSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") { resetToInitialView(); return; }

    // Filter content: Free users can ONLY view/search "free" marked assets!
    const filteredMatches = courseContentDatabase.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) || 
                             item.snippet.toLowerCase().includes(query) ||
                             item.label.toLowerCase().includes(query);
        
        if (currentUserRole === "free") {
            return matchesQuery && item.tier === "free"; // Block premium search indexing completely
        }
        return matchesQuery;
    });

    hideAllInteriorBoxes();
    searchResultsOutput.classList.add('active-box');

    if (filteredMatches.length === 0) {
        searchResultsList.innerHTML = `<p style="color: #64748b; padding: 12px 0;">No matching results found.</p>`;
    } else {
        searchResultsList.innerHTML = filteredMatches.map(match => `
            <div class="search-result-item" data-jump-target="${match.id}">
                <span>📍 ${match.category}</span>
                <h4>${match.label}</h4>
                <p>${match.snippet}</p>
            </div>
        `).join('');
    }
});

// Search Result Card Click Execution
searchResultsList.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.search-result-item');
    if (!clickedCard) return;

    const targetBoxId = clickedCard.dataset.jumpTarget;
    internalSearchInput.value = "";
    
    document.querySelectorAll('.syllabus-tab.active, .bottom-nav-item.active').forEach(item => item.classList.remove('active'));
    hideAllInteriorBoxes();

    document.getElementById(targetBoxId).classList.add('active-box');
    const matchingTrigger = document.querySelector(`[data-target="${targetBoxId}"]`);
    if (matchingTrigger) matchingTrigger.classList.add('active');
});

function hideAllInteriorBoxes() {
    document.querySelectorAll('.interior-content-box').forEach(box => box.classList.remove('active-box'));
}

function resetToInitialView() {
    hideAllInteriorBoxes();
    document.getElementById('box-intro').classList.add('active-box');
    document.querySelectorAll('.syllabus-tab.active, .bottom-nav-item.active').forEach(item => item.classList.remove('active'));
    const homeTrigger = document.querySelector('[data-target="box-intro"]');
    if (homeTrigger) homeTrigger.classList.add('active');
}

// ==========================================================================
// 6. PROTECTED VIEW TAB NAV CONTROLLER (The Firewall Lock)
// ==========================================================================
const globalNavTriggers = document.querySelectorAll('.syllabus-tab, .bottom-nav-item');

globalNavTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const selectedBoxTargetId = trigger.dataset.target;
        if (!selectedBoxTargetId) return;

        internalSearchInput.value = ""; 
        document.querySelectorAll('.syllabus-tab.active, .bottom-nav-item.active').forEach(item => item.classList.remove('active'));
        hideAllInteriorBoxes();

        // ────────────── FIREWALL RULE GATE ──────────────
        // Check if the clicked target box belongs to a premium-restricted view
        const targetDataRecord = courseContentDatabase.find(item => item.id === selectedBoxTargetId);
        const isPremiumTab = targetDataRecord ? targetDataRecord.tier === "premium" : (selectedBoxTargetId !== "box-intro" && selectedBoxTargetId !== "box-html" && selectedBoxTargetId !== "box-css");

        if (isPremiumTab && currentUserRole === "free") {
            // Re-route free users instantly to the lock screen page row element
            document.getElementById('box-premium-lock').classList.add('active-box');
        } else {
            // Grant verified display permissions to pass layout
            document.getElementById(selectedBoxTargetId).classList.add('active-box');
        }
        // ────────────────────────────────────────────────
        
        trigger.classList.add('active');
        closeSidebar();
        document.querySelector('.central-content-canvas').scrollTop = 0;
    });
});
