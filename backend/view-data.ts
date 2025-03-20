import { db } from './src/index';
import { Station, Variable, Measurement } from './src/db/schema';

async function viewData() {
    try {
        const stations = await db.select().from(Station);
        const variables = await db.select().from(Variable);
        const mesaurements = await db.select().from(Measurement);

        console.log('Stations:', JSON.stringify(stations, null, 2));
        console.log('Variables:', JSON.stringify(variables, null, 2));
        console.log('Mesaurements:', JSON.stringify(mesaurements, null, 2));
    } catch (error) {
        console.error('Error viewing data:', error);
    }
}

viewData();
