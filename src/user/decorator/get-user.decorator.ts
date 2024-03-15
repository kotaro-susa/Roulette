import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("リクエスト",request.user)
    return request.user
  },
);
