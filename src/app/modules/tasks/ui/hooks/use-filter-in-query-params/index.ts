import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SortParams } from '../../../domain/interfaces/sortParams';
import { setPage, setSortParams } from '../../../store/index/actions';
import { tasksPageSelector, tasksSortParamsSelector } from '../../../store/index/selectors';

const useFilterInQueryParams = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const page = useSelector(tasksPageSelector);
  const sortParams = useSelector(tasksSortParamsSelector);

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const page = urlSearch.get('page') || 1;
    const sortField = urlSearch.get('sort_field') as SortParams['field'];
    const sortDirection = urlSearch.get('sort_direction') as SortParams['direction'];
    dispatch(setPage(+page));
    dispatch(setSortParams({ field: sortField ?? 'id', direction: sortDirection ?? 'asc' }));
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const urlSearch = new URLSearchParams(location.search);
    urlSearch.set('page', page + '');
    urlSearch.set('sort_field', sortParams.field);
    urlSearch.set('sort_direction', sortParams.direction);
    history.push({
      pathname,
      search: urlSearch.toString(),
    });
  }, [location.pathname, location.search, history, page, sortParams.field, sortParams.direction]);
  return { page, sort: `${sortParams.field} ${sortParams.direction}` };
};

export default useFilterInQueryParams;
