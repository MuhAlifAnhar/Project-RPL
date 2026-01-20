const express = require('express');
const app = express();
const PORT = 3006;
const router = require('./router/router');

app.use(express.json());

//1. penerapan routing app.METHOD(PATH, HANDLER);
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})