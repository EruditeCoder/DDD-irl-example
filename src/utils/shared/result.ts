// import { DomainErrorParams } from "./domain-error";
import { ApiError } from "./api-error";

export class Result<TSuccess, TError = ApiError> {
  isFailure: boolean;

  constructor(
    public readonly isSuccess: boolean,
    public readonly error?: TError,
    private readonly value?: TSuccess
  ) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  getValue(): TSuccess {
    if (!this.isSuccess) {
      throw new Error(
        `Can't get the value of an error result. Use 'errorValue' instead.`
      );
    }

    return this.value as TSuccess;
  }

  errorValue(): TError {
    return this.error as TError;
  }

  static ok<U = void, E = ApiError>(value?: U): Result<U, E> {
    return new Result<U, E>(true, undefined, value);
  }

  static fail<UError extends ApiError | Error>(
    error: UError
  ): Result<never, UError> {
    return new Result<never, UError>(false, error);
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  constructor(readonly value: A) {}

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, R>(l: L): Either<L, R> => new Left<L, R>(l);

export const right = <L, R>(a: R): Either<L, R> => new Right<L, R>(a);
