const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateMCQsWithGemini = async (topic, difficulty) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Generate 10 MCQs on topic "${topic}" difficulty "${difficulty}".
Must return ONLY pure JSON without backticks or explanation.

Format example:
[
  {
    "question": "Explain closures?",
    "options": ["...", "...", "...", "..."],
    "answerIndex": 1
  }
]
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // remove markdown ```json or ```
  text = text.replace(/```json/g, "")
             .replace(/```/g, "")
             .trim();

  // Attempt parsing safely
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.log("Gemini Raw Output:", text);
    throw new Error("Parsing Gemini response failed");
  }
};
