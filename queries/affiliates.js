const db = require('../db/dbConfig.js');

const getAllAffiliates = async () => {
    try {
        console.log("Executing query to fetch all affiliates");
        const allAffiliates = await db.any("SELECT * FROM affiliates");
        console.log("Query result:", allAffiliates);
        return allAffiliates
    } catch(err) {
        console.error('Error fetching all affiliates')
        return err
    }
};

const getOneAffiliate = async (id) => {
    try {
        const oneAffiliate = await db.one("SELECT * FROM affiliates WHERE id=$1", id)
        return oneAffiliate
    }catch(err) {
        return err
    }
};

const createAffiliate = async (affiliate) => {
    try {
        const createdAffiliate = await db.one("INSERT INTO affiliates (name, service_or_product, discount_details, contact_info) VALUES ($1, $2, $3, $4) RETURNING *", [affiliate.name, affiliate.service_or_product, affiliate.discount_details, affiliate.contact_info])
        return createdAffiliate
    }catch(err) {
        return err
    }
};

const deleteAffiliate = async (id) => {
    try {
        const deletedAffiliate = await db.one("DELETE FROM affiliates WHERE id=$1 RETURNING *", id)
        return deletedAffiliate
    }catch(err) {
        return err
    }
};

const updateAffiliate = async (id, affiliate) => {
    try {
        const { name, service_or_product, discount_details, contact_info } = affiliate;
        const updatedAffiliate = await db.one("UPDATE affiliates SET name=$1, service_or_product=$2, discount_details=$3, contact_info=$4, WHERE id=$5, RETURNING *", [name, service_or_product, discount_details, contact_info, id]
        );
        return updatedAffiliate
    }catch(err) {
        return err
    }
};


    module.exports = {
        getAllAffiliates,
        getOneAffiliate,
        createAffiliate,
        deleteAffiliate,
        updateAffiliate
    }
