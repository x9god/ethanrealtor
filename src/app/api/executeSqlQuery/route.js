import { connect } from '../../../../lib/db';

export async function POST(req){
    try{
        const body = await req.json();
        const db = await connect();
        const [result]=await db.execute(body.query,body.value);
        await db.end();
        return Response.json({ success: true, affectedRows: result.affectedRows });
    }
    catch(err){
        console.error('Insert Error Details:', err);
        return Response.json({ error: err.message }, { status: 500 });

    }

}