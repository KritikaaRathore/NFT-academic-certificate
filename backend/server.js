const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/certificateRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send('NFT Certificate API running ✅'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
