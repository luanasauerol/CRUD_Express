const express = require('express');
const app = express(); 

app.use(express.json());

const routeUsers = require('./routes/routeUsers'); 

app.use('/api/users', routeUsers); 

app.use((req,res,next)=>{
    res.status(404).send('Erro 404, not found');
    next();
});

app.listen(3001, () => {
    console.log('Servidor em execução');
});