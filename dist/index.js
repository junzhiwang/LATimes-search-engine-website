import express from 'express';
import indexRouter from './router/index';
import suggestRouter from './router/suggest';
import searchRouter from './router/search';
import ContentHelper from './util/ContentHelper';
const app = express();
const port = 8080;
app.use("/res", express.static(__dirname + "/res"));
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/router", express.static(__dirname + "/router"));
app.use("/util", express.static(__dirname + "/util"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/",indexRouter);
app.use("/suggest",suggestRouter);
app.use("/select",searchRouter);
app.listen(port, ()=>{
	console.log('Example app listening on port 8080!');
});
ContentHelper.loadUrlMapper();
