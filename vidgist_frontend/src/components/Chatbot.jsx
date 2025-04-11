import { useState, useRef, useEffect } from "react";
import { chatbot } from "../api";


export default function Chatbot({id,setId}) {
    // State to store messages
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // Ref for auto-scrolling to the latest message
    const chatEndRef = useRef(null);



    // Load messages from localStorage when component mounts
    useEffect(() => {
        const savedMessages = localStorage.getItem(`chat_${id}`);
        if (savedMessages) {

            setMessages(JSON.parse(savedMessages));
        }
    }, [id]); // Runs when `id` changes (i.e., new video link is submitted)

    // Save messages to localStorage whenever they update
    useEffect(() => {
        localStorage.setItem(`chat_${id}`, JSON.stringify(messages));
    }, [messages, id]);




    // Handle input change
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Function to send a message and get chatbot response
    const sendMessage = async() => {
        if (!input.trim()) return; // Prevent sending empty messages

        const userMessage = { text: input, sender: "user" };

        

        // Update messages state with user's message
        setMessages(prevMessages => [...prevMessages, userMessage]);
        // Clear input field
        setInput("");

        // Scroll to the latest message
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        },100);

        let response = await chatbot(input,id)
        // Simulate chatbot response after a short delay
        setTimeout(() => {
            const botResponse = { text: response, sender: "bot" };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        },100);
    };

    // Log messages whenever they update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // console.log("Messages State Updated:", messages);
    }, [messages]); // Runs whenever `messages` updates




    return (
        <div className="w-full p-6 border-none bg-[#f3f8fb]">

            {/* Chat Window */}
            <div className="bg-gray-200 p-4 sm:h-[90vh] h-96 rounded-lg shadow flex flex-col ">

                {/* Chatbot Header */}
                <div className="flex items-center space-x-4 justify-center pb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src="chatbot-logo.svg" alt="Chatbot Logo" className="w-full h-full object-cover " />
                    </div>
                    <h2 className="text-xl font-bold mb-4 mt-4  text-center md:text-left">Chatbot</h2>
                </div>

                {/* Chatbot conversation */}
                <div className="flex-1 bg-gray-100  space-y-2 p-2 rounded-lg overflow-y-auto  shadow-[0_0px_20px_8px_rgba(0,0,0,0.10)]">
                    {messages.length === 0 ? (
                        <p className="text-gray-500 ">Chatbot conversation will be displayed here...</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`} >
                                <div className={`p-2 mt-2 rounded-lg text-md text-justify shadow-lg break-words whitespace-pre-wrap
                                    ${msg.sender === "user" ? "bg-stone-200 text-black max-w-[75%] text-right rounded-br-none" : "bg-blue-100 text-black self-start max-w-[75%] text-left rounded-bl-none"}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={chatEndRef}></div> {/* Invisible div for auto-scrolling */}
                </div>

                {/* Input Field */}
                <div className="relative flex items-center w-full mt-2">
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // Prevent new line
                                sendMessage();
                            }
                        }}// Send on Enter key press
                        className="w-full h-10 border border-gray-300 rounded-lg px-4 py-2 pr-10 
                         focus:ring-2 focus:ring-blue-500 outline-none
                         overflow-y-auto resize-none scrollbar-hide"
                        placeholder="Ask something..."
                    // Allows wrapping
                    />
                    <i
                        className="fa fa-paper-plane absolute right-7 text-blue-500 text-xl cursor-pointer hover:text-blue-700"
                        onClick={sendMessage}
                    ></i>
                </div>
            </div>
        </div>
    );
}
