import { MAIN_FILTER_DISPLAY_LIST, INIT_QUERY_STATE } from '../constants/constants';

export default function queryReducer(prevState, action) {
  console.log('queryReducer ~ action', action);
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...prevState,
        curPage: 1,
        searchString: action.payload,
        isResetable: true,
      };
    case 'UPDATE_PAGE':
      return {
        ...prevState,
        curPage: action.payload,
        isResetable: true,
      };
    case 'UPDATE_FILTER':
      if (MAIN_FILTER_DISPLAY_LIST.includes(action.payload.type)) {
        return {
          ...prevState,
          curPage: 1,
          selectedMainFilter: action.payload.type,
          isResetable: true,
        };
      }
      if (action.payload.type === 'Department') {
        return {
          ...prevState,
          deptFilter: action.payload.value,
          isResetable: true,
        };
      }
      if (action.payload.type === 'Type') {
        return {
          ...prevState,
          typeFilter: action.payload.value,
          isResetable: true,
        };
      }
      return prevState;
    case 'RESET_ALL':
      return {
        ...INIT_QUERY_STATE,
      };
    default:
      throw new Error();
  }
}
