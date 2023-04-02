function getPages(pageSize: number, count: number) {
  let pageLength = Math.ceil(count / pageSize);
  let pages = [];

  for (let i = 1; i <= pageLength; i++) pages.push(i);

  return pages;
}

export default getPages;
