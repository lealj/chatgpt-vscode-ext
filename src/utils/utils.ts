import OpenAI from "openai";

export async function makeApiCall(text: string) {
    // Having this outside of function was breaking app.
    // Using organization and project params didn't work.
    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY']
    });
    const model = process.env.AI_MODEL as string;

    // The question about text that user wants an answer to. 
    const query = "What's wrong with this code?";

    // A 'behavior' assigned to the model.
    const systemContent = "You are a helpful assistant that answers programming questions.";

    const completion = await openai.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content: systemContent
            },
            {
                role: "user",
                content: query + " " + text
            }
        ],
        max_tokens: 150
    });

    return completion.choices[0].message.content ?? "No response from api...";
}