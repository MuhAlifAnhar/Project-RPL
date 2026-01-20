const db = require('../config/db');

const tampilData = async (req, res) => {
    try{
        const query = 'SELECT * FROM product';
        const [rows] = await db.query(query);
        await res.status(200).json({
            message: 'berhasil get data',
            data: rows
        })
    } catch(error) {
        throw error
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM product WHERE id = ?';
        const [rows] = await db.query(query, id);
        await res.status(200).json({
            message: 'berhasil get data',
            data: rows
        })
    } catch (error) {
        throw error
    }
}

const createData = async (req, res) => {
    try {
        const data = {
            nama: req.body.nama,
            harga: req.body.harga
        }

        const query = 'INSERT INTO product (nama, harga) VALUE (?, ?)';
        await db.execute(query, [data.nama, data.harga]);
        return res.status(201).json({
            message: 'berhasil simpan data di database'
        })
    } catch (error) {
        throw error
    }

}

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            nama: req.body.nama,
            harga: req.body.harga
        }
        const query = 'UPDATE product SET nama = ?, harga = ? WHERE id = ?';
        await db.execute(query, [data.nama, data.harga, id]);
        return res.status(200).json({
            message: 'berhasil update data'
        })
    } catch (error) {
        throw error
    }
}

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM product WHERE id = ?';
        await db.query(query, id);
        return res.status(201).json({
            message: 'berhasil delete data'
        })
    } catch (error) {
        throw error
    }
};

module.exports = {
    tampilData,
    createData,
    updateData,
    deleteData,
    getById
}