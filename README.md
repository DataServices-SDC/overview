# DataServices Product API

### Table of Contents

1. [General Info](#🌴-General-Info)
2. [Technologies](#🧪-Technologies)
3. [Installation](#🚀-Installation)
4. [Contributors](#🤝-Contributors)

### General Info

Scalable ecommerce backend with optimizations to handle increased web traffic.

Designed a Node-express server and PostgreSQL database to handle requests from a retail website and provide responses with specifically formatted JSON text.
Server and database were uploaded into Amazon EC2 t2-micro instances:
1 instance running NGINX for load balancing
4 instances running identical images of the node server
1 instance containing the PostgreSQL database
Stress testing conducted using Loader.io for server performance.
Each query contained a product chosen at random from > one million possibilities
Requests were sent at 1000rps intervals

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


