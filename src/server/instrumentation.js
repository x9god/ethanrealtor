const { startFetchExcel } = require('./utils/fetchExcelUtils');
const { startFetchDB } = require('./utils/fetchDBUtils');
const { house } = require('./obj/house');
const { rentHouse } = require('./obj/rentHouse');
const { connect } = require('../../lib/db');
const axios = require("axios");

const fetcherExcel = new startFetchExcel();
const fetcherDB = new startFetchDB();

function convertToObjects(jsonData) {
    let saleList = jsonData.Sale.map(item => new house(item));
    let rentList = jsonData.Rent.map(item => new rentHouse(item));
    return { saleList, rentList };
}

function waitForNextEvent(emitter) {
    return new Promise(resolve => emitter.once('data', resolve));
}

async function compare(excelData, dbData) {
    const { saleList, rentList } = excelData;
    const { saleList: saleListDB, rentList: rentListDB } = dbData;

    console.log('--- New Comparison ---');
    // console.log('Sale List:', saleList);
    // console.log('Rent List:', rentList);
    // console.log('SaleDB List:', saleListDB);
    // console.log('RentDB List:', rentListDB);

    //if saleHouse table is empty
    if (saleListDB.length === 0) {
        console.log('DB is empty — updating...');
        await updateSaleDB(saleList, saleListDB);
    }
    //if rentHouse table is empty
    if (rentListDB.length === 0) {
        console.log('Rent DB is empty — updateing');
        await updateRentDB(rentList, rentListDB);
    }
    //compare if there is different between sale table in excel and saleHouse table in DB
    if(saleList.length<saleListDB.length) {
        console.log('Sale DB need to delete some records - deleting');
        await deleteSaleDB(saleList, saleListDB);
    }
    else if(saleList.length>saleListDB.length) {
        console.log('Sale DB need to add some records - adding');
        await addSaleDB(saleList, saleListDB);
    }
    else{
        console.log("Compare Sale DB with Excel - checking");
        await compareSale(saleList, saleListDB);
    }

    //compare if there is different between rent table in excel and rentHouse table in DB
    if(rentList.length<rentListDB.length) {
        console.log('Rent DB need to delete some records - deleting');
    }
    else if(rentList.length>rentListDB.length) {
        console.log('Rent DB need to add some records - deleting');
    }
    else{

    }
}

