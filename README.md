# How to run

Have docker and git installed:

1) Clone this Repository. 
2) Inside the terminal with this repository, Run the command
- `docker compose up`
3) Wait for compose to finish and it will create 3 containers for backend, frontend and database. It will start the project on <b>localhost</b>. Compose will take care of everything. No need to worry about environment.
4) Open this link for Frontend http://localhost:4200/login
5) Open this link for Documentation: 
- http://localhost:8000/api/schema/swagger-ui/
- http://localhost:8000/api/schema/redoc/
6) Use any database viewing tool for postgresql. I use pgAdmin 4. Database connection is on the:

- Port: 5433
- Username: darshshah
- Password: password123
- Database name: todo

7) Run the command `docker attach dev-todo-frontend` to attach your terminal to docker frontend container's terminal
8) Run the command `docker attach dev-todo-backend` to attach your terminal to docker backend container's terminal

Video link demonstrated running the application and the features: https://youtu.be/BbTrGe2laJI