const clientId = "2530f775178c451fa0a3f602fde9c0ed";
const redirectUri = "http://127.0.0.1:5173/"
const scope = "playlist-modify-private  playlist-modify-public";
const authUrl = new URL("https://accounts.spotify.com/authorize")


const Spotify = {

    //code for authentication using Authorization Code with PKCE Flow as per Spotify documentation guidelines 
    codeVerifier: null, //store codeVerifier once
    
    generateRandomString (length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    },

    init() {
        if(!this.codeVerifier) {
            this.codeVerifier = this.generateRandomString(64);
        } 
    },

    async generateCodeChallenge() {

        //function to create an array buffer to be hashed
        const sha256 = async (plain) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }

        const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        }

        const hashed = await sha256(this.codeVerifier)
        const codeChallenge = base64encode(hashed);

        return codeChallenge;

    },
    

    //confirmed to be working!!!!
    async getAuthUrl() {
        window.localStorage.setItem('code_verifier', this.codeVerifier);

        const codeChallenge = await this.generateCodeChallenge();

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


    async searchForResults(track) {
        //handle logic
            console.log("Spotify object:", Spotify); // should be defined
            console.log("Track:", track);

        const searchBase = 'https://api.spotify.com/v1/search';
        const endPoint = `${searchBase}?q=${encodeURIComponent(track)}&type=track&limit=10`;
        try {
            const response = await fetch(endPoint, {
                headers: {
                    'Authorization': `Bearer ${Spotify.getAccessToken()}`
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