import { ChevronDownIcon, UserIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import {shuffle} from 'lodash'
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function Center() {
    const {data : session }= useSession();
    const [color , setColor ]=useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist]=useRecoilState(playlistState)

    useEffect (()=>{
        setColor(shuffle(colors).pop())
    },[playlistId])
    return (
        <div className="flex-grow">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-5
                opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-3">
                    <img
                        className="rounded-full w-10 h-10"
                        src={session?.user.image ? session?.user.image : "https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png"} 
                        alt="" />
                    <h2 className="text-gray-500 hover:text-white">{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 hover:text-white"/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                {/* <img src="" alt="" /> */}
            </section>
        </div>
    )
}

export default Center
