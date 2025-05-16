const contentMap = new Map([
  ['paris', { title: 'Париж', image: '../resources/paris.png', text: 'Город любви и света.' }],
  ['tokyo', { title: 'Токио', image: '../resources/tokyo.png', text: 'Современный мегаполис с традициями.' }],
  ['newyork', { title: 'Нью-Йорк', image: '../resources/newyork.png', text: 'Город, который никогда не спит.' }],
  ['sydney', { title: 'Сидней', image: '../resources/sydney.png', text: 'Жемчужина Австралии.' }],
  ['iceland', { title: 'Исландия', image: '../resources/iceland.png', text: 'Земля льда и огня.' }]
]);

const sizeMap = new Map([
  ['small', { width: '200px', height: '300px' }],
  ['medium', { width: '300px', height: '400px' }],
  ['large', { width: '400px', height: '500px' }],
  ['xlarge', { width: '500px', height: '600px' }],
  ['custom', { width: '600px', height: '700px' }]
]);

const createBlock = (size, margin, contentKey) => {
  const block = document.createElement('div');
  block.className = 'block';
  block.style.width = sizeMap.get(size).width;
  block.style.height = sizeMap.get(size).height;
  block.style.margin = `${margin}px`;

  const content = contentMap.get(contentKey);
  block.innerHTML = `
    <img src="${content.image}" alt="${content.title}">
    <h3>${content.title}</h3>
    <section>${content.text}</section>
    <div class="block-controls">
      <select class="content-select">
        ${[...contentMap.keys()].map(key => `<option value="${key}" ${key === contentKey ? 'selected' : ''}>${contentMap.get(key).title}</option>`).join('')}
      </select>
      <select class="margin-select">
        ${[10, 20, 30, 40, 50].map(m => `<option value="${m}" ${m == margin ? 'selected' : ''}>${m}px</option>`).join('')}
      </select>
    </div>
  `;

  const updateContent = function(contentKey) {
    const content = contentMap.get(contentKey);
    block.querySelector('img').src = content.image;
    block.querySelector('h3').textContent = content.title;
    block.querySelector('section').textContent = content.text;
  };

  const updateMargin = margin => {
    block.style.margin = `${margin}px`;
  };

  block.querySelector('.content-select').addEventListener('change', (e) => {
    updateContent.call(block, e.target.value);
  });

  block.querySelector('.margin-select').addEventListener('change', (e) => {
    updateMargin.apply(block, [e.target.value]);
  });

  return block;
};

const blockFactory = (() => {
  let blockCount = 0;
  return (size, margin, contentKey) => {
    blockCount++;
    const block = createBlock(size, margin, contentKey);
    block.dataset.id = blockCount;
    return block;
  };
})();

document.getElementById('addBlock').addEventListener('click', () => {
  const size = document.getElementById('size').value;
  const margin = document.getElementById('margin').value;
  const contentKey = document.getElementById('content').value;

  const block = blockFactory(size, margin, contentKey);
  document.getElementById('blocks').appendChild(block);
});
