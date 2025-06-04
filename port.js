const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/r/:subreddit', async (req, res) => {
    const subreddit = req.params.subreddit;
    const redditUrl = `https://www.reddit.com/r/${subreddit}/.json`;

    try {
        const response = await fetch(redditUrl, {
            headers: {
                'User-Agent': 'J2ME-RedditProxy/1.0'
            }
        });
        const data = await response.json();
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Reddit' });
    }
});

app.listen(PORT, () => {
    console.log(`Reddit proxy running on port ${PORT}`);
});
