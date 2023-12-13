const db = require('../db/dbConfig.js');

const getAllLegalDocuments = async () => {
    try {
        console.log("Executing query to fetch all Legal Documents");
        const allLegalDocuments = await db.any("SELECT * FROM legal_documents");
        return allLegalDocuments;
        console.log("Query result:", allLegalDocuments)
    }catch(err) {
        console.error("Failed to fetch all Legal Documents")
        return err
    }
};

const getOneLegalDocument = async (id) => {
    try {
        const oneLegalDocument =await db.one("SELECT * FROM legal_documents");
        return oneLegalDocument;
    }catch(err) {
        return err
    }
};

const createLegalDocument = async (legalDocument) => {
    try {
        const createdLegalDocument = await db.one("INSERT INTO legal_documents (title, document_type, context, effective_date) VALUES ($1, $2, $3, $4) RETURNING *" [legalDocument.title, legalDocument.document_type, legalDocument.content, legalDocument.effective_date]);
        return createLegalDocument;
    }catch(err) {
        return err
    }
};

const deleteLegalDocument = async (id) => {
    try {
        const deletedLegalDocument =await db.one("DELETE FROM legal_documents WHERE id=$1", id);
        return deletedLegalDocument;
    }catch(err) {
        return err
    }
};

const updateLegalDocument = async (id, legalDocument) => {
    try {
        const { title, document_type, content, effective_date } = legalDocument;
        const uppdatedLegalDocument = await db.one("UPDATE legal_documents SET title=$1, document_type=$@, content=$3, effective_sate=$4 WHERE id=$5 RETURNING *", id);
        return updateLegalDocument
    }catch(err) {
        return err
    }
};

module.exports = {
    getAllLegalDocuments,
    getOneLegalDocument,
    createLegalDocument,
    deleteLegalDocument,
    updateLegalDocument
}