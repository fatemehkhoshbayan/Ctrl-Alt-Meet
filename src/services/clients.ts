const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class HttpError extends Error {
  status: number;

  constructor(status: number, statusText: string) {
    super(`${status} ${statusText}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function clients<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return response.json() as Promise<T>;
}
