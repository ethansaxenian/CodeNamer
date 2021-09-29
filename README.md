# CodeNamer
A Codenames bot


## Installation and Setup Instructions
Install tesseract using `homebrew`:
```shell
$ brew install tesseract
```

Install dependencies:
```shell
$ pip install -r requirements.txt
```

Download a model pre-trained on the Google News dataset (3 million words) to the project directory. 
This will take up about 1.7 GB of space on your computer:
```shell
$ export GENSIM_DATA_DIR=./data/gensim-data
$ python3 -m gensim.downloader -d word2vec-google-news-300
```
