# 🩺 SANJEEVANI

SANJEEVANI is an AI-powered multilingual healthcare assistant designed to provide accessible preliminary health guidance, disease prediction, medication reminders, and healthcare facility recommendations.

The system combines Natural Language Processing, Machine Learning, and location-based services to help users interact with healthcare resources using simple conversational language through Telegram.

The project consists of two major components:

1. Backend Service (Node.js + Telegram Bot)
2. Disease Prediction API (FastAPI + TensorFlow)

Together these components create an intelligent healthcare support system capable of understanding symptoms, predicting possible diseases, scheduling medication reminders, and recommending nearby healthcare facilities.

# 🎯 Problem Statement

Access to basic healthcare information is often difficult due to:

- Language barriers
- Lack of healthcare awareness
- Missed medication schedules
- Difficulty locating nearby healthcare centres
- Limited access to preliminary healthcare guidance

SANJEEVANI addresses these challenges through a conversational AI assistant that operates through Telegram and supports multiple languages.

# 🚀 Key Features

## 🤖 AI-Based Disease Prediction

Users can describe symptoms in natural language.

Example:

/ask fever cough headache

The system:

- Detects language
- Extracts symptoms using Gemini AI
- Validates medical context
- Predicts possible diseases using a TensorFlow model
- Returns disease description and precautions

---

## 🌍 Multilingual Support

Users can communicate in their preferred language.

Supported workflow:

User Language
↓
Translation to English
↓
Disease Prediction
↓
Translation Back

This enables accessibility across diverse populations.

# 🔄 System Workflow

The complete workflow of SANJEEVANI is shown below:

User Query
    │
    ▼
Telegram Bot
    │
    ▼
Language Detection
    │
    ▼
Medical Intent Classification
    │
    ▼
Symptom Extraction
    │
    ▼
Disease Prediction API
    │
    ▼
Generate Response
    │
    ▼
Translate (if required)
    │
    ▼
Return Result



# 🧠 Disease Prediction Pipeline

The Disease Prediction API is responsible for converting extracted symptoms into disease predictions.

Pipeline:

1. Receive symptoms from backend
2. Validate symptoms
3. Generate binary symptom vector
4. Perform TensorFlow model inference
5. Generate confidence scores
6. Select Top Predictions
7. Return results to backend

Example:

Symptoms
↓
["fatigue","sweating","weight_loss"]
↓
Binary Feature Vector
↓
TensorFlow Model
↓
Jaundice (42.9%)

# 🏗️ System Architecture

The SANJEEVANI ecosystem consists of multiple interconnected components working together to provide healthcare assistance, disease prediction, reminder management, and healthcare facility recommendations.

```text
                         +----------------------+
                         |    Telegram User     |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |   Telegram Bot API   |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |   Node.js Backend    |
                         +----------+-----------+
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
            v                       v                       v
+-------------------+   +-------------------+   +-------------------+
|    Gemini API     |   |    MongoDB DB     |   | Google Places API |
+-------------------+   +-------------------+   +-------------------+
            |
            v
+-------------------------+
| Disease Prediction API  |
|     (FastAPI)           |
+------------+------------+
             |
             v
+-------------------------+
| TensorFlow/Keras Model  |
+-------------------------+
```

---

# 📂 Project Structure

```text
Sanjeevani/
│
├── AI-Service/
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── preprocessing.py
│   │   ├── schemas.py
│   │   └── __init__.py
│   │
│   ├── model/
│   │   ├── disease_prediction_model.keras
│   │   └── label_encoder.pkl
│   │
│   ├── dataset.csv
│   ├── requirements.txt
│   └── runtime.txt
│
├── Backend/
│   ├── src/
│   │   ├── commands/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── package.json
│   ├── server.js
│   └── README.md
│
└── README.md
```

---

# ⚙️ Technology Stack

## Backend

- Node.js
- Express.js
- Telegraf
- MongoDB
- Mongoose
- Node Cron
- Day.js

## Artificial Intelligence

- Google Gemini API
- TensorFlow
- Keras
- Natural Language Processing

## Machine Learning API

- FastAPI
- Pydantic
- NumPy
- Pandas
- Scikit-Learn

## External Integrations

- Telegram Bot API
- Google Places API
- Google Maps
- MongoDB Atlas

---

# 🧠 Disease Prediction Pipeline

