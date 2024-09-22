# Currency-Convert-project

# Backend API - Node.js


## Installation
npm install
npm run dev


## API Endpoints

http://localhost:3000/api

## API Endpoints - CURRENCY CONVERSION 
curl --location 'http://localhost:3000/api/calculate' \
--header 'accept: blob' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'priority: u=1, i' \
--header 'sec-ch-ua: "Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "Windows"' \
--header 'sec-fetch-dest: empty' \
--header 'sec-fetch-mode: cors' \
--header 'sec-fetch-site: same-site' \
--header 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' \
--header 'Content-Type: application/json' \
--data '{
    "item": "pen",
    "category": "groceries",
    "totalAmount": 96,
    "userType": "affiliate",
    "customerTenure": "20",
    "originalCurrency": "INR",
    "targetCurrency": "USD"
}'


## API Endpoints - LOGIN
curl --location 'http://localhost:3000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "ggrvbm@gmail.com",
    "password": "12345678"
}'



## API Endpoints - REGISTER
curl --location 'http://localhost:3000/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "sanakr",
        "mobileNo": "8220768175",
        "email": "ggrvbm@gmail.com",
        "password": "12345678",
        "confirmPassword": "12345678111",
        "userType": "employee",
        "gender": "male"
    }'

## Environment Variables

SERVICE_NAME="Currency Convertion Project"
env="development"
PORT="3000"
CURRENCY_EXCHAGE_URL = "https://v6.exchangerate-api.com/v6"
CURRENCY_EXCHAGE_AUTH_KEY ="5b52f081577e0718ddd577bc"
JWT_SECRET = "1234567890"
MONGO_URI ="mongodb+srv://amitkumarpro007:EXd5Z3BmSxZGGguE@gowri.9ob81.mongodb.net/currency-convert?retryWrites=true&w=majority&appName=gowri"

