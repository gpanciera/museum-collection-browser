import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import dataFetchReducer from '../reducers/dataFetchReducer';

// useDataApi hook by Greg Panciera
const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    numResults: 0,
    results: initialData,
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        // console.log('INITIATING FETCH to:', url);
        const result = await axios.get(url, { cancelToken: source.token });
        // console.log('DATA RECEIVED:', url, result.data);
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      }
      catch (error) {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
    return () => {
      // console.log("RUNNING CLEANUP");
      isMounted = false;
      source.cancel();
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;
