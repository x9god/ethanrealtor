class house{
   constructor(data) {
       this.id = data.id;
       this.address = data.address;
       this.city = data.city;
       this.province = data.province;
       this.postCode = data.postCode;
       this.type = data.type;
       this.price = parseFloat(data.price);
       this.size = data.size;
       this.numBedroom = data.numBedroom;
       this.numWashroom = data.numWashroom;
       this.numParking = data.numParking;
       this.description = data.description;
       this.purpose = data.purpose;
       this.rowIndex=data.rowIndex;
       this.picture = [];
   }
   get Id(){
       return this.id;
   }
   set  Id(id){
       this.id = id;
   }
   get  Address(){
       return this.address;
   }
   set  Address(address){
       this.address = address;
   }
   get  City(){
       return this.city;
   }
   set  City(city){
       this.city = city;
   }
   get  Province(){
       return this.province;
   }
   set  Province(province){
       this.province = province;
   }
   get  PostCode(){
       return this.postCode;
   }
   set  PostCode(postCode){
       this.postCode = postCode;
   }
   get  Type(){
       return this.type;
   }
   set  Type(type){
       this.type = type;
   }
   get  Price(){
       return this.price;
   }
   set  Price(price){
       this.price = price;
   }
   get  Size(){
       return this.size;
   }
   set  Size(size){
       this.size = size;
   }
   get  NumBed(){
       return this.numBedroom;
   }
   set  NumBed(numBedroom){
       return this.numBedroom = numBedroom;
   }
   get NumWashroom(){
       return this.numWashroom;
   }
   set  NumWashroom(numWashroom){
       this.numWashroom = numWashroom;
   }
   get NumParking(){
       return this.numParking;
   }
   set  NumParking(numParking){
       this.numParking = numParking;
   }
   get Description(){
       return this.description;
   }
   set  Description(description){
       this.description = description;
   }
   get RowIndex(){
       return this.rowIndex;
   }
   set  RowIndex(rowIndex){
       this.rowIndex = rowIndex;
   }
   get Purpose(){
       return this.purpose;
   }
   set  Purpose(purpose){
       this.purpose = purpose;
   }
    checkHouseInfoRemoveCompletely() {
        return this.id === '' &&
            this.address === '' &&
            this.city === '' &&
            this.province === '' &&
            this.postCode === '' &&
            this.type === '' &&
            isNaN(this.price) &&
            this.size === '' &&
            this.numBedroom === '' &&
            this.numWashroom === '' &&
            this.numParking === '' &&
            this.description === '' &&
            this.purpose === '';
    }
}
module.exports = { house };