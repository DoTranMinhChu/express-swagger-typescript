import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './iApiOperationArgs.base';
export interface IApiOperationGetArgs extends IApiOperationArgsBase {
   
}

export function ApiOperationGet(args: IApiOperationGetArgs): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
    ) => {
        if (args.operationId) {
            propertyKey = args.operationId
        }
        SwaggerService.getInstance().addOperationGet(args, target, propertyKey);
    };
}
