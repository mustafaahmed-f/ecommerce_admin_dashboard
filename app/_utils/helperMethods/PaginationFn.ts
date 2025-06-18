interface paginationParams {
  page?: number;
  size?: number;
}

export const paginationFunction = ({
  page = 1,
  size = 10,
}: paginationParams = {}) => {
  if (page < 1) page = 1;
  if (size < 1) size = 10;

  let skip = (page - 1) * size;
  let limit = size;

  return { skip, limit };
};
