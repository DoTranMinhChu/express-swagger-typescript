import { Router, Request, Response, NextFunction } from 'express';
import { SwaggerService } from './swagger.service';
import * as assert from 'assert';
import { build, ISwaggerBuildDefinition } from './swagger.builder';
import { ISwagger } from './iSwagger';

export interface ISwaggerExpressOptions {
    /**
     * Path of resource.
     * Default is "/api-docs/swagger.json".
     */
    path?: string;

    /**
     * Swagger Definition.
     */
    definition?: ISwaggerBuildDefinition;
}

export function express(options?: ISwaggerExpressOptions): Router {
    let path: string = '/api-docs/swagger.json';
    if (options) {
        assert.ok(options.definition, 'Definition is required.');
        if (options.path) {
            path = options.path;
        }
        if (options.definition) {
            build(options.definition);
        }
    }
    const router = buildRouter(path);
    return router;
}

function buildRouter(path: string): Router {
    const router: Router = Router();
    router.get(
        path,
        (_request: Request, response: Response, _next: NextFunction) => {
            const data: ISwagger = SwaggerService.getInstance().getData();
            response.json(data);
        }
    );
    return router;
}

export function swaggerData(options?: ISwaggerExpressOptions): ISwagger {
    if (options) {
        assert.ok(options.definition, 'Definition is required.');
        if (options.definition) {
            build(options.definition);
        }
    }
    return  SwaggerService.getInstance().getData();
}
