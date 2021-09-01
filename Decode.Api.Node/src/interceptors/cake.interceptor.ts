import fs from 'fs';
import path from 'path';
import { inject, injectable, Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/core';
import { RestBindings, Request } from '@loopback/rest';
import { Cake } from '../models/cake.model';
import { Filter } from '@loopback/repository';
import { ErrorHandlingUtils } from '../utils';
import * as WebContracts from 'decode.web.contracts.typescript';
import { IDType } from 'decode.web.contracts.typescript';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({ tags: { key: CakeInterceptor.BINDING_KEY } })
export class CakeInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${CakeInterceptor.name}`;

  constructor(
    @inject(RestBindings.Http.REQUEST)
    private request: Request
  ) {
  }

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<InvocationResult>) {
    // Add controller pre-invocation logic here
    try {            
      let errors: string[] = [];      
      switch (this.request.method.toUpperCase()) {        
        case 'PATCH':
          //handle batch patch for bulk updates and creation
          if (this.request.path.toLowerCase() == '/cakes') {
            let cakes: Cake[] = [];
            Object.assign(cakes, invocationCtx.args[0]);
            cakes.forEach(cake => {
              if (!cake?.Name.trim().length) {
                errors.push("Name must be provided for " + JSON.stringify(cake))
              };
              if (!cake?.Comment.trim().length) {
                errors.push("Comment must be provided in " + JSON.stringify(cake))
              } 
              if (!cake.YumFactor) {
                errors.push("YumFactor must be provided in " + JSON.stringify(cake))  
              }
              if (!cake?.ImageUrl.trim().length) {
                errors.push("ImageUrl must be provided for " + JSON.stringify(cake))
              } else {
                let destinationfilename = '';
                if (path.isAbsolute(cake.ImageUrl.trim())) {
                  destinationfilename = cake.ImageUrl.trim();
                }
                else {
                  destinationfilename = path.join(process.cwd(), process.env.CAKE_UPLOAD_PATH!, cake.ImageUrl!);
                }
                if (!fs.existsSync(destinationfilename)) {
                  errors.push("Unable to find the ImageUrl provided in " + JSON.stringify(cake))
                }
              }
            });
            break;
          }        
        default:
          break;
      }

      if (errors.length > 0) {
        ErrorHandlingUtils.ThrowError(400, this.constructor.name, errors.join('\n'));
      }
      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
