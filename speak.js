let conversationHistory;
conversationHistory = [
  {
    role: "system",
    content:
      "I will always give you how happy i am out of 10 but you use this number only when it is relevant",
  },
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how can I help you today" },
];

async function conversationUserAdd(question, happiness) {
  conversationHistory.push({
    role: "user",
    content:
      "My Happiness out of 10: " +
      happiness +
      " . " +
      "My input is: " +
      question,
  });
}

async function conversationAssistantAdd(answer) {
  conversationHistory.push({ role: "assistant", content: answer });
}

async function GPT_talk(question) {
  var data = {
    model: "gpt-3.5-turbo",
    messages: conversationHistory,
  };
  var url = "https://api.openai.com/v1/chat/completions";
  var apiKey1 = "sk";
  var apikey2 = "-K9OS42EpZ5fUstwt1cakT3";
  var apikey3 = "BlbkFJlqmCKK03rkJ2QHoWkaqR";
  var apikey = apikey1 + apikey1 + apikey3;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      conversationAssistantAdd(message); // Add GPT's response to the conversation history

      const utterance = new SpeechSynthesisUtterance(message); // Create the audio object
      speechSynthesis.speak(utterance); // Play the audio
      return message;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}
