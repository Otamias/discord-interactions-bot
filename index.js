const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/interactions', (req, res) => {
    const interaction = req.body;

    if (interaction.type === 1) {
        res.send({ type: 1 });
    } else if (interaction.type === 2) {
        const command = interaction.data.name;
        if (command === 'hello') {
            res.send({
                type: 4,
                data: {
                    content: 'Hello, world!'
                }
            });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});