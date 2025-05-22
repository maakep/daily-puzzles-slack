const axios = require('axios');

// prettier-ignore
const puzzles = [
  'https://bandle.app/', 
  'https://meleedle.netlify.app/',
];

const slackUrl = '';

exports.onEvent = (event, context) => {
  puzzles.forEach((linkToDisplay) => {
    axios.post(slackUrl, { blocks: [{ type: 'section', fields: [{ type: 'mrkdwn', text: linkToDisplay }] }] });
  });

  guessTheGame();
};

function guessTheGame() {
  const now = new Date();
  const fullDaysSinceEpoch = Math.floor(now / 8.64e7);
  const todaysNumber = fullDaysSinceEpoch - 19126;

  const body = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: ':video_game: Guess the game!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: 'https://guessthe.game/',
          },
        ],
      },
      {
        type: 'image',
        title: {
          type: 'plain_text',
          text: ':thinkingface:',
          emoji: true,
        },
        image_url: `https://guessthe.game/games/${todaysNumber}/1.webp`,
        alt_text: 'first picture',
      },
    ],
  };

  axios.post(slackUrl, body);
}
