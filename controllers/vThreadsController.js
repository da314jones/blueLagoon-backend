const express = require("express");
const vchats = express.Router();
const { vthreadsValidationSchema } = require("../src/validations/checkVthreads");

const { getAllVthreads,
        getOneVthreads,
        createVthreads,
        deleteVthreads,
        updateVthreads
      } = require("../queries/vThreads.js")

vthreads.get("/",  async (req, res) => {
    console.log("Get /vthread endpoint hit");
    try {
        const allVthreads = await getAllVthreads();
        console.log('Response from getAllVthreads:', allVthreads);
        if (allVthreads[0]) {
            res.status(200).json({ success: true, payload: allVthreads });
        } else {
            res.status(500).json({ success: false, data: { error: "Server error failed to fetch VThreads" } });
        }
    } catch (err) {
        console.error('Error in get /vthreads:', err);
        res.status(500).json({ success: false, data: { error: "Server Error - vthreads fetch failed" } });
    }
})

vthreads.get("/:id", checkMovieIndex, checkActorIndex, async (req, res) => {
    const { movie_id, id } = req.params
    const actor = await getOneActor(id)
    res.json(actor)
})

vthreads.post("/", checkMovieIndex, 
                 checkActorName, 
                 checkActiveBoolean, async (req, res) => {
    const { movie_id } = req.params;
    const actorData = req.body;
    actorData.movie_id = movie_id;
    const newActor = await createActor(actorData);
    res.status(200).json(newActor);
})

vthreads.delete("/:id", checkMovieIndex, checkActorIndex, async (req, res) => {
    const { id } = req.params;
    const deletedActor = await deleteActor(id);
    if (deletedActor) {
        res.status(200).json(deletedActor);
    } else {
        res.status(404).json({ error: "Actor not found" });
    }
} );

vthreads.put("/:id", checkMovieIndex, 
                   checkActorName,
                   checkActorIndex,
                   checkActiveBoolean, async (req, res) => {
    const { id, movie_id } = req.params;
    const updatedActorData = req.body;
    updatedActorData.movie_id = movie_id;
    const updatedActor = await updateActor(id, updatedActorData);
        if (updatedActor) {
            res.status(200).json(updatedActor);
        } else {
            res.status(404).json({ error: " Actor not found"});
        }
});

module.exports = vthreads;