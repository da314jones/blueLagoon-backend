const db = require('../db/dbConfig.js');

const getAllReports = async () => {
    try {
        console.log("Executing query fetching all");
        const allReports = await db.any("SELECT * FROM");
        console.log("Query results:", allReports);
        return allReports
    } catch(err) {
        console.error("Failed fetch all Reports")
        return err
    }
};

const getOneReport = async (id) => {
    try {
        const oneReport = await db.one("SELECT * FROM reports WHERE id=$1 RETURNING *", id);
        return oneReport
    } catch(err) {
        return err
    }
};

const createReport = async (report) => {
    try {
        const createdReport = await db.one("INSERT INTO reports (reported_by_user_id, reported_user_id, content, report_date) VALUES ($1, $2, $3, $4) RETURNING *", [report.reported_by_user_id, report.reported_user_id, report.content, report.report_date]);
        return createdReport
    } catch(err) {
        return err
    }
};

const deleteReport = async (id) => {
    try {
        const deletedReport = await db.one("DELETE FROM reports WHERE id=$1 RETURNING *", id);
        return deletedReport;
    }  catch(err) {
        return err
    }
};

const updateReport = async (id, report) => {
    try {
        const { reported_by_user_id, reported_user_id, content, report_date } = report
        const updatedReport = await db.one("UPDATE reports SET reported_by_user_id=$1, reported_user_id=$2, content=$3, report_date=$4 WHERE id=$5 RETURNING *", [reported_by_user_id, reported_user_id, content, report_date, id])
    } catch(err) {
        return err
    }
};


module.children.exports = {
    getAllReports,
    getOneReport,
    createReport,
    deleteReport,
    updateReport
}