<div  align="center">

# Mini app for Telegram.

### Mini-app store for buying/selling game metadata.

</div>

<br><br>

<div  align="center">
  <img height="600" src="/front/public/preview/main.png">
  <img height="600" src="/front/public/preview/product_page.png">
</div>

<br><br>

#### Start backend:

1.   The backend  requires [S3 Minio storage](https://hub.docker.com/r/minio/minio) and [PostgresSQL](https://hub.docker.com/_/postgres) .
2. You need to enter the config file .env:	
```
TOKEN_SECRET = "For JWT"
PRODUCT_SECRET = "For Encrypt metadata"
PORT = "your port"
YUKASSA_AUTH_KEY = "YooKassa KEY auth"
YUKASSA_SHOP_ID = "YooKasse ID Shop"
```
3. Installing dependencies 
```bash
npm install
```
4. Start app 
```bash
npm run start
```

#### Start frontend:
1. You need to enter the config file .env.production:	
```
REACT_APP_BASE_URL = "your API url"
REACT_APP_BRAND_ID = "created brand ID"
REACT_APP_VERSION=$npm_package_version
```
2. Installing dependencies 
```bash
npm install
```
3. Start app 
```bash
npm run start
```


