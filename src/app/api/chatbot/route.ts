import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        text: "OpenAI API key is missing. Please check your .env.local configuration.", 
        isRAG: false 
      }, { status: 500 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful and intelligent campus assistant for the Smart Campus platform. You provide accurate information about campus life, academics, and student services. If the query is related to specific campus policies like prerequisites, fees, or library hours, mention that you are searching the campus knowledge base."
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    
    // Simple heuristic to detect if the AI is providing "factual" campus info
    const isRAG = aiResponse.toLowerCase().includes('policy') || 
                  aiResponse.toLowerCase().includes('handbook') || 
                  aiResponse.toLowerCase().includes('source');

    return NextResponse.json({ text: aiResponse, isRAG });

  } catch (error: any) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ 
      text: "I'm having trouble connecting to my AI brain right now. Please try again later.", 
      isRAG: false 
    }, { status: 500 });
  }
}
