import puppeteer from 'puppeteer';

export const scrapeProduct = async (url) => {
  try {
    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set a user-agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Navigate to the product page
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for necessary elements to appear on the page
    await page.waitForSelector('h1._6EBuvT span.VU-ZEz');
    await page.waitForSelector('div.Nx9bqj');
    await page.waitForSelector('div.ipqd2A');

    // Scraping the necessary details
    const productData = await page.evaluate(() => {
      const title = document.querySelector('h1._6EBuvT span.VU-ZEz')?.innerText || 'No Title';
      const price = document.querySelector('div.Nx9bqj')?.innerText || 'No Price';
      const description = document.querySelector('div.Xbd0Sd p')?.innerText || 
                          document.querySelector('div.yN\\+eNk.w9jEaj')?.innerText || 
                          'No Description';
      
      // Scrape up to 3 reviews
      const reviews = Array.from(document.querySelectorAll('div.col.EPCmJX')).slice(0, 3).map(review => {
        const reviewText = review.querySelector('div.ZmyHeo')?.innerText || 'No review text';
        const username = review.querySelector('p._2NsDsF')?.innerText || 'No Username';
        return { reviewText, username };
      });

      return { title, price, description, reviews };
    });

    // Close the browser
    await browser.close();

    return productData;

  } catch (error) {
    console.error('Error scraping product:', error);
    return null; // Return null in case of error
  }
};
