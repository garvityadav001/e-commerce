import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import seedProducts from './config/seedProducts.js';
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
let initialization;

app.use(express.json());
app.use(cors());

const initialize = async () => {
    if (!initialization) {
        initialization = Promise.all([
            connectDB(),
            connectCloudinary(),
        ]).then(async () => {
            await seedProducts();
        });
    }
    return initialization;
};

app.use(async (req, res, next) => {
    try {
        await initialize();
        next();
    } catch (error) {
        next(error);
    }
});

// Api Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req,res)=>{
    res.send("Api Working");
});

const startServer = async () => {
    await initialize();

    app.listen(port, ()=>{
        console.log(`Server started on port: ${port}`);
    })
}

if (!process.env.VERCEL) {
    startServer();
}

export default app;