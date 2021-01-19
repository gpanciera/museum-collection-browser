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
    case 'RESET_ALL':
      return {
        ...prevState,
        curPage: 1,
        mainFilter: DEFAULT_FILTER,
        searchString: '',
      };
    default:
      throw new Error();
  }
}
