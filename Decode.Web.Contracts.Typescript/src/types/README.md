# Types

<p><strong style="color:maroon">This directory contains the source code for the types used on this app.</strong></p>

You can switch from numeric IDs to non-numeric IDs using just 3 lines of code in IDType.ts
When IDs are numeric, this poses a security risk, especially when the IDs are sequential
Turn on Sequential IDs security features on the DataStore to mitigate against this
For example, SQL Server could be made to generate IDs like 1,2,10,12,22,...
Additionally use Trap (Fake) IDs to detect and block sequential ID page scrappers 

export type IDType = number;
export const IDTypeName: string = 'number';
export const IDisNumeric: boolean = true;

When IDs are strings (or GUIDs), this poses a performance risk on datasource, especially when GIIDs are used as GUIDS are 16 Bytes! loooong as opposed to 8Bytes of Big Int and 4 Bytes of Int, etc
export type IDType = string;
export const IDTypeName: string = 'string';
export const IDisNumeric: boolean = false

And you are good to go!!
