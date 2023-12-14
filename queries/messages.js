const db = require('../db/dbConfig');

const getAllMessages = async () => {
    try {
        console.log('Executing query to fetch all messages');
        const allMessages = await db.any('SELECT * FROM chat_messages');
        console.log('Query results:', allMessages);
        return allMessages;
    } catch (err) {
        console.error('Error fetching all messages:', err);
        throw err; // Throw the error to be handled by the caller
    }
};


const getOneMessage = async (id) => {
    if (!Number.isInteger(id)) {
        throw new Error('Invalid ID');
    }

    try {
        const oneMessage = await db.one('SELECT * FROM chat_messages WHERE id = $1', id);
        return oneMessage;
    } catch (err) {
        console.error('Error fetching one message:', err);
        throw err;
    }
};


const createMessage = async (message) => {
    const { session_id, user_id, message_text, timestamp } = message;
    if (!session_id || !user_id || !message_text || !timestamp) {
        throw new Error('Missing required fields');
    }

    try {
        const createdMessage = await db.one('INSERT INTO chat_messages (session_id, user_id, message, timestamp) VALUES ($1, $2, $3, $4) RETURNING *', [session_id, user_id, message_text, timestamp]);
        return createdMessage;
    } catch (err) {
        console.error('Error creating message:', err);
        throw err;
    }
};


const deleteMessage = async (id) => {
    if (!Number.isInteger(id)) {
        throw new Error('Invalid ID');
    }

    try {
        const deletedMessage = await db.one('DELETE FROM chat_messages WHERE id=$1 RETURNING *', id);
        return deletedMessage;
    } catch (err) {
        console.error('Failed to delete message:', err);
        throw err;
    }
};


const updateMessage = async (id, message) => {
    const { session_id, user_id, message_text, timestamp } = updateData;
    if (!Number.isInteger(id) || !session_id || !user_id || !message_text || !timestamp) {
        throw new Error('Invalid input');
    }

    try {
        const { session_id, user_id, message_text, timestamp } = message
        const updatedMessage = await db.one('UPDATE chat_messages SET session_id = $1, user_id=$2, message=$3, timestamp=$4, WHERE id=$5, RETURNING *', [session_id, user_id, message_text, timestamp, id]);
        return updatedMessage;
    } catch (err) {
        console.error('Failed to update message:', err);
        throw err;
    }
};




module.exports = {
    getAllMessages,
    getOneMessage,
    createMessage,
    deleteMessage,
    updateMessage
}