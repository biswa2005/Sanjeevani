🏥 Sanjeevani – AI Healthcare Assistant

Sanjeevani is an AI-powered healthcare assistant that predicts possible diseases based on user symptoms and provides medical guidance, precautions, and hospital recommendations.

The system combines Machine Learning disease prediction with LLM reasoning to deliver a complete healthcare support pipeline.

🚀 Features

🧠 Disease prediction using Machine Learning
🤖 AI-powered medical reasoning using Google Gemini
📍 Location-based hospital recommendation
⏰ Medicine reminder system
🌍 Multilingual chatbot support
💬 Telegram chatbot interaction

🛠 Tech Stack
Programming Languages
JavaScript (ES6+) – Backend logic and Telegram bot integration
Python – Machine learning microservice
Backend & Frameworks
Node.js – Server runtime
Express.js – REST API framework
Telegraf.js – Telegram bot framework
FastAPI – Machine learning service
node-cron – Reminder scheduling system

Database
MongoDB Atlas

User profiles
Medicine reminders

Cloud & Hosting
Docker – Containerization

Vercel – Backend and ML model hosting
MongoDB Atlas – Cloud database

External APIs
Google Maps API
Nearest hospital locator

Location-based services
Telegram Bot API

Real-time chatbot interaction
AI Models

Disease Prediction Model
LLM reasoning using Google Gemini API

🏗 System Architecture
User Input (Symptoms)
        ↓
Backend API (Node.js)
        ↓
Machine Learning Microservice (FastAPI)
        ↓
Disease Prediction Model
        ↓
LLM Reasoning (Google Gemini API)
        ↓
Precautions + Advice
        ↓
Nearest Hospital Recommendation
        ↓
Medicine Reminder System
💡 Innovation & Uniqueness
Hybrid AI System

Combines Machine Learning disease prediction with LLM reasoning for intelligent healthcare assistance.

End-to-End Healthcare Flow
Prediction → Precautions → Nearest Hospital → Medicine Reminders
Multilingual Support

Removes language barriers and improves accessibility.

Microservice Architecture
Scalable and production-ready system design.

🌟 Why This Project Is Innovative

Bridges AI medical advice to real-world action
Designed for low-bandwidth mobile-first users
Modular AI architecture for future upgrades

🔮 Future Scalability

Dockerized microservices for horizontal scaling
Integration with custom ML models

🎤 Voice input support
📷 OCR for prescription reading
🩺 Telemedicine integration

Sanjeevani has the potential to evolve into a nationwide preventive healthcare ecosystem with scalable AI infrastructure.

⚙ Installation
1️⃣ Clone the Repository
git clone https://github.com/STYLO009/Sanjeevani.git
2️⃣ Go to Project Directory
cd sanjeevani
3️⃣ Install Dependencies
npm install
pip install -r requirements.txt
4️⃣ Run Backend
npm start
5️⃣ Run ML Microservice
uvicorn main:app --reload