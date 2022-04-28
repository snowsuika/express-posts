const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

DB = process.env.DATABASE;

mongoose
    .connect(DB)
    .then(() => console.log('連線成功'))
    .catch((err) => console.log('連線失敗', err));
