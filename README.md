
# davidezechukwucode

<H1>Notes</h1>
<p>
This mono-repo was a Proof of Concept; and an evaluation of Loopback4(https://loopback.io/doc/en/lb4/) as an ORM and API library. 
<p>
<blink><strong>Please do not attempt to install as the installation documentation on the README.md of this particular repo is outdated and incomplete</strong></blink>
</p>

<UL>
<LI><H5>The API is available for preview at: https://decodeonline.app/api with "web" device( web browser, default) english (en), french (fr) & punjanbi (pa) & urdu (ur, RTL)localisation. </H5></LI>
<LI><H5>The Responsive Website client is available for preview at: https://decodeonline.app with "web" device( web browser, default) english (en), french (fr) & punjanbi (pa) & urdu (ur, RTL)localisation. </H5></LI>
<LI><H5>The IOS/Andriod/? Mobile App clients are available for preview at: [TODO:]. [TODO:]. [TODO:]. </H5></LI>
<LI><H5>The micro(Rasperry Pi)/IOT(Azure/AWS/Google) clients are available for preview at: [TODO:] </H5></LI>
<LI><H5>A more advanced Responsive Website client Proof Of Concept is available for preview at: http://www.pikin.co</H5></LI>
</UL>
<strong>https://decodeonline.app</strong> is a <strong>Loopback4 RESTFUL API</strong> and set of microservices that  handle Periodic Reporting  and Notifications using <strong>SMS, Email, Skype, iMessenger </strong>amonst others. 
It supports <strong>XML, HTML, Excel, PDF, Text</strong>, and <strong>JSON</strong> output conten types. 
Outputs are <strong>localized</strong> and <strong>globalized</strong>. 

The API is <strong>datastore-agnostic</strong> i.e. it could use <strong>MongoDB, Postgres, MSSQL</strong> or even another <strong>Web Services</strong> as it's data store. 

It also has a really nice <strong>HealthCheck</strong> which renders its output as either <strong>HTML, XML, JSON, or Text </strong>.  All API Endpoints allow the on-the-fly conversion of output to  to XHTML using XSLT, 
see the Browser HTML output at: <strong>https://decodeonline.app/api/v1/healthcheck/healthstatus.</strong> for an example of this.

There is a dockerised development, avilable on development environments <strong>SMTP</strong> server and an email client available at <strong>https://decodeonline.app/emails</strong>

<strong>http://www.pikin.co</strong> is the UX POC counterpart, that supports localization (left & right languages) and globalization, and a layered client architecture; it <strong>work of art</strong>, and like all works of art, I believe, it should be in the public domain 

There is a newer version of this Repo, based largely on what is here, and only available on request.

The newer version of this mono-repo has been broken up into several NPM packages, with a shared core package that contains the contracts (Interfaces & Super (Base) Partial and Fully Abstract classes) which is shared between the API, Microservices, and Clients( Web, Mobile App, etc). This ensures consistency across the application layers (Typescript enforces compile-time checks to make sure these contracts are adhered to by the clients and backend servers)

<strong>Loopback4</strong> is a great improvement from Loopback 3, however, it lacks support for Composite Keys. 
Whilst this may be good for optimal performance on transactional queries involving tables in <strong>4th Normal Form</strong>(as it is inherently easier to create covering indexes in this <strong>Form</strong>), it is sometimes undesirable to be restricted to just to <strong>None-Composite</strong> Keys; as <strong>Composite Keys</strong> do come in handy in some use cases. 

Support for <strong>Express Middleware</strong> seems patchy as well unless one hosts the Loopback4 Application as a Route on an Express Application. Loopback4 being an ORM, it can use Non-SQL Databases and it can also use the more conventional Relational Databases such as Oracle, MS SQLServer, Postgres & MySQl. It has the ability to define and hydrate tables with migrations. Migration support is minimal though, offering just <strong>Seeding</strong> and <strong>Upgrades</strong>; hence a third-party Library such as db-migrate(https://db-migrate.readthedocs.io/en/latest/,  https://www.npmjs.com/package/db-migrate) is required, to handle more advanced migrations such as <strong>Versioned Updategrade and Downgrade</strong>steps. 

<br/>
<strong>Typescript</strong> is used extensively in this Mono-Repo, across the clients, servers, and even Databases(if the <strong>Javascript/JSON-based</strong> Database such as <strong>MongoDb</strong> or similar is opted for, when applicable). 
Having one core language, such as Typescript, reduces the skills required for team members. 
<br/>
<br/>
<strong>Typescript and Javascript</strong> (in its latest ES2022 version) have grown up immensely over the past few years; they offer (nearly) almost the same
Generic(Template) Functionality as C++ STL does hence heavy use of Generics is made throughout the repo; aiding in the keeping to the Open And Closed Principle. The ID of the objects, for example, is based on a Generic Type; which could be instantiated as a string(GUID, for example) or a number. 
<br/>
<br/>
<strong>The choice between string , GUIDs or numeric IDs has trade-offs; </strong>
Numeric Ds are quicker as they occupy less space on storage; and with DISK IO being the slowest database activity, numerid IDs are more performant as more data records could be crammed into memory with each DISK IO read or Write 

<strong>For example:-</strong> 
A standard <strong>Person</strong> table, suchas as the one below, in 3rd Normal Formal, with 3 16Bytes GUID foreign keys, when a 1 BYTE number key wiould have done, would have (16 * 3) - 3 == 45Bytes redundant Bytes per record
```
Person (
    Id : GUID(16 Bytes), 
    Firstname: VARCHAR(max 35 Bytes), 
    LastName: VARCHAR(max 35 Bytes), 
    NoOfDependants(1 Byte), 
    Age: TINY INT(1 Byte), 
    GenderId: GUID(16 Bytes), 
    TitleId: GUID(16 Bytes)
)
```
This table has an allocation of 120 Bytes person record. 
<br/>
Assuming a page size of 32KB, only 266 records would be packed into each 32KB page. Constrast the same <strong>Person</strong> table below whose better design means 355 records would be packed into each 32KB page.  A massive 33% increase!; at least on paper; more if the complete table is small enough to live completely in memory.  
A  <strong>TINY INT </strong> (0-256 when unsigned) is capable of holding all the possible values for Gender or Title.

    Person(
        Id : GUID(16 Bytes),   
        Firstname: VARCHAR(max 35 Bytes),   
        LastName: VARCHAR(max 35 Bytes),   
        NoOfDependants(1 Byte),   
        Age: TINYINT(1 Byte),   
        GenderId: TINYINT(1 Byte),   
        TitleId: TINYINT(1 Byte)  
    )

This table has a smaller allocation of 90 Bytes person record. 
Note: This might not be such a big issue these days when solid memory is cheap as DISK IO activities are much faster on solid memory which do not require any physically spinning DISK MEDIA.  
Number-based IDs are more performant but they are easier to attack.
An attack could be someone screen-scraping a website, using calls such as these:- 

    site/getuser/1, 
    site/getuser/2, 
    site/getuser/3, 
    site/getuser/4, 
    site/getuser/5
    etc
Some databases have features to detect such, by purposely skipping on the generated ID sequence, i.e 

    user:1, 
    user:4, 
    user:5, 
    user:9, 
    user:11, 
    etc
Any call to <code>getuser/2</code> in the example given above, is either a programming error or a malicious attack :) 
<h2> These projects  contains three outdated and incomplete code, notes and finer details  (see notes above)</h2>
<ul>
  <li><h2>Decode.Api.Node</h2><p>This is a Typescript Loopback 4 based Restful API</p></li>
  <li><h2>Decode.Web.Angular</h2><p>This is a Typescript Angular 12 based Client</p></li>
  <li><h2>Decode.Web.Contracts.Typescript</h2><p>This is a shared Typescript project that contains the Interfaces, Types, and Constants shared between the API and Client</li>
</ul>
<h2>Further improvements</h2>
<ul>  
  <li>Container Image Management & Security</li>
  <li>Istio integreation</li>
  <li>Helmfile and Hem Charts integreation</li>  
  <li>Azure Resource Manager (ARM) Templates & Blueprints</li>
  <li>Azure API Gateway</li>
  <li>Azure IAM and Policies</li>
  <li>Load, Chaos and Performance Testing</li>    
  <li>Near-ish 100% Automated e2e testing on different browsers using automated BrowserStack device profiles</li>
  <li>Near-ish 100% Unit Test Code Coverage from NYC or Instabul or similar </li>
  <li><s>Dockerisation and Orchestration for the dev and test (and staging possibly) environments</s></li>
  <li><s>Authentication - using a diverse range (2 Factor? SAML2, 2 & 3 Factor Forms Authentication, 2 Factor? OAuth 2.0, 2 Factor? OpenID)</s><i>Partially</i></li>
  <li><s>Switch to either the free Postgres or MongoDB or MySQL or MS SQL Express or the none-free MS SQL Server or Oracle</s></li>
  <li><s>Switch to the free Nginx to host entry (HTTPS) website and API, together with other subdomains using (HTTP) reverse proxies</s><i>Done with some Technical debts</i></li>
  <li><s>Switch to Jenkins or similar and use Octopus or similar to handle deployments and environment variable switching and hiding</s><i>Azure DevOps(with cron/pm2/azure vms/unix shell scripts, docker(including a dockerised SMTP server) used in dev, test   and staging?)</i></li>
  <li><s>Completion of an ultra-fast localization and globalization, hopefully, client-based, for literally anywhere on earth; payments to Google required or failing that, bypassing CORS via some catastrophic and yet unknown failure of CORS protection, unlikey</s></li>
<li>E-tags caching, Redis caching for lookups, etc, and public files(images, video, audio, SVGs, etc) on external providers. 
<li><s>Typedoc documentation</s> <i>This is now auto-compiled from the source code and made available on the main swagger endpoint as wikis and external links</i></li>
<li><s>Denormalization for non-transactional use cases, using AWS Elastic Search</s> <i>Partially</i></li>
<li>Use of ETL when applicable, using either MS SSIS or similar (more available from here https://www.softwaretestinghelp.com/best-etl-tools/)</li>
<li>More concise and expansive document using Typedoc, cuurrently less than 15% of object are documented (most times badly)</li>
<li>Improve README.md for all packages, including step by step instructures on how to setup a dev and live test environment, acquisition and handling of private/public keys from a shared Vault, SSL Certificates, endpoints, etc</li>
<li>Tidy up the documentation landing page at https://decodeonline.app/api/v1/docs/index.html (adding links to Sharepoint, Jira)</li>
<li>Support more languages; beside english (en), french (fr) & punjanbi (pa, RTL) localisation. Note that localised Text and other media are device-dependent, ie a text on a browser might be longer and more verbose than that on a small screen mobile phone or RasperryPi-type device</li>  
<li>Add maintainance page, early-warning of maintenance schedule to logged on users, proper site shutdown </li>
</ul>

