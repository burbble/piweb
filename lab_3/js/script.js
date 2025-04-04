document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const styleSelect = document.getElementById('styleSelect');
    const textArea = document.getElementById('textArea');
    const beforeBtn = document.getElementById('beforeBtn');
    const afterBtn = document.getElementById('afterBtn');
    const newWindowBtn = document.getElementById('newWindowBtn');
    const cloneInput = document.getElementById('cloneInput');
    const addCloneBtn = document.getElementById('addCloneBtn');
    const removeCloneBtn = document.getElementById('removeCloneBtn');
    const cloneContainer = document.getElementById('cloneContainer');
    
    let position = 'beforeend';
    
    beforeBtn.addEventListener('click', function() {
        position = 'afterbegin';
    });
    
    afterBtn.addEventListener('click', function() {
        position = 'beforeend';
    });
    
    newWindowBtn.addEventListener('click', function() {
        const newWindow = window.open('', '_blank', 'width=600,height=400');
        
        newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Текст с применением insertAdjacentText</title>
                <style>
                    .font-small { font-size: 0.8em; }
                    .color-green { color: green; }
                    .bold { font-weight: bold; }
                </style>
            </head>
            <body>
                <h2>Результат вставки текста</h2>
                <div id="resultContainer"></div>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const resultContainer = document.getElementById('resultContainer');
                        const mainText = "${textArea.value.replace(/"/g, '\\"')}";
                        const insertText = "${textInput.value.replace(/"/g, '\\"')}";
                        const styleClass = "${styleSelect.value}";
                        const position = "${position}";

                        resultContainer.textContent = mainText;

                        const span = document.createElement('span');
                        span.textContent = insertText;
                        span.className = styleClass;

                        resultContainer.insertAdjacentElement(position, span);
                    });
                </script>
            </body>
            </html>
            `);
        newWindow.document.close();
    });
    
    addCloneBtn.addEventListener('click', function() {
        const cloneInputValue = document.getElementById('cloneInput').value;
        const newClone = document.createElement('div');
        newClone.textContent = cloneInputValue;
        newClone.className = 'cloned-input';
        newClone.style.border = '1px solid #ccc';
        newClone.style.padding = '10px';
        newClone.style.margin = '5px 0';
        newClone.style.borderRadius = '5px';
        newClone.style.backgroundColor = '#f9f9f9';
        cloneContainer.appendChild(newClone);
    });
    
    removeCloneBtn.addEventListener('click', function() {
        const clonedInputs = document.getElementsByClassName('cloned-input');
        if (clonedInputs.length > 0) {
            cloneContainer.removeChild(clonedInputs[clonedInputs.length - 1]);
        }
    });
});
