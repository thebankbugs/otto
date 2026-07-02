// ==========================================================================
// 2. DYNAMIC INTERNAL CONTENT DATABASE (Updated for 14-Step Track)
// ==========================================================================
const courseContentDatabase = [
    { id: "box-intro", tier: "free", category: "Syllabus", label: "Academy Map", title: "TheBankBugs Trading Academy", snippet: "Welcome, Team PNG! This platform is your complete gateway from absolute beginner to trading live." },
    
    // 🛠️ NEW 14-STEP BEGINNER STARTER-KIT DICTIONARY LOGS
    { id: "box-b1", tier: "free", category: "Starter-Kit", label: "Module 1", title: "Overview - READ ME first", snippet: "Welcome message, training roadmap targets, and the exact mindset required to navigate capital fields safely." },
    { id: "box-b2", tier: "free", category: "Starter-Kit", label: "Module 2", title: "Introduction", snippet: "What the Foreign Exchange financial markets actually are, currency asset fluctuations, and data metrics." },
    { id: "box-b3", tier: "free", category: "Starter-Kit", label: "Module 3", title: "Trading platforms", snippet: "Deep dive breakdown analyzing processing terminals like MetaTrader 5 (MT5) and cTrader dashboards." },
    { id: "box-b4", tier: "free", category: "Starter-Kit", label: "Module 4", title: "Local and international brokers", snippet: "Understanding liquidity channels. Processing differences between local commercial banks and global firms." },
    { id: "box-b5", tier: "free", category: "Starter-Kit", label: "Module 5", title: "Broker to use", snippet: "Partner selection parameters explaining spreads matrix, execution velocities, and fee schedules." },
    { id: "box-b6", tier: "free", category: "Starter-Kit", label: "Module 6", title: "Broker requirements", snippet: "Detailed verification document listings including accepted regional passport files, NID cards, and licenses." },
    { id: "box-b7", tier: "free", category: "Starter-Kit", label: "Module 7", title: "Overview - broker verification process", snippet: "Guidance on navigating compliance screening, avoiding upload faults, and passing safety firewalls." },
    { id: "box-b8", tier: "free", category: "Starter-Kit", label: "Module 8", title: "Opening a broker account", snippet: "Live onboarding guide demonstrating profile setups and system registration flows via tracking links." },
    { id: "box-b9", tier: "free", category: "Starter-Kit", label: "Module 9", title: "Opening a real/demo trading account", snippet: "Configuring platform terminal architectures, leverage bounds, asset profiles, and secure password keys." },
    { id: "box-b10", tier: "free", category: "Starter-Kit", label: "Module 10", title: "deposit/ withdrawal process", snippet: "Fund routing methods detailing local bank wire interactions, card processors, and transaction times." },
    { id: "box-b11", tier: "free", category: "Starter-Kit", label: "Module 11", title: "Connecting trading account to trading platforms", snippet: "Mapping login IDs, selecting explicit backend server networks, and verifying MT5 system access states." },
    { id: "box-b12", tier: "free", category: "Starter-Kit", label: "Module 12", title: "Basic charting tools MT5", snippet: "Interfacing with candlestick layouts, installing trendlines, support/resistance boxes, and timeframes." },
    { id: "box-b13", tier: "free", category: "Starter-Kit", label: "Module 13", title: "Demo trading 101", snippet: "Risk-free simulation guidelines. Placing market execution orders, adjusting lot sizes, and testing positions." },
    { id: "box-b14", tier: "free", category: "Starter-Kit", label: "Module 14", title: "What's Next? Level up to ELITE", snippet: "Transition guidelines from free tracks to premium. Activating active live signals, notebooks, and watchlists." },
    
    // GLOBAL ARCHITECTURE LINKS
    { id: "box-html", tier: "free", category: "Syllabus", label: "Section 2: HTML Foundations", title: "Section 2: HTML Structural Layouts", snippet: "The HTML layout frame code container wraps everything perfectly. It sets up rigid blocks for layouts." },
    { id: "box-css", tier: "free", category: "Syllabus", label: "Section 3: Structural CSS", title: "Section 3: Structural CSS Engineering", snippet: "CSS layout modules freeze the screen viewports entirely. We utilize flexbox layouts to lock panels." },
    
    // PREMIUM TIERS
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
        window.location.href = "../dashboard.html";
    } else {
        window.location.href = "free-resources.html";
    }
}

