import os
import pandas as pd
import re
import random
from sentence_transformers import SentenceTransformer, util

# =====================================================
# PATH SETUP
# =====================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "interview_trained_model")
DATASET_PATH = os.path.join(BASE_DIR, "interview_questions_cleaned.xlsx")

print("Loading model from:", MODEL_PATH)

# =====================================================
# LOAD TRAINED MODEL
# =====================================================

model = SentenceTransformer(MODEL_PATH)

# =====================================================
# LOAD DATASET (for optional semantic reference)
# =====================================================

df = pd.read_excel(DATASET_PATH)

print(f"✓ Loaded {len(df)} questions from dataset")

# Precompute embeddings for ideal answers
df["ideal_embedding"] = df["ideal_answer"].apply(
    lambda x: model.encode(str(x), convert_to_tensor=True)
)

# =====================================================
# QUESTION GENERATION
# =====================================================

def generate_contextual_question(questions, subject=None, difficulty=None):

    questions_list = list(questions)

    if not questions_list:
        return None, None, None

    selected_question = random.choice(questions_list)

    return (
        selected_question,
        selected_question.keywords,
        selected_question.ideal_answer
    )


# =====================================================
# TEXT PREPROCESSING
# =====================================================

def preprocess_text(text):

    if not text:
        return ""

    text = str(text).lower()

    text = re.sub(r"[^\w\s]", " ", text)

    text = re.sub(r"\s+", " ", text)

    text = text.replace("datastructure", "data structure")

    return text.strip()


# =====================================================
# SEMANTIC SIMILARITY
# =====================================================

def semantic_similarity(user_answer, ideal_answer):

    user_clean = preprocess_text(user_answer)
    ideal_clean = preprocess_text(ideal_answer)

    user_embedding = model.encode(user_clean, convert_to_tensor=True)
    ideal_embedding = model.encode(ideal_clean, convert_to_tensor=True)

    similarity = util.cos_sim(user_embedding, ideal_embedding).item()

    return similarity


# =====================================================
# KEYWORD MATCH
# =====================================================

def keyword_match(answer, keywords):

    answer = preprocess_text(answer)

    matched = 0

    for keyword in keywords:

        keyword = keyword.strip().lower()

        if keyword in answer:
            matched += 1

    if len(keywords) == 0:
        return 0

    return (matched / len(keywords)) * 100


# =====================================================
# MAIN EVALUATION FUNCTION
# =====================================================

def contextual_evaluation(keywords, ideal_answer, user_answer):

    print("DEBUG KEYWORDS:", keywords)
    print("IDEAL ANSWER:", ideal_answer)
    print("USER ANSWER:", user_answer)

    if not user_answer or user_answer.strip() == "":
        return "Incorrect", 0

    # normalize keywords
    keywords = [k.strip().lower() for k in keywords if k.strip()]

    # minimum length rule
    tokens = preprocess_text(user_answer).split()

    if len(tokens) < 5:
        return "Partial", 0.3

    # keyword coverage
    coverage = keyword_match(user_answer, keywords)

    # semantic similarity
    similarity = semantic_similarity(user_answer, ideal_answer)

    if similarity < 0.2 and coverage < 20:
        print("Answer detected as irrelevant or nonsense.")
        return "Incorrect", 0
    
    # combine signals
    score = max(coverage / 100, similarity)

    # classification
    if score >= 0.7:
        label = "Correct"
    elif score >= 0.4:
        label = "Partial"
    else:
        label = "Incorrect"

    print("KEYWORD COVERAGE:", coverage)
    print("SEMANTIC SIMILARITY:", similarity)
    print("FINAL SCORE:", score)
    print("RESULT:", label)

    return label, score