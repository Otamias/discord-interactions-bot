const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const contentMap = {
    'example1': {
        type: 'image',
        url: 'https://example.com/picture1.jpg'
    },
    'example2': {
        type: 'video',
        url: 'https://example.com/video1.mp4'
    }
    // Add more mappings as needed
};

app.post('/api/interactions', (req, res) => {
    const interaction = req.body;

    if (interaction.type === 1) {
        res.send({ type: 1 }); // Respond to PING
    } else if (interaction.type === 2) {
        const command = interaction.data.name;
        const keyword = command.split('_')[1];

        if (keyword && contentMap[keyword]) {
            const content = contentMap[keyword];
            const response = {
                type: 4,
                data: {
                    content: `Here is the ${content.type} you requested!`,
                    embeds: content.type === 'image' ? [{
                        image: { url: content.url }
                    }] : [{
                        video: { url: content.url }
                    }]
                }
            };
            res.send(response);
        } else {
            res.send({
                type: 4,
                data: {
                    content: 'Sorry, I couldn\'t find that content.'
                }
            });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});