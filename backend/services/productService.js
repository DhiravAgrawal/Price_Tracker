import puppeteer from 'puppeteer';

export const scrapeProduct = async (url) => {
  try {

    const browser = await puppeteer.launch({
      executablePath: '/opt/render/.cache/puppeteer/chrome',  // Set correct path to Chrome
      headless: true,  // Keep headless mode for scraping
      args: ['--no-sandbox', '--disable-setuid-sandbox']  // Required for running Puppeteer on Render
    });
  
    const page = await browser.newPage();

    // Set a user-agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Go to the product page
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the title, price, and description elements to appear
    await page.waitForSelector('h1._6EBuvT span.VU-ZEz');
    await page.waitForSelector('div.Nx9bqj');
    // await page.waitForSelector('div.Xbd0Sd p');
    await page.waitForSelector('div.ipqd2A');

    // Scraping the necessary details
    const productData = await page.evaluate(() => {
      const title = document.querySelector('h1._6EBuvT span.VU-ZEz')?.innerText || 'No Title';
      const price = document.querySelector('div.Nx9bqj')?.innerText || 'No Price';
      const description = document.querySelector('div.Xbd0Sd p')?.innerText || 'No Description';
      
      // Scrape up to 3 reviews
      const reviews = Array.from(document.querySelectorAll('div.col.EPCmJX')).slice(0, 3).map(review => {
        const reviewText = review.querySelector('div.ZmyHeo')?.innerText || 'No review text';
        const username = review.querySelector('p._2NsDsF')?.innerText || 'No Username';
        return { reviewText, username };
      });

      return {
        title,
        price,
        description,
        reviews
      };
    });

    // Close the browser
    await browser.close();

    return productData;

  } catch (error) {
    console.error('Error scraping Flipkart:', error);
    return null;
  }
};

// Example usage:
// const productUrl = 'https://www.flipkart.com/lg-185-l-direct-cool-single-door-5-star-refrigerator/p/itme111bace73d90?pid=RFRGMFGQDSZT8QJN';
// scrapeProduct(productUrl).then((data) => {
//   console.log('Scraped Product Data:', data);
// });
