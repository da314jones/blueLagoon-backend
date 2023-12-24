const db = require("../db/dbConfig");

const getAllErrorLogs = async () => {
    try {
        console.log("Executing query to fetch all affiliates")
        const allErrorsLogs = await db.any("SELECT * FROM error_logs")
        console.log("Query results", allErrorsLogs)
        return allErrorsLogs
    }catch(err) {
        console.error("Failed to fetch Errors.")
        return err
    }
};

const getOneErrorLog = async (id) => {
    try {
        const oneErrorLog = await db.one("SELECT * FROM error_logs WHERE id=$1", id)
    }catch(err) {
        return err
    }
};



module.exports = {
    getAllErrorLogs,
    getOneErrorLog
}
    