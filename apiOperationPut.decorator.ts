import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './iApiOperationArgs.base';
export interface IApiOperationPutArgs extends IApiOperationArgsBase {}

export function ApiOperationPut(args: IApiOperationPutArgs): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
    ) => {
        SwaggerService.getInstance().addOperationPut(args, target, propertyKey);
    };
}
