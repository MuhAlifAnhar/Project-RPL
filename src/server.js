const express = require('express');
const app = express();
const PORT = 3006;
const router = require('./router/router');
const userRouter = require('./router/userRouter');
const errorHandler = require('./middleware/errorHandler');


app.use(express.json());

//1. penerapan routing app.use(PATH, HANDLER);
app.use('/', router);

//2. penerapan routing app.use(PATH, ROUTER);
app.use('/user', userRouter);

//3. penerapan middleware untuk menangani error
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})