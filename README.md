## Assignment Documentation 

>> Project Structure
- HTML Files:
1) LogIn.html : Contains the login form.
2) CustomerList.html : Displays the list of customers and also provides a form for updating customer details.
3) AddCustomerDetails.html : Form for adding a new customer.

- Proxy Server:
1) proxy-server.js: A simple Node.js server used to overcome CORS issues.


>> CORS Handling
- Due to CORS restrictions, a proxy server (proxy-server.js) has been set up to facilitate communication with the target API.

>> Proxy Server Setup :
1) Install Node.js if not already installed.
2) Open a terminal and navigate to the directory containing proxy-server.js.
3) Run the following commands:
    npm init -y
    npm install express axios
    node proxy-server.js

4) The proxy server will run on http://localhost:3000.


