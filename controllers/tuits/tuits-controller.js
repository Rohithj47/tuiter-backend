// import posts from "./tuits.js";
// let tuits = posts;
import * as tuitsDao from "./tuits-dao.js";

export default (app) => {
  app.post("/api/tuits", createTuit);
  app.get("/api/tuits", findTuits);
  app.put("/api/tuits/:tid", updateTuit);
  app.delete("/api/tuits/:tid", deleteTuit);
};

// const createTuit = (req, res) => {
//   const newTuit = req.body;
//   newTuit._id = new Date().getTime() + "";
//   newTuit.likes = 0;
//   newTuit.liked = false;
//   tuits.push(newTuit);
//   res.json(newTuit);
// };
// const findTuits = (req, res) => {
//   res.json(tuits);
// };

const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.likes = 0;
  newTuit.liked = false;
  newTuit.dislikes = 0;
  newTuit.disliked = false;
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
};

const findTuits = async (req, res) => {
  const tuits = await tuitsDao.findTuits();
  console.log(tuits)
  res.json(tuits);
};

// const updateTuit = (req, res) => {
//   const tuitdId = req.params.tid;
//   const updates = req.body;
//   const tuitIndex = tuits.findIndex((t) => t._id === tuitdId);
//   tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
//   res.sendStatus(200);
// };

// const deleteTuit = (req, res) => {
//   console.log(`delete called for ${req.params.tid}`);
//   const tuitdIdToDelete = req.params.tid;
//   tuits = tuits.filter((t) => t._id != tuitdIdToDelete);
//   console.log(tuits);
//   res.sendStatus(200);
// };

const deleteTuit = async (req, res) => {
  console.log(`delete called for ${req.params.tid}`);
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  res.json(status);
};

const updateTuit = async (req, res) => {
  const tuitdId = req.params.tid;
  const updates = req.body;
  const status = await tuitsDao.updateTuit(tuitdId, updates);
  res.json(status);
};