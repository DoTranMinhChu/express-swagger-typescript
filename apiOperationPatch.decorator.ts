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
        SwaggerService.getInstance().addOperationPatch(
            args,
            target,
            propertyKey
        );
    };
}
