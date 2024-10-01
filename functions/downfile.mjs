import aircode from 'aircode';

export default async function (params, context) {
    try {
        const page = context.query?.page || 1;
        const pageSize = context.query?.pageSize || 10;
        // const id = context.query.id || null;

        const files = await aircode.db.table('_files').where()
            .sort({ field: "updatedAt", qty: -1 })  // sort by `qty` in desc order
            .skip((page - 1) * pageSize)
            .limit(+pageSize)
            .find();

        const result = files.map((item) => {
            return {
                ...item,
                url: item.url.replace("/.files/", "/files/")
            }
        });
        // const content = await aircode.files.download({
        //     // Replace the _id value with your file's
        //     _id: context.query.id
        // });

        return {
            code: 0,
            result,
            total: files.length,
            msg: "success"
        }

    } catch (error) {

    }
};