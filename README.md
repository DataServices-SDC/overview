# DataServices Product API

### Table of Contents

1. [General Info](#🌴-General-Info)
2. [Technologies](#🧪-Technologies)
3. [Installation](#🚀-Installation)
4. [Contributors](#🤝-Contributors)

### General Info

Scalable ecommerce backend with optimizations to handle increased web traffic.

* Designed a Node-express server and PostgreSQL database to handle requests from a retail website and provide responses with specifically formatted JSON text.
* Server and database were uploaded into Amazon EC2 t2-micro instances:
* 1 instance running NGINX for load balancing
* 4 instances running identical images of the node server
* 1 instance containing the PostgreSQL database
* Stress testing conducted using Loader.io for server performance.
* Each query contained a product chosen at random from > one million possibilities
* Requests were sent at 1000rps intervals

* Optimized with load balancing, bringing response times down from 800ms to 11ms while handling over 1,000 clients per second with no timeouts and < 0.1% error rate
* Optimized database query response times from 2400ms to 7ms by implementing database indexes


### 🧪 Technologies

* Node
* Express
* PostgreSQL
* AWS EC2
* NGINX
* Loader.io
* Axios
* Nodemon
* Postman

### 🤝 Contributor

- [Jason Adams](https://www.linkedin.com/in/jason-adams-b88086146/)


