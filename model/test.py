from transformers import pipeline
import torch

# You can use Models from MODEL HUB
model = 'distilgpt2'


# Check if GPU is available
device = 0 if torch.cuda.is_available() else -1
print(f"Using device: {'CUDA' if device == 0 else 'CPU'}")

# Sentiment Analysis with optimizations
classifier = pipeline(
    'sentiment-analysis',
    device=device,
    model='distilbert-base-uncased-finetuned-sst-2-english',  # Smaller, faster model
    framework='pt'  # Use PyTorch backend
)

# Batch processing for better efficiency
texts = [
    "I don't wanna go to class today.",
    # Add more texts here for batch processing
]
results = classifier(texts, batch_size=8)
print("Sentiment Analysis Results:", results)



# Text Generation with optimizations
generator = pipeline(
    'text-generation',
    model=model,
    device=device,
    framework='pt',
    torch_dtype=torch.float16  # Use half-precision for faster inference
)

# Generation with more control parameters
results = generator(
    "In this course we will teach you how to",
    max_length=30,
    num_return_sequences=2,
    do_sample=True,  # Enable sampling
    temperature=0.7,  # Control randomness (lower = more focused)
    top_k=50,        # Limit vocabulary to top k tokens
    top_p=0.95,      # Nucleus sampling
    no_repeat_ngram_size=2,  # Avoid repeating n-grams
    early_stopping=True,
    pad_token_id=generator.tokenizer.eos_token_id
)

for i, res in enumerate(results):
    print(f"\nGenerated Text {i+1}:")
    print(res['generated_text'])

# Free up GPU memory
if device == 0:
    torch.cuda.empty_cache()

# Save and load models
# save_directory = "saved" tokenizer.save_pretrained(save_directory)
# model.save_pretrained (save_directory)

# tok= AutoTokenizer.from_pretrained (save_directory)
# mod = AutoModelForSequenceClassification.from_pretrained(save_directory)