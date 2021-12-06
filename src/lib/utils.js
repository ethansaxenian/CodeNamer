// export const API_SERVER_URL = "http://127.0.0.1:5000";
export const API_SERVER_URL = "https://code-namer.herokuapp.com";


export async function fetchWithTimeout(resource, options = {}) {
  // timeout after 30s by default to match heroku
  const { timeout = 30000 } = options;

  const controller = new AbortController();  // eslint-disable-line
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}
