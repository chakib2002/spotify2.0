import spotifyApi from "../lib/spotify";
import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"

function useSpotify() {
    const {data : session, status} = useSession();

    useEffect(()=>{
        if(session) {
            // if refresh access token attempt fails, direct user to login...
            if(session.error === "RefreshAccessTokenError"){
                signIn()
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session])
    
    return spotifyApi;
}

export default useSpotify
