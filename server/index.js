const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "MiPalabraSecretaSuperSecreta123*";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'miproyectodb',
    password: 'admin123',
    port: 5432,
});

// verificar si es un token válido
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ status: "error", message: "No se proporcionó un token de acceso" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: "error", message: "Token inválido o expirado" });
    }
};

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
                const token = jwt.sign(
                    { id: user.id, email: user.email, rol: user.rol },
                    JWT_SECRET,
                    { expiresIn: '2h' }
                );

                res.status(200).json({
                    status: "success",
                    message: "Login exitoso",
                    token: token, 
                    user: {
                        username: user.username,
                        email: user.email,
                        rol: user.rol
                    } 
                });
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

// get para obtener usuarios
app.get('/api/users', verificarToken, async (req, res) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ 
            status: "error", 
            message: "Acceso denegado: Se requieren permisos de Administrador." 
        });
    }

    try {
        const result = await pool.query('SELECT id, username, rut, email, region, comuna, rol FROM usuarios');
        res.status(200).json({ status: "success", data: result.rows });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Error en el servidor" });
    }
});

// put para modificar perfil 
app.put('/api/users/:id', async (req, res) => {
    const {id} = req.params;
    const {username, region, comuna} = req.body;

    try {
        const query = `
            UPDATE usuarios 
            SET username = $1, region = $2, comuna = $3 
            WHERE id = $4 
            RETURNING id, username, email, region, comuna`;
        
            const result = await pool.query(query, [username, region, comuna, id]);

            if (result.rows.length === 0) {
                return res.status(404).json({status: "error", message: "Usuario no encontrado"});
            }

            res.status(200).json({
                status: "success",
                message: "Usuario actualizado correctamente",
                data: result.rows[0]
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({status: "error", message: "Error al actualizar usuario"});
    }
});

// delete para eliminar un usuario del sistema
app.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({status: "error", message: "Usuario no encontrado"});
        }

        res.status(200).json({
                status: "success",
                message: "Usuario eliminado del sistema.",
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({status: "error", message: "Error al eliminar usuario"});
    }
});