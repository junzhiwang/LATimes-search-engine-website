import express from 'express';
var indexRouter = express.Router();
import path from 'path';

indexRouter.get("/", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, '..')});
});

module.exports = indexRouter;
