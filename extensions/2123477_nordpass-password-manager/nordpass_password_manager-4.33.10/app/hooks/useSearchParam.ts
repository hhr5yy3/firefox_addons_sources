import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom-v5-compat';

const useSearchParam = (query: string) => {
  const location = useLocation();
  const [param, setParam] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newParam = searchParams.get(query) || '';
    setParam(newParam);
  }, [location.search, query]);

  return param;
};

export default useSearchParam;
