import institutionsQueries from "../db/queries/institutionsQueries.js";

//select
async function getAllInstitutions(req, res) {
    try {
        const [rows] = await institutionsQueries.getAllInstitutions();
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving institutions",
            error: error.message || "Internal Server Error",
        });
    }

}
//select
async function getInstitutionById(req, res) {
    const id = req.params.id;
    try {
        const [rows] = await institutionsQueries.getInstitutionById(id);
        if (rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Institution not found",
                error: error.message || "Internal Server Error",
            });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving institution",
            error: error.message || "Internal Server Error",
        });
    }
}

//insert
async function insertInstitution(req, res) {
    const institution = req.body;
    try {
        const [rows] = await institutionsQueries.insertInstitution(institution);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error inserting institution",
            error: error.message || "Internal Server Error",
        });
    }
}
//update
async function updateInstitution( req, res) {
    const id = req.params.id;
    const updates = req.body;
    try {
        const [rows] = await institutionsQueries.updateInstitution(id, updates);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating institution",
            error: error.message || "Internal Server Error",
        });
    }
}
//delete
async function deleteInstitution(req, res) {
    const id = req.params.id;
    try {
        const [rows] = await institutionsQueries.deleteInstitution(id);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting institution",
            error: error.message || "Internal Server Error",
        });
    }
}

export {
    getAllInstitutions,
    getInstitutionById,
    insertInstitution,
    updateInstitution,
    deleteInstitution
};