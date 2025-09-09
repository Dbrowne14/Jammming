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
        return authUrl.toString();
    },

    getResponse () {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        return code;
    },

    async exchangeCodeForToken(code) {
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

        if (!res.ok) {
        const err = await res.json();
        console.error("Token exchange failed:", err);
        throw new Error(err.error || "Token exchange failed");
    }


        const response = await res.json();

        if (response.error) {
            console.error("Token exchange failed", response);
            localStorage.clear();
            return null;
        }

        // 🔹 NEW: Store expiry time and refresh token**
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("expires_at", Date.now() + response.expires_in * 1000);

        // 🔹 NEW: Remove ?code=... from URL after exchanging**
        window.history.replaceState({}, document.title, "/");

        return response.access_token;
    },

    async getValidAccessToken() {
        const token = localStorage.getItem("access_token");
        const expiresAt = localStorage.getItem("expires_at");
        const code = this.getResponse();

        // 🔹 NEW: Use cached token if still valid**
        if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
            return token;
        }

        if (localStorage.getItem("refresh_token")) {
            return await this.getRefreshToken();
        }

        if (code) {
            return await this.exchangeCodeForToken(code);
        }

        // 🔹 NEW: Otherwise, redirect to Spotify login**
        const authUrl = await this.getAuthUrl();
        window.location.href = authUrl;
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

        const res = await fetch(url, payload);
        if (!res.ok) {
            const err = await res.json();
            console.error("Refresh token failed:", err);
            localStorage.clear();
            return null;
        }
        const response = await res.json();

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('expires_at', Date.now() + response.expires_in * 1000); // ⚡ store expiry

        
        if (response.refresh_token) {
            localStorage.setItem('refresh_token', response.refresh_token);
        }
        return response.access_token;
    },


    async searchForResults(track) {
        //handle logic

        const token = await this.getValidAccessToken();

        if(!token) {
             console.error("No valid access token. Please log in again.");
            return;
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
            
            if (!response.ok) {
                console.log('Server Error', data.error.message)
                return
            } 
        } catch (error) {
            console.log('Fetch Error', error)
        }
    },

    async savePlaylist(playlistName, playlistTracks) {
        //handle logic
        const searchBase = "https://api.spotify.com/v1/me"
        const token = await this.getValidAccessToken();

        //get userID
        let user_id; // stores userID state
        try {
            const response = await fetch(searchBase, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userData = await response.json()

            if (!response.ok) {
                console.log('Server Error', userData.error.message)
                return          
            }
            
            user_id = userData.id;

        } catch (error) {
            console.log('Fetch Error', error)
        }
        
        // get playlist
        const userEndPoint = `https://api.spotify.com/v1/users/${user_id}/playlists`
        let playlist_id; // stores playlist ID state 
        try {
            const response = await fetch(userEndPoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "name": `${playlistName}`,
                    "description": "Playlist created with React",
                    "public": false
                })
            });

            const playListData = await response.json()

            if (!response.ok) {
                console.log('Server Error', playListData.error.message)
                return
            }

            playlist_id = playListData.id;

        } catch(error) {
            console.log('Fetch Error', error)
        }

        //add songs
        const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
        try {
            const response = await fetch(playlistEndpoint, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "uris": playlistTracks.map(track => track.uri)
                }) 
            })
        } catch(error) {
            console.log('Fetch Error', error)
        }
    }

}

Spotify.init();

export default Spotify;