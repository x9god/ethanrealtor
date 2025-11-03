import { connect } from '../../../../lib/db';

export async function POST(req){
    try{
        const body = await req.json();
        const db = await connect();
        let totalDelete = 0;
        for(const house of body){
            await db.execute(
                'DELETE FROM rentHouse WHERE id = ?',[body.id]
            );
            totalDelete =totalDelete + 1;
        }
        await db.end();
        return Response.json({ success: true, affectedRows: totalDelete });
    }
    catch(err){
        console.error('Insert Error Details:', err);
        return Response.json({ error: err.message }, { status: 500 });

    }

}