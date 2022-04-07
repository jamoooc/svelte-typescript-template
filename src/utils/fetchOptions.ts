const defaultHeaders = { 
  "Content-Type": "application/json", 
  "Accept": "application/json" 
};

export default function fetchOptions(
  body, 
  method: string = 'GET', 
  headers: HeadersInit = defaultHeaders,
  mode: RequestMode = 'cors',
  credentials: RequestCredentials = 'include',
  cache: RequestCache = 'no-cache'
) {
  console.log(JSON.stringify(body));
  return {
    body: JSON.stringify(body),
    method,
    headers,
    mode,
    credentials,
    cache
  };
}
