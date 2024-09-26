import aircode from 'aircode';

export default async function (params, context) {

    // const { id } = params;
    // const PersonsTable = aircode.db.table('persons');

    const content = await aircode.files.download({
        // Replace the _id value with your file's
        _id: context.query.id
    });

    // return the URL of file
    return content;

};