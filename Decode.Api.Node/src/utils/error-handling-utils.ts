
export class ErrorHandlingUtils {
  constructor() {}

  public static ThrowError(statusCode: number, name: string, message: string, ...additionalInfo: string[]) {
    throw new Error(JSON.stringify({ error: { statusCode, message } }));
  }

  public static CreateRejection(statusCode: number, name: string, message: string, ...additionalInfo: string[]) {
    return  JSON.stringify({ error: { statusCode, message } });
  }
}

