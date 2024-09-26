import aircode from 'aircode';

export default async function (params, context) {

    const { file } = params;
    // const PersonsTable = aircode.db.table('persons');

    if (context.method === 'POST') {
        if (!file) {
            context.status(400);
            return {
                code: 1,
                error: 'File is required'
            }
        }
        const fileBuffer = await aircode.files.upload(
            file.buffer,  // Content of the file
            file.name     // Name of the file
        );

        // return the URL of file
        return {
            code: 0,
            url: fileBuffer.url,
        };

    }
    return {
        code: 0,
        msg: 'fuck you'
    }
};