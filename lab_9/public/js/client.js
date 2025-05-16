document.addEventListener('DOMContentLoaded', () => {
    const array = generateArray();
    const maxElement = getMaxElement(array);
    const sortedArray = sortArray(array);

    document.getElementById('maxElement').textContent = maxElement;

    const arrayTable = document.getElementById('arrayTable');
    const sortedTable = document.getElementById('sortedTable');

    if (arrayTable) {
        populateTable(arrayTable, array);
    } else if (sortedTable) {
        populateTable(sortedTable, sortedArray);
    }
});

function generateArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
        array.push(Math.floor(Math.random() * (100 - 10 + 1)) + 10);
    }
    return array;
}

function getMaxElement(array) {
    return Math.max(...array);
}

function sortArray(array) {
    return [...array].sort((a, b) => a - b);
}

function populateTable(table, array) {
    for (let i = 0; i < 10; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell();
            cell.textContent = array[i * 10 + j];
        }
    }
}
