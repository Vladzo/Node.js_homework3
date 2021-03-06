const { userService } = require('../services');
const { ERROR_USER_NOT_FOUND } = require('../constants');
const { ERROR_USER_ALREADY_EXIST } = require('../constants');

module.exports = {
    isUserAlreadyExist: async (req, res, next) => {
        const users = await userService.getAllUsersFromDb();
        let idUser = req.body.id;

        if (req.method === 'GET') {
            idUser = req.params.userId;
        }
        const user = users.find((u) => u.id.toString() === idUser.toString());

        if (!user) {
            throw new Error(ERROR_USER_NOT_FOUND);
        }

        req.user = user;

        next();
    },

    canUserRegister: async (req, res, next) => {
        const users = await userService.getAllUsersFromDb();
        const { email } = req.body;

        const user = users.find((u) => u.email === email);

        if (user) {
            throw new Error(ERROR_USER_ALREADY_EXIST);
        }

        next();
    }
};
