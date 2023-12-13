const db = require("../db/dbConfig");

const getAllErrorLogs = async () => {
    try {
        console.log("Executing query to fetch all affiliates")
        const allErrors = await db.any("SELECT * FROM error_logs")
        console.log("Query results", allErrors)
        return allErrors
    }catch(err) {
        console.error("Failed to fetch Errors.")
        return err
    }
};

const getOneErrorLog =async (id) => {
    try {
        const oneError = await db.one("SELECT * FROM error_logs")
    }catch(err) {
        return err
    }
};



module.exports = {
    getAllErrorLogs,
    getOneErrorLog
}
    