const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getAllUsersFromDb();

        res.json(users);
    },

    getUserById: async (req, res) => {
        const user = await req.user;
        res.json(user);
    },

    createUser: async (req, res) => {
        await userService.createNewUser(JSON.stringify(req.body));

        res.json('User has been created');
    },

    removeUserById: async (req, res) => {
        const { userId } = req.params;

        await userService.removeUser(userId);

        res.json('User has been removed!');
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;

        await userService.updateUser(JSON.stringify(req.body), userId);

        res.json('User has been updated');
    }
};
