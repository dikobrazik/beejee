import { FetchResource } from '../../../infrastructure/FetchResource';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const fetchResource = new FetchResource(BASE_URL, { queryParams: { developer: 'Ilnar' } });

export default fetchResource;
