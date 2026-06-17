// 1. Target the top-level layers using their IDs
const authScreenLayer = document.getElementById('auth-screen-layer');
const appWorkspaceShell = document.getElementById('app-workspace-shell');

// 2. Target the entry buttons
const btnFreeBeginner = document.getElementById('btn-free-beginner');
const authLoginForm = document.getElementById('auth-login-form');

// 3. Central Function to route user past the login gate
function enterAppWorkspace(isRegisteredUser) {
    authScreenLayer.classList.remove('active-layer');  // Pulls the curtain down on the login view
    appWorkspaceShell.classList.add('active-layer');  // Lifts the curtain up on the workspace frame
    
    console.log("User entered the workspace. Registered status: " + isRegisteredUser);
}

// 4. Listen for the Beginner Path Click
btnFreeBeginner.addEventListener('click', () => {
    enterAppWorkspace(false); // Router registers them as a free user
});

// 5. Listen for the Login Form Submit Click
authLoginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the webpage from reloading
    
    // In the future, your Supabase verification code lines will sit right here!
    enterAppWorkspace(true); // Router registers them as a registered user
});
