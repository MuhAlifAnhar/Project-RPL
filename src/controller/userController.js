const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'username dan password wajib diisi'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await db.execute(query, [username, hashedPassword]);

        return res.status(201).json({
            status: 'success',
            message: 'registrasi berhasil'
        });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // validasi inputan mu di sini
        if (!username || !password) {
            return res.status(400).json({
                message: 'username dan password wajib diisi'
            });
        }

        // cek username mu di sini
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.query(query, [username]);

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'username atau password salah'
            });
        }

        const user = rows[0];

        // bandingkan password mu di sini dengan password di database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'username atau password salah'
            });
        }

        // buat token mu untuk user
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'login berhasil',
            token: token
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};
