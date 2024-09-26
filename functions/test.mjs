import aircode from 'aircode';
// import cron from 'node-cron';

const persons = aircode.db.table('persons');

export default async function (params, context) {
    try {
        const { name, age } = params;
        if (context.method === 'POST') {
            if (!name || !age) {
                context.status(400);
                return {
                    code: 1,
                    error: 'Missing required parameters'
                }
            }
            const r = await persons.save({
                name,
                age
            });
            console.log(r);
            return {
                code: 0,
                msg: 'success'
            };
        }

        const result = await persons.where({ name:context.query.name }).find();

        return {
            code: 0,
            result
        };
    } catch (error) {

    }
};