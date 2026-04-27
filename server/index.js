const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Importante para que Ionic pueda comunicarse con el server

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'miproyectodb',
    password: 'admin123',
    port: 5432,
});

// Ruta para Registrar
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la clave
    try {
        await pool.query('INSERT INTO usuarios (email, password) VALUES ($1, $2)', [email, hashedPassword]);
        res.status(201).send("Usuario creado");
    } catch (err) {
        res.status(500).send("Error al registrar");
    }
});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    
    try {
        // se busca el usuario
        const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            
            //se valida la clave
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                res.status(200).json({message: "Login exitoso", user: {email: user.email} });
            } else {
                res.status(401).send("Contraseña incorrecta");
            }

        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el server");
    }
});


app.get('/', (req, res) => {
    res.send('🚀 El servidor de mi proyecto está vivo y funcionando');
});

app.listen(3000, () => console.log("Server corriendo en puerto 3000"));