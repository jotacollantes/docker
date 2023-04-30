const cron =require('node-cron'); 
const { syncDB } = require('./tasks/sync-db');

console.log('inicio de la app')
cron.schedule('*/5 * * * * *', syncDB);
