# DiSultano

Full-Stack web app for managing restaurant products and customer orders.
It is a POS app that has 3 types of users (Guest, Admin and System Admin)
in which each user has different permissions for example: only admin's can manage store products and categories.On the Other hand guest only can make orders,
and may be act as kitchen user that can manage the state of order details.Order details watcher is implemented using web socket when new product is ordered it's send to kitchen users that are allowed to manage it's state.

<br/>

## Product Features

This full-stack app is built using a decoupled architecture, where the **React** frontend communicates with the **Flask** backend through secure
ajax call(**Axios**).

- **Flask** backend.
- Database, managed by ORM.
- JWT token authentication.
- RESTful Web Services.
- Login and Registration features.
- Managing state with **Redux** , **Redux-Saga** as middleware for side effect code.

<br />

## Install

```
$ git clone https://github.com/khalaf-ahmad/DiSultano.git
```

## DiSultano backend

The backend server is a simple **Flask** with JWT authentication, SQLAlchemy ORM, SocketIo and RESTful API.

<br />

To run **Flask** app two environment variables must be provided you can add .env file inside backend folder:

- SECRET_KEY &nbsp;&nbsp; # app secret key
- SQLALCHEMY_DATABASE_URI &nbsp;&nbsp;# connection string to the database. Postgresql / Sqlite db

```
$ cd backend
$ pipenv install # install dependencies using Pipfile
$ pipenv run python run.py # start the Flask server
```

<br />

## DiSultano frontend

**React** app enhanced with JWT Authentication with fully functional login & registration flow.

To run **React** app one environment variable is required:

- REACT_APP_BASE_URL &nbsp; # backend URL &nbsp; IpAddress:Port.

```
$ cd frontend
$ npm install
$ npm start
```

<br />
