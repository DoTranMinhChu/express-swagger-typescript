# Installing

For the latest stable version, run:

## npm

```sh
# TypeScript later
npm install express-swagger-typescript swagger-ui-express

```

## yarn

```sh
# TypeScript later
yarn add express-swagger-typescript swagger-ui-express

```

# Usage

Set tsconfig.json:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

# Example

```ts
// ..../error.response.ts
import { ApiModel, ApiModelProperty } from "express-swagger-typescript";

@ApiModel({
    description: 'Error Response`'
})
export class ErrorResponse {
    @ApiModelProperty({
        description: 'Error message',
        required: true,
        example: 'Sorry! Something went wrong.,
    })
    public message?: string;

    @ApiModelProperty({
        description: 'Error message',
        required: true,
        example: 'router_exception_something_went_wrong',
    })
    public type?:string;

    @ApiModelProperty({
        description: 'statusCode',
        required: true,
        example: 500
    })
    public statusCode?: number;

    @ApiModelProperty({
        description: 'Error code',
        required: true,
        example: 1001
    })
    public codeNumber?: number;
}
```

```ts
// ......./swagger.config.ts
import * as swagger from "express-swagger-typescript";
import { ErrorResponse } from ".....error.response";

const swaggerData: any = swagger.swaggerData({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My api",
      version: "1.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    responses: {
      500: {
        content: {
          [swagger.SwaggerDefinitionConstant.Produce.JSON]: {
            schema: { model: ErrorResponse },
          },
        },
        description: "500 Internal Server Error Response",
      },
    },
    externalDocs: {
      url: "My url",
    },
  },
});

export default swaggerData;
```

```ts
// app.ts

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "......./swagger.config";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

- Define Request and Response

```ts
//ThumbnailRequest

import { ApiModel, ApiModelProperty } from "express-swagger-typescript";

export enum EUrlType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

@ApiModel({
  description: "Thumbnail request",
})
export class ThumbnailRequest {
  @ApiModelProperty({
    description: "url",
    required: true,
    example:
      "https://cdn.pixabay.com/photo/2020/05/11/22/31/cat-5160456_960_720.png",
  })
  url!: string;

  @ApiModelProperty({
    description: "Type",
    required: true,
    enum: Object.values(EUrlType),
    example: EUrlType.IMAGE,
  })
  type!: Array<EUrlType>;
}
```

```ts
// CreatePostRequest

import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "express-swagger-typescript";
import { ThumbnailRequest } from "./thumbnail.request";

@ApiModel({
  description: "Create post request",
})
export class CreatePostRequest {
  @ApiModelProperty({
    description: "Content",
    required: true,
    example: "Content Here",
  })
  content!: string;

  @ApiModelProperty({
    description: "Booking status",
    required: true,
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: ThumbnailRequest,
  })
  thumbnails!: Array<ThumbnailRequest>;
}
```

```ts
// PostResponse.ts
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "express-swagger-typescript";
import { ThumbnailResponse } from "./thumbnail.response";

@ApiModel({
  description: "Post response",
})
export class PostResponse {
  @ApiModelProperty({
    description: "Id's Post",
    required: true,
    example: "a1da9857-355e-43f1-8fdb-26a8a0ace6bd",
    type: SwaggerDefinitionConstant.STRING,
  })
  id!: string;

  @ApiModelProperty({
    description: "Created At",
    example: "2023-05-10T07:08:46.083Z",
  })
  createdAt!: Date;

  @ApiModelProperty({
    description: "Update At",
    example: "2023-05-10T07:08:46.083Z",
  })
  updatedAt!: Date;

  @ApiModelProperty({
    description: "Deleted At",
    example: null,
  })
  deletedAt!: Date;

  @ApiModelProperty({
    description: "Id's user",
    required: true,
    example: "a1da9857-355e-43f1-8fdb-26a8a0ace6bd",
    type: SwaggerDefinitionConstant.STRING,
  })
  userId!: string;

  @ApiModelProperty({
    description: "Content",
    required: true,
    example:
      "Perspiciatis ducimus corporis consectetur quia aspernatur nulla aliquid occaecati. Reprehenderit dolorum illum repellendus non necessitatibus modi. Fugiat iste quisquam molestias accusamus consequuntur quisquam eum doloribus.",
    type: SwaggerDefinitionConstant.STRING,
  })
  content!: string;

  @ApiModelProperty({
    description: "Thumbnails",
    required: true,
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: ThumbnailResponse,
  })
  thumbnails!: Array<ThumbnailResponse>;
}
```

- Define API method POST

```ts
    // Post API

    //...
    @ApiOperationPost({
        path: "",
        operationId: "createPost",
        security: {
            bearerAuth: [],
        },
        description: "Create new post",
        summary: "Create new post",
        requestBody: {
            content: {
                [SwaggerDefinitionConstant.Produce.JSON]: {
                    schema: { model: CreateNewPostRequest },
                },
            },
        },
        responses: {
            200: {
                content: {
                    [SwaggerDefinitionConstant.Produce.JSON]: {
                        schema: { model: PostResponse },
                    },
                },
                description: "Create post success",
            },
        },
    })
    async createPost(req: Request, res: Response) {
        const createNewPostRequest = req.body as CreateNewPostRequest;
        //...
    }
    //...
```
