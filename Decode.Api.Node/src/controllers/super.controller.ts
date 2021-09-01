import { Request } from '@loopback/rest';
import { RestBindings } from '@loopback/rest';
import { BindingKey, inject } from '@loopback/core';
import { WinstonLogger } from '@loopback/logging';
import { WINSTON_LOGGER } from '../binding-keys'

export class SuperController {
  constructor(
    
  ) {    
  }
  @inject(RestBindings.Http.REQUEST)
  protected Request: Request;
  @inject(WINSTON_LOGGER)
  protected Logger: WinstonLogger;
}

