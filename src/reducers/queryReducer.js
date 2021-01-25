import { DEFAULT_FILTER } from '../constants/constants';

export default function queryReducer(prevState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...prevState,
        curPage: 1,
        searchString: action.payload,
      };
    case 'UPDATE_MAIN_FILTER':
      return {
        ...prevState,
        curPage: 1,
        mainFilter: action.payload,
      };
    case 'UPDATE_PAGE':
      return {
        ...prevState,
        curPage: action.payload,
      };
    case 'UPDATE_DEPT_FILTER':
      return {
        ...prevState,
        deptFilter: action.payload,
      };
    case 'UPDATE_TYPE_FILTER':
      return {
        ...prevState,
        typeFilter: action.payload,
      };
    case 'RESET_ALL':
      return {
        ...prevState,
        curPage: 1,
        searchString: '',
        mainFilter: DEFAULT_FILTER,
        deptFilter: '',
        typeFilter: '',
      };
    default:
      throw new Error();
  }
}
