// sitemap-generator.js

const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// 1. Setup output file path
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

// 2. Create a write stream to that path
const writeStream = createWriteStream(sitemapPath);

// 3. Create sitemap stream with your domain
const sitemap = new SitemapStream({ hostname: 'https://mephub.lk' });

// 4. Pipe sitemap stream to file write stream
sitemap.pipe(writeStream);

// 5. Define all your routes here
const routes = [
  '/', '/contact', '/about', '/privacy', '/terms',
  '/projects', '/projects/123',
  '/consultants', '/consultants/123',
  '/contractors', '/contractors/123',
  '/agents', '/agents/123',
  '/lecturers', '/lecturers/123',
  '/Institutions', '/Institutions/123',
  '/directors', '/directors/123',
  '/job-vacancies', '/job-vacancies/123',
  '/jobseekers', '/jobseekers/123'
];

// 6. Write each route to the sitemap stream
routes.forEach(route => {
  sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
});

// 7. End the stream and log success
sitemap.end();
writeStream.on('finish', () => {
  console.log('✅ Sitemap successfully created at /public/sitemap.xml');
});
