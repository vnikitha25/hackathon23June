// import { Configuration, OpenAIApi } from 'openai';
// function sendMessage(message){
//     const openai= new OpenAIApi(new Configuration({
//         apiKey: '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'
//     }))
//     openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages: [{role:'user', content:message}]
//     })
//     .then(res=> {
//         this.resultMessage = res.data.choices[0].message.content;
//     })
// }
// export {sendMessage}

async function sendMessage(message){

    const endPoint = "https://api.openai.com/v1/chat/completions";
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", "Bearer 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");
    reqHeaders.append("Content-Type","application/json");

    const reqBody = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{role:'user', content:message}]
    });

    const requestOptions = {
        method:'POST',
        headers: reqHeaders,
        body: reqBody,
        redirect: 'follow'

    };
    try{
        const response = await  fetch(endPoint,requestOptions);
        const result1 = await response.json();
        return JSON.stringify(result1.choices[0].message.content);
    }
    catch(error){
        return JSON.stringify(error);
    }
}
export {sendMessage}