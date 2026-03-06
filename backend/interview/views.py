import json
import random
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import Question, InterviewSession
from .ai_engine import contextual_evaluation, generate_contextual_question

DIFFICULTY_ORDER = ["Easy", "Medium", "Hard"]

# ------------------------------
# FRONTEND PAGES
# ------------------------------

def login_page(request):
    if request.method == "POST":
        candidate_name = request.POST.get("candidate_name")
        if candidate_name:
            request.session["candidate_name"] = candidate_name
            return redirect("/setup/")
    return render(request, "login.html")


def setup_page(request):
    return render(request, "setup.html")


def interview_page(request):
    return render(request, "interview.html")


def result_page(request):
    return render(request, "result.html")


# ------------------------------
# API ENDPOINTS
# ------------------------------

def get_subjects(request):
    subjects = Question.objects.values_list("subject", flat=True).distinct()
    return JsonResponse({"subjects": list(subjects)})


def start_interview(request):

    subject = request.GET.get("subject")
    difficulty = request.GET.get("difficulty")

    if not subject or not difficulty:
        return JsonResponse({"error": "subject and difficulty required"}, status=400)

    session = InterviewSession.objects.create(
        subject=subject,
        current_difficulty=difficulty
    )

    return JsonResponse({
        "message": "Interview started",
        "session_id": session.id
    })


# ------------------------------
# GET QUESTION
# ------------------------------

def get_question(request):

    session_id = request.GET.get("session_id")

    try:
        session = InterviewSession.objects.get(id=session_id)
    except:
        return JsonResponse({"error": "Invalid session"})

    if session.completed:
        return JsonResponse({"message": "Interview completed"})

    questions = Question.objects.filter(
        subject=session.subject,
        difficulty=session.current_difficulty
    )

    asked_ids = []

    if session.last_sampled_questions:
        asked_ids = json.loads(session.last_sampled_questions)

    questions = questions.exclude(id__in=asked_ids)

    if not questions.exists():
        return JsonResponse({"error": "No more questions available"})

    # Choose random question
    selected_question = random.choice(list(questions))

    # Update asked questions list
    asked_ids.append(selected_question.id)

    session.last_sampled_questions = json.dumps(asked_ids)
    session.save()

    return JsonResponse({
        "question": selected_question.question_text,
        "difficulty": session.current_difficulty
    })


# ------------------------------
# ANSWER EVALUATION
# ------------------------------

@csrf_protect
def evaluate(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    session_id = request.POST.get("session_id")
    user_answer = request.POST.get("answer")

    if not session_id or not user_answer:
        return JsonResponse({"error": "Missing session_id or answer"}, status=400)

    try:

        session = InterviewSession.objects.get(id=session_id)

        # Load asked questions
        raw_sampled = session.last_sampled_questions or "[]"
        sampled_ids = json.loads(raw_sampled)

        if not sampled_ids:
            return JsonResponse({"error": "No question asked yet"}, status=400)

        # Get current question
        current_question_id = sampled_ids[-1]

        current_question = Question.objects.get(id=current_question_id)

        # Extract keywords
        keywords = [k.strip() for k in current_question.keywords.split(",")]

        # Get ideal answer directly
        ideal_answer = current_question.ideal_answer

        print("DEBUG KEYWORDS:", keywords)
        print("IDEAL ANSWER:", ideal_answer)
        print("USER ANSWER:", user_answer)

        # AI Evaluation
        label, confidence = contextual_evaluation(
            keywords,
            ideal_answer,
            user_answer
        )

        # ------------------------------
        # UPDATE SESSION STATS
        # ------------------------------

        session.total_questions += 1

        if label == "Correct":

            session.correct_answers += 1

            idx = DIFFICULTY_ORDER.index(session.current_difficulty)
            if idx < 2:
                session.current_difficulty = DIFFICULTY_ORDER[idx + 1]

        elif label == "Partial":

            session.partial_answers += 1

        elif label == "Incorrect":

            session.incorrect_answers += 1

            idx = DIFFICULTY_ORDER.index(session.current_difficulty)
            if idx > 0:
                session.current_difficulty = DIFFICULTY_ORDER[idx - 1]

        session.save()

        # ------------------------------
        # INTERVIEW COMPLETION
        # ------------------------------

        if session.total_questions >= 3:

            session.completed = True
            session.save()

            return JsonResponse({
                "message": "Interview completed",
                "total": session.total_questions,
                "correct": session.correct_answers,
                "partial": session.partial_answers,
                "incorrect": session.incorrect_answers,
                "accuracy": f"{session.accuracy()}%",
                "final_level": session.current_difficulty
            })

        return JsonResponse({
            "evaluation": label,
            "confidence": round(confidence, 2),
            "next_difficulty": session.current_difficulty
        })

    except Exception as e:

        print("SERVER ERROR:", e)

        return JsonResponse({"error": str(e)}, status=500)