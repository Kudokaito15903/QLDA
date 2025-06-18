import json
import nltk
from nltk.stem import WordNetLemmatizer
import numpy as np
nltk.download('punkt_tab')
nltk.download('punkt')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
ignore_tokens = {'?', '!', ',', "'s"}


def load_intents(path: str) -> dict:
    with open(path, encoding='utf8') as f:
        return json.load(f)


def tokenize_patterns(intents: dict):
    words, classes, documents = [], [], []
    for intent in intents['intents']:
        tag = intent['tag']
        classes.append(tag)
        for pattern in intent['patterns']:
            tokens = nltk.word_tokenize(pattern)
            words.extend(tokens)
            documents.append((tokens, tag))
    return words, classes, documents


def clean_and_lemmatize(words: list) -> list:
    cleaned = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_tokens]
    return sorted(set(cleaned))


def create_bow(sentence: str, vocabulary: list) -> np.ndarray:
    tokens = [lemmatizer.lemmatize(w.lower()) for w in nltk.word_tokenize(sentence)]
    bag = [1 if word in tokens else 0 for word in vocabulary]
    return np.array(bag) 