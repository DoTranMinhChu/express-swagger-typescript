export interface IApiOperationArgsBaseParameter {
    name?: string; // Override [key: string]. Default [key: string].
    description?: string;
    type?: string;
    required?: boolean;
    format?: string;
    minimum?: number;
    maximum?: number;
    default?: any;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    schema?: object;
    items?: {
        type?: string;
    }
}
export interface IApiParameters {
    [key: string]: IApiOperationArgsBaseParameter
}
export interface IApiPropertyBodyOperationArgsBaseParameter {
    type: string;
    items: object
    required?: boolean;
}

export interface IApiBodyOperationArgsBaseParameter
    extends IApiOperationArgsBaseParameter {
    properties?: { [key: string]: IApiPropertyBodyOperationArgsBaseParameter };
    model?: string | any;
}

export interface IApiOperationArgsBaseResponse {
    description?: string;
    type?: string;
    model?: string | any;
    [key: string]: any
}

export interface IApiOperationArgsBaseParameters {
    header?: { [key: string]: IApiOperationArgsBaseParameter };
    path?: { [key: string]: IApiOperationArgsBaseParameter };
    query?: { [key: string]: IApiOperationArgsBaseParameter };
    body?: IApiBodyOperationArgsBaseParameter; // use only for POST, PUT and PATCH
    formData?: { [key: string]: IApiOperationArgsBaseParameter };
    schema?: any;
}
export interface IApiOperationArgsBaseRequestBody {

}
export interface IApiOperationArgsBaseRequestBody {
    description?: string;
    required?: boolean;
    content?: {
        [produce: string]: {
            schema: IApiBodyOperationArgsBaseParameter
        }
    };
}


export interface IApiOperationArgsBase {
    operationId?: string
    /**
     * Define description
     * Optional.
     */
    description?: string;

    /**
     * Define summary
     * Optional.
     */
    summary?: string;

    /**
     * Define produces
     * Optional.
     */
    produces?: string[];

    /**
     * Define consumes
     * Optional.
     */
    consumes?: string[];

    /**
     * Define tags
     * Optional.
     */
    tags?: string[];

    /**
     * Define path
     * Optional.
     */
    path?: string;

    /**
     * Define parameters
     * Optional.
     */
    parameters?: IApiOperationArgsBaseParameters;


    requestBody?: IApiOperationArgsBaseRequestBody;

    /**
     * Define responses
     */
    responses: { [key: string]: IApiOperationArgsBaseResponse };

    /**
     * Define security
     * Optional.
     */
    security?: { [key: string]: any[] };

    /**
     * Define deprecated
     * Optional.
     */
    deprecated?: boolean;
}
