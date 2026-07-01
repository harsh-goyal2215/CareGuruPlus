require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND");

const app = express();

app.use(cors());
app.use(express.json());

// Serve Frontend
app.use(express.static(path.join(__dirname, "frontend")));

// GEMINI API KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==========================
// HOME PAGE
// ==========================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ==========================
// AI CHAT ROUTE
// ==========================

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.json({
                reply: "Please enter your question."
            });

        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `

You are CareGuruPlus AI.

You are a professional Healthcare AI Assistant.

Rules:

1. Answer ONLY healthcare related questions.

2. Explain diseases.

3. Explain symptoms.

4. Explain prevention.

5. Explain causes.

6. Explain treatment.

7. Explain medicines only in general information.

8. Recommend doctor specialization.

9. If emergency:

- Chest Pain
- Stroke
- Can't breathe
- Heart attack
- Severe bleeding

Tell user to immediately contact emergency services.

10. Never claim you are a doctor.

11. Use simple English.

12. Give bullet points whenever possible.

13. At the end always write:

⚠ Medical Disclaimer:
This information is for educational purposes only and should not replace professional medical advice. Always consult a qualified healthcare professional.

User Question:

${message}

`;

        const result =
        await model.generateContent(prompt);

        const response =
        result.response;

        const reply =
        response.text();

        res.json({

            reply

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            reply:
            "❌ AI service unavailable. Please try again later."

        });

    }

});
// ======================================
// HEALTH CHECK ROUTE
// ======================================

app.get("/health", (req, res) => {

    res.json({

        status: "Running",

        chatbot: "CareGuruPlus AI",

        ai: "Gemini 2.5 Flash",

        version: "1.0"

    });

});

// ======================================
// FUTURE API (OPTIONAL)
// ======================================

app.get("/about", (req, res) => {

    res.json({

        project: "CareGuruPlus",

        developer: "Harsh Goyal",

        technology: [

            "HTML",

            "CSS",

            "JavaScript",

            "Node.js",

            "Express.js",

            "Google Gemini AI"

        ]

    });

});

// ======================================
// 404 ROUTE
// ======================================

app.use((req, res) => {

    res.status(404).json({

        reply: "404 - Route not found."

    });

});

// ======================================
// ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        reply: "Internal Server Error."

    });

});

// ======================================
// SERVER START
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);


    console.log("====================================");

    console.log("🏥 CareGuruPlus AI Started");

    console.log("====================================");

    console.log(`Frontend : http://localhost:${PORT}`);

    console.log(`Health   : http://localhost:${PORT}/health`);

    console.log(`About    : http://localhost:${PORT}/about`);

    console.log("====================================");


});

