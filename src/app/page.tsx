/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo, this is TechTose Bot! How can I assist you?",
    },
  ]);

  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: theInput });
    setTheInput("");
    console.log("Calling OpenAI...", messages);

   const response = await fetch(`https://fast-ai-api-ai.onrender.com/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
   });
  
    const data = await response.json();
    console.log("OpenAI replied...", data);
    const { output } = data;
   console.log("OpenAI replied...", output);

    setMessages((prevMessages) => [...prevMessages, output]);
    setIsLoading(false);

    // scrollToRef.current.scrollIntoView()
  };
  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-5 sm:px-24">
      <Image
        src="/techtose.svg"
        width={64} 
        height={64}
        alt="TechTose Logo"
        className="w-16 h-16 absolute top-3 left-2 sm:left-10"
      />


      <h1 className="mt-12 md:mt-0 text-5xl text-[#524da8] font-sans">TechTose Bot</h1>

      <div className="flex h-[27rem] md:h-[35rem] w-full sm:w-[40rem] flex-col items-center rounded-xl mt-5">
        <div className="h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          {messages.map((e) => {
            return (
              <div
                key={e.content}
                className={`w-max max-w-[12rem] md:max-w-[18rem] rounded-md px-4 py-3 h-min ${
                  e.role === "assistant"
                    ? "self-start  bg-[#716CBC] text-[#fff]"
                    : "self-end  bg-[#4D75A8] text-[#fff]"
                } `}
              >
                {e.content}
              </div>
            );
          })}



          {isLoading ? <div className="self-start  bg-[#716CBC] text-[#fff] w-max max-w-[12rem] md:max-w-[18rem] rounded-md px-4 py-3 h-min">*loading*</div> : ""}
        </div>
        <div className="relative mt-5 w-full bottom-4 flex justify-center">
          <textarea
            value={theInput}
            onChange={(event) => setTheInput(event.target.value)}
            className="w-[85%] h-13 px-3 py-2 overflow-y-auto text-base text-black border-2 font-medium border-[#524da8] rounded-md placeholder:text-base placeholder:text-[#524da8] focus:border-[#524da8] focus:outline-none"
            rows={3}
            placeholder="Chat with TechTose Bot"
            onKeyDown={Submit}
          />
          <button
            onClick={callGetResponse}
            className="w-[34%] md:w-[15%]  focus:outline-none h-13  sm:w-25 mt-4 ml-2 text-white bg-[#524da8] hover:bg-[#716CBC] cursor-pointer rounded-md text-lg px-5 py-2.5 mb-2 border-none"
          >
            send
          </button>
        </div>
      </div>
    </main>
  );
}
