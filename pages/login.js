import { getProviders, signIn } from "next-auth/react"

function login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img src="https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM"
                 alt=""
                 className="w-52 mb-5" />   
            {Object.values(providers).map((provider)=>(
                <div key={provider.name}>
                    <button className="bg-[#18D860] font-bold text-white px-10 py-3 rounded-xl hover:bg-green-600"
                            onClick={()=>signIn(provider.id, {callbackUrl : "/"})}>
                        Login with {provider.name}
                    </button>
                </div>
            ))}         
        </div>
    )
}

export default login

export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props :{
            providers,
        },
    }
}