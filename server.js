import Express from 'express';
import Logger from 'morgan';
import * as Path from 'path';
import { fileURLToPath } from 'url';
import {Sequelize, DataTypes, QueryTypes } from 'sequelize';

import * as Setts from './inc-node/incSettings.js';
import * as SQLs from './inc-node/incSQL.js';

const __dirname = Path.dirname(fileURLToPath(import.meta.url));
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

app.use('/arq', Express.static(Path.join(__dirname, 'arq')));    
app.use('/css', Express.static(Path.join(__dirname, 'css')));
app.use('/images', Express.static(Path.join(__dirname, 'images')));
app.use('/js', Express.static(Path.join(__dirname, 'js')));

app.get("/", function(req, res) {
    res.status(200);
    res.sendFile(__dirname + '/index.html');
});

app.get("/favicon.ico", function(req, res) {
    res.status(200);
    res.sendFile(__dirname + '/favicon.ico'); 
});

app.get("/act_getdata", async function(req, res) {
    const [_BestPerformance, _TopROI, _DistributionByCountry, _TopKeywords, _PhysicalPerformance, _ProfitByYear, _StdDurationProfit
    ] = await Promise.all([
        sequelize.query(SQLs.SQL_BestPerformance, { raw: true, type: QueryTypes.SELECT }),
        sequelize.query(SQLs.SQL_HigherROI, { raw: true, type: QueryTypes.SELECT }),
        sequelize.query(SQLs.SQL_DistributionByCountry, { raw: true, type: QueryTypes.SELECT }),
        sequelize.query(SQLs.SQL_PopularKeywords, { raw: true, type: QueryTypes.SELECT }),
        sequelize.query(SQLs.SQL_PhysicalPerformance, { raw: true, type: QueryTypes.SELECT }),
        sequelize.query(SQLs.SQL_AnualProfitability, { raw: true, type: QueryTypes.SELECT }),
        sequelize.query(SQLs.SQL_StdDurationProfit, { raw: true, type: QueryTypes.SELECT })
    ]);

    let Header = Object.keys(_BestPerformance[0]);
    let BestPerformance = _BestPerformance.map(obj => Object.values(obj));
    BestPerformance.unshift(Header);

    Header = Object.keys(_TopROI[0]);
    let TopROI = _TopROI.map(obj => Object.values(obj));  
    TopROI.unshift(Header);

    Header = Object.keys(_DistributionByCountry[0]);
    let DistributionByCountry = _DistributionByCountry.map(obj => Object.values(obj));
    DistributionByCountry.unshift(Header);

    Header = Object.keys(_TopKeywords[0]);
    let TopKeywords = _TopKeywords.map(obj => Object.values(obj));
    TopKeywords.unshift(Header);

    Header = Object.keys(_PhysicalPerformance[0]);
    let PhysicalPerformance = _PhysicalPerformance.map(obj => Object.values(obj));
    PhysicalPerformance.unshift(Header);

    Header = Object.keys(_ProfitByYear[0]);
    let ProfitByYear = _ProfitByYear.map(obj => Object.values(obj));
    ProfitByYear.unshift(Header);

    Header = Object.keys(_StdDurationProfit[0]);
    let StdDurationProfit = _StdDurationProfit.map(obj => Object.values(obj));
    StdDurationProfit.unshift(Header);

    let Tbl = {
        res: 1,
        resdesc: 'OK',
        gBP: BestPerformance,
        gROI: TopROI,
        gDC: DistributionByCountry,
        gTK: TopKeywords,
        gPP: PhysicalPerformance,
        gPY: ProfitByYear,
        gSDP: StdDurationProfit
    }
    let lJSON = JSON.stringify(Tbl);
    res.status(200);
    res.setHeader('Content-Type', 'text/json');
    return res.send(lJSON);
})

app.listen(PORT, async function() {
    console.log('Listening on port', PORT);
    console.log('DB Errs', gConnErr);
});