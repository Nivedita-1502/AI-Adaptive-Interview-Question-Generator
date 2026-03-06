# AI-Based Adaptive Interview Question Generator

## Project Description
This project is an AI-based adaptive interview preparation system. It dynamically generates interview questions, evaluates user answers using Natural Language Processing techniques, and adjusts the difficulty level based on the user's performance. The system simulates a real interview environment and helps students prepare for technical interviews in subjects like DSA and DBMS.

---

## Technologies Used

- Python  
- Django (Backend Framework)  
- HTML, CSS, JavaScript (Frontend)  
- Pandas (Dataset Processing)  
- Scikit-learn  
- TF-IDF & Cosine Similarity  
- Sentence Transformers (Semantic Similarity)  
- Excel Dataset  

---

## Project Structure

```
AI_Interview_Project
│
├── backend
│   ├── backend
│   ├── interview
│   ├── manage.py
│
├── frontend
│   ├── base.html
│   ├── setup.html
│   ├── interview.html
│   ├── result.html
│
├── Dataset_SubjectFiltered_MultiModel.xlsx
├── requirements.txt
└── README.md
```

---

# How to Run the Project

## Step 1: Clone the Repository

```bash
git clone https://github.com/Nivedita-1502/AI-Adaptive-Interview-Question-Generator.git
cd AI-Adaptive-Interview-Question-Generator
```

---

## Step 2: Install Required Packages

```bash
pip install -r requirements.txt
```

---

## Step 3: Navigate to Backend Folder

```bash
cd backend
```

---

## Step 4: Apply Database Migrations

```bash
python manage.py migrate
```

---

## Step 5: Load Dataset into Database

```bash
python manage.py shell
```

Then run:

```python
from interview.load_data import load_questions
load_questions()
exit()
```

---

## Step 6: Run the Django Server

```bash
python manage.py runserver
```

---

## Step 7: Open the Application

Open a browser and go to:

```text
http://127.0.0.1:8000/
```

You should see the **AI Interview Setup Page** where you can select subject and difficulty.

---

# 🔍 API Endpoints

## 1️⃣ Start Interview API

This API starts a new interview session.

**URL**

```text
http://127.0.0.1:8000/api/start?subject=DSA&difficulty=Easy
```

**Example Response**

```json
{
  "message": "Interview started",
  "session_id": 1
}
```

---

## 2️⃣ Get Question API

This API generates a contextual interview question.

**URL**

```text
http://127.0.0.1:8000/api/question?session_id=1
```

**Example Response**

```json
{
  "question": "Explain the relationship between recursion, stack, and queue in DSA.",
  "difficulty": "Medium"
}
```

---

## 3️⃣ Evaluate Answer API

This API evaluates the user answer using AI similarity techniques.

**URL**

```text
http://127.0.0.1:8000/api/evaluate?session_id=1&answer=Your_answer_here
```

**Example Response**

```json
{
  "evaluation": "Correct",
  "next_difficulty": "Hard"
}
```

---

# Adaptive Interview Logic

| Result | Difficulty Change |
|------|------|
Correct | Increase |
Incorrect | Decrease |
Partial | Same |

After completing the interview, the system shows a **performance summary including score and accuracy**.

---

# Testing the System

## 1️⃣ Testing Using Browser

You can directly test APIs in the browser by pasting the API URLs.

---

## 2️⃣ Testing Using Postman

1. Open **Postman**
2. Select **GET** request
3. Enter the API URL
4. Click **Send**

This method is useful for demonstrating backend functionality.

---

# Dataset

The dataset contains interview questions categorized by:

- Subject  
- Difficulty  
- Question  
- Model Answer 1  
- Model Answer 2  
- Model Answer 3  

---

# Features

- Adaptive difficulty interview system
- Context-based question generation
- AI-based answer evaluation
- Semantic similarity matching
- Real-time performance summary
- Web-based interactive interface

---

# Future Improvements

- Add more subjects
- Add user login system
- Store interview history
- Improve question generation using large language models

---
