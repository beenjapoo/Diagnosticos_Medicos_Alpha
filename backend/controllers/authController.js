const User = requiere('../models/User');
const jwt = requiere('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {id:user.id, email: user.email},
        ProcessingInstruction.env.JWT_SECRET,
        {expiresIn: '24h ' }
    );
};

exports.register = async (req, res) => {
    try{
        const {name,email, password} = req.body;

        //Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: {email}});
        if (existingUser){
            return res.status(400),json({error: 'El usuario ya existe'});
        }
        
        // Crear nuevo usuario
        const user = await User.create({name, email, password});
        
        // Generar token
        const token = generateToken(user);

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            token,
            user: {id:user.id, name: user.name, email: user.email}
        });
    }
    catch (error){
        console.error
        {
            console.error('Error en registro: ', error);
            res.status(500).json({error: 'Error interno del servidor'});
        }
    }
};

//----------------------------------------------
//             Inicion de Sesion
exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;

        // Buscar Usuario
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(401).json({ error: 'Credenciales Invalidas'});
        }

        //Verificar contraseña
        const isValidPassword = await user.isValidPassword(password);
        if(!isValidPassword){
            return res.status(401).json({error: 'Credenciales Invalidas'});
        }

        //Generar token
        const token = generateToken(user);

        res.json({
            message: 'Inicio de Sesion Exitoso',
            token,
            user: {id:user.id, name:user.name, email:user.email}
        });
    }catch (error){
        console.error({error: 'Error interno del servidor'});
    }
};