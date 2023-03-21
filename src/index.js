const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();
require('dotenv').config();

const { PORT } = process.env;

app.use(express.json());
app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log(`Express Server is Listening at PORT ${PORT}`);
})

