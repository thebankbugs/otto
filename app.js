// ==========================================================================
// 1. DYNAMIC INTERNAL CONTENT DATABASE (10 Modules Profile)
// ==========================================================================
const courseContentDatabase = [
    { id: "box-intro", category: "Syllabus", label: "Section 1: App Introduction", title: "Welcome to the App Platform", snippet: "This middle reading zone handles your core learning materials. Tap the top hamburger menu icon to reveal your courses sidebar menu." },
    { id: "box-html", category: "Syllabus", label: "Section 2: HTML Foundations", title: "Section 2: HTML Structural Layouts", snippet: "The HTML layout frame code container wraps everything perfectly. It sets up block layout zones for elements." },
    { id: "box-css", category: "Syllabus", label: "Section 3: Structural CSS", title: "Section 3: Structural CSS Engineering", snippet: "CSS layout modules freeze the screen viewports entirely. We utilize flexbox grid panels to lock frames." },
    { id: "box-saves", category: "Navigation", label: "Your Bookmarks Slot", title: "Your Saved Bookmarks", snippet: "Articles or lessons you choose to bookmark will display neatly inside this saved container slot panel space." }
    // You can seamlessly add Sections 4 through 10 objects into this array matrix later!
];

// ==========================================================================
// 2. DOM SELECTORS ARCHITECTURE
// ==========================================================================
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
// 3. MAIN SCREEN ENTRY & EXIT ROUTING ACTIONS
// ==========================================================================
function enterAppWorkspace() {
    authScreenLayer.classList.remove('active-layer');
    appWorkspaceShell.classList.add('active-layer');
}

function logoutAndExitApp() {
    appWorkspaceShell.classList.remove('active-layer');
    authScreenLayer.classList.add('active-layer');
    authLoginForm.reset(); 
    internalSearchInput.value = ""; // Clear search value box on exit
}

btnFreeBeginner.addEventListener('click', enterAppWorkspace);
authLoginForm.addEventListener('submit', (e) => { e.preventDefault(); enterAppWorkspace(); });
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
// 5. LIVE CLIENT-SIDE INTERNAL SEARCH FILTER ENGINE
// ==========================================================================
internalSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // If the search input is completely empty, clear results and go back to home view
    if (query === "") {
        hideAllInteriorBoxes();
        document.getElementById('box-intro').classList.add('active-box');
        return;
    }

    // Filter our database array text values matching the query string keywords
    const filteredMatches = courseContentDatabase.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.snippet.toLowerCase().includes(query) ||
        item.label.toLowerCase().includes(query)
    );

    // Render the matching data objects as clean results cards
    hideAllInteriorBoxes();
    searchResultsOutput.classList.add('active-box');

    if (filteredMatches.length === 0) {
        searchResultsList.innerHTML = `<p style="color: #64748b; padding: 12px 0;">No matching results found for "${e.target.value}". Try another keyword.</p>`;
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

// Click listener to jump straight to a section when a search result card is tapped
searchResultsList.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.search-result-item');
    if (!clickedCard) return;

    const targetBoxId = clickedCard.dataset.jumpTarget;
    
    // Clear the search bar inputs completely
    internalSearchInput.value = "";
    
    // De-activate old highlights from sidebar or bottom bars
    document.querySelectorAll('.syllabus-tab.active, .bottom-nav-item.active').forEach(item => item.classList.remove('active'));

    // Switch reading viewport panel box instantly
    hideAllInteriorBoxes();
    document.getElementById(targetBoxId).classList.add('active-box');

    // Find and highlight matching syllabus tab or bottom nav item if it exists
    const matchingTrigger = document.querySelector(`[data-target="${targetBoxId}"]`);
    if (matchingTrigger) matchingTrigger.classList.add('active');
});

// Helper function to turn off visibility curtains on all inner panels
function hideAllInteriorBoxes() {
    document.querySelectorAll('.interior-content-box').forEach(box => {
        box.classList.remove('active-box');
    });
}

// ==========================================================================
// 6. INTERIOR CONTENT BOX CONTAINER SWAPPING VIA TABS
// ==========================================================================
const globalNavTriggers = document.querySelectorAll('.syllabus-tab, .bottom-nav-item');

globalNavTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const selectedBoxTargetId = trigger.dataset.target;
        if (!selectedBoxTargetId) return;

        internalSearchInput.value = ""; // Auto-clear search field when standard tab navigating
        document.querySelectorAll('.syllabus-tab.active, .bottom-nav-item.active').forEach(item => item.classList.remove('active'));
        hideAllInteriorBoxes();

        document.getElementById(selectedBoxTargetId).classList.add('active-box');
        trigger.classList.add('active');

        closeSidebar();
        document.querySelector('.central-content-canvas').scrollTop = 0;
    });
});
