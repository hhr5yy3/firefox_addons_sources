function flatZip(table, limit = Infinity) {
    if (limit <= 0) {
        return [];
    }
    const maxColumns = Math.max(...table.map(row => row.length));
    const zipped = [];
    for (let col = 0; col < maxColumns; col++) {
        for (const row of table) {
            if (row.length > col) {
                zipped.push(row[col]);
                if (zipped.length === limit) {
                    return zipped;
                }
            }
        }
    }
    return zipped;
}

export { flatZip };
