// ==========================================================================
// 2. DYNAMIC INTERNAL CONTENT DATABASE (With Protection Tier Markers)
// ==========================================================================
const courseContentDatabase = [
    { id: "box-intro", tier: "free", category: "Syllabus", label: "Academy Map", title: "TheBankBugs Trading Academy", snippet: "Welcome, Team PNG! This platform is your complete gateway from absolute beginner to trading live." },
    { id: "box-m1", tier: "free", category: "Starter-Kit", label: "Module 1", title: "Introduction to Global Markets", snippet: "What forex trading actually is, how currency pairs move, and how retail market participants interface with liquidity networks." },
    { id: "box-m2", tier: "free", category: "Starter-Kit", label: "Module 2", title: "Understanding Candlesticks & Charts", snippet: "Reading price action canvases. Learn to interpret open, high, low, and close values across multiple timeframe structures." },
    { id: "box-m3", tier: "free", category: "Starter-Kit", label: "Module 3", title: "Navigating Your Trading Platform", snippet: "Setting up your live interface layout framework, placing orders, executing market execution keys, and setting basic parameters." },
    { id: "box-m4", tier: "free", category: "Starter-Kit", label: "Module 4", title: "The Math of Survival: Lot Sizes & Pips", snippet: "How to calculate financial risk metrics before taking trades. Protecting capital balances using strict position sizing calculations." },
    { id: "box-m5", tier: "free", category: "Starter-Kit", label: "Module 5", title: "IC Markets Verification Pipeline", snippet: "Step-by-step guidance on setting up your partner account, submitting PNG identification keys, and unlocking live system codes." },
    { id: "box-html", tier: "free", category: "Syllabus", label: "Section 2: HTML Foundations", title: "Section 2: HTML Structural Layouts", snippet: "The HTML layout frame code container wraps everything perfectly. It sets up rigid blocks for layouts." },
    { id: "box-css", tier: "free", category: "Syllabus", label: "Section 3: Structural CSS", title: "Section 3: Structural CSS Engineering", snippet: "CSS layout modules freeze the screen viewports entirely. We utilize flexbox layouts to lock panels." },
    { id: "box-watchlist", tier: "premium", category: "Private Data", label: "Market Watchlist", title: "Premium Watchlist Terminal", snippet: "Real-time monitored asset pairs, volume profiles, and institutional order blocks." },
    { id: "box-trades", tier: "premium", category: "Private Data", label: "Active Trade Signals", title: "Live Trades & Break-downs", snippet: "Algorithmic entries, target take-profits, and explicit stop-loss risk parameters." },
    { id: "box-journal", tier: "premium", category: "Private Data", label: "Trading Journal Workspace", title: "Private Notebook Journal", snippet: "Member trade logging mechanics, tracking rule sets, and emotional data charts." }
];

// ==========================================================================
// 3. DOM SELECTORS & STATE MANAGEMENT (With Null Intercept Controls)
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

// Detect current page role environment to maintain simulated state across paths
if (window.location.pathname.includes('/members/')) {
    currentUserRole = "premium";
}

// ==========================================================================
// 4. SECURE AUTHENTICATION NAVIGATION ROUTING ACTIONS
// ==========================================================================
function enterAppWorkspace(role) {
    currentUserRole = role; 
    
    // Split Architecture Folder Page Router Matrix
    if (currentUserRole === "premium") {
        window.location.href = "members/dashboard.html";
    } else {
        window.location.href = "free-resources.html";
    }
}

function logoutAndExitApp() {
    // If inside subfolders, step out back to login page directory
    if (window.location.pathname.includes('/members/')) {
        window.location.href = "../index.html";
    } else {
        window.location.href = "index.html";
    }
}

// PATH A: THE FREE BEGINNER PATH HANDLER
if (btnFreeBeginner) {
    btnFreeBeginner.addEventListener('click', (e) => {
        e.preventDefault(); 
        enterAppWorkspace("free");
    });
}

// PATH B: THE PREMIUM FORM AUTH PROCESSOR INTERCEPTOR
if (authLoginForm) {
    authLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const emailField = document.getElementById('login-email').value.trim();
        const passwordField = document.getElementById('login-password').value;

        try {
            // Send credentials securely to your Vercel serverless function
            const apiResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailField, password: passwordField })
            });

            const data = await apiResponse.json();

            if (data.success) {
                enterAppWorkspace("premium"); 
            } else {
                alert("🔒 Access Denied: Incorrect premium account name or password keys. Please try again.");
            }
        } catch (error) {
            console.error("Authentication Error:", error);
            alert("⚠️ Connection Error: Failed to contact the authentication server.");
        }
    });
}

if (headerLogoutBtn) headerLogoutBtn.addEventListener('click', logoutAndExitApp);
if (lockwallReturnBtn) lockwallReturnBtn.addEventListener('click', logoutAndExitApp);

// ==========================================================================
// 5. NAV ROUTER WITH GATEKEEPER LOCK INTERCEPTOR
// ==========================================================================
const navTriggers = document.querySelectorAll('.nav-trigger');

navTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');
        const targetTier = trigger.getAttribute('data-tier');

        navTriggers.forEach(btn => {
            if(btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else if (btn.classList.contains('bottom-nav-item') === trigger.classList.contains('bottom-nav-item')) {
                btn.classList.remove('active');
            }
        });

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
function openSidebar() { 
    if (slidingLeftMenu && sidebarBackdrop) {
        slidingLeftMenu.classList.add('open'); 
        sidebarBackdrop.classList.add('open'); 
    }
}
function closeSidebar() { 
    if (slidingLeftMenu && sidebarBackdrop) {
        slidingLeftMenu.classList.remove('open'); 
        sidebarBackdrop.classList.remove('open'); 
    }
}

if (menuOpenBtn) menuOpenBtn.addEventListener('click', openSidebar);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeSidebar);
if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

// ==========================================================================
// 7. LIVE GATEKEEPER SEARCH ROUTER
// ==========================================================================
if (internalSearchInput) {
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
}

function renderSearchResults(matches) {
    if (!searchResultsList || !searchResultsOutput) return;
    searchResultsList.innerHTML = "";

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

function resetToInitialView() {
    if (searchResultsOutput) searchResultsOutput.classList.remove('active-box');
    showContentBox('box-intro');
}

function showContentBox(boxId) {
    const allContentBoxes = document.querySelectorAll('.interior-content-box');
    allContentBoxes.forEach(box => {
        if (box.id === boxId) {
            box.classList.add('active-box'); 
        } else {
            box.classList.remove('active-box');
        }
    });
}

// ==========================================================================
// 8. SIDEBAR EXPANDING ACCORDION CONTROLLER ENGINE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const accordionToggleBtn = document.getElementById('accordion-toggle-btn');
    const beginnerSubPanel = document.getElementById('beginner-sub-panel');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');

    if (accordionToggleBtn && beginnerSubPanel) {
        accordionToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            accordionToggleBtn.classList.toggle('expanded');
            beginnerSubPanel.classList.toggle('expanded');
        });
    }

    subNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            subNavLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
