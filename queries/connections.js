const db = require('../db/dbConfig.js');

const getAllConnections = async () => {
    try {
        console.log("Executing query fetching all  connections");
        const allConnections = await db.any("SELECT * FROM connections");
        console.log("Query request:", allConnections)
        return allConnections
    } catch(err) {
        console.error("Error fetching all  connections");
        return err
    }
};

const getOneConnection = async (id) => {
    try {
        const oneConnection = await db.one("SELECT * FROM connections WHERE id=$1", id);
        return oneConnection
    } catch(err) {
        return err
    }
};

const createConnection = async (connection) => {
    try {
        const createdConnection = await db.one("INSERT INTO connections (user1_id, user2_id, connection_on) VALUES ($1, $2, $3) RETURNING *", [connection.user1_id, connection.user2_id, connection.connection_on]);
        return createdConnection;
    } catch(err) {
        return err
    }
};

const deleteConnection = async (id) => {
     try {
        const deletedConnection = await db.one("DELETE FROM connections WHERE id=$1 RETURNING *", id);
        return deletedConnection
     } catch(err) {
        return err
     }
};

const updateConnection = async (id, connections) => {
     try {
        const { user1_id, user2_id, connection_on } = connections;
        const updatedConnection = await db.one("UPDATE connections SET user1_id=$1, user2_id=$2, connections_on=$3 WHERE id=$4 RETURNING *", [user1_id, user2_id, connection_on, id]);
        return updatedConnection;
     } catch(err) {
        return err
     }
};


module.exports = {
    getAllConnections,
    getOneConnection,
    createConnection,
    deleteConnection,
    updateConnection
}