import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useState, useEffect, useContext, useReducer } from "react";
import { LinkContext } from "../App";
import { validate_token } from "../api";

function Home() {
    const { link, setLink } = useContext(LinkContext)
    const [Login, setLogin] = useState(false);
    const [User, setUser] = useState(false);
    const navigate = useNavigate();



    const checkUser = async () => {
        const is_validate = await validate_token();
        console.log(is_validate)
        setUser(is_validate);

    }


    useEffect(() => {
        checkUser();
    }, []);



    const handleSubmit = async () => {
        console.log(User)
        if (User === true) {
            const youtubeRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+)/;
            const match = link.match(youtubeRegex);
            if (!match) {
                alert("Please enter a valid YouTube URL.");
                return;
            }
            localStorage.setItem("link", link)
            navigate("/dashboard")
        }
        else {
            setLogin(true);
        }
    }

    return (
        <div className="relative min-h-screen bg-[#fafbfb]">
            <Navbar Login={Login} setLogin={setLogin} user={User} setUser={setUser} />
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen font-plex mt-0">
                {/* Logo */}
                {/* <img
                    src="/logo.svg"
                    alt="VidGist Logo"
                    className="w-52  md:w-52 h-32 md:h-52 mb-0 2xl:w-80 2xl:h-30"
                /> */}
                <i class="fa fa-youtube-play text-8xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500" aria-hidden="true"></i>
                {/* Title */}
                <h1 className="text-4xl md:text-5xl mb-2 text-center font-plex text-black">
                    YouTube Video Summarizer
                </h1>
                <h1 className="text-4xl md:text-5xl mb-6 text-center font-plex text-[#5462de]">
                    with ChatBot
                </h1>
                {/* Description */}
                <p className="text-lg md:text-2xl mb-14 text-center font-plex text-[#737070] max-w-5xl font-medium">
                    Get straight to the key points of any YouTube video without spending hours watching with the AI-Powered YouTube Video Summarizer. This free tool uses advanced AI technology to generate accurate, concise summaries that capture the most important information from long videos. Whether you're researching, learning, or simply trying to digest content more quickly, this tool can save you significant time and effort.
                </p>


                {/* Input Field */}

                <div className="w-full max-w-md mb-5  ">
                    {/* Gradient Border Wrapper */}
                    <div className="p-[2px] rounded-tr-xl rounded-bl-xl bg-gradient-to-r from-indigo-500 to-cyan-600">
                        {/* Inner White Background Wrapper */}
                        <div className="bg-white rounded-tr-xl rounded-bl-xl">
                            {/* Input Field */}
                            <input
                                type="text"
                                placeholder="Enter YouTube URL..."
                                className="w-full bg-transparent border-none outline-none px-4 py-3 font-plex "
                                onChange={(event) => setLink(event.target.value.trim())}
                            />
                        </div>
                    </div>
                </div>


                {/* Submit Button */}
                <button
                    className="mt-5 font-plex flex justify-center text-lg lg:w-40 md:w-36 sm:w-36 w-36 bg-[#09AFF4] hover:bg-white  text-white hover:text-[#09AFF4] py-2 px-4 border-2 hover:border-[#09AFF3] rounded-lg"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Home;
