// index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items')
const rentalRoutes = require('./routes/rental')
const authRoutes = require('./routes/authRoute')

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json())

app.use(cors({
    origin: '*',
    credentials: true,
  }));

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemsRoutes);
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1', authRoutes);

app.get('/', (req,res)=>{
    res.send("<h1> This api is working </h1>")
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});