import { NextResponse } from "next/server";

// Error codes for consistent API responses
export const ErrorCodes = {
  // Auth errors
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  
  // Validation errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  
  // Resource errors
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  
  // Server errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;

type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

interface APIError {
  code: ErrorCode;
  message: string;
  status: number;
}

// Standardized error response
export function apiError(
  code: ErrorCode,
  message: string,
  status: number
): NextResponse {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status }
  );
}

// Common error responses
export const Errors = {
  unauthorized: (message = "Authentication required") =>
    apiError(ErrorCodes.UNAUTHORIZED, message, 401),

  forbidden: (message = "Access denied") =>
    apiError(ErrorCodes.FORBIDDEN, message, 403),

  notFound: (resource = "Resource") =>
    apiError(ErrorCodes.NOT_FOUND, `${resource} not found`, 404),

  validationError: (message: string) =>
    apiError(ErrorCodes.VALIDATION_ERROR, message, 400),

  alreadyExists: (resource = "Resource") =>
    apiError(ErrorCodes.ALREADY_EXISTS, `${resource} already exists`, 409),

  internalError: (message = "An unexpected error occurred") =>
    apiError(ErrorCodes.INTERNAL_ERROR, message, 500),

  databaseError: () =>
    apiError(
      ErrorCodes.DATABASE_ERROR,
      "We're experiencing technical difficulties. Please try again later.",
      503
    ),

  serviceUnavailable: (service = "Service") =>
    apiError(
      ErrorCodes.SERVICE_UNAVAILABLE,
      `${service} is temporarily unavailable. Please try again later.`,
      503
    ),
};

// Parse error and determine appropriate response
export function handleAPIError(error: unknown): NextResponse {
  // Log the actual error for debugging
  console.error("API Error:", error);

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Database connection errors
    if (
      message.includes("mongo") ||
      message.includes("econnrefused") ||
      message.includes("etimedout") ||
      message.includes("database")
    ) {
      return Errors.databaseError();
    }

    // Network errors
    if (
      message.includes("fetch") ||
      message.includes("network") ||
      message.includes("getaddrinfo")
    ) {
      return Errors.serviceUnavailable("External service");
    }
  }

  // Generic internal error (don't expose details)
  return Errors.internalError();
}

// Success response helper
export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

