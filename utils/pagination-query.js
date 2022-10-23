const paginationQuery = query => {
    let { page, size } = query;
    // if not define the page number
    if(!page){
        page = 1;
    }
    // if not define size of the data
    if(!size){
        size = 10;
    }
    // Convert it to int;
    const limit = parseInt(size);
    // Skip the previous data from next page
    const skip = (page - 1) * limit;

    return {
        limit,
        skip
    }
}
module.exports = paginationQuery;