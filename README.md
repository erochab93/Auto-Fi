"# Auto-Fi" 


- Clone repository.

```
   git clone https://github.com/erochab93/Auto-Fi.git

   npm install

```

- Run this command to run 

```
npm run start
```


This project was develop based on the following requirements:
    1) Design an API to upload CSV files, with a specific format
    2) The logic of the endpoint should clean unnecessary columns and only upload the mandatory columns

In order to satisfy the requirements the following flow was used:
    1) This API will use a mongodb-memory-server in order to test locally
    2) This API will check for not declared routes and catch and return a status code according to the resource not found.
    3) Will check the CSV columns and remove the additional columns included, in case the columns don't have all the necessary columns the CSV will no be imported.
    4) This code uses a service module in order to develop unit testing in an easier way
    5) In case an unhandled exception appear the routes will re-route the exception and return the error message

This project design, have the benefit to be able to add routes for further modules easier and some utils that could be reused if is necessary in order to don't duplicate code
