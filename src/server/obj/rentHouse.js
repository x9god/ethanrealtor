const  {house} = require ('./house');

class rentHouse extends house{
    constructor(data) {
        super(data);
        this.numBedroom = data.numBedroom;
        this.numBathroom = data.numBathroom;
        this.hasEVCharge = data.hasEVCharge;
        this.hasGarden = data.hasGarden;
        this.hasLibrary = data.hasLibrary;
        this.hasParking = data.hasParking;
        this.hasGym = data.hasGym;
        this.hasDishwasher = data.hasDishwasher;
        this.hasHighSpeedInternet = data.hasHighSpeedInternet;
        this.petFriendly = data.petFriendly;
        this.hasAirCondition = data.hasAirCondition;
        this.hasFurniture = data.hasFurniture;
        this.hasSecuritySystem = data.hasSecuritySystem;
        this.hasPatio = data.hasPatio;
    }
    get NumBedroom() { return this.numBedroom; }
    set NumBedroom(numBedroom) {this.numBedroom = numBedroom; }
    get NumBathroom() { return this.numBathroom; }
    set NumBathroom(numBathroom) {this.numBathroom = numBathroom; }
    get HasEVCharge() { return this.hasEVCharge; }
    set HasEVCharge(hasEVCharge) {this.hasEVCharge = hasEVCharge; }
    get HasGarden() { return this.hasGarden; }
    set HasGarden(hasGarden) {this.hasGarden = hasGarden; }
    get HasLibrary() { return this.hasLibrary; }
    set HasLibrary(hasLibrary) {this.hasLibrary = hasLibrary; }
    get HasParking() { return this.hasParking; }
    set HasParking(hasParking) {this.hasParking = hasParking; }
    get HasGym() { return this.hasGym; }
    set HasGym(hasGym) {this.hasGym = hasGym; }
    get HasDishwasher() { return this.hasDishwasher; }
    set HasDishwasher(hasDishwasher) {this.hasDishwasher = hasDishwasher; }
    get HasHighSpeedInternet() { return this.hasHighSpeedInternet; }
    set HasHighSpeedInternet(hasHighSpeedInternet) {this.hasHighSpeedInternet = hasHighSpeedInternet; }
    get HasAirCondition() { return this.hasAirCondition; }
    set HasAirCondition(hasAirCondition) {this.hasAirCondition = hasAirCondition; }
    get PetFriendly() {return this.petFriendly}
    set PetFriendly(petFriendly) {this.petFriendly = petFriendly; }
    get HasFurniture() { return this.hasFurniture; }
    set HasFurniture(hasFurniture) {this.hasFurniture = hasFurniture; }
    get HasSecuritySystem() { return this.hasSecuritySystem; }
    set HasSecuritySystem(hasSecuritySystem) {this.hasSecuritySystem = hasSecuritySystem; }
    get HasPatio() { return this.hasPatio; }
    set HasPatio(hasPatio) {this.hasPatio = hasPatio; }
    compare(house){
        return (super.compare(house)&& this.numBedroom === house.numBedroom
                && this.numBathroom === house.numBathroom && this.hasEVCharge === house.hasEVCharge
                && this.hasGarden === house.hasGarden && this.hasLibrary === house.hasLibrary
                && this.hasParking === house.hasParking && this.hasGym === house.hasGym
                && this.hasDishwasher === house.hasDishwasher && this.hasHighSpeedInternet === house.hasHighSpeedInternet
                && this.hasAirCondition === house.hasAirCondition && this.petFriendly === house.petFriendly
                && this.hasFurniture === house.hasFurniture && this.hasSecuritySystem === house.hasSecuritySystem
                && this.hasPatio === house.hasPatio);

    }


}
module.exports = { rentHouse };