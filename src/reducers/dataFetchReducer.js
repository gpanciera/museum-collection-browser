export default function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { 
        ...state, 
        isLoading: true, 
        isError: false 
      };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isError: false, 
        numResults: action.payload.info.total,
        results: action.payload.data,
      };
    case 'FETCH_FAILURE':
      return { 
        ...state, 
        isLoading: false, 
        isError: true, 
      };
    default:
      throw new Error();
  }
}