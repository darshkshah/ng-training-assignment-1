# How to run
**Video link** demonstrated running the application and the features: https://youtu.be/BbTrGe2laJI

## Now to run this application have docker and git installed:

Check if they are installed using the commands `git --version` and `docker --version` if not you can install **docker for windows** from https://docs.docker.com/desktop/setup/install/windows-install/ and **docker for ubuntu** from https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04. You can also use the snap command `sudo snap install docker` to install docker on ubuntu.

After installing docker and git follow these steps:
1) Clone this Repository. 
2) Inside the terminal with this repository, Run the command
- `docker compose up --build`
3) Wait for compose to finish and it will create 3 containers for backend, frontend and database. It will start the project on <b>localhost</b>. Compose will take care of everything. No need to worry about environment.
4) Open this link for Frontend http://localhost:4200/login
5) Backend will run on http://localhost:8000. Open this link for API Information: 
- http://localhost:8000/api/schema/swagger-ui/
- http://localhost:8000/api/schema/redoc/
6) Use any database viewing tool for postgresql. I use pgAdmin 4. Database connection is on the:

- Port: 5433
- Username: darshshah
- Password: password123
- Database name: todo

7) Run the command `docker attach dev-todo-frontend` to attach your terminal to docker frontend container's terminal
8) Run the command `docker attach dev-todo-backend` to attach your terminal to docker backend container's terminal


# Features
This application features :
- Frontend made using **Angular**
- Backend made using **Django** (Django REST Framework)
- **PostgreSQL** for the database
- **Docker based development environment.** Any changes on the files made while the application is running will be reflected on the running application in realtime through the bind mounts. Though bind mounts works best with linux/WSL host and the alpine based docker containers. Bind mounts dont work well with windows file system as host and alpine based docker containers.
- **Create, Read, Edit, Delete**, Tasks integration on the UI with the backend apis.
- **Cookie based authentication** UI integration (authenticates using cookies stored on the browser). Successful login sets the cookie and logout calls the delete cookies api.

# API Endpoints Information

## Postman Workspace
https://www.postman.com/todo-api-2676/enzigma-todo/overview


## The swagger-ui and redoc also has good API documentation.
> Run the application using docker compose to preview these links
- http://localhost:8000/api/schema/swagger-ui/
- http://localhost:8000/api/schema/redoc/