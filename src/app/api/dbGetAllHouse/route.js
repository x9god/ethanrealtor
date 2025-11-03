import { connect } from '../../../../lib/db';

// GET request
export async function GET(req) {
    try {
        const db = await connect();
        const [rentRows] = await db.execute('SELECT * FROM rentHouse');
        const [saleRows] = await db.execute('SELECT * FROM saleHouse');
        await db.end();
        const data = {
            Rent: rentRows,
            Sale: saleRows
        };
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

