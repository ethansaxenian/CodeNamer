import sys

from PIL import Image
import pytesseract

if __name__ == '__main__':
    img = Image.open(sys.argv[1])
    result = pytesseract.image_to_string(img)
    word_list = [word.lower() for word in result.split()]
    print(word_list)
