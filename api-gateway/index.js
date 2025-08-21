const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Proxy vers chaque microservice
app.use('/api/auth', createProxyMiddleware({
  target: 'http://localhost:5000', // auth-service
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
  cookieDomainRewrite: "localhost"
}));
app.use('/api/books', createProxyMiddleware({
  target: 'http://localhost:5001', // books-service
  changeOrigin: true,
  pathRewrite: { '^/api/books': '' },
  cookieDomainRewrite: "localhost"
}));
app.use('/api/lendings', createProxyMiddleware({
  target: 'http://localhost:5002', // lending-service
  changeOrigin: true,
  pathRewrite: { '^/api/lendings': '' },
  cookieDomainRewrite: "localhost"
}));

app.listen(4000, () => {
  console.log('API Gateway running on http://localhost:4000');
});