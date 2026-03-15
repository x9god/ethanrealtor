import {house} from '../../../server/obj/house';
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import clientPromise from '../../../../lib/mongodb';

export async function POST(req) {

    try {
        const body = await req.json();
        let readyForInjectDB = true;
        let readyForInjectPic = true;
        if (body.sheet === 'property') {
            for (let attr in body.rows[0]) {
                if (body.rows[0][attr] === '') {
                    readyForInjectDB = false;
                    break;
                }
                console.log("Waiting for filling or deleting house information in Google Sheet");
            }
            if (readyForInjectDB) {
                let newHouse = body.rows.map(item => new house(item));
                const client = await clientPromise;
                try {
                    const db = client.db('house');
                    const collection = db.collection('properties');
                    let result = await collection.find({rowIndex: newHouse[0].RowIndex}).toArray();
                    if (result.length > 0) {
                        const existingHouse = result.map(({_id, ...rest}) => new house(rest));
                        const newKey = Object.keys(newHouse[0]);
                        let setter = {};
                        for (let key of newKey) {
                            if (JSON.stringify(newHouse[0][key]) !== JSON.stringify(existingHouse[0][key])) {
                                setter[key] = newHouse[0][key];
                            }
                        }
                        await collection.updateOne({rowIndex: newHouse[0].RowIndex}, {$set: setter});
                        console.log('Update existing collection in MongoDB successfully, id: {}', newHouse[0].Id);


                    } else {
                        await collection.insertOne(newHouse[0]);
                        console.log("Inject collection to MongoDB successfully, id: {}", newHouse[0].Id);

                    }
                } catch (err) {
                    console.error("Inject collection to MongoDb failed: ", err);
                }
            } else {
                 let deleteHouse = body.rows.map(item => new house(item));
                 const client = await clientPromise;
                 if(deleteHouse[0].checkHouseInfoRemoveCompletely()){
                     try{
                         const db = client.db('house');
                         const collection = db.collection('properties');
                         await collection.deleteOne({ rowIndex: deleteHouse[0].RowIndex });
                         console.log("Delete collection in MongoDB successfully, rowIndex: {}", deleteHouse[0].RowIndex);
                     }
                     catch(err){
                         console.error("Delete collection in MongoDb failed: ", err);
                     }
                 }
            }
            return Response.json({success: true});
        }
        else{
            for (let attr in body.rows[0]) {
                if (body.rows[0][attr] === '') {
                    readyForInjectPic = false;
                    break;
                }
                console.log("Waiting for filling or deleting house picture in Google Sheet");
            }
            if(readyForInjectPic){
                console.log(body.rows[0].picture);
                const client = await clientPromise;
                try{
                    const db = client.db('house');
                    const collection = db.collection('properties');
                    await collection.updateOne({id: body.rows[0].id},{$push: {picture: body.rows[0].picture}});
                    console.log("Inject picture successfully, id: {}", body.rows[0].id);
                }
                catch(err){
                   console.error("Inject picture to MongoDB failed: ", err);
                }
            }

            return Response.json({success: true});

        }
    } catch (err) {
        console.error('Failed to process the request:', err);
        return Response.json({error: err.message}, {status: 400});

    }

}
