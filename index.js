import express from 'express';
import http from 'http';
import fs from 'fs';
import { dirname } from 'path';
import url, { fileURLToPath } from 'url';
import slugify from 'slugify';

import { replaceTemplate } from './modules/replaceTemplate.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tempOverview = fs.readFileSync(`${__dirname}\\templates\\template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}\\templates\\template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}\\templates\\template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}\\dev-data\\data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(ele => slugify(ele.productName, {lower: true}));
console.log('slugs', slugs);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true)
    // const pathName = req.url;




    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(ele => replaceTemplate(tempCard, ele)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output);
    // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});

        // query = {id: '0'}
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    }

    // res.end('Hello from the server');
})

const app = new express();

server.listen('3000', '127.0.0.1', () => {
    console.log('Listening on port 3000');
})