The Disease Prediction API is responsible for transforming extracted symptoms into disease predictions using a trained TensorFlow model.

## Workflow

```text
User Symptoms
      │
      ▼
Symptom Validation
      │
      ▼
Data Preprocessing
      │
      ▼
Binary Symptom Vector Generation
      │
      ▼
TensorFlow Model Inference
      │
      ▼
Confidence Score Calculation
      │
      ▼
Top Disease Predictions
      │
      ▼
API Response
```

## Example

Input:

```json
{
  "symptoms": [
    "fatigue",
    "sweating",
    "weight_loss"
  ]
}
```

Processing:

```text
Symptoms
    ↓
Validation
    ↓
Feature Vector
    ↓
TensorFlow Model
    ↓
Prediction Scores
```

Output:

```json
{
  "prediction": "Jaundice",
  "confidence": 0.429
}
```

---

# 🗄️ Database Schema

## Reminder Model

### Medicine Reminder

```json
{
  "chatId": 123456,
  "type": "medicine",
  "medicine": "calpol",
  "times": ["09:00"],
  "repeat": "daily",
  "days": []
}
```

### Vaccine Reminder

```json
{
  "chatId": 123456,
  "type": "vaccine",
  "vaccine": "covaxin",
  "date": "2026-03-15",
  "time": "10:30"
}
```

---

# 🔑 Environment Variables

Create a `.env` file inside the Backend directory.

```env
PORT=5000

BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

GEMINI_URL=YOUR_GEMINI_API_URL
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY

DISEASE_API_URL=YOUR_DISEASE_PREDICTION_API_URL
```

---

# ⚙️ Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/<username>/Sanjeevani.git
cd Sanjeevani
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Configure all required API keys and database credentials.

Start the backend server:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## 3. Disease Prediction API Setup

Navigate to the AI service directory:

```bash
cd AI-Service
```

Create virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

API will run on:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ▶️ Running the Complete System

Start the services in the following order:

### Step 1

Start MongoDB or connect to MongoDB Atlas.

### Step 2

Run the Disease Prediction API.

```bash
uvicorn app.main:app --reload
```

### Step 3

Run the Backend Server.

```bash
npm start
```

### Step 4

Open Telegram and start interacting with your bot.

```text
/start
```

---

# 📡 Available Commands

| Command | Description |
|----------|------------|
| `/start` | Start the bot |
| `/help` | Display help information |
| `/ask <symptoms>` | Predict possible diseases |
| `/remind <medicine> <time> <frequency>` | Create medicine reminder |
| `/remind vaccine <name> <date> <time>` | Create vaccine reminder |
| `/list` | Show active reminders |
| `/delete <medicine>` | Delete reminder |
| `/healthcare` | Find nearby healthcare centres |

---

# ⏰ Reminder System

The reminder service runs using Node Cron and continuously monitors all reminders stored in MongoDB.

Features:

- Daily medicine reminders
- Weekly medicine reminders
- Vaccine notifications
- Automatic vaccine reminder deletion after completion
- Telegram notification delivery

Timezone:

```text
Asia/Kolkata (IST)
```

---

# 🌟 Project Highlights

✔ AI-Powered Disease Prediction

✔ Multilingual Healthcare Assistance

✔ Telegram-Based Healthcare Chatbot

✔ Medicine Reminder System

✔ Vaccine Reminder System

✔ Nearby Healthcare Centre Recommendation

✔ Google Gemini Integration

✔ Google Maps Integration

✔ TensorFlow Disease Classification Model

✔ FastAPI + Node.js Microservice Architecture

✔ MongoDB-Based Reminder Management

✔ Automated Cron-Based Notification System

---

# 🔮 Future Enhancements

- Doctor Appointment Booking
- Health Report Analysis
- Prescription Understanding
- Medicine Information Lookup
- Emergency Healthcare Support
- Voice-Based Interaction
- Electronic Health Records
- User Authentication & Profiles
- Personalized Health Recommendations
- Wearable Device Integration
- Real-Time Health Monitoring

---

# 📜 License

This project is licensed under the terms specified in the LICENSE file.

---

# 🙏 Acknowledgements

This project leverages several open-source technologies and APIs:

- Google Gemini API
- TensorFlow
- Keras
- FastAPI
- MongoDB
- Telegraf
- Google Places API
- Telegram Bot API

Special thanks to the open-source community for providing the tools and frameworks that made SANJEEVANI possible.
