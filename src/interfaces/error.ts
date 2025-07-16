export interface TErrorSources {
  path: string;
  message: string;
}

export interface TErrorSourcesResponse {
  statusCode: string;
  message: string;
  error: TErrorSources[];
}
