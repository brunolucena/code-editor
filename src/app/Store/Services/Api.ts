import axios, { AxiosRequestConfig, ResponseType } from 'axios';

import { Action } from '../Models/ReduxModels';

export type Environments = 'production';

/**
 * Retorna uma instância do axios com o ambiente passado como client
 */
export function getClient(client: Environments) {
  let baseURL = '';
  let responseType: ResponseType = 'json';

  switch (client) {
    default: {
      baseURL = 'https://my-json-server.typicode.com/open-veezoo/editor';

      break;
    }
  }

  return axios.create({
    baseURL,
    responseType,
  });
}

async function Api(action: Action<any>, noAuth?: boolean) {
  // pega qual client está sendo usado na redux que chamou a Api.
  const apiClient = action.payload.client!;

  // cria a instância do Axios
  const client = getClient(apiClient);

  // cria um interceptor para retornar de acordo os diferentes tipos de retornos
  // possíveis. Ex: o retorno pode vir da Api com um erro ou pode dar um erro
  // do próprio Axios.
  client.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      const { response } = error;
      const { data } = response;

      return Promise.reject(data || response || error);
    }
  );

  const { data, method, url } = action.payload.request;

  let config: AxiosRequestConfig | undefined = {
    withCredentials: false,
  };

  // configura o bearer token caso necessário
  if (!noAuth) {
    const token = '';

    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  if (method === 'POST') {
    return client.post(url, data, config);
  } else if (method === 'GET') {
    return client.get(url, { params: data });
  } else if (method === 'PUT') {
    return client.put(url, { params: data });
  } else if (method === 'DELETE') {
    return client.delete(url, { params: data });
  }
}

export default Api;
