import { IDType } from './IDType'
import { IModel } from '../IModel';
import { ISuperModel } from '../ISuperModel';
export { IDType, IDisNumeric } from './IDType';

//use export type ISuperModelType = IModel if Soft deletes, Created by, Created on, Updated by, Updated on, Valid to, Valid from
//export type ISuperModelType = IModel;

//use export type ISuperModelType = ISuperModel if ID is just required
//export type ISuperModelType = ISuperModel

//you can also pick from which keys to use(ID is mandatory though)
//export type ISuperModelType = ISuperModel & Pick<IModel, 'CreatedBy' | 'CreatedOn' | 'UpdatedBy' | 'UpdatedOn' | 'IsDeleted'>;
export type ISuperModelType = ISuperModel & Pick<IModel, 'IsDeleted'>;
