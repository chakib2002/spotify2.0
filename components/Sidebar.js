import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon
} from '@heroicons/react/outline'
import {signOut, useSession} from "next-auth/react"
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession();
    const [playlist, setPlaylist] = useState()
    const [playlistId, setPlaylistId]= useRecoilState(playlistIdState)

    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then(data=>{
                console.log(data)
                setPlaylist(data.body.items)
            })
        }

    },[session, spotifyApi])
    
    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900
        overflow-y-scroll h-screen scrollbar-hide'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'
                        onClick={()=>signOut()}>
                    <p>Logout</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5'/>
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5'/>
                    <p>Library</p>
                </button>
                <hr className='border-t-[0.1px] border-x-gray-900'/>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5'/>
                    <p>Create a playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5'/>
                    <p>liked song</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5'/>
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-x-gray-900'/>
                <h5 className="text-gray-300 cursor-default font-semibold tracking-widest">My Playlists</h5>
                {playlist?.map(e => (
                    <p key={e.id} onClick={()=>setPlaylistId(e.id)} className="cursor-pointer hover:text-white">{e.name}</p>
                ))}

                
            </div>
        </div>
    )
}

export default Sidebar
