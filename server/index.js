const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'miproyectodb',
    password: 'admin123',
    port: 5432,
});

// Ruta para Registrar
app.post('/register', async (req, res) => {
    const { username, rut, email, region, comuna, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO usuarios (username, rut, email, region, comuna, password) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`; 

        const values = [username, rut, email, region, comuna, hashedPassword];
        const result = await pool.query(query, values);
        
        console.log("Usuario registrado con éxito:", result.rows[0].email);
        res.status(201).json({message: "Usuario creado exitosamente", user: result.rows[0]});

    } catch (err) {
        console.error("Error detectado:", err.code);

        if (err.code === '23505') {
            return res.status(400).send("El RUT o el Email ya están registrados");
        } 
        
        return res.status(500).send("Error en el servidor al procesar el registro");
    }
});

// Ruta para Login
app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
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

app.listen(3000, () => console.log("✅ Servidor escuchando en http://localhost:3000"));