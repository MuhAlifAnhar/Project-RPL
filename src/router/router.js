const express = require('express');
const router = express.Router();
const basoController = require('../controller/basoController');
const auth = require('../middleware/auth');

router.get('/api', (req, res) => {
    res.send('Selamat datang di API SMK Telkom Makassar kota');
})

// 2. parameter routing
router.get('/data/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Anda sedang melihat data ${id}`);
})

// 3. objek reqq dan res

// 4. implementasi get
router.get('/', auth, basoController.tampilData);

// 5. implementasi post
router.post('/', auth, basoController.createData);

// 6. implementasi put
router.put('/:id', auth, basoController.updateData);

// 7. implementasi delet
router.delete('/:id', auth, basoController.deleteData);

// 8. implementasi get by id
router.get('/:id', basoController.getById);

module.exports = router