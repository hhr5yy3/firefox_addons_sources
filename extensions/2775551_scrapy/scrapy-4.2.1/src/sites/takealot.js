let helper = new ScrapyHelper();
var defaultUrl = "https://api.scrapy.co.za/";
const currentDomain = 'takealot';
let page = 0;

// Hook in on all fetch requests
const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    try {
        const response = await origFetch(...args);

        /* work with the cloned response in a separate promise
           chain -- could use the same chain with `await`. */
        if (response.url.includes('https://api.takealot.com/rest/v-1-11-0/searches/product')) {
            page++;
            response.clone().json().then(body => {
                // Reset paging
                try {
                    if (body.sections.products.paging.previous_is_before == '') {
                        page = 1
                    }
                } catch (e) {
                }


                let products = body.sections.products.results.map(function (product) {
                    var brand = null;
                    try {
                        brand = product.product_views.core.brand_url.link_data.fields.brand_slug;
                    } catch (e) {

                    }

                    return {
                        StoreProductId: product.product_views.core.id,
                        Title: product.product_views.core.title,
                        Url: product.product_views.core.slug,
                        ImageUrl: product.product_views.gallery.images[0],
                        Price: product.product_views.buybox_summary.prices[0],
                        ListingPrice: product.product_views.buybox_summary.listing_price,
                        Subtitle: product.product_views.core.subtitle,
                        Brand: brand,
                        // SellerId:  
                        // SellerName: 
                        // Ean: 
                        // Sku:
                        // Mpn: 
                        StarCount: product.product_views.review_summary.star_rating,
                        ReviewCount: product.product_views.review_summary.review_count,
                        // StockCount:
                        StockStatus: product.product_views.stock_availability_summary.status,
                    };
                });
                // console.log(products);
                helper.SubmitProduct(defaultUrl, currentDomain, products, page);
            }).catch(err => console.error(err));
        }

        var removeAds = document.getElementById('scrapy-removeAds').value;
        if (removeAds == "true") {
            if (response.url.includes('https://api.takealot.com/rest/v-1-11-0/sponsored-products')) {

                response.json().then(body => {
                    body.num_items = 0;
                    body.results = [];
                }).catch(err => {
                });
            }
        }

        return response;
    } catch (error) {

    }

};