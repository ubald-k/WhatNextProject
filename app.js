const app =  require( "./index");
let port = process.env.PORT;
if  ( port == null ||  port ==""){
  port = 3000;
}

app.listen(port, () =>
  console.log('App listening on port 3000!'),
);
