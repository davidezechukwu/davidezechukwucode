//when IDs are numeric;
//PS: This poses a security risk, especially when IDs are sequential
//Turn on Sequential IDs security features on DataStore to mitigate against this
//For example, SQL Server could be made to generate IDs like 1,2,10,12,22,...
//Additional Use Trap (Fake) IDs to detect and block sequential ID page scrappers 

export type IDType = number;
export const IDTypeName: string = 'number';
export const IDisNumeric: boolean = true;

//when ID is a string (or GUID);
//PS: This poses a performance risk on datasource, especially when GIIDs are used as GUIDS are 16 Bytes! loooong as opposed to 8Bytes of Big Int and 4 Bytes of Int, etc
//export type IDType = string;
//export const IDTypeName: string = 'string';
//export const IDisNumeric: boolean = false
