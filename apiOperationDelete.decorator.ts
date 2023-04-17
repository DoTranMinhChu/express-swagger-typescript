import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './iApiOperationArgs.base';
export interface IApiOperationDeleteArgs extends IApiOperationArgsBase {}

export function ApiOperationDelete(
    args: IApiOperationDeleteArgs
): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
    ) => {
        if (args.operationId) {
            propertyKey = args.operationId
        }
        SwaggerService.getInstance().addOperationDelete(
            args,
            target,
            propertyKey
        );
    };
}
