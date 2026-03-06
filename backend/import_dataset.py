import pandas as pd
from interview.models import Question

# read Excel dataset
df = pd.read_excel("interview_questions_cleaned.xlsx")

# clear old data
Question.objects.all().delete()

# insert rows
for _, row in df.iterrows():
    Question.objects.create(
        subject=row["subject"],
        difficulty=row["difficulty"],
        question_text=row["question_text"],
        keywords=row["keywords"],
        ideal_answer=row.get("ideal_answer", "")
    )

print(f"Dataset imported successfully: {len(df)} questions added")