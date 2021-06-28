const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getAllUsersFromDb();

        res.json(users);
    },

    getUserById: async (req, res) => {
        const { user } = await req;
        res.json(user);
    },

    createUser: async (req, res) => {
        await userService.createNewUser(JSON.stringify(req.body));

        res.json('User has been created');
    },

    removeUserById: async (req, res) => {
        const { id } = req.user;
        await userService.removeUser(id);

        res.json('User has been removed!');
    },

    updateUserById: async (req, res) => {
        await userService.updateUser(JSON.stringify(req.body));

        res.json('User has been updated');
    }
};
