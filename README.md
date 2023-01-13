# davidezechukwucode

<H1>Notes</h1>
<p>
This mono-repo was a Proof of Concept; and an evaluation of Loopback4(https://loopback.io/doc/en/lb4/) as an ORM and API library. 
There is a newer version of this Repo, based largely on what is here, and only available on request.
It is also the backend for www.pikin.co; and also something I intend to use for other projects. 
www.pikin.co is a work of art and like all works of art, I believe, it should be in the public domain :)
It is a showcase of my frontend skills, and also on my CV. 
The new version of this mono-repo and its Databases are works of art too
<br/>
<br/>
Loopback4 is a great improvement from Loopback 3, however, it lacks support for Composite Keys. 
Whilst this may be good for optimal performance on transactional queries involving tables in 4th Normal Form(as it is inherently easier to create covering indexes in this form). However, it is sometimes undesirable to be restricted to None-Composite Keys as Composite Keys do come in handy in some use cases. 
Support for Express Middleware seems patchy as well unless one hosts the Loopback4 Application as a Route on an Express Application. 
<br/>
<br/>
Typescript is used extensively in this Mono-Repo across the clients, servers, and Databases(if MongoDb or similar is opted for). Having one core language, such as Typescript, reduces the skills required for team members. 
<br/>
<br/>
Typescript and Javascript (in its latest ES2022 version) have grown up immensely over the past few years; they offer (nearly) almost the same
Generic(Template) Functionality as C++ STL does hence heavy use of Generics is made throughout the repo; aiding in the keeping to the Open And Closed Principle. The ID of the objects, for example, is based on a Generic Type; which could be instantiated as a string(GUID, for example) or a number. The choice between string or number IDs has trade-offs; i.e numbers(8,16,32,64bits) are quicker as they occupy less space on storage; and with DISK IO being the slowest database activity, numbers are more performant as more DISK IO PAGES could be crammed into memory with each DISK IO READ. This might not be such a big issue these days when solid memory is cheap as DISK IO activities are much faster on solid memory that do not require any physically spinning DISK MEDIA.  Number-based IDs are subject to attacks though, 
<br/>
<br/>
ie someone doing <code>/getuser/1, getuser/2, getuser/3, getuser/4, getuser/5, etc</code>. 
<br/>
<br/>
Some databases have features to detect such, by purposely skipping on the generated ID sequence, 
<br/>
<br/>
i.e by skipping on the ID sequence and generating <code>user:1, user:4, user:5, user:9, user:11, etc</code>; 
<br/>
<br/>
Any call to <code>getuser/2</code> in the example given above, is either a programming error or a malicious attack :) 
<br/>
<br/>
Backend(s)/database(s) repo available on request
</p>

This repo contains three outdated projects (see notes above)
<ul>
  <li><h2>Decode.Api.Node</h2><p>This is a Typescript Loopback 4 based Restful API</p></li>
  <li><h2>Decode.Web.Angular</h2><p>This is a Typescript Angular 12 based Client</p></li>
  <li><h2>Decode.Web.Contracts.Typescript</h2><p>This is a shared Typescript project that contains the Interfaces, Types, and Constants shared between the API and Client</li>
</ul>
<h2>Further improvements</h2>
<ul>  
  <li>Automated e2e testing on different browsers using automated BrowserStack device profiles</li>
  <li>Near-ish 100% Unit Test Code Coverage from NYC or Instabul or similar </li>
  <li>Dockerisation and Orchestration for dev environment</li>
  <li>Authentication - using a diverse range (2 Factor? SAML2, 2 & 3 Factor Forms Authentication, 2 Factor? OAuth 2.0, 2 Factor? OpenID)</li>
  <li>Switch to either the free Postgres or MongoDB or MySQL or MS SQL Express or the none-free MS SQL Server or Oracle</li>
  <li>Switch to the free Nginx to host entry (HTTPS) website and API, together with other subdomains using (HTTP) reverse proxies </li>
  <li>Switch to Jenkins or similar and use Octopus or similar to handle deployments and environment variable switching and hiding</li>
  <li>Completion of an ultra-fast localization and globalization, hopefully, client-based, for literally anywhere on earth; payments to Google required or failing that, bypassing CORS via some catastrophic and yet unknown failure of CORS protection, unlikey</li>
<li>E-tags caching, Redis caching for lookups, etc, and public files(images, video, audio, SVGs, etc) on external providers. 
<li>Typedoc documentation</li>
<li> Denormalization for non-transactional use cases, using AWS Elastic Search, for example</li>
<li>Use of ETL when applicable, using either MS SSIS or similar (more available from here https://www.softwaretestinghelp.com/best-etl-tools/)</li>
</ul>
