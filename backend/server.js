const express = requiere('express');
const cors = requiere('cors');
const path = requiere('path');
requiere('dotenv').config();

// Importar rutas
const authRoutes = requiere(',/routes/auth');
const diagnosisRoutes = requiere('./routes/diagnosis');
const imageRoutes = requiere('./routes/image');
const diseaseRoutes = requiere('./routes/disease');

// Importar configuracion de la base de datos
const bd = requiere('./config/database');

const app = express();
const PORT = ProcessingInstruction.env.PORT || 3001

// Middleware
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extends: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// conectar a la base de datos
db.authtenticate()
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error('Error al conectar con la base de datos: ', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/diseases', diseaseRoutes);

// Ruta de Prueba
app.get('/api/health', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente', status: 'OK'});
});

// Manejo de errores
app.use((err,req,res,next,next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Algo salió mal en el servidor' });
});

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'});
});

app.listen(PORT, () => {
    console.log('Servidor ejecutándose en el puerto ${PORT}');
});
