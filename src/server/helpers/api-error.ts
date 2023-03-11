export class ApiError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
  }
}

export class Bad_Request extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Unauthorized extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class Not_Fould extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}
