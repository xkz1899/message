# Message (In developing)

Message is a mobile and desktop messaging web-app using PERN Stack.

#### Main page:

![main page](./images/main.png)

#### Message area page:

![catalog page](./images/message.png)

#### User cart page:

![catalog page](./images/user-cart.png)

#### View from phone page:

![catalog page](./images/adaptiv-1.png)
![catalog page](./images/adaptiv-2.png)

## Installation Guide

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download/)

Both should be installed and make sure postgreSQL is running.

```shell
git clone https://github.com/xkz1899/message.git
cd message
```

Install the dependencies.

```shell
cd server
npm install
cd ../client
npm install
cd ..
```

#### Create a database named "message" in the database postgreSQL.

#### Start server.

```shell
cd server
npm start
```

#### Start client.

```shell
cd client
npm start
```

Now open http://localhost:3000 in your browser.
