from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import random
import numpy as np
from keras.models import load_model
from preprocessing import create_bow
app = Flask(__name__)
CORS(app) 

# Load 
model = load_model('../model/mymodel.h5')
words = pickle.load(open('../model/words.pkl', 'rb'))
classes = pickle.load(open('../model/classes.pkl', 'rb'))
intents = json.loads(open("../data/Train_intents.json", encoding="utf8").read())
# Predict intent
def predict_intent(sentence: str, threshold: float = 0.8):
    bow = create_bow(sentence, words)
    probs = model.predict(np.array([bow]))[0]
    results = [
        {'intent': classes[i], 'prob': float(p)}
        for i, p in enumerate(probs) if p > threshold
    ]
    return sorted(results, key=lambda x: x['prob'], reverse=True)

#Reponse 
def get_response(intent):
    tag= predict_intent(intent)[0]['intent']
    for intent in intents['intents']:
        if intent['tag'] == tag:
            return tag,random.choice(intent['responses']);
    return "I'm sorry, I don't understand that."

# Route 
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    intent = data['message']
    tag, response = get_response(intent)
    return jsonify({'tag': tag, 'intent': intent,'response': response})

@app.route('/')
def index():
    return "Welcome to the chatbot"; 

if __name__ == '__main__':
    app.run(debug=True)