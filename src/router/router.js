const express = require('express');
const router = express.Router();
const basoController = require('../controller/basoController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.get('/api', (req, res) => {
    res.send('Selamat datang di API SMK Telkom Makassar kota');
})

// 2. parameter routing
router.get('/data/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Anda sedang melihat data ${id}`);
})

// 3. objek reqq dan res

// 4. implementasi get DAN ROLE USER
router.get('/', auth, basoController.tampilData);

// 5. implementasi post DAN ROLE ADMIN
router.post('/', auth, checkRole('admin'), basoController.createData);

// 6. implementasi put DAN ROLE ADMIN
router.put('/:id', auth, checkRole('admin'), basoController.updateData);

// 7. implementasi delet DAN ROLE ADMIN
router.delete('/:id', auth, checkRole('admin'), basoController.deleteData);

// 8. implementasi get by id DAN ROLE USER 
router.get('/:id', basoController.getById);

module.exports = router