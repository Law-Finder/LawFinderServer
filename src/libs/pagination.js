module.exports = async (model, page, limit, query) => {
    const totalRow = await model.find(query).countDocuments();
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