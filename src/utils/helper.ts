export const excludeUnnecessaryFields = (data: any, fields: string[] = ['createdAt', 'updatedAt', '__v', 'password']) => {
    if(Array.isArray(data)) {
        return data.map((element: any) => {
            return removeField(element._doc, fields, 0);
        });
    }

    return removeField(data._doc, fields, 0);
}   

const removeField: any = (data: any, fields: string[], i: number) => {
    const { [fields[i]]: remove, ...rest } = data;
    if(i === fields.length - 1) {
        return rest;
    }
    return removeField(rest, fields, i+1);
};  