const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
    origin: [
        'http://localhost',
        'http://localhost:8100', 
        'https://proyecto-web-movil-tawny.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permite peticiones de control
    allowedHeaders: ['Content-Type', 'Authorization', 'authorization'] // Permite explícitamente el token
}));



app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const JWT_SECRET = "MiPalabraSecretaSuperSecreta123*";


const pool = new Pool({
    connectionString: "postgresql://huellas_seguras_user:H6M0RUtQCwEskc2Pu8t8ehh8jFujLRDg@dpg-d8idugq8qa3s73ebk09g-a.oregon-postgres.render.com/huellas_seguras",
    ssl: {
        rejectUnauthorized: false
    }
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos de Render:', err);
    } else {
        console.log('✅ Conexión exitosa a PostgreSQL en Render');
    }
});

// verificar si es un token válido
const verificarToken = (req, res, next) => {
    // 1. Buscamos el header tolerando mayúsculas y minúsculas
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader) {
        return res.status(403).json({ status: "error", message: "No se proporcionó la cabecera Authorization" });
    }

    // 2. Extraemos el token de forma ultra segura soportando formatos con o sin 'Bearer'
    let token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    // 3. Limpiamos comillas fantasmas que Vercel/Navegadores a veces inyectan
    if (token) {
        token = token.replace(/"/g, '').trim();
    }

    if (!token || token === 'null' || token === 'undefined') {
        return res.status(403).json({ status: "error", message: "Token de acceso vacío o inválido string" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        // 🚨 ESTE LOG NOS VA A DECIR LA VERDAD EN EL PANEL DE RENDER:
        console.error("❌ ERROR REAL DE JWT EN PRODUCCIÓN:", err.message);
        
        return res.status(403).json({ 
            status: "error", 
            message: "Token inválido o expirado",
            detalle_servidor: err.message // Lo mandamos al frontend para verlo rápido
        });
    }
};

const verificarTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No autorizado. Falta el token de acceso.' });
    }

    jwt.verify(token, "MiPalabraSecretaSuperSecreta123*", (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o vencido.' });
        }
        req.usuario = user; // Guarda el id y rol descifrados del token
        next();
    });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

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
app.get('/animales/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM reportes WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Error");
    }
});
app.get('/animales/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Hacemos el JOIN para traer el nombre del usuario (reportado_por)
        const query = `
            SELECT r.*, u.username AS reportado_por 
            FROM reportes r
            INNER JOIN usuarios u ON r.usuario_id = u.id
            WHERE r.id = $1
        `;
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No encontrado" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

app.post('/reportar', verificarToken, async (req, res) => {
    const { tipo, estado, descripcion, photoUrl, location } = req.body;
    
    // El middleware 'verificarToken' guarda el id del token decodificado en req.usuario
    const usuario_id = req.usuario.id; 

    // 1. Validaciones en el backend (Seguridad OWASP)
    if (!tipo || !estado || !descripcion || !photoUrl || !location || !location.lat || !location.lng) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, incluyendo la georreferenciación.' });
    }

    try {
        // 2. Consulta Parametrizada contra Inyección SQL
        const query = `
            INSERT INTO reportes (usuario_id, tipo_animal, estado, descripcion, latitud, longitud, foto_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const values = [
            usuario_id,
            tipo,
            estado,
            descripcion,
            location.lat,
            location.lng,
            photoUrl
        ];

        const result = await pool.query(query, values);

        // 3. Respuesta exitosa (201 Created)
        res.status(201).json({
            message: 'Reporte registrado exitosamente',
            reporte: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Error al guardar el reporte en PostgreSQL:', error);
        res.status(500).json({ error: 'Error interno del servidor al procesar el reporte' });
    }
});


app.get('/animales', async (req, res) => {
    try {
        const query = `
            SELECT 
                r.id,
                r.tipo_animal,
                r.estado,
                r.descripcion,
                r.foto_url,
                r.latitud,
                r.longitud,
                r.created_at,
                u.username AS reportado_por, 
                u.email AS correo_contacto 
            FROM reportes r
            INNER JOIN usuarios u ON r.usuario_id = u.id
            ORDER BY r.created_at DESC;
        `;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('❌ Error al obtener la lista de animales:', error);
        res.status(500).json({ error: 'Error interno del servidor al cargar los animales' });
    }
});

// NUEVA RUTA: Obtener solo los reportes creados por el usuario autenticado
app.get('/api/reportes/mis-reportes', async (req, res) => {
    try {
        // 1. Extraer el token de la cabecera Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No autorizado. Falta el token.' });
        }

        // 2. Verificar el token JWT usando tu palabra secreta
        const jwt = require('jsonwebtoken');
        jwt.verify(token, "MiPalabraSecretaSuperSecreta123*", async (err, usuarioDecodificado) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido o expirado.' });
            }

            // Obtenemos el id del usuario que viene dentro del token
            const usuarioId = usuarioDecodificado.id; 

            // 3. Consulta SQL usando TUS columnas reales filtrando por usuario_id
            const query = `
                SELECT 
                    r.id,
                    r.tipo_animal AS titulo, -- Usamos alias para que React lo entienda de inmediato
                    r.descripcion,
                    to_char(r.created_at, 'DD-MM-YYYY') AS fecha, -- Formateamos la fecha directamente
                    r.latitud || ', ' || r.longitud AS ubicacion, -- Concatenamos coordenadas como ubicación
                    r.estado,
                    r.foto_url AS imagen -- Alias para tu columna real foto_url
                FROM reportes r
                WHERE r.usuario_id = $1
                ORDER BY r.created_at DESC;
            `;

            const result = await pool.query(query, [usuarioId]);
            
            // 4. Devolvemos el arreglo de filas
            res.json(result.rows);
        });

    } catch (error) {
        console.error('❌ Error al obtener mis reportes:', error);
        res.status(500).json({ error: 'Error interno del servidor al cargar tus reportes' });
    }
});
// --- PASO 1: AÑADIR ESTA RUTA DE BORRADO ---

app.delete('/api/reportes/:id', verificarToken, async (req, res) => {
    // 1. Verificamos que el usuario logueado sea admin
    // Usamos 'req.usuario.rol' porque así lo definimos al crear el token en el login
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ 
            status: "error", 
            message: "Acceso denegado: Se requieren permisos de Administrador." 
        });
    }

    try {
        const { id } = req.params;
        // 2. Ejecutamos el borrado en la base de datos
        const result = await pool.query('DELETE FROM reportes WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "Reporte no encontrado" });
        }

        res.status(200).json({ status: "success", message: "Reporte eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar reporte:", err.message);
        res.status(500).json({ status: "error", message: "Error al eliminar el reporte" });
    }
});

app.get('/api/usuarios/perfil', verificarTokenMiddleware, async (req, res) => {
    try {
        const query = `
            SELECT id, username, email, rut, comuna, region, rol 
            FROM usuarios 
            WHERE id = $1;
        `;
        const result = await pool.query(query, [req.usuario.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('❌ Error al obtener el perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el perfil' });
    }
});

app.put('/api/usuarios/actualizar', verificarTokenMiddleware, async (req, res) => {
    const { username, comuna, region } = req.body;
    try {
        const query = `
            UPDATE usuarios 
            SET username = $1, comuna = $2, region = $3 
            WHERE id = $4;
        `;
        await pool.query(query, [username, comuna, region, req.usuario.id]);
        res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        console.error('❌ Error al actualizar el perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar datos' });
    }
});

app.get('/api/usuarios', verificarTokenMiddleware, async (req, res) => {
    try {
        if (req.usuario.rol !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
        }
        
        const query = `
            SELECT id, username, email, comuna, region, rol 
            FROM usuarios 
            ORDER BY id ASC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('❌ Error al listar usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor al listar usuarios' });
    }
});

app.delete('/api/usuarios/:id', verificarTokenMiddleware, async (req, res) => {
    try {
        if (req.usuario.rol !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado. No tienes permisos para eliminar.' });
        }
        
        const idAEliminar = req.params.id;
        const query = `
            DELETE FROM usuarios 
            WHERE id = $1;
        `;
        await pool.query(query, [idAEliminar]);
        res.json({ message: 'Usuario eliminado correctamente del sistema' });
    } catch (error) {
        console.error('❌ Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor al eliminar usuario' });
    }
});