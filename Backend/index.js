const { GoogleGenerativeAI } = require("@google/generative-ai");

const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(4000, () => {
  console.log("Server listening at Port 4000");
});

app.post("/gemini", async function (req, res) {
  try {
    console.log(req.body);
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: req.body.chatHistory,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat.sendMessage(req.body.message);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// genAI.getGenerativeModel({ model: "gemini-pro"})