async function updateSaleDB(listOne, listTwo) {
    try {
        listTwo = structuredClone(listOne);
        const response = await axios.post(
            'http://localhost:3000/api/dbInsertSaleHouse',
            listTwo,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('DB has been updated');
    } catch (error) {
        console.error('[CRON] Error updating DB:', error.message);
    }
}
async function updateRentDB(listOne, listTwo) {
    try {
        listTwo = structuredClone(listOne);
        const response = await axios.post(
            'http://localhost:3000/api/dbInsertRentHouse',
            listTwo,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('DB has been updated');
    } catch (error) {
        console.error('[CRON] Error updating DB:', error.message);
    }
}
async function addSaleDB(listOne, listTwo) {
    console.log(listOne);
    console.log(listTwo);
    for(let i = 0; i < listTwo.length; i++) {
        let field = [];
        let value = [];
        if(!listOne[i].compareTwoHouse(listTwo[i])){
            if(!listOne[i].compareID(listTwo[i])){
                listTwo[i].id = listOne[i].id;
                field.push("Id = ?");
                value.push(listTwo[i].id);
            }
            if(!listOne[i].compareAddress(listTwo[i])){
                listTwo[i].address = listOne[i].address;
                field.push("Address = ?");
                value.push(listTwo[i].address);
            }
            if(!listOne[i].compareCity(listTwo[i])){
                listTwo[i].city = listOne[i].city;
                field.push("City = ?");
                value.push(listTwo[i].city);
            }
            if(!listOne[i].compareProvince(listTwo[i])){
                listTwo[i].province = listOne[i].province;
                field.push("Province = ?");
                value.push(listTwo[i].province);
            }
            if(!listOne[i].comparePostCode(listTwo[i])){
                listTwo[i].postCode = listOne[i].postCode;
                field.push("PostCode = ?");
                value.push(listTwo[i].postCode);
            }
            if(!listOne[i].compareType(listTwo[i])){
                listTwo[i].type = listOne[i].type;
                field.push("Type = ?");
                value.push(listTwo[i].type);
            }
            if(!listOne[i].comparePrice(listTwo[i])){
                listTwo[i].price = listOne[i].price;
                field.push("Price = ?");
                value.push(listTwo[i].price);
            }
            if(!listOne[i].compareSize(listTwo[i])){
                listTwo[i].size = listOne[i].size;
                field.push("Size = ?");
                value.push(listTwo[i].size);
            }
            if(!listOne[i].comparePicture(listTwo[i])){
                listTwo[i].picture = listOne[i].picture;
                field.push("Picture = ?");
                value.push(listTwo[i].picture);
            }
            value.push(listOne[i].id);
            const sql = `UPDATE saleHouse SET ${field.join(', ')} WHERE Id = ?`;
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/executeSqlQuery',
                    {
                        query: sql,
                        value: value
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log('DB has been updated');
            } catch (error) {
                console.error('[CRON] Error updating DB:', error.message);
            }
        }


    }
    listOne.splice(0,listTwo.length);
    try {
        const response = await axios.post(
            'http://localhost:3000/api/dbInsertSaleHouse',
            listOne,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('DB has been updated');
    } catch (error) {
        console.error('[CRON] Error updating DB:', error.message);
    }

}
async function deleteSaleDB(listOne, listTwo) {
    for(let i = 0; i < listOne.length; i++) {
        let field = [];
        let value = [];
        if(!listOne[i].compareTwoHouse(listTwo[i])){
            if(!listOne[i].compareID(listTwo[i])){
                listTwo[i].id = listOne[i].id;
                field.push("Id = ?");
                value.push(listTwo[i].id);
            }
            if(!listOne[i].compareAddress(listTwo[i])){
                listTwo[i].address = listOne[i].address;
                field.push("Address = ?");
                value.push(listTwo[i].address);
            }
            if(!listOne[i].compareCity(listTwo[i])){
                listTwo[i].city = listOne[i].city;
                field.push("City = ?");
                value.push(listTwo[i].city);
            }
            if(!listOne[i].compareProvince(listTwo[i])){
                listTwo[i].province = listOne[i].province;
                field.push("Province = ?");
                value.push(listTwo[i].province);
            }
            if(!listOne[i].comparePostCode(listTwo[i])){
                listTwo[i].postCode = listOne[i].postCode;
                field.push("PostCode = ?");
                value.push(listTwo[i].postCode);
            }
            if(!listOne[i].compareType(listTwo[i])){
                listTwo[i].type = listOne[i].type;
                field.push("Type = ?");
                value.push(listTwo[i].type);
            }
            if(!listOne[i].comparePrice(listTwo[i])){
                listTwo[i].price = listOne[i].price;
                field.push("Price = ?");
                value.push(listTwo[i].price);
            }
            if(!listOne[i].compareSize(listTwo[i])){
                listTwo[i].size = listOne[i].size;
                field.push("Size = ?");
                value.push(listTwo[i].size);
            }
            if(!listOne[i].comparePicture(listTwo[i])){
                listTwo[i].picture = listOne[i].picture;
                field.push("Picture = ?");
                value.push(listTwo[i].picture);
            }
            value.push(listOne[i].id);
            const sql = `UPDATE saleHouse SET ${field.join(', ')} WHERE Id = ?`;
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/executeSqlQuery',
                    {
                        query: sql,
                        value: value
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log('DB has been updated');
            } catch (error) {
                console.error('[CRON] Error updating DB:', error.message);
            }
        }


    }
    listTwo.splice(0,listTwo.length);
    try {
        const response = await axios.post(
            'http://localhost:3000/api/dbDeleteSaleHouse',
            listTwo,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('DB has been updated');
    } catch (error) {
        console.error('[CRON] Error updating DB:', error.message);
    }

}
async function compareSale(listOne, listTwo){
    for(let i = 0; i < listOne.length; i++) {
        let field = [];
        let value = [];
        if(!listOne[i].compareTwoHouse(listTwo[i])){
            if(!listOne[i].compareID(listTwo[i])){
                listTwo[i].id = listOne[i].id;
                field.push("Id = ?");
                value.push(listTwo[i].id);
            }
            if(!listOne[i].compareAddress(listTwo[i])){
                listTwo[i].address = listOne[i].address;
                field.push("Address = ?");
                value.push(listTwo[i].address);
            }
            if(!listOne[i].compareCity(listTwo[i])){
                listTwo[i].city = listOne[i].city;
                field.push("City = ?");
                value.push(listTwo[i].city);
            }
            if(!listOne[i].compareProvince(listTwo[i])){
                listTwo[i].province = listOne[i].province;
                field.push("Province = ?");
                value.push(listTwo[i].province);
            }
            if(!listOne[i].comparePostCode(listTwo[i])){
                listTwo[i].postCode = listOne[i].postCode;
                field.push("PostCode = ?");
                value.push(listTwo[i].postCode);
            }
            if(!listOne[i].compareType(listTwo[i])){
                listTwo[i].type = listOne[i].type;
                field.push("Type = ?");
                value.push(listTwo[i].type);
            }
            if(!listOne[i].comparePrice(listTwo[i])){
                listTwo[i].price = listOne[i].price;
                field.push("Price = ?");
                value.push(listTwo[i].price);
            }
            if(!listOne[i].compareSize(listTwo[i])){
                listTwo[i].size = listOne[i].size;
                field.push("Size = ?");
                value.push(listTwo[i].size);
            }
            if(!listOne[i].comparePicture(listTwo[i])){
                listTwo[i].picture = listOne[i].picture;
                field.push("Picture = ?");
                value.push(listTwo[i].picture);
            }
            value.push(listOne[i].id);
            const sql = `UPDATE saleHouse SET ${field.join(', ')} WHERE Id = ?`;
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/executeSqlQuery',
                    {
                        query: sql,
                        value: value
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log('DB has been updated');
            } catch (error) {
                console.error('[CRON] Error updating DB:', error.message);
            }
        }


    }

}

async function loop() {
    console.log('Starting concurrent Excel/DB watcher...');
    while (true) {
        try {
            const [excelDataRaw, dbDataRaw] = await Promise.all([
                waitForNextEvent(fetcherExcel),
                waitForNextEvent(fetcherDB)
            ]);
            const excelData = convertToObjects(excelDataRaw);
            const dbData = convertToObjects(dbDataRaw);
            await compare(excelData, dbData);
        } catch (err) {
            console.error('Error in loop:', err);
            await new Promise(r => setTimeout(r, 2000)); // brief delay before retry
        }
    }
}

// Start both fetchers
fetcherExcel.start();
fetcherDB.start();

// Kick off the concurrent loop
loop();
