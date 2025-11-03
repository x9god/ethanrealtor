const cron = require('node-cron');
const axios = require('axios');
const EventEmitter = require('events');

class startFetchDB extends EventEmitter{
    start(){
        cron.schedule('*/1 * * * *', async () => {
            console.log('[CRON] Fetching house data from API...');

            try {
                const response=await axios.get('http://localhost:3000/api/dbGetAllHouse');
                console.log('[CRON] House data fetched');
                this.emit('data', response.data);
            } catch (error) {
                console.error('[CRON] Error fetching house data:', error.message);
            }
        });



    }
}

module.exports = { startFetchDB };