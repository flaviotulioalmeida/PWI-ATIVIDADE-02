const express = require('express');
const {
    listTechnologies,
    createTechnology,
    updateTechnology,
    markTechnologyAsStudied,
    deleteTechnology
} = require('../controllers/technologyController');
const checkExistsUserAccount = require('../middlewares/checkExistsUserAccount');

const router = express.Router();

router.get('/', checkExistsUserAccount, listTechnologies);
router.post('/', checkExistsUserAccount, createTechnology);
router.put('/:id', checkExistsUserAccount, updateTechnology);
router.patch('/:id/studied', checkExistsUserAccount, markTechnologyAsStudied);
router.delete('/:id', checkExistsUserAccount, deleteTechnology);

module.exports = router;
