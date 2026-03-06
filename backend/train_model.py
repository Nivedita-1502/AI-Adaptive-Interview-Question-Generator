import pandas as pd
from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader

# Load dataset
df = pd.read_excel("interview_questions_cleaned.xlsx")

# Load base model
model = SentenceTransformer("all-MiniLM-L6-v2")

train_examples = []

# Create training pairs from existing dataset
for _, row in df.iterrows():

    question = str(row["question_text"])
    ideal_answer = str(row["ideal_answer"])

    # positive pair
    train_examples.append(
        InputExample(texts=[question, ideal_answer], label=1.0)
    )

# DataLoader
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)

# Loss function
train_loss = losses.CosineSimilarityLoss(model)

# Train
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=3,
    warmup_steps=100
)

# Save trained model
model.save("interview_trained_model")

print("✓ Model training complete")