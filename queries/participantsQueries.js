const db = require('../db/dbConfig.js');

const getAllParticipants = async () => {
    try {
        console.log("Executing query to fetch all Participants");
        const allParticipants = await db.any("SELECT * FROM participants");
        console.log("Query result:", allParticipants);
        return allParticipants
    } catch(err) {
        console.error('Error fetching all Participants')
        return err
    }
};

const getOneParticipant = async (id) => {
    try {
        const oneParticipant = await db.one("SELECT * FROM Participants WHERE id=$1", id)
        return oneParticipant
    } catch(err) {
        console.error('Error fetching one Participants')
        return err
    }
};

const createParticipant = async (participant) => {
    try {
        const createdParticipant = await db.one("INSERT INTO participants (video_session_id, participant_id, participant_name, join_time, leave_time, role, audio_status, video_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [participant.video_session_id, participant.participant_id, participant.participant_name, participant.join_time, participant.leave_time, participant.role, participant.audio_status, participant.video_status])
        return createdParticipant
    }catch(err) {
        console.error('Error fetching creating Participants')
        return err
    }
};

const deleteParticipant = async (id) => {
    try {
        const deletedParticipant = await db.one("DELETE FROM participants WHERE id=$1 RETURNING *", id)
        return deletedParticipant
    }catch(err) {
        console.error('Error deleting all Participants')
        return err
    }
};

const updateParticipant = async (id, participant) => {
    try {
        const { video_session_id, participant_id, participant_name, join_time, leave_time, role, audio_status, video_status } = participant;
        const updatedParticipant = await db.one("UPDATE Participants SET video_session_id=$1, participant_id=$2, participant_name=$3, join_time=$4, leave_time=$5, role=$6, audio_status=$7, video_status=$8, WHERE id=$9, RETURNING *", [video_session_id, participant_id, participant_name, join_time, leave_time, role, audio_status, video_status, id]
        );
        return updatedParticipant
    }catch(err) {
        console.error('Error updating all Participants')
        return err
    }
};


    module.exports = {
        getAllParticipants,
        getOneParticipant,
        createParticipant,
        deleteParticipant,
        updateParticipant
    }
