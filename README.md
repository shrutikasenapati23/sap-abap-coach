# 🎯 ABAP Coach AI — SAP Interview Excellence

An AI-powered SAP ABAP interview preparation tool that evaluates your answers, scores your performance, and provides actionable feedback to help you crack SAP interviews.

---

## 🌐 Live Demo

Deployed on **Vercel** → [your-vercel-link-here]

---

## 📌 Overview

This project simulates a real SAP ABAP interview experience:

* Presents interview questions
* Accepts user responses
* Evaluates answers using **Groq AI (LLaMA 3.3 70B)**
* Returns structured feedback with score, insights, and model answers

---

## 🚀 Features

* AI-powered answer evaluation (Groq API)
* Score out of 100 with breakdown (Technical, Clarity, Depth)
* Strengths & improvement suggestions
* Interviewer tips + model answers
* Clean, responsive UI (Vanilla HTML, CSS, JS)
* Serverless backend using Vercel
* Practice across multiple ABAP topics

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js (Vercel Serverless Functions)
* **AI Model:** Groq API — `llama-3.3-70b-versatile`
* **Deployment:** Vercel

---

## 📁 Project Structure

```
sap-abap-coach/
├── public/
│   └── index.html
├── api/
│   └── feedback.js
├── package.json
├── vercel.json
└── README.md
```

---

## ⚙️ API — `/api/feedback`

* Accepts `POST` request with user answer
* Sends prompt to Groq AI
* Processes response
* Returns structured evaluation

### Sample Response

```json
{
  "score": 85,
  "headline": "Good Understanding",
  "technical": 80,
  "clarity": 75,
  "depth": 70,
  "strengths": [],
  "improvements": [],
  "interviewerTip": "",
  "modelAnswer": ""
}
```

---

## 📊 Score Guide

| Score  | Meaning           |
| ------ | ----------------- |
| 90–100 | Outstanding       |
| 80–89  | Very Good         |
| 70–79  | Good              |
| 50–69  | Average           |
| < 50   | Needs Improvement |

---

## 🚀 Run Locally

```bash
git clone https://github.com/shrutikasenapati23/sap-abap-coach.git
cd sap-abap-coach

npm install -g vercel

echo "GROQ_API_KEY=your_api_key" > .env

vercel dev
```

Open: http://localhost:3000

---

## 🔑 Environment Variables

* `GROQ_API_KEY` — Groq API key

> ⚠️ Never commit `.env` file to GitHub

---

## ☁️ Deployment

```bash
vercel --prod
```

---

##  Author

**Shrutika Senapati**
GitHub: https://github.com/shrutikasenapati23
---


> *"Turn your answers into offers."* 🚀 THANK YOU VISITING .
