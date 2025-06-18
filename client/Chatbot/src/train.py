import pickle
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import Adam
from preprocessing import load_intents, tokenize_patterns, clean_and_lemmatize
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()

def main():
    intents = load_intents('../data/Train_intents.json')
    words, classes, documents = tokenize_patterns(intents)
    words = clean_and_lemmatize(words)
    classes = sorted(set(classes))

    # Build training data
    training = []
    empty_output = [0] * len(classes)
    for doc in documents:
        bow = [1 if w in [lemmatizer.lemmatize(t.lower()) for t in doc[0]] else 0 for w in words]
        output = empty_output.copy()
        output[classes.index(doc[1])] = 1
        training.append((bow, output))
    np.random.shuffle(training)
    X = np.array([t[0] for t in training])
    y = np.array([t[1] for t in training])

    # Define model
    model = Sequential([
        Dense(128, activation='relu', input_shape=(len(X[0]),)),
        Dropout(0.5),
        Dense(64, activation='relu'),
        Dense(64, activation='relu'),
        Dropout(0.5),
        Dense(len(y[0]), activation='softmax')
    ])
    model.compile(optimizer=Adam(0.001), loss='categorical_crossentropy', metrics=['accuracy'])
    model.fit(X, y, epochs=200, batch_size=10, verbose=1)

    # Save artifacts
    model.save('../model/mymodel.h5')
    pickle.dump(words, open('../model/words.pkl', 'wb'))
    pickle.dump(classes, open('../model/classes.pkl', 'wb'))


if __name__ == '__main__':
    main() 