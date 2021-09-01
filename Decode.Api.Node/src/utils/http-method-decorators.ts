import {param, ParameterObject } from '@loopback/rest';
import * as WebContracts from 'decode.web.contracts.typescript';

export function IDFromPath(name: string, spec?: Partial<ParameterObject> | undefined) {
  if (WebContracts.IDisNumeric) {
    return param.path.number(name, spec);
  }
  else {
    return param.path.string(name, spec);
  }
}
