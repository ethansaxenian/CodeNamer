from gensim.models import KeyedVectors
import sys

KEYED_VECTORS_PATH = 'data/gensim-data/word2vec-google-news-300/word2vec-google-news-300.gz'

def load_word_vectors() -> KeyedVectors:
    return KeyedVectors.load_word2vec_format(KEYED_VECTORS_PATH, binary=True, limit=500000)


def get_similar_words(model: KeyedVectors, word: str, number: int = 5) -> list[tuple[str, float]]:
    return model.most_similar(word, topn=number)


def save_model(model: KeyedVectors, name: str):
    model.save(f'data/saved_models/{name}')


def load_model(name: str) -> KeyedVectors:
    return KeyedVectors.load(f'data/saved_models/{name}')
