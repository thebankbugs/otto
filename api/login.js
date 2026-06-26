// ==========================================================================
// SECURE CLOUD GATEKEEPER DATABASE (Hidden Server-Side)
// ==========================================================================
const premiumUserDirectory = [
    { email: "trader@thebankbugs.app", password: "vipaccess2026" },
    { email: "admin@thebankbugs.app", password: "ddfee773429a" }
];

export default function handler(request, response) {
    // Only allow secure POST requests from your login form
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { email, password } = request.body;

        // Verify credentials against the hidden directory
        const accountMatch = premiumUserDirectory.find(user => 
            user.email.toLowerCase() === email.trim().toLowerCase() && 
            user.password === password
        );

        if (accountMatch) {
            // Return success signal to the client
            return response.status(200).json({ success: true, message: "Access Granted" });
        } else {
            // Return failure signal safely without exposing codes
            return response.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Processing Error" });
    }
}
