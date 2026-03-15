import {house} from '../../../server/obj/house';
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import clientPromise from '../../../../lib/mongodb';


export async function POST(req) {

    try{
        const client = await clientPromise;
        try{
            const db = client.db('house');
            const collection = db.collection('properties');
            return Response.json(await collection.find({purpose: 'for rent'}).toArray());
        }
        catch(err){
            console.log('Failed to retrieve collection', err);
        }
    }
    catch(e){
        console.error('Failed to process the request:', e);
        return Response.json({error: e.message}, {status: 400});

    }












}