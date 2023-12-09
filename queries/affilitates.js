const db = require('../db/dbConfig.js');

const getAllAffiliates = async () => {
    try {
        const allAffiliates = await db.any("SELECT * FROM affiliates");
        return allAffiliates
    } catch(err) {
        return err
    }
};

const getOneAffiliate = async () => {
    try {
        const oneAffiliate = await db.one("SELECT * FROM affiliates WHERE   id=$1", id)
        return oneAffiliate
    }catch(err) {
        return err
    }
};

const createAffiliate = async () => {
    try {
        const createdAffiliate = await db.one("INSERT INTO affiliate (name, service_or_product, discount_details, contact_info) VALUES ($1, $2, $3, $4) RETURNING *", [affiliates.name, affiliates.service_or_product, affiliates.discount_details, affiliates.contact_info])
        return createdAffiliate
    }catch(err) {
        return err
    }
};

const deleteAffiliate = async () => {
    try {
        const deletedAffiliate = await db.one("DELETE from affiliate WHERE id = $1 RETURNING *", id)
        return deletedAffiliate
    }catch(err) {
        return err
    }
};

const updateAffiliate = async () => {
    try {
        const { name, service_or_product, discount_details, contact_info } = affiliate;
        const updatedAffiliate = await db.one("UPDATE affiliate SET name=$1, service_or_product=$2, discount_details=$3, contact_info=$4 WHERE id=$5 RETURNING *", [name, service_or_product, discount_details, contact_info]
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
