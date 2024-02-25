import React, { useState } from "react";
import OpenAI from 'openai';

function ChatComponent() {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const apiKey = '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'; // Your ChatGPT API key

    const openai = new OpenAI(apiKey);


    const sendMessage = async () => {
        setLoading(true);
        const response = await openai.completions.create({
            model: "text-davinci-003",
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: inputMessage }],
        });
        const newMessages = [...messages, inputMessage, response.data.choices[0].text.trim()];
        setMessages(newMessages);
        setLoading(false);
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={sendMessage} disabled={loading}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatComponent;
