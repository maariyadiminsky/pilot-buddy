import axios from 'axios';

const CustomAxios = axios.create();

/**
 * Takes an object and replaces all keys to be camelCase
 * @param object
 * @returns object with camelCase keys
 */
const toCamelCase: any = (object: any) => {
  let transformedObject = object;
  if (typeof object === 'object' && object !== null) {
    if (object instanceof Array) {
      transformedObject = object.map(toCamelCase);
    } else {
      transformedObject = {};
      for (const key in object) {
        if (object[key] !== undefined) {
          const newKey = key.replace(/(_\w)|(-\w)/g, (k) => k[1].toUpperCase());
          transformedObject[newKey] = toCamelCase(object[key]);
        }
      }
    }
  }

  return transformedObject;
};

/**
 * Takes an object and replaces all keys to be snake-case
 * @param object
 * @returns object with snake-case keys
 */
export const toSnakeCase: any = (object: any) => {
  let transformedObject = object;
  if (typeof object === 'object' && object !== null) {
    if (object instanceof Array) {
      transformedObject = object.map(toSnakeCase);
    } else {
      transformedObject = {};
      for (const key in object) {
        if (object[key] !== undefined) {
          const newKey = key
            .replace(/\.?([A-Z]+)/g, function (_, y) {
              return '_' + y.toLowerCase();
            })
            .replace(/^_/, '');
          transformedObject[newKey] = toSnakeCase(object[key]);
        }
      }
    }
  }
  return transformedObject;
};

CustomAxios.interceptors.response.use(
  (response) => {
    response.data = toCamelCase(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.request.use(
  (config) => {
    config.data = toSnakeCase(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default CustomAxios;
