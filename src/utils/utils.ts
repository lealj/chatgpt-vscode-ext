import OpenAI from "openai";
require('dotenv').config();

const openai = new OpenAI({
    organization: process.env.ORG_ID,
    project: process.env.PROJ_ID,
});

export async function makeApiCall(text: string) {
    const url = "https://webhook.site/0baa8f3b-413c-4ffe-83d7-9220e36ad5aa";

    
}