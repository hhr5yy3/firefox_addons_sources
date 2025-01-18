import {
  APP_IS_PROD
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/searchAd/constant/adBackList.ts
var WEBCHATGPT_AD_BLACKLIST = [
  "www.maxai.me",
  "www.simplytrends.co",
  "imgcreator.zmo.ai",
  "api.phtracker.com"
];

// src/features/searchAd/constant/adPool.ts
var MAX_AI_LOGO = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIfSURBVHgB7VZNdtpADP40pmTLEcK+4ZUTlBuEG0BPEPoayLLuMuTlFW4AN+AGcAPakH18g7JtAlYkG/IDnsEm8LII3wYz1oy+kT5JBg44YI+4wPi4gXHBZWOwR8yN5+dh6ngPAnp7wzgFeWfYJYFNIV2CTb4GkNjycQt/GzY7QkY0aTIMGb+ucTJCArm8yZ2BoQ5XiFIg634bn/svVzNFQMMqjCuG8DPp/ZE6Dbm47lwRFghc1jNe0UIGnJubnmGqRRt5VrxEOYCFKFPutzxWY1t0/2Pmd1CertqmJrA49O5poxx6iRNrbqN0UO6faCBoc6los0udAi2pl/+ZUHMJMrotY8DMfde5qQjEJWW+riwXPsE0XPvmQNcg7LlsnClwqzoGAyNi7rZRGmALJBKQG1ck5HUR3KnNccJRiWWWiUAT4y8Q9WqpYWsokfB72oi80sAVyn+0yTBjhK3AUxXdPeajtDusGojKDqJ8iut+g+OAmToPmPWTan0rAumIcDBn+pbUlndGYAmdAWvaYKq7RHeBSWUmvy6C6WfBWkORDrdB8aHMDI+wm3F8hVJPRfbs3/guey3lRcSqGgm8lUDkk6m7eLLe/gduqpoumRvDp32EYYtu71ry7k0EROWdKArS+Ww211r/Ubo4eCYuZS1NKqk8M3+QnMvXjYdwYBvFS8TT0NPpOXVNw72iiYnfwq2zj+SwR2jKjlLPkgM+Kh4BCD3Z+9wDNZ0AAAAASUVORK5CYII=`;
var ZMO_LOGO = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAe1BMVEX////+/v75+fn8+/z9/f3c3NzX19f29vbw8PDp6eng4OC9vb0ICAikpKSLi4sJCQmcnJxGRkaAgIAAAABqamoRERE9PT20tLRLS0tfX19lZWUwMDB5eXnu7u4bGxtXV1ePj49zc3MeHh5aWlrMzMwsLCxBQUG3t7clJSVBMt0TAAABRElEQVR4AWIYBQCyyAOJcRAIggO7oLQSlsY5Z/v/LzwK+3KTockfHOBL6QUF7+C9AiJwTv4SXU6KPAh8BsR/KhIyMVZ1CJV634TooG3Xtb4sB2ms0A8pzSA6ptRiSmSal63gm4Ulkv1ALuGjke3KyBxnAsCpNE2zpsUsMGCisZ3IrjNunAfU5RQSt5oFTrojF2HPdKiOPKGskK0NLcqZibvIBRkuZFMEB3UKRNrGY+B1xxOXZu1XuGVBNEsbpgAdLO1pnPiHgCLExE3lMXFxTxx7/rfClqkVxZmp3q77Ge33GQRQNMbH+Xy+T7SDc5iR7Zk2nxvncsmKBhpzHAYuGg/0WWgXzNi9NcC5ZhzH5/O5Wo3rOguvcTzoff1+r+/wJ8B/v7qqvLpczTUoxKPsX8F9+f3tn7r78r/gfozGCjABHRQAAFOaFo1yyPYsAAAAAElFTkSuQmCC`;
var SIMPLYTRENDS_LOGO = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAGwUExURTyM/zyM/zyM/zyM/zyM/zyM/zyO/zyM/zyM/zyM/zyM/zyM/zyL/zyL/zyL/zyM/zqL/zuL/z6N/1ec/4K1/6TJ/7bU/7zX/7LS/5vE/3au/1KZ/z2M/1CY/5zF/+Lu//v9//////7///j7/93r/6fL/16g/1md/8jf//7+//z9//r8/3Cr/0OQ/7fU/+Dt/6jM/4y7/4e4/5XA/7HR/9vq//b6/3ev/2+q//L3/8rg/zmK/8be/0iT/zuM/5rD//P4/ziK/1ue/1+h/6vO/+Xv/6LI//f6//v8/+jx/5K//0SR/06X/8vg//3+/+ny/8Pb/57G/3Ot/1Oa/z+O/2Kj/8nf/+Ht/7DR/3Ks/0uV/87i/7rW/0mU/2uo/7/a/9/s//f7/9Xm/1yf/1Sa/3St/6/Q/+71/6zO/0CO/zmL/3Os/+fx/9zq/02W/7/Z/1GY/0WR/0SQ/+rz/8Xd/3mw/0eS/5C+//T4/7XU/0GP/0KQ/7nW//X5/9Hk/6vN/5O//4i4/8fe/26q//D2/5G+/0KP/7jV/+Tv/36z/53F/7vX/6nN/4++/2im/0aS/5MozE8AAAAPdFJOUwdn1vzSYQdi6+rT1WEHYk7Cwt0AAAABYktHRCHEbA0WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wcMBiYozYW1XgAAAaBJREFUOMuFk2dbwjAUhYvgwEWCuOdFBRUQcSBYrbgQxQFuUNx777339i+buigp1PuhfXrz5j455zQMI4uSqyKUXBEdw8TGqSRKKWPiVZKVwMilATkj/EIIYYzJU9ATAFidoklNS8/IzMrOQWEAnJuXXwCktIVFxbocEYD1JaVktcyg5aEiI6IBUznpmysslVXVNQVgraUBZLMD1OlULMuqsy3m+gaOBhoBHLamHzHNLRx9BnUrQJv+dy7CIhWcE6Bdg9HfThpgNS6Ajk6dO9SmIIC7uomKnl6Pt69/QDgn6MPgUBnvAFiHR3xu8RkI4beM2r9cAseYLmwWKDCeOTE5xSPTM1gM8Agyzc7NLxBicSkcwMtFy+qVVYC1dUwDAnM2AHo3aWDLGGC/e3i7jsRJT0ArO7t7fj4rtH9wCHB0zIUA3MkpwNn5xWXllffaCrBwQ8XNmZy3vLxSg4t/3d4NiMK69z08Gr5s6nF4+pZEcRN9x/qn5/mX09e39w9BXgIfuL+/PiiYAP9enChpQMHIlFLrykQmKVkR+fonyJI+AUPMbVwZgPVWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA3LTEyVDA2OjM4OjI5KzAwOjAwgrEVXwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNy0xMlQwNjozODoyOSswMDowMPPsreMAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDctMTJUMDY6Mzg6NDArMDA6MDD3DsBoAAAAAElFTkSuQmCC`;
var WEBCHATGPT_SEARCH_AD_POOL = [
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: Use AI Anywhere (ChatGPT, Bard, Bing, Claude)`,
    description: `The fastest way to use AI anywhere online. Works literally everywhere - ANY text on ANY website, even local PDF files.`,
    link: `https://api.phtracker.com/app/maxai-web?ref=googlead-maxai-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: The Fastest Way To Use AI Anywhere Online`,
    description: `Powered by ChatGPT, Bard, Bing AI, and Claude. Supports GPT-4, Web Browsing, Code Interpreter, Plugins via ChatGPT Plus.`,
    link: `https://api.phtracker.com/app/maxai-web?ref=googlead-maxai-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: Use ChatGPT Anywhere Online`,
    description: `Use ChatGPT, Bard, Bing AI, and Claude anywhere online without copy-pasting.`,
    link: `https://api.phtracker.com/app/maxai-ext?ref=googlead-maxai-ext`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: Your AI-Powered Copilot for the Web`,
    description: `Access ChatGPT + Bard + Bing instantly. Use AI anywhere online without copy-pasting.`,
    link: `https://api.phtracker.com/app/maxai-ext?ref=googlead-maxai-ext`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: Access ChatGPT + Bard + Bing instantly`,
    description: `1-click to compose, improve writing, summarize, explain, fix spelling & grammar, change tone, translate, or reply to any text on any webpage.`,
    link: `https://api.phtracker.com/app/maxai-ext?ref=googlead-maxai-ext`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: Level up your daily work & web browsing with AI`,
    description: `Compose, improve writing, summarize, explain, fix spelling & grammar, change tone, translate, or reply to any text on any webpage in one click.`,
    link: `https://api.phtracker.com/app/maxai-ext?ref=googlead-maxai-ext`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: ChatGPT Everywhere | Write Better, Anywhere Online`,
    description: `Create better content faster when you bring ChatGPT into your workflow. Try now for free!`,
    link: `https://api.phtracker.com/app/maxai-ext?ref=googlead-maxai-ext`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me/",
    title: `MaxAI.me: 1-click access to ChatGPT & GPT-4 on all websites`,
    description: `Free ChatGPT extension to finish any task on any website in seconds.`,
    link: `https://api.phtracker.com/app/maxai-ext?ref=googlead-maxai-ext`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts`,
    description: `Revolutionize your everyday tasks with 1-Click ChatGPT Prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts`,
    description: `Turn hours-long tasks into minutes using our expanding collection of prompts for marketing, sales, copywriting, operations, productivity, and customer support prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts Library`,
    description: `Complete small business tasks with prompt management & one-click prompts for chatgpt.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `Free ChatGPT Prompts Library`,
    description: `Use it to complete marketing, sales, operation, productivity, and customer support tasks in minutes that used to take hours with ready-to-use prompts for ChatGPT.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts | It's Free`,
    description: `Need to improve strategic planning and creative execution? Accelerate your marketing outputs with our straightforward 1-Click ChatGPT Prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts | It's Free`,
    description: `Having difficulty filling your pipeline and closing deals? Level up your sales strategy, in your own voice and style with 1-Click ChatGPT Prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts | It's Free`,
    description: `Struggling with the speed and quality of your content? Get creative suggestions that are relevant to your business in your voice and style in just one click with our ChatGPT prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts | It's Free`,
    description: `Not doing as much with your 24 hours? Clone yourself and turn ChatGPT into your personal assistant with 1-Click ChatGPT Prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click ChatGPT Prompts | It's Free`,
    description: `Tired of saying the same things to customers over and over? Create a library of consistent empathetic responses in just one click.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "MaxAI.me",
    linkText: "https://www.maxai.me",
    title: `1-Click Prompts | Discover The Best ChatGPT Prompts`,
    description: `Explore the free prompt library to discover the best AI prompts for ChatGPT & Bard. Unlock AI's full potential with 1-Click ChatGPT Prompts.`,
    link: `https://api.phtracker.com/app/prompts-web?ref=googlead-prompts-web`,
    logo: MAX_AI_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `SimplyTrends - Shopify Spy & Dropship Scraper`,
    description: `The ultimate tool for eCommerce and dropshipping business, and a complete 360-degree view of your eCommerce competitors.`,
    link: `https://api.phtracker.com/app/st-ext?ref=googlead-st-ext`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Shopify Spy & Dropshipping Scraper`,
    description: `Free all-in-one Shopify inspector, spy, parser, and dropshipping tools.`,
    link: `https://api.phtracker.com/app/st-ext?ref=googlead-st-ext`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `SimplyTrends - Shopify Spy & Dropship Scraper`,
    description: `Free all-in-one Shopify inspector, spy, parser, and dropshipping tools. Reveal all the secrets behind any Shopify store.`,
    link: `https://api.phtracker.com/app/st-ext?ref=googlead-st-ext`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Shopify Spy & Dropshipping Scraper`,
    description: `The ultimate tool for eCommerce and dropshipping business, and a complete 360-degree view of your eCommerce competitors.`,
    link: `https://api.phtracker.com/app/st-ext?ref=googlead-st-ext`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Uncover accurate sales and revenue of any Shopify store`,
    description: `The leading all-in-one platform for selling with Shopify. Track accurate product sales and revenue, find competitors and winning products.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Winning Ads for Ecommerce`,
    description: `Reveal your competitor's most profitable ads and winning products every day.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Sales Tracking | Shopify Competitor`,
    description: `See accurate product sales of any Shopify store.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Live Orders | Shopify Spy`,
    description: `Monitor live sales of any Shopify store and product in real time.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Find 2M Shopify Stores`,
    description: `Find all your competitors and reveal all their secrets with a few clicks.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Research 200M Shopify Products`,
    description: `Search through millions of products with revenue revealed.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "SimplyTrends",
    linkText: "https://www.simplytrends.co",
    title: `Find the best suppliers for any product`,
    description: `Reverse image search or keyword search for any product on all popular supplier platforms at once.`,
    link: `https://api.phtracker.com/app/st-web?ref=googlead-st-web`,
    logo: SIMPLYTRENDS_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: Remove Background and Create Product Photos`,
    description: `Remove background from images in 3 seconds for free. Create professional-looking product photos instantly.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: Remove Background from Image for Free`,
    description: `Remove background from images online with our free background eraser. Create professional-looking product photos instantly for free.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: Free Image Background Remover`,
    description: `Instantly remove image backgrounds online with our free background eraser. Fast, free, and no signup is required.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: Swap Faces Online For Free`,
    description: `Swap face to AI model in seconds with studio quality. Also enjoy swapping clothes and background as you select.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: AI Face Swapper`,
    description: `Swap any face online in seconds. Seamless, easy, and fast.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: AI Art Generator`,
    description: `Create Stunning AI Art in seconds. 100+ models and styles to choose from.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: Free AI Image Generator`,
    description: `Create amazing artwork in seconds using the power of AI. 100+ models and styles to choose from.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: AI Art Generator Online & Free`,
    description: `Turn imagination into art and 10x Your Creative. 100+ models and styles to choose from.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: AI Anime Generator`,
    description: `Convert anything to anime in seconds. Get your AI anime avatar with one click today!`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  },
  {
    subTitle: "ZMO.AI",
    linkText: "https://imgcreator.zmo.ai/",
    title: `ImgCreator.AI: Turn any image royalty free`,
    description: `Use Image Variation to turn any image online into a unique and copyright-free version. Create your own versions of any image found online.`,
    link: `https://api.phtracker.com/app/imgcreator?ref=googlead-imgcreator`,
    logo: ZMO_LOGO
  }
];

