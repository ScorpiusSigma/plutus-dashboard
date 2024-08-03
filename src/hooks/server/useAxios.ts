import { useState, useEffect } from 'react';
import server from './server';
import { AxiosResponse } from 'axios';

const useAxios = (url: string, requestType: string, options = {}) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(true);

  const requestSelector = async (): Promise<any> => {
    let response: AxiosResponse<any, any>;
    switch (requestType) {
      case 'get':
        response = await server.get(url, options);
        break;
      case 'put':
        response = await server.put(url, options);
        break;
      case 'post':
        response = await server.post(url, options);
        break;
      case 'delete':
        response = await server.delete(url, options);
        break;
      default:
        throw new Error('Invalid request type');
    }
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestSelector();
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options, requestType]);

  return { data, error, loading };
};

export default useAxios;
