import { ISuperModelType, IDType } from './types/ISuperModelType';

/**
 * @swagger
 * definition:
 *  ILanguageModel:
 *   properties:
 *    ID:
 *     type: IDType
 *    LanguageName:
 *     type: string
 *    NativeName:
 *     type: string
 *    ISO639_1_Code:
 *     type: string
 *    ISO639_2T_Code:
 *     type: string
 *    ISO639_3_Code:
 *     type: string
 *    IsRTL:
 *     type: boolean
 */

export interface ILanguageModel extends ISuperModelType {        
    LanguageName: string;
    NativeName: string;
    ISO639_1_Code: string;
    ISO639_2T_Code?: string;
    ISO639_3_Code?: string;
    IsRTL: boolean;
}

export class ILanguageModelConstants {
    public static readonly SCHEMA_NAME: string = 'Taxonomy';
    public static readonly TABLE_NAME: string = 'Languages';
    public static readonly LANGUAGE_NAME_LENGTH: number = 100;
    public static readonly NATIVE_NAME_LENGTH: number = 100;
    public static readonly ISO639_1_CODE_LENGTH: number = 70;
    public static readonly ISO639_2_CODE_LENGTH: number = 70;
    public static readonly ISO639_3_CODE_LENGTH: number = 70;
}
