const express = require('express');
const config = require('config');
const cors = require('cors');

const app = express();

app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

app.use(cors());
app.use(express.urlencoded({extended : true, limit : '10mb'}));
app.use(express.json({limit : '10mb'}));
app.use("/static", express.static(config.get("app.static_folder")));

app.use(config.get("app.prefixApiVersion"),require(`${__dirname}/../routers/web`));

const mongose = require('../common/database')();

module.exports = app;