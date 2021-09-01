import { ISuperModelType, IDType } from './types/ISuperModelType';

/**
 * @swagger
 * definition:
 *  ICakeModel:
 *   properties:
 *    ID:
 *     type: IDType
 *    Name:
 *     type: string
 *    Comment:
 *     type: string
 *    ImageUrl:
 *     type: string
 *    YumFactor:
 *     type: number
 */

export interface ICakeModel extends ISuperModelType {
  Name: string;
  Comment: string;
  ImageUrl: string;
  YumFactor: number;
}

export class ICakeModelConstants {
  public static readonly SCHEMA_NAME: string = 'Example';
  public static readonly TABLE_NAME: string = 'Cake';
  public static readonly NAME_LENGTH: number = 30;
  public static readonly COMMENT_LENGTH: number = 200;
  public static readonly IMAGE_URL_LENGTH: number = 2048;
  public static readonly YUM_FACTOR_MIN: number = 1;
  public static readonly YUM_FACTOR_MAX: number = 5;
}
