const db = require('../db/dbConfig.js');

const getAllEvents = async () => {
    try {
        console.log("Executing query to fetch all Errors");
        const allEvents = await db.any("SELECT * FROM events")
        console.log("Query result:", allEvents);
        return allEvents
    }catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneEvent = async (id) => {
    try {
        const oneEvent = await db.one("SELECT * FROM events WHERE id=$1", id);
        return oneEvent
    }catch(err) {
        return err
    }
};

const createEvent = async (event) => {
    try {
        const { title, description, location, date, time, capacity, organizer, category, contact_email, sign_up_link } = event
        const createdEvent = await db.one("INSERT INTO events (title, description, location, date, time, capacity, organizer, category, contact_email, sign_up_link) VALUES ($1, $2, $3, #4, $5, $6, $7, $8, $9, $10) RETURNING *", [event.title, event.description, event.location, event.date, event.time, event.capacity, event.organizer, event.category, event.contact_email, event.sign_up_link])
        return createdEvent
    }catch(err) {
        return err
    }
};

const deleteEvent = async (id) => {
    try {
    const deletedEvent = await db.one("DELETE FROM events WHERE id=$1 RETURNING *", id)
    return deletedEvent
    }catch(err) {
        return err
    }
};

const updateEvent = async (id, event) => {
    try {
        const { title, description, location, date, time, capacity, organizer, category, contact_email, sign_up_link } = event
        const updatedEvent = await db.one("UPDATE events set title=$1, description=$2, location=$3, date=$4, time=$5, capacity=$6, organizer=$7, category=$8, contact_email=$9, sign_up_link=$10 WHERE id=$11 RETURNING *", [title, description, location, date, time, capacity, organizer, category, contact_email, sign_up_link, id]);
        return updatedEvent
    }catch(err) {
        return err
    }
};


module.exports = {
    getAllEvents,
    getOneEvent,
    createEvent,
    deleteEvent,
    updateEvent
}

