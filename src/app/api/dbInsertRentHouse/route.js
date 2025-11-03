import { connect } from '../../../../lib/db';


export async function POST(req){
    try{
        const body = await req.json();
        const db = await connect();
        console.log(body);
        for(const house of body){
            await db.execute(
                'INSERT INTO rentHouse (id, address, city, province, postCode, type,numBedroom,numBathroom,size,hasEVCharge,hasGarden,hasLibrary,hasParking,hasGym,hasDishwasher,hasHighSpeedInternet,petFriendly,hasAirCondition,hasSecuritySystem,hasFurniture,hasPatio,monthlyRent, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)',
                [
                    house.id,
                    house.address,
                    house.city,
                    house.province,
                    house.postCode,
                    house.type,
                    house.numBedroom,
                    house.numBathroom,
                    house.size,
                    house.hasEVCharge,
                    house.hasGarden,
                    house.hasLibrary,
                    house.hasParking,
                    house.hasGym,
                    house.hasDishwasher,
                    house.hasHighSpeedInternet,
                    house.petFriendly,
                    house.hasAirCondition,
                    house.hasSecuritySystem,
                    house.hasFurniture,
                    house.hasPatio,
                    house.price,
                    house.picture
                ]
            );

        }
        await db.end();
        return Response.json({ success: true, count: body.length });
    }
    catch(err){
        console.error('Insert Error Details:', err);
        return Response.json({ error: err.message }, { status: 500 });

    }

}