import { GraphQLClient, ClientError } from "graphql-request";

const DATOCMS_API_URL = "https://graphql.datocms.com";
const DATOCMS_PREVIEW_URL = "https://graphql.datocms.com/preview";

// Custom error class for DatoCMS errors
export class DatoCMSError extends Error {
  public readonly code: string;
  public readonly isNetworkError: boolean;
  public readonly isAuthError: boolean;
  public readonly isRateLimited: boolean;

  constructor(
    message: string,
    options: {
      code?: string;
      isNetworkError?: boolean;
      isAuthError?: boolean;
      isRateLimited?: boolean;
    } = {}
  ) {
    super(message);
    this.name = "DatoCMSError";
    this.code = options.code || "UNKNOWN_ERROR";
    this.isNetworkError = options.isNetworkError || false;
    this.isAuthError = options.isAuthError || false;
    this.isRateLimited = options.isRateLimited || false;
  }
}

// Parse and normalize errors from DatoCMS
export function parseDatoCMSError(error: unknown): DatoCMSError {
  // Network errors (no internet, DNS issues, etc.)
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return new DatoCMSError(
      "Unable to connect to content service. Please check your internet connection.",
      { code: "NETWORK_ERROR", isNetworkError: true }
    );
  }

  // GraphQL client errors
  if (error instanceof ClientError) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      return new DatoCMSError("Content service authentication failed.", {
        code: "AUTH_ERROR",
        isAuthError: true,
      });
    }

    if (status === 429) {
      return new DatoCMSError(
        "Too many requests. Please try again in a moment.",
        { code: "RATE_LIMITED", isRateLimited: true }
      );
    }

    // Extract GraphQL errors
    const gqlErrors = error.response?.errors;
    if (gqlErrors && gqlErrors.length > 0) {
      return new DatoCMSError(
        gqlErrors.map((e: { message: string }) => e.message).join(", "),
        { code: "GRAPHQL_ERROR" }
      );
    }
  }

  // Generic error
  if (error instanceof Error) {
    return new DatoCMSError(error.message, { code: "UNKNOWN_ERROR" });
  }

  return new DatoCMSError("An unexpected error occurred.", {
    code: "UNKNOWN_ERROR",
  });
}

export function createDatoCMSClient(preview = false) {
  const endpoint = preview ? DATOCMS_PREVIEW_URL : DATOCMS_API_URL;
  const token = process.env.DATOCMS_API_TOKEN;

  if (!token) {
    console.warn("DATOCMS_API_TOKEN is not set. Using mock data.");
    return null;
  }

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Environment": "main",
    },
    // Add reasonable timeout
    fetch: (url, options) =>
      fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }),
  });
}

export const datoCMSClient = createDatoCMSClient();
export const datoCMSPreviewClient = createDatoCMSClient(true);










