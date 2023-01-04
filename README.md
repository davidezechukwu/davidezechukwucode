# davidezechukwucode

This repo contains three projects (outdated, see notes below)
<ul>
  <li><h2>Decode.Api.Node</h2><p>This is a Typescript Loopback 4 based Restful API</p></li>
  <li><h2>Decode.Web.Angular</h2><p>This is a Typescript Angular 12 based Client</p></li>
  <li><h2>Decode.Web.Contracts.Typescript</h2><p>This is a shared Typescript project that contains the interfaces, types and constants shared between the API and Client</li>
</ul>
<br style="padding: 3em;"/>
<h3>Decode.Api.Node is available at http://decode-root.uksouth.cloudapp.azure.com:3000/api</h3>
<h3>Decode.Web.Angular is available at http://decode-root.uksouth.cloudapp.azure.com</h3>
<h3>Angular Showcase is available at http://pikin.co</h3>
<br style="padding: 3em;"/>
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
</ul>

<H1>Notes</h1>
<p>
This mono-repo was a proof of concept and an evaulation of Loopback4 as an ORM and API library. 
There is a new version of it, based largely on what is here. This is only availalble to potential employers.
It is also the backend for www.pikin.co; and also something I intend to use for other projects. 
The demo frontend for www.pikin.co is a work of art and like all works of art, I believe, it should be on the public domain :)
The APIs and Databases too are works of art. 

Loopback4 is a great improvement from from Loopback 3, however it lacks support for Composite Keys in Objects. 
Whilst this may be good for optimal performance on transactional queries involving tables in 4th Normal Form, with easier Covering Indexes(:))
It is sometimes undesireable being forced to that, as composite keys do come in handy in some use cases. 
Support for Express middleware seems patchy too, unless one hosts the Loopback4 Application as a route on an Express Application. 

Typescript is used through the API(s) and Client(s), with a shared library containing the Interface definitions for API Endpoint 
Request and Response objects. Having one core language also reduces the skills required for team members etc etc. 
Typescript(and Javascript in its latest ES2022 version) have grown up immensenly over the past few years and offers (nearly) almost the same
functional generic functionality as the C++ STL does. Hence the backend makes heavy use of generics. The ID of the objects, for example, 
is based on on a changable type, hence giving the APIs the option of using, integer based IDs or GUIDs, for example. 
Both have trade-off, i.e intergers are quicker being smaller and all. This might not be such a big issue, in these days where solid memory is cheap
They are subject to attacks thu, ie someone doing /getuser/1, getuser/2, getuser/3 etc etc. Some database have features to detect such, by purposely 
skipping on the generated ID sequence, i.e user:1, user:4, user:5; with these any call to getuser/2 is either a programming error or a malicious attack :) 

Backend(s)/database(s) availablel on request





</p>
