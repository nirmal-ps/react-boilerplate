import * as qs from 'query-string';

export function getQueryParam(key) {
    const parsed = qs.parse(location.search);
    return parsed[key];
  }