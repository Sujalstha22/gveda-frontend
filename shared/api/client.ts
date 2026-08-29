const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const STATIC_BASE =
  process.env.NEXT_PUBLIC_STATIC_URL ?? "https://api.gveda.com/static";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | boolean | undefined | null>;

function withQuery(path: string, query?: Query) {
  if (!query) return path;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const s = qs.toString();
  return s ? `${path}?${s}` : path;
}

export async function api<T = unknown>(
  path: string,
  opts: RequestInit & { query?: Query } = {},
): Promise<T> {
  const { query, ...init } = opts;
  const res = await fetch(
    `${BASE}/${withQuery(path.replace(/^\//, ""), query)}`,
    {
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
    },
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new ApiError(
      res.status,
      (data as { message?: string })?.message ?? res.statusText,
      data,
    );
  }
  return data as T;
}

/**
 * Encode a dynamic path segment (e.g. a slug) exactly once.
 * Next.js route params arrive already percent-encoded, so a naive
 * encodeURIComponent double-encodes `:` `+` etc. Decode first, then encode.
 */
export function encodeSlug(value: string): string {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // value had a stray % — use as-is
  }
  return encodeURIComponent(decoded);
}

/** Build a full URL for an image/video filename returned by the API. */
export function staticUrl(name?: string | null): string {
  if (!name) return "";
  if (name.startsWith("http")) return name;
  return `${STATIC_BASE}/${name.replace(/^\//, "")}`;
}

export function videoUrl(name?: string | null): string {
  if (!name) return "";
  if (name.startsWith("http")) return name;
  return `${STATIC_BASE}/videos/${name.replace(/^\//, "")}`;
}
