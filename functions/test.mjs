import aircode from 'aircode';

export default async function (params, context) {

    const persons = aircode.db.table('persons');
    const files = aircode.db.table('_files');

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

            return {
                code: 0,
                msg: 'success'
            };
        }
        if (!context.query.name) {
            return {
                code: 1,
                error: 'Missing required parameters'
            }
        }

        const result = await persons.where({ name: context.query.name }).find();
        const fileList = await files.where().find();
        return {
            code: 0,
            result,
            fileList
        };
    } catch (error) {

    }
};