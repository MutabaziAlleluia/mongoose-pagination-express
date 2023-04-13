export const lastPage = (per_page: number, count: number) => {
  const calcule_last_page = count % per_page;
  const last_page =
    calcule_last_page === 0
      ? count / per_page
      : Math.trunc(count / per_page) + 1;
  return last_page;
};
