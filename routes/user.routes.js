const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.isUserAlreadyExist, userController.getUserById);

router.post('/create', userMiddleware.canUserRegister, userController.createUser);

router.delete('/delete', userMiddleware.isUserAlreadyExist, userController.removeUserById);

router.put('/update', userMiddleware.isUserAlreadyExist, userController.updateUserById);

module.exports = router;
