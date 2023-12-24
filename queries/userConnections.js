const db = require('../db/dbConfig.js');

const getAllUserConnections = async () => {
    try {
        console.log("Executing query fetching all user connections");
        const allUserConnections = await db.one("SELECT * FROM user_connections");
        console.log("Query request:", allUserConnections)
    } catch(err) {
        console.error("Error fetching all user connections");
        return err
    }
};

const getOneUserConnection = async (id) => {
    try {
        const oneUserConnection = await db.one("SELECT * FROM user_connections WHERE id=$1", id);
        return oneUserConnection
    } catch(err) {
        return err
    }
};

const createUserConnection = async (userConnection) => {
    try {
        const createdUserConnection = await db.one("INSERT INTO user_connections (user1_id, user2_id, connection_on) VALUES ($1, $2, $3) RETURNING *", [userConnection.user1_id, userConnection.user2_id, userConnection.connection_on]);
        return createUserConnection;
    } catch(err) {
        return err
    }
};

const deleteUserConnection = async (id) => {
     try {
        const deletedUserConnections = await db.one("DELETE FROM user_connections WHERE id=$1 RETURNING *", id);
        return deletedUserConnections
     } catch(err) {
        return err
     }
};

const updateUserConnection = async (id, userConnections) => {
     try {
        const { user1_id, user2_id, connection_on } = userConnections;
        const updatedUserConnections = await db.one("UPDATE user_connections SET user1_id=$1, user2_id=$2, connections_on=$3 WHERE id=$4 RETURNING *", [user1_id, user2_id, connection_on, id]);
        return updateUserConnection;
     } catch(err) {
        return err
     }
};


module.exports = {
    getAllUserConnections,
    getOneUserConnection,
    createUserConnection,
    deleteUserConnection,
    updateUserConnection
}