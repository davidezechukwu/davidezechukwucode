import { globalInterceptor, Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/core';
import { RestBindings, Request } from '@loopback/rest';
import { Filter } from '@loopback/repository';
import { ErrorHandlingUtils } from '../utils';
import * as WebContracts from 'decode.web.contracts.typescript';
import { IDType } from 'decode.web.contracts.typescript';

/**
 * This class will be bound to the application as an `Interceptor` during `boot`
 */
@globalInterceptor('', { tags: { name: 'RequestValidator'}})
export class RequestValidatorInterceptor implements Provider<Interceptor> {
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
        case 'PATCH':
          let _id: WebContracts.IDType | undefined = undefined;
          if (WebContracts.IDisNumeric) {
            _id = (parseInt((invocationCtx?.source?.value as any)?.pathParams?.id)) as unknown as IDType;
          }
          else {
            _id = (invocationCtx?.source?.value as any)?.pathParams?.id;
          }
          if (typeof _id === 'undefined') {
            break;
          }
        case 'PUT':
          //Ensure that the designating ID Route Param matches the  designating ID FormData in single patch and put ops
          let id: WebContracts.IDType;
          if (WebContracts.IDisNumeric) {
            id = (parseInt((invocationCtx?.source?.value as any)?.pathParams?.id)) as unknown as IDType;
          }
          else {
            id = (invocationCtx?.source?.value as any)?.pathParams?.id;
          }
          let model: { ID: WebContracts.IDType } = Object.create({});
          Object.assign(model, invocationCtx.args[1]);
          if (id.toString() !== (model.ID as any).toString()) {
            errors.push(`For better compliance with W3C and best practices, we insist that the Path Parameter {ID:${id}} must match the ID FormData:${JSON.stringify(model)}`);
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