// src/features/searchAd/constant/index.ts
var SEARCH_AD_BY_NAME = "webchatgpt";
var SEARCH_AD_COUNTER_KEY = "SEARCH_AD_COUNTER_KEY";
var SEARCH_AD_CRX_INFO_API_MAP = {
  webchatgpt: "https://www.phtracker.com/crx/info/da/a",
  modeHeader: "https://www.phtracker.com/crx/info/da/b"
};
var SEARCH_AD_CRX_INFO_API = SEARCH_AD_CRX_INFO_API_MAP[SEARCH_AD_BY_NAME];
var SEARCH_AD_POOL_MAP = {
  webchatgpt: WEBCHATGPT_SEARCH_AD_POOL,
  // TODO: 两个插件暂时公用一个 pool
  modeHeader: WEBCHATGPT_SEARCH_AD_POOL
};
var SEARCH_AD_POOL = SEARCH_AD_POOL_MAP[SEARCH_AD_BY_NAME];
var LINKS_BLACKLIST_MAP = {
  webchatgpt: WEBCHATGPT_AD_BLACKLIST,
  // TODO: 两个插件暂时公用一个 backlist
  modeHeader: WEBCHATGPT_AD_BLACKLIST
};
var LINKS_BLACKLIST = LINKS_BLACKLIST_MAP[SEARCH_AD_BY_NAME];
var SEARCH_AD_REF_FLAG_MAP = {
  webchatgpt: "a",
  modeHeader: "b"
};
var SEARCH_AD_REF_FLAG = SEARCH_AD_REF_FLAG_MAP[SEARCH_AD_BY_NAME];

