from flask import Flask
from api.word_association import load_model, get_similar_words
import time

app = Flask(__name__)

@app.route("/")
def home_route():
    return {"hello": "world"}


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route("/words/<word>")
@app.route("/words/<word>/<num>")
def get_similar_words(word, num=5):
    model = load_model('wordVectors')
    words = model.most_similar(word, topn=int(num))
    return {new_word.lower(): score for new_word, score in words}
