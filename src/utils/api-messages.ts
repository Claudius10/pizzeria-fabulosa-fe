// SECURITY RESPONSES

export const USER_ID_NO_MATCH = "UserIdNoMatch"; // when userId in token does not match userId sent from FE

export const USER_NOT_FOUND = "UserNotFound"; // when user does not exist in the database

export const BAD_CREDENTIALS = "BadCredentialsException";

export const INVALID_TOKEN = "InvalidBearerTokenException";

export const MISSING_TOKEN = "InsufficientAuthenticationException";

// API RESPONSES

export const USER_EMAIL_ALREADY_EXISTS = "EmailAlreadyExists";

export const ADDRESS_MAX_SIZE = "UserAddressListFull";

export const ORDER_NOT_FOUND = "UserOrderNotFound";

export const ORDER_DELETE_TIME_ERROR = "InvalidOrderDeleteTime";

export const DUMMY_ACCOUNT_ERROR = "DummyAccountError";
