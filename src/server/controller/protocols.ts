export interface IResponse<B> {
  statusCode: number;
  body: B;
}

export interface IRequest<B> {
  params?: {
    transitionId?: string;
  };
  headers?: {
    userId?: string;
  };
  body: B;
}

export interface IController {
  handle(req: IRequest<unknown>): Promise<IResponse<unknown>>;
}
