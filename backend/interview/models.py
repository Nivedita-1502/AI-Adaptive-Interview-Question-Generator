from django.db import models

DIFFICULTY_LEVELS = [
    ("Easy", "Easy"),
    ("Medium", "Medium"),
    ("Hard", "Hard"),
]

correct_answers = models.IntegerField(default=0)
partial_answers = models.IntegerField(default=0)
incorrect_answers = models.IntegerField(default=0)

from django.db import models

class Question(models.Model):

    subject = models.CharField(max_length=100)

    difficulty = models.CharField(max_length=20)

    question_text = models.TextField()

    keywords = models.TextField()

    ideal_answer = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.question_text


class InterviewSession(models.Model):

    subject = models.CharField(max_length=100)
    current_difficulty = models.CharField(max_length=20)

    total_questions = models.IntegerField(default=0)

    correct_answers = models.IntegerField(default=0)
    partial_answers = models.IntegerField(default=0)
    incorrect_answers = models.IntegerField(default=0)

    # add this line
    last_sampled_questions = models.TextField(blank=True, null=True)

    completed = models.BooleanField(default=False)

    def accuracy(self):
        if self.total_questions == 0:
            return 0
        return round((self.correct_answers / self.total_questions) * 100, 2)