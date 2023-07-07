import React from 'react'
import { OpenAIApi, Configuration } from 'openai'
const GPT = () => {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    openai
        .createChatCompletion({
            model: "text-davinci-002",
            messages: [{ role: "user", content: "Hello" }],
        })
        .then((res) => {
            console.log(res.data.choices[0].message.content);
        })
        .catch((e) => {
            console.log(e);
        });
    return (
        <div className='w-60 h-60 bg-slate-800'>GPT</div>
    )
}

export default GPT