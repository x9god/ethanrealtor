class house{
   constructor(data) {
       this.id = data.Id;
       this.address = data.Address;
       this.city = data.City;
       this.province = data.Province;
       this.postCode = data.PostCode;
       this.type = data.Type;
       this.price =  parseFloat(data.Price);
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
   compareTwoHouse(house){
       return this.id === house.id && this.address === house.address
              && this.city === house.city && this.province === house.province
              && this.postCode === house.postCode && this.type === house.type
              && this.price === house.price && this.size === house.size
              && this.picture === house.picture;
    }
    compareID(house){
       return this.id === house.id;
    }
    compareAddress(house){
       return this.address === house.address;
    }
    compareCity(house){
       return this.city === house.city;
    }
    compareProvince(house){
       return this.province === house.province;
    }
    comparePostCode(house){
       return this.postCode === house.postCode;
    }
    compareType(house){
       return this.type === house.type;
    }
    comparePrice(house){
       return this.price === house.price;
    }
    compareSize(house){
       return this.size === house.size;
    }
    comparePicture(house){
       return this.picture === house.picture;
    }

}
module.exports = { house };