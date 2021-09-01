import { globalInterceptor, Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/core';
import { RestBindings, Request } from '@loopback/rest';
import { Filter } from '@loopback/repository';
import { ErrorHandlingUtils } from '../utils';
import * as WebContracts from 'decode.web.contracts.typescript';

/**
 * This class will be bound to the application as an `Interceptor` during `boot`
 */
@globalInterceptor('', {tags: {name: 'SwaggerBug'}})
export class SwaggerBugInterceptor implements Provider<Interceptor> {
  /*
  constructor() {}
  */

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
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      if (!WebContracts.IDisNumeric) {
        //in a real word scenario, add code here that will decycrpt either a HTML Form, a Route Param, a URL Param, a Cookie or  a Header encrypted ID(which would be possibly a string ) to it's numeric value
        //this is one security feature, one of many, used to prevent hackers from trolling through an entire resource collection by incrementing numeric keys
        //alternative a GUID could be used client side and associated with the appropriate numeric ID here
        //see IDisNumeric, IDType on WebContracts for more infor
      }

      let errors: string[] = [];
      //handle annoying swagger explorer bug in which Request Body defaults to {"additionalProp1": { } } for GET\{id} and { "where": {"additionalProp1": { }}} for GET
      let request = await invocationCtx.get(RestBindings.Http.REQUEST, { optional: true, });
      if (!request) {
        // Not http request
        return next();
      }
      switch (request!.method.toUpperCase()) {
        case 'GET':
          const targetName = invocationCtx.targetName.toLowerCase().substr(invocationCtx.targetName.toLowerCase().lastIndexOf('.prototype.') + 1);
          switch (targetName) {
            case 'prototype.find':
              let findFilter: Filter<any> = {};
              Object.assign(findFilter, invocationCtx.args[0]);
              if ((findFilter?.where as any)?.additionalProp1 && Object.keys((findFilter?.where as any)?.additionalProp1).length === 0 && (findFilter?.where as any)?.additionalProp1.constructor === Object) {
                delete (findFilter?.where as any)?.additionalProp1
                invocationCtx.args[0] = findFilter;
              }
              break;
            case 'prototype.count':
            case 'prototype.updateAll':
              let countFilter: Filter<any> = {};
              Object.assign(countFilter, invocationCtx.args[0]);
              if ((countFilter as any)?.additionalProp1 && Object.keys((countFilter as any)?.additionalProp1).length === 0 && (countFilter as any)?.additionalProp1.constructor === Object) {
                delete (countFilter as any)?.additionalProp1;
                invocationCtx.args[0] = countFilter;
              }
              break;
            default:
              break
          }
          break;        
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
