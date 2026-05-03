const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_BASE_URL = "https://api.pexels.com/v1";

function assertApiKey() {
  if (!PEXELS_API_KEY) {
    throw new Error(
      "Missing Pexels API key. Add VITE_PEXELS_API_KEY in your .env file."
    );
  }
}

async function requestJson(path, signal) {
  assertApiKey();

  const response = await fetch(`${PEXELS_BASE_URL}${path}`, {
    headers: { Authorization: PEXELS_API_KEY },
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pexels API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

export async function fetchCuratedPins({ page = 1, perPage = 24, signal } = {}) {
  return requestJson(`/curated?page=${page}&per_page=${perPage}`, signal);
}

export async function fetchSearchPins({
  query,
  page = 1,
  perPage = 24,
  signal,
} = {}) {
  if (!query?.trim()) {
    return fetchCuratedPins({ page, perPage, signal });
  }

  return requestJson(
    `/search?query=${encodeURIComponent(query.trim())}&page=${page}&per_page=${perPage}`,
    signal
  );
}