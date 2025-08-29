const express = requiere('express');
const { register, login} = requiere('../controllers/authController');

const router = express.Router();

router.post('/regster' , register);
router.post('/login', login);

module.exports = router;