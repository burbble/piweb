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

module.exports = { generateArray, getMaxElement, sortArray };
