const util = require('util');
const fs = require('fs');
const path = require('path');

const { constants } = require('../constants');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const pathToDb = path.join(constants.PATH_TO_DB);

async function getAllUsersFromDb() {
    const users = await readFilePromise(pathToDb);

    return JSON.parse(users.toString());
}

async function createNewUser(user) {
    let users = await readFilePromise(pathToDb);
    users = JSON.parse(users.toString());
    user = JSON.parse(user);
    user.id = users.length + 1;

    users.push(user);

    await writeFilePromise(pathToDb, JSON.stringify(users));
}

async function removeUser(userId) {
    let users = await readFilePromise(pathToDb);
    users = JSON.parse(users.toString());

    const newUsers = users.filter((u) => u.id.toString() !== userId.toString());
    await writeFilePromise(pathToDb, JSON.stringify(newUsers));
}

async function updateUser(user, userId) {
    let users = await readFilePromise(pathToDb);
    users = JSON.parse(users.toString());
    user = JSON.parse(user);

    users.forEach((u) => {
        if (u.id.toString() === userId.toString()) {
            for (const k in u) {
                if (k !== 'id') {
                    u[k] = user[k];
                }
            }
        }
    });

    await writeFilePromise(pathToDb, JSON.stringify(users));
}

module.exports = {
    getAllUsersFromDb,
    createNewUser,
    removeUser,
    updateUser
};
