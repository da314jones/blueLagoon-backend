const db = require('../db/dbConfig.js');

const getAllMessages = async () => {
    try {
        const allMessages = await db.any("SELECT * FROM chat_messages");
        return allMessages
    } catch(err) {
        throw err;
    }
};

const getOneMessage = async (id) => {
    try {
        const oneMessage =  await db.one("SELECT * FROM chat_messages WHERE message_id=$1", id);
        return oneMessage
    } catch(err) {
        throw err;
    }
};

const createMessage = async (message) => {
    try {
        const createdMessage = await db.one("INSERT INTO chat_messages (session_id, user_id, message, timestamp) VALUES ($1, $2, $3, $4) RETURNING *", 
        [message.session_id, message.user_id, message.message, message.timestamp]);
        return createdMessage
    } catch(err) {
        throw err;
    }
};

const deleteMessage = async (id) => {
    try {
        const deletedMessage =  await db.one("DELETE FROM chat_messages WHERE message_id=$1 RETURNING *", id);
        return deletedMessage
    } catch(err) {
        throw err;
    }
};

const updateMessage = async (id, message) => {
    try {
        const updatedMessage = await db.one("UPDATE chat_messages SET session_id=$1, user_id=$2, message=$3, timestamp=$4 WHERE message_id=$5 RETURNING *", 
        [message.session_id, message.user_id, message.message, message.timestamp, id]);
        return updatedMessage
    } catch(err) {
        throw err;
    }
};

module.exports = {
    getAllMessages,
    getOneMessage,
    createMessage,
    deleteMessage,
    updateMessage
};
