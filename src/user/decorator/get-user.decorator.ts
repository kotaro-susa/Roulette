import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// リクエストからユーザー情報を取得
export const GetUserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user
  },
);
