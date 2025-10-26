class house{
   constructor(data) {
       this.id = data.Id;
       this.address = data.Address;
       this.city = data.City;
       this.province = data.Province;
       this.postCode = data.PostCode;
       this.type = data.Type;
       this.price = data.Price;
       this.size = data.Size;
       this.picture = data.Picture;
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
   get  Picture(){
       return this.picture;
   }
   set  Picture(picture){
       this.picture = picture;
   }

}
module.exports = { house };