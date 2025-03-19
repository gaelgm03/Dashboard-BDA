import Express from 'express';
import Logger from 'morgan';
import * as Path from 'path';
import { fileURLToPath } from 'url';
import {Sequelize, DataTypes, QueryTypes } from 'sequelize';

import * as Setts from './inc-node/incSettings.js';

const _dirname = Path.dirname(fileURLToPath(import.meta.url));
const app = Express();
const PORT = 3000;

var gConnErr = 0;
const sequelize = new Sequelize(
    Setts.gServers[0].KS_Name,
    Setts.gServers[0].KS_User,
    Setts.gServers[0].KS_Pswd,
    {
        host: Setts.gServers[0].KS_Host,
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(function(errors) {
    if (errors !== undefined) {
        gConnErr = errors;
    }
});

app.use(Express.json());
app.use(Logger('dev'));