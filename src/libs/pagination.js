module.exports = async (model, query) => {
    const {page, limit, ...other} = query;
    const totalRow = await model.find(other).countDocuments();
    const totalPages = Math.ceil(totalRow / limit);
    const hasNext = (page+1) <= totalPages;
    const hasPrev = (page-1) > 0;
    return {
        totalPages,
        currentPage : page,
        hasNext,
        hasPrev,
    }
}