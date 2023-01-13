# davidezechukwucode

<H1>Notes</h1>
<p>
This mono-repo was a Proof of Concept; and an evaulation of Loopback4(https://loopback.io/doc/en/lb4/) as an ORM and API library. 
There is a newer version of this Repo, based largely on what is here, and only availalble on request.
It is also the backend for www.pikin.co; and also something I intend to use for other projects. 
www.pikin.co is a work of art and like all works of art, I believe, it should be on the public domain :)
It is a showcase of my frontend skills, and also on my CV. 
The new version of this mono-repo and it's Databases are works of art too

Loopback4 is a great improvement from from Loopback 3, however it lacks support for Composite Keys. 
Whilst this may be good for optimal performance on transactional queries involving tables in 4th Normal Form(as it is inherently easier to create covering indexes in this form). However it is sometimes undesireable being forced to use not to use Composite keys as do come in handy in some usecases. 
Support for Express middleware seems patchy too, unless one hosts the Loopback4 Application as a route on an Express Application. 
<br/>
Typescript is used this mono-repo (server, client and db if mongodb or similiar is chosen), with a shared library containing the common contracts shared by the servers and clients and database. Having one core language also reduces the skills required for team members etc etc. 
Typescript and Javascript (in its latest ES2022 version) have grown up immensenly over the past few years; they offer (nearly) almost the same
generic functionality as the old C++ STL do and still does. Heavy use of Generics is made use of on the repo; aiding in the keeping to the Open And Closed Principle. The ID of the objects, for example, is based on a Generic Type; it could be based on either on strings(Guids for exmple) or numbers. 
Both have trade-off, i.e numbers(8,16,32,64bits) are quicker as they occupy less space on storage; DISK IO is the slowest activity as far as databases go;
hence this makes numbers more performant as more db pages could be cramed into memory with each DISK IO READ. This might not be such a big issue these days when solid memory is cheap (DISK IO activities are much faster on solid memory). Number based IDs are subject to attacks though, 
ie someone doing /getuser/1, getuser/2, getuser/3 etc etc. 
<br/>
Some database have features to detect such, by purposely skipping on the generated ID sequence, 
<br/>
i.e user:1, user:4, user:5; 
<br/>
Any call to getuser/2, above, is either a programming error or a malicious attack :) 
<br/>
Backend(s)/database(s) repo availablel on request
</p>

This repo contains three projects (outdated, see notes below)
<ul>
  <li><h2>Decode.Api.Node</h2><p>This is a Typescript Loopback 4 based Restful API</p></li>
  <li><h2>Decode.Web.Angular</h2><p>This is a Typescript Angular 12 based Client</p></li>
  <li><h2>Decode.Web.Contracts.Typescript</h2><p>This is a shared Typescript project that contains the interfaces, types and constants shared between the API and Client</li>
</ul>
<h2>Further improvements</h2>
<ul>  
  <li>Automated e2e testing on different browsers using automated BrowserStack device profiles</li>
  <li>Near-ish 100% Unit Test Code Coverage from NYC or Instabul or similiar</li>
  <li>Dockerisation and Orchestration for dev environment</li>
  <li>Authentication - using a diverse range (2 Factor? SAML2, 2 & 3 Factor Forms Authentication, 2 Factor? OAuth 2.0, 2 Factor? OpenID)</li>
  <li>Switch to either postgress or mongo or mysql or sqlexpress </li>
  <li>Switch to nginx to host entry (HTTPS) website and api, together with other sub domains using (HTTP) reverse proxies </li>
  <li>Switch to Jenkins or similiar and use Octopus or similiar to handle deployments and environment variable switching and hiding</li>
  <li>Completion of an ultra-fast localisation and globalisation, hopefully client-based, for literally anywhere on earth; payments to Google required or failing that, bypassing CORS via some castrophic and yet unknown failure of CORS protection, unlikey</li>
<li>E-tags caching, redis caching for lookups, etc, and public files(images, video, audio, svgs, etc) on external providers. 
<li>Typedoc documentation</li>
<li>denormalisation for non-transactional use cases, using AWS Elastic Search for example</li>
<li>Use of ETL when applicable, from say SSIS or similiar from here https://www.softwaretestinghelp.com/best-etl-tools/</li>
</ul>