// src/features/searchAd/utils/searchAdCrxInfo.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var SEARCH_AD_CRX_INFO_INFO_KEY = "SEARCH_AD_CRX_INFO_INFO_STORAGE_KEY";
var VALIDITY_PERIOD = 1e3 * 60 * 60 * 24;
var defaultSearchAdCrxInfoSettings = {
  disableVersion: "0.0.0",
  interval: 0,
  cacheTime: 0
};
var getSearchAdCrxInfoSettings = async () => {
  var _a;
  const localData = await import_webextension_polyfill.default.storage.local.get(SEARCH_AD_CRX_INFO_INFO_KEY);
  const settings = (_a = localData[SEARCH_AD_CRX_INFO_INFO_KEY]) != null ? _a : defaultSearchAdCrxInfoSettings;
  return settings;
};
var saveSearchAdCrxInfoSettings = async (value) => {
  return await import_webextension_polyfill.default.storage.local.set({
    [SEARCH_AD_CRX_INFO_INFO_KEY]: value
  });
};
async function cacheSearchAdCrxInfo() {
  var _a;
  try {
    const data = await getSearchAdCrxInfoSettings();
    const currentTime = Date.now();
    if (APP_IS_PROD && currentTime - data.cacheTime <= VALIDITY_PERIOD) {
      return;
    }
    const result = await fetch(SEARCH_AD_CRX_INFO_API);
    if (result.status === 200) {
      const htmlBody = await result.text();
      const versionMatchResult = htmlBody.match(
        /<text id="dv">([\s\S]*?)<\/text>/
      );
      const disableAdVersion = versionMatchResult == null ? void 0 : versionMatchResult[1];
      const intervalMatchResult = htmlBody.match(
        /<text id="cc">(?<data>\d+)<\/text>/
      );
      const interval = (_a = intervalMatchResult == null ? void 0 : intervalMatchResult.groups) == null ? void 0 : _a.data;
      if (disableAdVersion && interval) {
        await saveSearchAdCrxInfoSettings({
          disableVersion: disableAdVersion,
          interval: Number(interval),
          cacheTime: Date.now()
        });
      }
    }
  } catch (e) {
  }
}
async function cacheSearchAdCrxInfoWithIframe() {
  const url = SEARCH_AD_CRX_INFO_API;
  const data = await getSearchAdCrxInfoSettings();
  const currentTime = Date.now();
  if (APP_IS_PROD && currentTime - data.cacheTime <= VALIDITY_PERIOD) {
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.display = "none";
  window.addEventListener("message", function(event) {
    try {
      const data2 = JSON.parse(event.data);
      const listenEventName = new URL(url).pathname.slice(1);
      if (data2.event === listenEventName) {
        saveSearchAdCrxInfoSettings({
          disableVersion: data2.vv,
          interval: Number(data2.cc),
          cacheTime: Date.now()
        });
      }
    } catch (error) {
    }
  });
  document.body.append(iframe);
}

export {
  SEARCH_AD_BY_NAME,
  SEARCH_AD_COUNTER_KEY,
  SEARCH_AD_POOL,
  LINKS_BLACKLIST,
  SEARCH_AD_REF_FLAG,
  getSearchAdCrxInfoSettings,
  cacheSearchAdCrxInfo,
  cacheSearchAdCrxInfoWithIframe
};
