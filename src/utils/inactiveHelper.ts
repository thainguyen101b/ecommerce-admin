export const getShowPageLink = (record: any, reference: any) => {
  const dynamicPath = record.deletedAt ? "/inactive" : "";
  return `/${reference}${dynamicPath}/${record.id}/show`;
};
