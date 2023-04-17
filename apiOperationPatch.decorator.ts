import { SwaggerService } from './swagger.service';
import { IApiOperationArgsBase } from './iApiOperationArgs.base';
export interface IApiOperationPatchArgs extends IApiOperationArgsBase {}

export function ApiOperationPatch(
    args: IApiOperationPatchArgs
): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
    ) => {
        if (args.operationId) {
            propertyKey = args.operationId
        }
        SwaggerService.getInstance().addOperationPatch(
            args,
            target,
            propertyKey
        );
    };
}
