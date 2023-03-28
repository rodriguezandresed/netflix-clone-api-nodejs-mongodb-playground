# Netflix Express api clone with MongoDb

To start this project you need to install the node dependencies using:

```bash
npm install

```

Create a .env file for your MONGO_URL url from mongoDB and SECRET_KEY for the encription. You can get started by:

```
cp .env.example .env
```

To run the nodemon development server use:

```
npm start
```

## Endpoints

### **Auth**

*Post*
> /auth/register

```js
request: {
  body: {
    "username": "string", //
    "email": "string",
    "password": "string",
  }
}
response: {
  user: {
    "username",
    "email",
  }
}
```

User: (update, delete, show specific and all users)

Movies: (create, update, get specific/all, get random movies)

List: (create, delete, get lists of movies)

All fully authenticated using JWT

Made using Nodejs and mongoDB
