const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CareGuruPlus Backend Running");
});

app.post("/chat", (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.json({
            reply: "Please enter a symptom or disease name."
        });
    }

    const msg = message.toLowerCase();

    let reply = "";

    // Emergency Cases
    if (
        msg.includes("chest pain") ||
        msg.includes("heart attack") ||
        msg.includes("stroke") ||
        msg.includes("can't breathe") ||
        msg.includes("difficulty breathing") ||
        msg.includes("severe bleeding")
    ) {
        reply = "🚨 Emergency detected. Seek immediate medical attention or call emergency services.";
    }

    // Symptoms
    else if (msg.includes("fever")) {
        reply = "🤒 Fever detected. Drink plenty of fluids, rest well and monitor temperature.";
    }
    else if (msg.includes("cough")) {
        reply = "😷 Stay hydrated, avoid cold drinks and take adequate rest.";
    }
    else if (msg.includes("cold")) {
        reply = "🤧 Warm fluids, steam inhalation and proper rest may help.";
    }
    else if (msg.includes("headache")) {
        reply = "🤕 Rest, hydration and reduced screen exposure may help.";
    }
    else if (msg.includes("stomach pain")) {
        reply = "🤢 Avoid oily food and stay hydrated.";
    }
    else if (msg.includes("vomiting")) {
        reply = "💧 Drink ORS and fluids to avoid dehydration.";
    }
    else if (msg.includes("diarrhea")) {
        reply = "🚰 Stay hydrated and use ORS. Consult a doctor if severe.";
    }
    else if (msg.includes("constipation")) {
        reply = "🥗 Increase fiber intake and drink more water.";
    }
    else if (msg.includes("sore throat")) {
        reply = "🍵 Warm fluids and salt-water gargles may help.";
    }
    else if (msg.includes("body pain")) {
        reply = "💤 Take adequate rest and stay hydrated.";
    }
    else if (msg.includes("skin rash")) {
        reply = "🩹 Avoid scratching and consult a dermatologist if severe.";
    }

    // Diseases
    else if (msg.includes("malaria")) {
        reply = "🦟 Malaria is spread by mosquito bites. Common symptoms include fever, chills and sweating.";
    }
    else if (msg.includes("dengue")) {
        reply = "🦟 Dengue symptoms include high fever, headache, body pain and rash.";
    }
    else if (msg.includes("typhoid")) {
        reply = "🌡️ Typhoid may cause prolonged fever, weakness and stomach discomfort.";
    }
    else if (msg.includes("covid")) {
        reply = "🦠 COVID-19 symptoms may include fever, cough, fatigue and breathing difficulty.";
    }
    else if (msg.includes("asthma")) {
        reply = "🫁 Asthma can cause wheezing, breathlessness and chest tightness.";
    }
    else if (msg.includes("diabetes")) {
        reply = "🩸 Diabetes affects blood sugar levels. Regular monitoring is important.";
    }
    else if (msg.includes("migraine")) {
        reply = "💥 Migraine can cause severe headaches, nausea and light sensitivity.";
    }
    else if (msg.includes("hypertension")) {
        reply = "❤️ Hypertension means high blood pressure and requires regular monitoring.";
    }
    else if (msg.includes("tuberculosis") || msg.includes("tb")) {
        reply = "🫁 Tuberculosis commonly affects the lungs and may cause long-term cough.";
    }
    else if (msg.includes("pneumonia")) {
        reply = "🫁 Pneumonia is a lung infection that may cause fever and breathing issues.";
    }
    else if (msg.includes("bronchitis")) {
        reply = "🌬️ Bronchitis causes inflammation of airways and persistent cough.";
    }
    else if (msg.includes("cholera")) {
        reply = "💧 Cholera causes severe diarrhea and dehydration.";
    }
    else if (msg.includes("hepatitis")) {
        reply = "🧬 Hepatitis affects the liver and may cause fatigue and jaundice.";
    }
    else if (msg.includes("jaundice")) {
        reply = "🟡 Jaundice causes yellowing of skin and eyes due to liver issues.";
    }
    else if (msg.includes("kidney stone")) {
        reply = "🪨 Kidney stones can cause severe abdominal or back pain.";
    }
    else if (msg.includes("arthritis")) {
        reply = "🦴 Arthritis causes joint pain, swelling and stiffness.";
    }
    else if (msg.includes("osteoporosis")) {
        reply = "🦴 Osteoporosis weakens bones and increases fracture risk.";
    }
    else if (msg.includes("thyroid")) {
        reply = "🦋 Thyroid disorders affect metabolism, weight and energy levels.";
    }
    else if (msg.includes("gastritis")) {
        reply = "🍽️ Gastritis is inflammation of the stomach lining.";
    }
    else if (msg.includes("ulcer")) {
        reply = "⚠️ Stomach ulcers may cause burning stomach pain.";
    }
    else if (msg.includes("food poisoning")) {
        reply = "🍱 Food poisoning can cause vomiting, diarrhea and stomach cramps.";
    }
    else if (msg.includes("allergy")) {
        reply = "🌼 Allergies may cause sneezing, itching and skin reactions.";
    }
    else if (msg.includes("eczema")) {
        reply = "🩹 Eczema causes itchy and inflamed skin.";
    }
    else if (msg.includes("psoriasis")) {
        reply = "🔴 Psoriasis is a chronic skin condition causing red scaly patches.";
    }
    else if (msg.includes("acne")) {
        reply = "😊 Acne is a common skin condition causing pimples and oily skin.";
    }
    else if (msg.includes("conjunctivitis")) {
        reply = "👁️ Conjunctivitis causes redness and irritation in the eyes.";
    }
    else if (msg.includes("depression")) {
        reply = "🧠 Depression affects mood and daily activities. Professional support is important.";
    }
    else if (msg.includes("anxiety")) {
        reply = "😟 Anxiety can cause excessive worry, stress and restlessness.";
    }
    else if (msg.includes("insomnia")) {
        reply = "🌙 Insomnia is difficulty sleeping regularly.";
    }
    else if (msg.includes("obesity")) {
        reply = "⚖️ Obesity increases the risk of diabetes, heart disease and hypertension.";
    }
    else {
        reply = "❓ Symptom or disease not found in database. Please consult a healthcare professional.";
    }

    reply += "\n\n⚠️ Disclaimer: This is not a medical diagnosis. Please consult a qualified healthcare professional.";

    res.json({ reply });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});