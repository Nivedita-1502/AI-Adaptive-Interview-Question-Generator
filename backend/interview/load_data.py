import pandas as pd
from .models import Question

def load_questions():
    df = pd.read_excel("Dataset_SubjectFiltered_MultiModel.xlsx")

    for _, row in df.iterrows():
        Question.objects.create(
            subject=row["subject"],
            difficulty=row["difficulty"],
            question_text=row["question"],
            expected_keywords=row["expected_keywords"],
            model_answer_1=row["model_answer_1"],
            model_answer_2=row["model_answer_2"],
            model_answer_3=row["model_answer_3"],
        )