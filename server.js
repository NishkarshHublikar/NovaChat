const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    const result = await model.generateContent(`
    You are NovaChat, a premium AI assistant similar to ChatGPT.

    Personality:
    - intelligent
    - concise
    - conversational
    - helpful
    - modern

    Behavior Rules:
    - Answer naturally and directly.
    - Use markdown formatting.
    - Use headings when useful.
    - Use bullet points for lists.
    - Keep answers clean and readable.
    - Use short paragraphs.
    - Highlight important things in bold.
    - Avoid huge walls of text.
    - Talk naturally like a human assistant.
    - Avoid sounding robotic or like Wikipedia.
    - Don't overexplain simple things.

    User:
    ${userMessage}
    `); 

    const response =
        result.response.candidates[0].content.parts[0].text;

    res.json({
      reply: response,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`NovaChat running on port ${PORT}`);
});