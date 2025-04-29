export const filterData = (data: any): any => {
  return (
    data?.filter((item: any) => !item.isDeactivated && !item.isDeleted) || []
  );
};
