// ==========================================================================
// 1. DOM SELECTORS ARCHITECTURE
// ==========================================================================
const authScreenLayer = document.getElementById('auth-screen-layer');
const appWorkspaceShell = document.getElementById('app-workspace-shell');
const btnFreeBeginner = document.getElementById('btn-free-beginner');
const authLoginForm = document.getElementById('auth-login-form');

// Header Action Selectors
const headerLogoutBtn = document.getElementById('header-logout-btn');

// Sidebar Specific Selectors
const slidingLeftMenu = document.getElementById('sliding-left-menu');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const menuOpenBtn = document.getElementById('menu-open-btn');
const menuCloseBtn = document.getElementById('menu-close-btn');

// ==========================================================================
// 2. MAIN SCREEN ENTRY & EXIT ROUTING ACTIONS
// ==========================================================================
function enterAppWorkspace() {
    authScreenLayer.classList.remove('active-layer');
    appWorkspaceShell.classList.add('active-layer');
}

function logoutAndExitApp() {
    appWorkspaceShell.classList.remove('active-layer');
    authScreenLayer.classList.add('active-layer');
    authLoginForm.reset(); // Wipe old input data values safely
}

btnFreeBeginner.addEventListener('click', enterAppWorkspace);

authLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    enterAppWorkspace();
});

// Bind Header Top Right Logout Interaction
headerLogoutBtn.addEventListener('click', logoutAndExitApp);

// ==========================================================================
// 3. SLIDING NAVIGATION SIDEBAR MECHANICS
// ==========================================================================
function openSidebar() {
    slidingLeftMenu.classList.add('open');
    sidebarBackdrop.classList.add('open');
}

function closeSidebar() {
    slidingLeftMenu.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
}

menuOpenBtn.addEventListener('click', openSidebar);
menuCloseBtn.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

// ==========================================================================
// 4. INTERIOR CONTENT BOX CONTAINER SWAPPING CORE
// ==========================================================================
const globalNavTriggers = document.querySelectorAll('.syllabus-tab, .bottom-nav-item');

globalNavTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const selectedBoxTargetId = trigger.dataset.target;
        if (!selectedBoxTargetId) return;

        // Step A: Clean up highlighted tab lines
        document.querySelectorAll('.syllabus-tab.active, .bottom-nav-item.active').forEach(item => {
            item.classList.remove('active');
        });

        // Step B: Mask the old active text block
        document.querySelector('.interior-content-box.active-box').classList.remove('active-box');

        // Step C: Open target dashboard element box
        document.getElementById(selectedBoxTargetId).classList.add('active-box');
        trigger.classList.add('active');

        // Step D: Automatically slide menu away clean if user clicked an item inside it
        closeSidebar();
        
        // Step E: Jump scroll canvas frame right back to top line reading view
        document.querySelector('.central-content-canvas').scrollTop = 0;
    });
});
