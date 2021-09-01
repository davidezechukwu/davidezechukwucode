# Decode.Web.Contracts


This is a Typescript package shared by the client and API. It contains contracts (interfaces and abstract supers (abstract base classes and all), constants and types used by both the client and API. The really good thing about Typescript (Javascript to be more precise as Typescript is 'compiles' down to Javascript) is it's unique ability to be used in the client, the API, the ORM, serverless processors and all and even the datastore if MongoDB/CrunchDB/etc are chosen as the Datastore. This promotes the I in SOLID, Interface Segregation Principle. From expierence, it is worth it's weight in gold for just for that alone. There is also the added benefits on everyone across all if not most dev divides using a common languag. Typescript preferable. Javascript does evolve, howeever it inherit lack of support for 'interfaces' makes Typyscript superior in that sense. Typescript also has Generics, setters, etc, etc 

Additional. The system has been built to allow swtiching from numeric ID to string or GUID using just 3 lines of code on https://github.com/davidezechukwu/davidezechukwucode/blob/main/Decode.Web.Contracts.Typescript/src/types/IDType.ts

Numeric IDs pose a security risk, especially when they are sequential. Turn on Sequential ID security features on your DataStore to mitigate against this, if it has any. SQL Server, for example, could be made to generate IDs such as 1,2,10,12,22,... 
Additionally, use Trap (Fake) IDs to detect and block sequential ID page scrappers

Non-numeric IDs such as strings or GUID pose a performance risk on data stores, especially when GIIDs are used as these are 16 Bytes! long as opposed to the 8 Bytes of BigInt (large int, int64,), the 4 Bytes of Int down to the 1 byte of a char-based ID. This is somewhat irrevelant though if the data store is Typescript or Javascript based, as there is only one numeric type, Number.  

A fully normalised (upwards of 3rd normal form) relational OLTP database using GUIDs as keys could potentially have tables with at least 1 primary key, and upwards of 2,3,4,5,etc foreign keys; hence the size of a datarow could potentially be 2 X 16 bytes mininum in size as opposed to the 2 X 1, 2 X 2, 2 X 4, 2 X 8 for a int8, int16, int32, int64 based ones. The figures become more interesting if we assume that most tables would have at least 3 keys rather than the 2 keys example I have used. If covering indexes are used for optimal performance, the number of keys would most certainly exceed 3. Covering indexes provide ultra-fast READ acceess.

So it could potentially be:-  
8 X 16 bytes as opposed to 8 X 1 bytes for a Table with 1 primary key and 7 indexes which all need to form an 8 key index covering index   
128 bytes per row for a QUID based key as opposed to just 4 bytes per row for an int8 based key, in a table with 8 columns, all forming an 8 key covering index.

Traditionally, storage read/write had always(and might still be) the biggest bottleneck any Database System faced in terms of performance however this is now somewhat a lesser concern as solid state storage is now common (not cheap though). However, regardless of whether the storage is solid state or not, a table using 8 bytes per record rather than 128 bytes per record, would still be cheaper and quicker to load as more records could be packed into a single page read or write (assuming <a href='https://whatis.techtarget.com/definition/paging'  target='_blank'>paging</a> is being used for storage access).
