const express = require('express');
const userRoutes = require('./routes/userRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const prisma = require('./prismaClient');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});
app.use('/users', userRoutes);
app.use('/technologies', technologyRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
