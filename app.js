const express = require('express');


const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const consultasRoutes = require('./routes/consultas.routes');
const path = require('path')

const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: '*', // Aquí agregas el origen de tu frontend
    methods: ['GET', 'POST' ,'PUT' , 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  };

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de autenticación
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/consultas', consultasRoutes);


// Iniciar servidor
app.get('/', (req,res)=>{
    res.status(200).json({message: 'home'})
  })
 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
