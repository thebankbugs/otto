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

// CRITICAL FIX: Globally declare the nav layout triggers so the router loop functions perfectly
const navTriggers = document.querySelectorAll('.nav-trigger');

// ==========================================================================
// 4. SECURE AUTHENTICATION SCREEN ENTRY & EXIT ROUTING ACTIONS
// ==========================================================================
function enterAppWorkspace(role) {
    currentUserRole = role; 
    
    // PERSISTENCE STORAGE MATRIX: Save role choice securely in browser memory
    localStorage.setItem('bankbugs_session_role', role);
    
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
    // PURGE DATA MATRIX: Wipe out stored session parameters on explicit logout
    localStorage.removeItem('bankbugs_session_role');
    
    currentUserRole = "free"; 
    appWorkspaceShell.classList.remove('active-layer');
    authScreenLayer.classList.add('active-layer');
    if (authLoginForm) authLoginForm.reset(); 
    if (internalSearchInput) internalSearchInput.value = "";
    resetToInitialView();
}

// AUTOMATED SESSION RESTORATION CHECKER (Fires on page initialization)
function checkExistingUserSession() {
    const savedUserRole = localStorage.getItem('bankbugs_session_role');
    
    if (savedUserRole === "premium" || savedUserRole === "free") {
        console.log(`Restoring automated persistent app session parameters for tier: ${savedUserRole}`);
        enterAppWorkspace(savedUserRole);
    } else {
        console.log("No persistent user session found in memory.");
    }
}

// PATH A: THE FREE BEGINNER PATH
if (btnFreeBeginner) {
    btnFreeBeginner.addEventListener('click', (e) => {
        e.preventDefault(); 
        enterAppWorkspace("free");
    });
}

// PATH B: THE PREMIUM FORM AUTH PROCESSOR
if (authLoginForm) {
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
}

if (headerLogoutBtn) headerLogoutBtn.addEventListener('click', logoutAndExitApp);
if (lockwallReturnBtn) lockwallReturnBtn.addEventListener('click', logoutAndExitApp);


// ==========================================================================
// 5. NAV ROUTER WITH GATEKEEPER LOCK INTERCEPTOR
// ==========================================================================
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

if (menuOpenBtn) menuOpenBtn.addEventListener('click', openSidebar);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeSidebar);
if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

// ==========================================================================
// 7. LIVE GATEKEEPER SEARCH ROUTER
// ==========================================================================
if (internalSearchInput) {
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
}

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
        targetBox.classList.add('active-box');
        
        // INTERCEPTOR: If opening the watchlist container, initialize TradingView dynamically
        if (boxId === 'box-watchlist') {
            loadLiveTradingViewWidget();
        }
    }
}

// DYNAMIC IFRAME ENGINE: Bypasses browser injection errors to mount TradingView safely
function loadLiveTradingViewWidget() {
    const anchor = document.getElementById('tradingview-watchlist-anchor');
    if (!anchor) return;

    // 1. Purge any broken, frozen instances before mounting a clean window frame
    anchor.innerHTML = "";

    // 2. Formulate an isolated iframe container element to block styling leaks
    const frameElement = document.createElement('iframe');
    frameElement.style.width = "100%";
    frameElement.style.height = "100%";
    frameElement.style.border = "none";
    frameElement.style.background = "transparent";

    // 3. Mount the frame directly to our layout canvas anchor box slot
    anchor.appendChild(frameElement);

    // 4. Formulate the official TradingView document script configuration structure
    const iframePayloadContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:transparent; }
            </style>
        </head>
        <body>
            <div class="tradingview-widget-container" style="width:100%; height:100%;">
                <div class="tradingview-widget-container__widget" style="width:100%; height:100%;"></div>
                <script type="text/javascript" src="https://tradingview.com" async>
                {
                    "colorTheme": "dark",
                    "dateRange": "12M",
                    "showChart": false,
                    "locale": "en",
                    "width": "100%",
                    "height": "100%",
                    "largeChartUrl": "",
                    "isTransparent": true,
                    "showSymbolLogo": true,
                    "showFloatingTooltip": false,
                    "tabs": [
                        {
                            "title": "Indices & Gold",
                            "symbols": [
                                { "s": "OANDA:NAS100USD", "d": "US100 (Nasdaq)" },
                                { "s": "OANDA:SPX500USD", "d": "US500 (S&P 500)" },
                                { "s": "OANDA:US30USD", "d": "US30 (Dow Jones)" },
                                { "s": "OANDA:XAUUSD", "d": "Gold / US Dollar" }
                            ]
                        },
                        {
                            "title": "Forex Majors",
                            "symbols": [
                                { "s": "FX_IDC:EURUSD", "d": "EUR / USD" },
                                { "s": "FX_IDC:GBPUSD", "d": "GBP / USD" },
                                { "s": "FX_IDC:AUDUSD", "d": "AUD / USD" },
                                { "s": "FX_IDC:USDJPY", "d": "USD / JPY" }
                            ]
                        }
                    ]
                }
                <\/script>
            </div>
        </body>
        </html>
    `;

    // 5. Open the iframe content thread channel and write the widget data live
    const frameDocument = frameElement.contentWindow || frameElement.contentDocument;
    const targetDoc = frameDocument.document ? frameDocument.document : frameDocument;

    targetDoc.open();
    targetDoc.write(iframePayloadContent);
    targetDoc.close();
}


// ==========================================================================
// 10. FAST BOTTOM TAB TERMINAL DATA REFRESH MATRIX
// ==========================================================================
const bottomBarRefreshBtn = document.getElementById('bottom-bar-refresh-btn');

if (bottomBarRefreshBtn) {
    bottomBarRefreshBtn.addEventListener('click', () => {
        console.log("Terminal interface refresh cycle requested by user.");
        
        bottomBarRefreshBtn.classList.add('spinning-loader-icon');
        setTimeout(() => {
            bottomBarRefreshBtn.classList.remove('spinning-loader-icon');
        }, 500);

        if (internalSearchInput) internalSearchInput.value = "";

        const watchlistBox = document.getElementById('box-watchlist');
        if (watchlistBox && watchlistBox.classList.contains('active-box') && currentUserRole === "premium") {
            loadLiveTradingViewWidget();
        } else {
            const activeBoxBeforeRefresh = document.querySelector('.interior-content-box.active-box');
            if (activeBoxBeforeRefresh) {
                const currentActiveId = activeBoxBeforeRefresh.getAttribute('id');
                showContentBox(currentActiveId);
            }
        }
    });
}

// INITIALIZATION BOOTSTRAP
checkExistingUserSession();
