const users = [];

const addUser = ({ userId, roomId, hostFlag }) => {
    const user = { userId, roomId, hostFlag };
    users.push(user);
}

const removeUser = (userId) => {
    const index = users.findIndex((user) => user.id === userId);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (userId) => users.find((user) => user.id === userId);

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);