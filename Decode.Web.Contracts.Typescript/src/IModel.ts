import { ISuperModel } from "./ISuperModel";
import { IDType } from "./types/IDType";

/**
 * @swagger
 * definition:
 *  ISuperModel:
 *   properties:
 *    ID:
 *     type: IDType
 *    CreatedBy:
 *     type: IDType
 *    CreatedOn:
 *     type: date
 *    UpdatedBy:
 *     type: IDType
 *    UpdatedOn:
 *     type: date
 *    ValidFrom:
 *     type: date
 *    ValidTo:
 *     type: date
 *    IsDeleted:
 *      type: boolean
 */
export interface IModel extends ISuperModel {
  CreatedBy?: IDType;
  CreatedOn?: Date;
  UpdatedBy?: IDType;
  UpdatedOn?: Date;
  ValidFrom?: Date;
  ValidTo?: Date;
  IsDeleted?: boolean;
}
/*
* mixed views on the benefits of soft deletes( the use of isDeleted, is Active, etc) and it's impact on query performance and extra coding complexity.
* Query performance issues could be mitaged though, by partiontioning on this key.
* Audit logs or use of the Event Sourcing Architectural Pattern are alternatives to soft deletes
*/
