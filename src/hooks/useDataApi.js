import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isError: false, 
        numResults: action.payload.info.total,
        results: action.payload.data,
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true, };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, { 
    isLoading: false, 
    isError: false, 
    numResults: 0, 
    results: initialData, 
  });
 
  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url); 
        console.log("fetchData ~ result", result.data)
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } 
      catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
    return () => { didCancel = true; };
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;