
# ProductDB
populateDB.js => is a script that connects to a database cluster created using MongoDB Atlas, and popoluates the database with 10000 entries
app.js => basically queries the database and renders the results on a basic html page with EJS template engine 

## Deployment

To run this project

```bash
  npm install mongoose
  npm install faker
  npm install express
```

After that run app.js 

```bash
    node app.js
```

then paste the following URL on your browser:

http://localhost:3000/?tags=Electronics,Clothing,Sports&categories=Sports&minPrice=100&maxPrice=105

where you can change the tags,categories,and set a minPrice and a maxPrice for your query

