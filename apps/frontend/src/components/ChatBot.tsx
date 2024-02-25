// import { useState } from "react";
// import OpenAI from 'openai';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "./ui/sheet.tsx";
import {Button} from "./ui/button.tsx";
// import {Input} from "./ui/input.tsx";

function ChatComponent() {
    // const [messages, setMessages] = useState<string[]>([]);
    // const [inputMessage, setInputMessage] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(false);
    //
    // // This is the key we will use soon with money:  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
    // const openai = new OpenAI({ apiKey: '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' });
    //
    //
    // const sendMessage = async () => {
    //     setLoading(true);
    //     const response = await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo",
    //         messages: [
    //             { role: "system", content: "You are a helpful assistant."},
    //             { role: "user", content: inputMessage }],
    //     });
    //     const assistantMessage = response.choices[0].message.content;
    //     const newMessages = assistantMessage ? [...messages, inputMessage, assistantMessage] : [...messages, inputMessage];
    //     setMessages(newMessages);
    //     setLoading(false);
    // };

    return (
        <div className="chat-container">

            <Sheet key={"right"}>
                <SheetTrigger asChild>
                    <Button variant="ghost">
                        <img src="public/assistant_icon.jpg" alt="Assistant" className={"w-8 h-8"}/>
                    </Button>
                </SheetTrigger>
                <SheetContent side={"right"}>
                    <SheetHeader>
                        <SheetTitle>B&G Hospital Assistant</SheetTitle>
                        <SheetDescription>
                            Ask any questions and our AI assistant will try to help you.
                        </SheetDescription>
                    </SheetHeader>

                    {/*<div className="chat-messages">*/}
                    {/*    {messages.map((message, index) => (*/}
                    {/*        <div key={index} className="chat-message">*/}
                    {/*            {message}*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*<div className="chat-input">*/}
                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Type your message..."*/}
                    {/*        value={inputMessage}*/}
                    {/*        onChange={(e) => setInputMessage(e.target.value)}*/}
                    {/*    />*/}
                    {/*    <Button variant="default" onClick={sendMessage} disabled={loading}>*/}
                    {/*        Send*/}
                    {/*    </Button>*/}
                    {/*</div>*/}

                </SheetContent>
            </Sheet>

        </div>
    );
}

export default ChatComponent;
