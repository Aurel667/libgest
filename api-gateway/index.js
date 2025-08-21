const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Proxy vers chaque microservice
app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL, // auth-service
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
  cookieDomainRewrite: process.env.COOKIE_DOMAIN || "localhost"
}));
app.use('/api/books', createProxyMiddleware({
  target: process.env.BOOKS_SERVICE_URL, // books-service
  changeOrigin: true,
  pathRewrite: { '^/api/books': '' },
  cookieDomainRewrite: process.env.COOKIE_DOMAIN || "localhost"
}));
app.use('/api/lendings', createProxyMiddleware({
    target: process.env.LENDING_SERVICE_URL, // lending-service
    changeOrigin: true,
    pathRewrite: { '^/api/lendings': '' },
    cookieDomainRewrite: process.env.COOKIE_DOMAIN || "localhost"
}));

app.listen(4000, () => {
  console.log('API Gateway running on http://localhost:4000');
});