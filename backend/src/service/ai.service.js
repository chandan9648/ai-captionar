const { GoogleGenAI } = require("@google/genai")

// The client picks up API key from env (GOOGLE_API_KEY). You can also pass explicitly.
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });


async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: `
                You are an expert in generating captions for images.
                You generate single caption for the image.
                Your caption should be short and concise.
                You use hashtags and emojis in the caption.
                Generate the caption in more than 20 words.
                `
            }
        });

        return response.text
    } catch (err) {
        // Normalize 429/quotas into a clean error with status
        const message = err?.message || 'AI generation failed';
        const status = (err?.status === 429 || /RESOURCE_EXHAUSTED|code\"\s*:\s*429/i.test(message)) ? 429 : (err?.status || 500);
        const e = new Error(status === 429 ? 'AI rate limit exceeded. Please retry.' : message);
        e.status = status;
        // Extract retryDelay from API error if available
        try {
            const match = message.match(/retryDelay\"\s*:\s*\"(\d+)(s|ms)\"/i);
            if (match) e.retryAfterMs = match[2] === 's' ? parseInt(match[1], 10) * 1000 : parseInt(match[1], 10);
        } catch {}
        throw e;
    }
}


module.exports = generateCaption