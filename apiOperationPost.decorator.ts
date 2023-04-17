import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './iApiOperationArgs.base';
export interface IApiOperationPostArgs extends IApiOperationArgsBase { }

export function ApiOperationPost(args: IApiOperationPostArgs): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
    ) => {
        if (args.operationId) {
            propertyKey = args.operationId
        }
        SwaggerService.getInstance().addOperationPost(
            args,
            target,
            propertyKey
        );
    };
}
