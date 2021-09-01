import { ISuperModelType, IDType } from './types/ISuperModelType';
import { ILanguageModelConstants } from './ILanguageModel';

/**
 * @swagger
 * definition:
 *  ICakeModel:
 *   properties:
 *    ID:
 *     type: IDType
 *    ISO639_1_Code:
 *     type: string
 *    IsOnLowSpeedConnection:
 *     type: boolean
 *    DisableAnimations:
 *     type: boolean
 *    ShowBackgroundVideo:
 *     type: boolean
 */

export interface IProfileModel extends ISuperModelType {
  Language_ISO639_1_Code: string;
  Language_IsRTL: boolean;
  IsOnLowSpeedConnection: boolean;
  DisableAnimations: boolean;
  ShowBackgroundVideo: boolean;
}

export class IProfileModelConstants {
  public static readonly SCHEMA_NAME: string = 'User';
  public static readonly TABLE_NAME: string = 'Profile';
  public static readonly Language_ISO639_1_Code_LENGTH: number = ILanguageModelConstants.ISO639_1_CODE_LENGTH;
}
