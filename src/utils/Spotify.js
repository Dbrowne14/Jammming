import { generateCodeChallenge, generateRandomString } from "./Pkce";

const clientId = "2530f775178c451fa0a3f602fde9c0ed";
const redirectUri = "http://127.0.0.1:5173/"
const scope = "playlist-modify-private  playlist-modify-public";


const Spotify = {

    //code for authentication using Authorization Code with PKCE Flow as per Spotify documentation guidelines 
    codeVerifier: null, //store codeVerifier once
    
    init() {
        let storedVerifier = localStorage.getItem("code_verifier");
        if (!storedVerifier) {
            storedVerifier = generateRandomString(64);
            localStorage.setItem("code_verifier", storedVerifier);
        }
        this.codeVerifier = storedVerifier;
    },

    
    //confirmed to be working!!!!
    async getAuthUrl() {
        const authUrl = new URL("https://accounts.spotify.com/authorize")
        window.localStorage.setItem('code_verifier', this.codeVerifier);

        const codeChallenge = await generateCodeChallenge(this.codeVerifier);

        const params =  {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    },

    getResponse () {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        return code;
    },

    async getAccessToken(code) {
        // 1. Always check for cached token first
        const cachedToken = localStorage.getItem("access_token");
        if (cachedToken) {
            console.log("Using cached access token");
            return cachedToken;
        }

        // 2. If no code, user hasn't logged in yet
        if (!code) {
            console.warn("No code found — redirecting to Spotify login");
            this.getAuthUrl();
            return null;
        }

        // 3. Exchange the authorization code for an access token
        const codeVerifier = localStorage.getItem("code_verifier");
        const url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        };

        const res = await fetch(url, payload);
        const response = await res.json();

        // 4. Handle errors cleanly
        if (response.error) {
            console.error("Failed to fetch token:", response);
            localStorage.removeItem("access_token");
            this.getAuthUrl(); // Force re-authentication
            return null;
        }

        // 5. Cache the token & clean up the URL
        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);

            // Store refresh token if returned
            if (response.refresh_token) {
                localStorage.setItem('refresh_token', response.refresh_token);
            }

            return response.access_token;
        } else {
            console.error("Failed to fetch token:", response);
            return null;
        }
    },

    async getRefreshToken() {
    // refresh token that has been previously stored
        const refreshToken = localStorage.getItem('refresh_token');
        const url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId
            }),
        }
        const body = await fetch(url, payload);
        const response = await body.json();

        localStorage.setItem('access_token', response.access_token);
        
        if (response.refresh_token) {
            localStorage.setItem('refresh_token', response.refresh_token);
        }
        return response.access_token;
    },


    async searchForResults(track) {
        //handle logic

        let token = localStorage.getItem('access_token');

        if(!token) {
            token = await this.getRefreshToken();
            if(!token) {
                console.error("Could not refresh token. Please log in again.");
                return;
            }
        }

        console.log("Spotify object:", Spotify); // should be defined
        console.log("Track:", track);

        const searchBase = 'https://api.spotify.com/v1/search';
        const endPoint = `${searchBase}?q=${encodeURIComponent(track)}&type=track&limit=10`;
        try {
            const response = await fetch(endPoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                    }   
            });

            const data = await response.json()
            console.log("Response data:", data);
            
            if (response.ok) {
                return data.tracks.items 
            } else {
                console.log('Server Error', data.error.message)
            } 
        } catch (error) {
            console.log('Fetch Error', error)
        }
    },

    savePlaylist() {
        //handle logic
    }

}

Spotify.init();

export default Spotify;