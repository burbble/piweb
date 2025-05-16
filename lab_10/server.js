const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

async function generateAndSaveArrays() {
    const numbers = Array.from({ length: 100 }, () => Math.random() * 90 + 10);
    
    const resourceDir = path.join(__dirname, 'public', 'resource');
    await fs.mkdir(resourceDir, { recursive: true });
    
    await fs.writeFile(path.join(resourceDir, 'original.json'), JSON.stringify(numbers));
    
    const sortedAsc = [...numbers].sort((a, b) => a - b);
    const sortedDesc = [...numbers].sort((a, b) => b - a);
    
    await fs.writeFile(path.join(resourceDir, 'sorted_asc.json'), JSON.stringify(sortedAsc));
    await fs.writeFile(path.join(resourceDir, 'sorted_desc.json'), JSON.stringify(sortedDesc));
    
    return { original: numbers, sortedAsc, sortedDesc };
}

app.get('/data', async (req, res) => {
    try {
        const original = JSON.parse(await fs.readFile('public/resource/original.json'));
        res.json({ original });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/sorted/:order', async (req, res) => {
    try {
        const order = req.params.order;
        const file = order === 'asc' ? 'sorted_asc.json' : 'sorted_desc.json';
        const data = JSON.parse(await fs.readFile(`public/resource/${file}`));
        res.json({ sorted: data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, async () => {
    await generateAndSaveArrays();
    console.log(`Server running at http://localhost:${port}`);
});
