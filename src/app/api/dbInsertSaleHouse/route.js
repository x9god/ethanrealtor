import { connect } from '../../../../lib/db';


export async function POST(req){
  try{
      const body = await req.json();
      const db = await connect();
      let totalAdd = 0;
      for(const house of body){
          await db.execute(
              'INSERT INTO saleHouse (id, address, city, province, postCode, type, price, size, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                  house.id,
                  house.address,
                  house.city,
                  house.province,
                  house.postCode,
                  house.type,
                  house.price,
                  house.size,
                  house.picture
              ]
          );
          totalAdd++;

      }
      await db.end();
      return Response.json({ success: true, affectedRows: totalAdd });
  }
  catch(err){
      console.error('Insert Error Details:', err);
      return Response.json({ error: err.message }, { status: 500 });

  }

}