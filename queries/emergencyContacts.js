const db = require('../db/dbConfig.js');

const getAllEmergencyContacts = async () => {
    try {
        console.log("Executing query to fetch all emergency contacts");
        const allEmergencyContacts = await db.any("SELECT * FROM emergency_contacts");
        console.log("Query result:", allEmergencyContacts);
        return allEmergencyContacts;
    }catch(err) {
        console.error("Failed to fetch Emergency Contacts.");
        return err;
    }
};

const getOneEmergencyContact = async (id) => {
    try {
        const oneEmergencyContact = await db.one("SELECT* FROM emergency_contacts WHERE id=$1", id);
        return oneEmergencyContact
    }catch(err) {
        console.error("failed to fetch one emergency contact")
        return err;
    }
};

const createEmergencyContact = async (emergency_contacts) => {
    try {
        const createdEmergencyContacts = await db.one("INSERT INTO emergency_contacts (user_id, name, contact_info, description, location, emergency_contact) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [emergency_contacts.user_id, emergency_contacts.name, emergency_contacts.contact_info, emergency_contacts.description, emergency_contacts.location, emergency_contacts.emergency_contact]);
        return createEmergencyContact;
    }catch(err) {
        return err
    }
};

const deleteEmergencyContact = async (id) => {
    try {
        const deletedEmergencyContacts = await db.one("DELETE FROM emergency_contacts WHERE id=$1 RETURNING *", id);
        return deleteEmergencyContact;
    }catch(err) {
        return err
    }
};

const updateEmergencyContact = async (id, emergencyContact) => {
    try {
        const { user_id, name, contact_info, description, location, emergency_contact } = emergencyContact
        const updatedEmergencyContacts = await db.one("UPDATE emergency_contacts SET user_id=$1, name=$2, emergency_info=$3, description= $4, location=$5, emergency_contact=$6 WHERE id=$7", [user_id, name, contact_info, description, location, emergency_contact, id]);
        return updatedEmergencyContacts;
    }catch(err) {
        return err
    }
};


module.exports = {
    getAllEmergencyContacts,
    getOneEmergencyContact,
    createEmergencyContact,
    deleteEmergencyContact,
    updateEmergencyContact
}