function logoutAndExitApp() {
    // 🪓 DESTROY THE SECURE SESSION COOKIE IMMEDIATELY
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; Secure";
    
    // Redirect cleanly back to the base entry platform
    if (window.location.pathname.includes('/members/')) {
        window.location.href = "../login.html";
    } else {
        window.location.href = "../login.html";
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
            const apiResponse = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailField, password: passwordField })
            });

            const data = await apiResponse.json();

            if (data.success) {
                // 🔐 SET SECURE SESSION PASS-KEY (Valid for 1 Day)
                const date = new Date();
                date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
                document.cookie = "auth_session=true; path=/; expires=" + date.toUTCString() + "; SameSite=Strict; Secure";
                
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

(function() {
  // Global state object to store live asset prices
  const marketData = {
    BTC: { price: 0, change: 0.85 },
    ETH: { price: 0, change: -0.32 },
    EUR: { price: 1.0850, change: 0.05 }, // Base fallback configurations
    GBP: { price: 1.2680, change: -0.02 }
  };

  let ws;

  function initMarketSocket() {
    const ticker = document.getElementById('live-ticker');
    if (!ticker) return;

    // Direct WebSocket connection bypassing HTTP CORS engines completely
    ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    ws.onopen = () => {
      // Subscribe immediately to real-time price updates
      const subscribeMsg = {
        type: 'subscribe',
        product_ids: ['BTC-USD', 'ETH-USD'],
        channels: ['ticker']
      };
      ws.send(JSON.stringify(subscribeMsg));
      renderTickerUI();
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Update our pricing map dynamically when a trade occurs
      if (data.type === 'ticker' && data.price) {
        const symbol = data.product_id.split('-')[0]; // Extracted string token
        if (marketData[symbol]) {
          marketData[symbol].price = parseFloat(data.price);
          renderTickerUI(); // Instantly update the ticker display
        }
      }
    };

    ws.onerror = (error) => {
      console.error('Socket Connection Error:', error);
    };

    ws.onclose = () => {
      // Auto-reconnect safety loop if the stream gets interrupted
      setTimeout(initMarketSocket, 5000);
    };
  }

  function renderTickerUI() {
    const ticker = document.getElementById('live-ticker');
    if (!ticker) return;

    // Generate output list nodes dynamically
    const items = Object.keys(marketData).map(symbol => {
      const asset = marketData[symbol];
      const isUp = asset.change >= 0;
      const indicator = isUp ? '▲' : '▼';
      const colorClass = isUp ? 'ticker-green' : 'ticker-red';
      
      // Pad out floating decimals by specific currency parameters
      const decimalCount = asset.price < 5 ? 4 : 2;
      const displayPrice = asset.price > 0 ? asset.price.toLocaleString(undefined, {
        minimumFractionDigits: decimalCount,
        maximumFractionDigits: decimalCount
      }) : 'Connecting...';

      const label = symbol === 'EUR' || symbol === 'GBP' ? `${symbol}/USD` : symbol;

      return `
        <span class="ticker-item">
          ${label}: $${displayPrice}
          <span class="${colorClass}">${indicator} ${Math.abs(asset.change).toFixed(2)}%</span>
        </span>
      `;
    });

    // Mirror array outputs twice to form an uninterrupted scrolling loop
    ticker.innerHTML = [...items, ...items].join('');
  }

  // Initialize the stream on page load
  initMarketSocket();
})();
