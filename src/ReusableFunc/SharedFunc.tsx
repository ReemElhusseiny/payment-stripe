/* eslint-disable @typescript-eslint/no-explicit-any */

export const keepPaginationParams = (searchParams: URLSearchParams): any => {
  const currentParams = Object.fromEntries([...searchParams]);
  const cleanParams: any = {};

  // لو الـ page موجودة حافظ عليها
  if (currentParams.page) {
    cleanParams.page = currentParams.page;
  }
  
  // لو الـ paginate (الـ pageSize) موجودة حافظ عليها
  if (currentParams.paginate) {
    cleanParams.paginate = currentParams.paginate;
  }

  return cleanParams;
};