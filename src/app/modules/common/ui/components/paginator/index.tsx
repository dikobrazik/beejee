import { Pagination } from 'react-bootstrap';

type Props = {
  active: number;
  total: number;
  perPage?: number;
  onChange: (page: number) => void;
};

const CommonPagination = (props: Props) => {
  const { active, total, perPage = 3, onChange } = props;
  const pagesCount = Math.ceil(total / perPage);
  return (
    <Pagination>
      {Array(pagesCount)
        .fill(undefined)
        .map((_, index) => {
          const page = index + 1;
          return (
            <Pagination.Item key={page} active={page === active} onClick={onChange.bind(null, page)}>
              {page}
            </Pagination.Item>
          );
        })}
    </Pagination>
  );
};

export default CommonPagination;
