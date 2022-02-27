export const fetcher = async <T = unknown>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(url, init);
  return response.json();
};
