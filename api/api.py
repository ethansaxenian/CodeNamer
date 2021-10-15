from flask import Flask
from flask_cors import CORS
from api.word_association import load_model, is_valid_clue

app = Flask(__name__)
CORS(app)

@app.route("/")
def home_route():
    return "hello world"


@app.route("/words/<word>")
@app.route("/words/<word>/<num>")
def get_similar_words(word, num=100):
    model = load_model('wordVectors')
    clues = model.most_similar(word, topn=int(num))
    parsed_words = [(clue, score) for (clue, score) in clues if is_valid_clue(clue, word)]
    return {new_word.lower(): score for new_word, score in parsed_words}
