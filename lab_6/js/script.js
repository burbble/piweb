class NewsItem {
    #newsImages = new Set([
        '../resources/news1.png',
        '../resources/news2.png',
        '../resources/news3.png'
    ]);
    #newsTexts = new Set([
        'Breaking News',
        'Global Update',
        'Tech Unveiled'
    ]);

    constructor(container) {
        this.container = container;
        this.displayItems();
    }

    displayItems() {
        this.#newsImages.forEach((image, index) => {
            const div = document.createElement('div');
            div.className = 'news-item';
            div.innerHTML = `<img src="${image}" alt="News Image"><p>${[...this.#newsTexts][index]}</p>`;
            this.container.appendChild(div);
        });
    }
}

class ExtendedNewsItem extends NewsItem {
    insertNewImage(position, newImage) {
        const newDiv = document.createElement('div');
        newDiv.className = 'news-item';
        newDiv.innerHTML = `<img src="${newImage}" alt="New Image">`;

        if (position === 'before') {
            const firstItem = this.container.querySelector('.news-item');
            if (firstItem) {
                this.container.insertBefore(newDiv, firstItem);
            } else {
                this.container.appendChild(newDiv);
            }
        } else {
            this.container.appendChild(newDiv);
        }
    }

    insertNewParagraph(position, newText = 'New Article') {
        const newDiv = document.createElement('div');
        newDiv.className = 'news-item';
        newDiv.innerHTML = `<p>${newText}</p>`;

        if (position === 'before') {
            const firstItem = this.container.querySelector('.news-item');
            if (firstItem) {
                this.container.insertBefore(newDiv, firstItem);
            } else {
                this.container.appendChild(newDiv);
            }
        } else {
            this.container.appendChild(newDiv);
        }
    }
}

const container = document.getElementById('newsContainer');
const news = new ExtendedNewsItem(container);

document.getElementById('addImage').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

document.getElementById('addText').addEventListener('click', () => {
    document.getElementById('textModal').style.display = 'block';
});

document.getElementById('closeImageModal').onclick = function() {
    document.getElementById('imageModal').style.display = 'none';
};

document.getElementById('closeTextModal').onclick = function() {
    document.getElementById('textModal').style.display = 'none';
};

document.getElementById('imageInput').addEventListener('change', (event) => {
    const position = document.getElementById('insertPosition').value;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        news.insertNewImage(position, e.target.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert('Пожалуйста, выберите файл изображения.');
    }
});

document.getElementById('confirmText').addEventListener('click', () => {
    const position = document.getElementById('insertPosition').value;
    const textInput = document.getElementById('modalTextInput').value;

    if (textInput) {
        news.insertNewParagraph(position, textInput);
        document.getElementById('textModal').style.display = 'none';
    } else {
        alert('Пожалуйста, введите текст.');
    }
});
