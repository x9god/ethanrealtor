const { startFetchExcel } = require('./utils/fetchExcelUtils');
const {house} = require('./obj/house');
const {rentHouse} = require('./obj/rentHouse');
   let saleList = [];
   let rentList = [];
   const fetcher= new startFetchExcel();
    fetcher.on('data', (data) => {
        ({ saleList, rentList } = convertToObjects(data));
        console.log('Sale List:', saleList);
        console.log('Rent List:', rentList);
    });
    fetcher.start();







function convertToObjects(jsonData) {
    const saleList = jsonData.Sale.map(item => new house(item));
    const rentList = jsonData.Rent.map(item => new rentHouse(item));

    return { saleList, rentList };
}