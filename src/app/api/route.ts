import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req: Request, res: NextResponse) {
  //console.log("Called POST");
  const body = await req.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: body.messages,
  });
  //console.log("BACKEND", completion.choices);
  //console.log(completion.choices[0].message);
  const theResponse = completion.choices[0].message;

  return NextResponse.json({ output: theResponse }, { status: 200 })

};