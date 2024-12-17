export const changeYearFormatFnx = (year) =>
  year
    .replace(/(^\w|\.\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");

export const changeBranchFormatFnx = (branch) =>
  branch
    .replace(/(^\w|\-\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");
