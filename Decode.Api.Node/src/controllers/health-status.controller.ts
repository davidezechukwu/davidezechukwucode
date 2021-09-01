import { get, getModelSchemaRef, RestBindings } from '@loopback/rest';
import { SuperController } from './super.controller';
import { OPERATION_SECURITY_SPEC } from '../OperationSecuritySpec';
import { inject } from '@loopback/core';
import { IncomingHttpHeaders } from 'http';

interface IHealthStatusCheckResponse {
  Status: string,
  Date: Date,
  EndPoint: string,
  SupportedLanguages: string[],
  HTTPHeaders: IncomingHttpHeaders
};

export class HealthStatusController extends SuperController {
  constructor(  ) {
    super();
  }

  @get('/check', {
    responses: {
      '200': {
        description: 'Health Status Check passed; All Good',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'HealthStatusCheckResponse',
              properties: {
                Status: { type: 'string' },
                Date: { type: 'string' },
                EndPoint: { type: 'string' },
                SupportedLanguages: {
                  type: 'array',
                  items: getModelSchemaRef(String, { includeRelations: false }),
                },
                HTTPHeaders:  {
                  type: 'object',
                  properties: {
                    'Content-Type': { type: 'string' },
                  },
                  additionalProperties: false,
                },
              },
            },
          },
        },
      }
    }
  })
  Check(): IHealthStatusCheckResponse {
    return {
      Status: 'Running...',
      Date: new Date(),
      EndPoint: this.Request.headers.referer || this.Request.originalUrl,
      SupportedLanguages:['en'],
      HTTPHeaders: Object.assign({}, this.Request.headers),
    };
  }
}
