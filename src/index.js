const express = require('express');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const app = express();
require('dotenv').config();

const { PORT } = process.env;

app.use(express.json());
app.use(express.static('apidoc'));
app.get('/', (req, res) => {
    res.render('index.html');
})
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Express Server is Listening at PORT ${PORT}`);
})

