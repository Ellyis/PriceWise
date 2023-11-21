const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');

// // Add stealth plugin and use defaults 
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require('puppeteer');

// Use stealth 
puppeteer.use(StealthPlugin()); 

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  
  // Fetch product page
  const html = await getHTMLContent(url);
  const $ = cheerio.load(html);
  
  // Extract product details
  const title = $('#productTitle').text().trim();
  const currencySymbol = $('.a-price-symbol:first').text();
  const currentPrice = $('.a-price-whole:first').text().replace(/[,]/g, '') + $('.a-price-fraction:first').text();
  const originalPrice = $('.a-text-price > span:first').text().replace(/[^\d.]/g, '');
  const discountRate = $('.savingsPercentage').text().replace(/\D/g, '');
  const stars = $('.reviewCountTextLinkedHistogram').attr('title').split(' ')[0];
  const ratings = $('#acrCustomerReviewText').text().split(' ')[0].replace(/[,]/g, '');
  const available = $('#availability > span').text().trim() === 'In stock';
  
  const images = $('#landingImage').attr('data-a-dynamic-image') || $('#imgTagWrapperId > img').attr('data-a-dynamic-image');
  const imageUrls = Object.keys(JSON.parse(images));

  const description = extractDescription($);
  
  // Construct data object with scraped information
  const data = {
    url,
    title,
    currencySymbol: currencySymbol || '$',
    currentPrice: Number(currentPrice) || Number(originalPrice),
    originalPrice: originalPrice !== '' ? Number(originalPrice) : Number(currentPrice),
    priceHistory: [],
    discountRate: Number(discountRate),
    lowestPrice: Number(currentPrice) || Number(originalPrice),
    highestPrice: originalPrice !== '' ? Number(originalPrice) : Number(currentPrice),
    averagePrice: Number(currentPrice) || Number(originalPrice),
    category: 'category',
    stars: Number(stars),
    ratings: Number(ratings),
    available,
    image: imageUrls[0],
    description,
  }
  // availability

  return data;
};

async function getHTMLContent(url: string) {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: executablePath(),
  });
  
  const page = await browser.newPage();
  await page.waitForTimeout(1000);
  await page.goto(url);
  await page.waitForTimeout(1000);
  
  const html = await page.evaluate(() => document.body.innerHTML);
  await page.waitForTimeout(1000);
  await browser.close();
  
  return html;
}

function extractDescription($: any) {
  const elements = $('.a-unordered-list .a-list-item');
  if (elements.length > 0) {
    const textContent = elements
      .map((_: any, element: any) => $(element).text().trim())
      .get()
      .join("\n");

    return textContent;
  }
}