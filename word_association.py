from gensim.models import KeyedVectors

KEYED_VECTORS_PATH = 'data/gensim-data/word2vec-google-news-300/word2vec-google-news-300.gz'
MODEL_PATH = 'data/saved_models/wordVectors'

model = KeyedVectors.load_word2vec_format(KEYED_VECTORS_PATH, binary=True, limit=500000)
sims = model.most_similar('tree', topn=5)
print(sims)
# model.save(MODEL_PATH)
model = KeyedVectors.load(MODEL_PATH)
sims = model.most_similar('tree', topn=5)
print(sims)
