export const filterData = (data) => {
    return (data?.filter((item) => !item.isDeactivated && !item.isDeleted) || []);
};
//# sourceMappingURL=index.js.map