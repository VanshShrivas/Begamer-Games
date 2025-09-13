import React,{useState} from 'react'



const footer = ({ contact_ref ,base_url}) => {
    const [formData, setForm] = useState({
        email: "",
        message: ""
    })
    //sending the data to backend
    const handleEmailChange=(e)=>{
        setForm({ ...formData, [e.target.name]: e.target.value });
    }
    const handleMsgChange=(e)=>{
        setForm({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSend = async (e) => {
        try {
            const res = await fetch(`${base_url}/mail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const text = await res.text(); // error plain text ho sakta hai
                throw new Error(`Request failed: ${text}`);
            }

            const data = await res.json();
            alert("Message Sent Successfully");
            console.log("Server response:", data);

        } catch (err) {
            console.error("❌ Error:", err.message);
        }
    }

    return (
        <>
            <div ref={contact_ref} className="m-15 flex justify-around flex-wrap">
                <span className="mb-12 border-white flex items-center flex-col">
                    <img className="mt-12 w-30" src="/bg_favicon.png"></img>
                    <p className="text-center faster-one-regular  text-white text-4xl font-bold">
                        Begamer Games
                    </p>
                </span>
                <div id="footer" className="flex items-center flex-col">
                    <div className=" border border-white w-full flex justify-center items-center bg-black-100">
                        <div className="bg-black p-8 rounded-2xl shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold text-white text-center mb-6">Contact Us</h2>

                            <form className="flex flex-col space-y-4">
                                {/* Email Input */}
                                <input
                                    onChange={handleEmailChange}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Enter your email"
                                    className="text-amber-50 w-full p-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                    />

                                {/* Message Box */}
                                <textarea
                                    onChange={handleMsgChange}
                                    name="message"
                                    value={formData.message}
                                    placeholder="Write your message..."
                                    rows="4"
                                    className="text-amber-50 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />

                                {/* Submit Button */}
                                <button
                                    onClick={handleSend}
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    );

                </div>

            </div>
            <div className='flex gap-5 font-extralight text-center text-gray-50 text-opacity-25'>
                <span>&copy;BegamerGames 2025</span>
                <span>Powered By-Vansh Shrivas</span>
            </div>
        </>

    )
}

export default footer
