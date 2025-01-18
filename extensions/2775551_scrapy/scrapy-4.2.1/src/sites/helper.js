class ScrapyHelper {
    // Converts json object to base64
    ToBase64 = function (object) {
        let objJsonStr = JSON.stringify(object);
        let objJsonB64 = Base64.encode(objJsonStr);
        return objJsonB64;
    }

    // Submit the product
    SubmitProduct = function (url, domain, object, page) {
        let userId = document.getElementById('scrapy-user-input')?.value;
        var postUrl = url + 'api/products';
        var body = {
            Data: helper.ToBase64(object),
            Store: domain,
            Key: '',
            Uid: userId,
            Page: page
        };

        fetch(postUrl,
            {
                body: JSON.stringify(body),
                method: "post",
                headers: {
                    'content-type': 'application/json'
                }
            });
    }


    // Product formatters

    FormatDiyElectronicsProduct = function (documentProduct) {
        let product = null;
        try {
            const product_store_id = documentProduct.querySelector('.product-reference').textContent;
            const title = documentProduct.querySelector('.product-name').textContent.replace(/\n/g, '').replace(/\t/g, '');
            const price = documentProduct.querySelector('span.product-price').textContent.replace(/\n/g, '').replace(/\t/g, '').replace("R", "").replace(" ", "");
            let listing_price = documentProduct.querySelector('span.product-price')?.textContent.replace(/\n/g, '').replace(/\t/g, '').replace("R", "").replace(" ", "");
            if (listing_price == null) {
                listing_price = price;
            }
            const url = documentProduct.querySelector('a.product-name').getAttribute("href").replace(websiteUrl, "");
            const stock_status = documentProduct.querySelector('.availabile_product').textContent;
            const image = documentProduct.querySelector('.product_img_link>img').getAttribute("data-original");

            product = {
                StoreProductId: product_store_id,
                Title: title,
                Url: url,
                ImageUrl: image,
                Price: price,
                ListingPrice: listing_price,
                // Subtitle: 
                // Brand:  
                // SellerId:  
                // SellerName:     
                // Ean: ean13
                // Sku:
                // Mpn:
                // StarCount: 
                // ReviewCount:
                // StockCount:
                StockStatus: stock_status
            };

        } catch (error) {

        }
        return product;
    }

    FormatEvetechProduct = function (documentProduct) {
        let product = null;
        try {
            const url = documentProduct.querySelector('a').getAttribute("href").replace(websiteUrl, "");
            var product_store_id = url.substring(url.lastIndexOf('/') + 1).replace(".aspx", "");
            const title = documentProduct.querySelector('.text-center > h3').textContent;
            const price = documentProduct.querySelector('[class*="ComponentCard_Products__Price"]').textContent.replace("R", "").replace(/\s/g, '');
            let listing_price = price;
            const stock_status = 'In stock';
            const image = documentProduct.querySelector('[class*="ComponentCard_Products__Image"]').getAttribute("src");
            let subtitle;

            if (product_store_id.length > 10) {
                product_store_id = url.substring(url.lastIndexOf('-') + 1).replace(".aspx", "");
            }

            product = {
                StoreProductId: product_store_id,
                Title: title,
                Url: url,
                ImageUrl: image,
                Price: price,
                ListingPrice: listing_price,
                Subtitle: subtitle,
                // Brand:  
                // SellerId:  
                // SellerName:     
                // Ean: ean13
                // Sku:
                // Mpn:
                // StarCount: 
                // ReviewCount:
                // StockCount:
                StockStatus: stock_status
            };
        } catch (error) {

        }
        return product;
    }

    FormatGeewizProduct = function (documentProduct) {
        let product = null;
        try {
            const product_store_id = documentProduct.getAttribute('data-id-product');
            const title = documentProduct.querySelector('.product-title').textContent;
            const price = documentProduct.querySelector('.price').textContent.replace("R", "").replace(/\s/g, '');
            let listing_price = documentProduct.querySelector('.regular-price')?.textContent.replace("R", "");
            if (listing_price == null) {
                listing_price = price;
            }
            const url = documentProduct.querySelector('.product-title>a').getAttribute("href").replace(websiteUrl, "");
            const stock_status = documentProduct.querySelector('.product-availability').textContent.replace(/\n/g, '');
            const image = documentProduct.querySelector('img.img-fluid').getAttribute("src");
            let star_rating = null;
            if (documentProduct.querySelector('.rating-star-yellow>label')?.length > 5) {
                star_rating = documentProduct.querySelector('.rating-star-yellow>label.checked').length / 2;
            }
            else {
                star_rating = documentProduct.querySelector('.rating-star-yellow>label.checked')?.length;
            }

            product = {
                StoreProductId: product_store_id,
                Title: title,
                Url: url,
                ImageUrl: image,
                Price: price,
                ListingPrice: listing_price,
                // Subtitle: subtitle,
                // Brand: brand,
                // SellerId:  
                // SellerName:     
                // Ean: ean13,
                // Sku:
                // Mpn:
                StarCount: star_rating,
                // ReviewCount:
                // StockCount:
                StockStatus: stock_status
            };
        } catch (error) {

        }
        return product;
    }

    FormatHiFiProduct = function (documentProduct) {
        let product = null;
        try {
            const product_store_id = documentProduct.querySelector('.price-box').getAttribute('data-product-id');
            const title = documentProduct.querySelector('.product-item-link').textContent.replace('\n', '');
            const price = documentProduct.querySelector('span[data-price-type="finalPrice"]').getAttribute('data-price-amount');
            let listing_price = documentProduct.querySelector('span[data-price-type="oldPrice"]')?.getAttribute('data-price-amount');
            if (listing_price == null) {
                listing_price = price;
            }
            const url = documentProduct.querySelector('.product-item-link').getAttribute("href").replace(websiteUrl, "");
            const stock_status = 'Available';
            const image = documentProduct.querySelector('img.product-image-photo').getAttribute("src");
            let subtitle;
            let brand;
            // let star_rating = (parseInt(documentProduct.querySelector('.review-mask').style.width.replace('%', '')) / 100) * 5;
            // let reviewCount = parseIntdocumentProduct.querySelector('.review-summary-stars .count').textContent != '' ?
            //     documentProduct.querySelector('.review-summary-stars .count').textContent : 0;
            let sku = documentProduct.querySelector('.actions-primary > form').getAttribute('data-product-sku');

            product = {
                StoreProductId: product_store_id,
                Title: title,
                Url: url,
                ImageUrl: image,
                Price: price,
                ListingPrice: listing_price,
                Subtitle: subtitle,
                Brand: brand,
                // SellerId:  
                // SellerName:     
                // Ean: ean13,
                Sku: sku,
                // Mpn:
                // StarCount: star_rating,
                // ReviewCount: reviewCount,
                // StockCount:
                StockStatus: stock_status
            };
        } catch (error) {

        }
        return product;
    }

    FormatIncredibleProduct = function (documentProduct) {
        let product = null;
        try {
            const product_store_id = documentProduct.querySelector('.price-box').getAttribute('data-product-id');
            const title = documentProduct.querySelector('.product-item-link').textContent.replace('\n', '');
            const price = documentProduct.querySelector('span[data-price-type="finalPrice"]').getAttribute('data-price-amount');
            let listing_price = documentProduct.querySelector('span[data-price-type="oldPrice"]')?.getAttribute('data-price-amount');
            if (listing_price == null) {
                listing_price = price;
            }
            const url = documentProduct.querySelector('.product-item-link').getAttribute("href").replace(websiteUrl, "");
            const stock_status = 'Available';
            const image = documentProduct.querySelector('img.product-image-photo').getAttribute("src");
            let subtitle;
            let brand;
            // let star_rating = (parseInt(documentProduct.querySelector('.review-mask').style.width.replace('%', '')) / 100) * 5;
            // let reviewCount = parseIntdocumentProduct.querySelector('.review-summary-stars .count').textContent != '' ?
            //     documentProduct.querySelector('.review-summary-stars .count').textContent : 0;
            let sku = documentProduct.querySelector('.actions-primary > form').getAttribute('data-product-sku');

            product = {
                StoreProductId: product_store_id,
                Title: title,
                Url: url,
                ImageUrl: image,
                Price: price,
                ListingPrice: listing_price,
                Subtitle: subtitle,
                Brand: brand,
                // SellerId:  
                // SellerName:     
                // Ean: ean13,
                Sku: sku,
                // Mpn:
                // StarCount: star_rating,
                // ReviewCount: reviewCount,
                // StockCount:
                StockStatus: stock_status
            };
        } catch (error) {

        }
        return product;
    }

    FormatWootwareProduct = function (documentProduct) {
        let product = null;
        try {
            const product_store_id = documentProduct.querySelector('span.price').getAttribute('id').match('.*\-(.*)')[1];
            const price = documentProduct.querySelector('[id^=product-price]').textContent.replace(/\s/g, '').replace("R", "");
            const title = documentProduct.querySelector('.product-name').textContent;
            let listing_price = documentProduct.querySelector('.old-price')?.textContent.replace(/\s/g, '').replace("R", "");
            if (listing_price == null) {
                listing_price = price;
            }
            const url = documentProduct.querySelector('.product-name>a').getAttribute("href").replace(websiteUrl, "");
            const stock_status = documentProduct.querySelector('.availability-in-stock').textContent;
            const image = documentProduct.querySelector(`#product-collection-image-${product_store_id}`).getAttribute("data-src");
            let reviews = 0;
            let star_rating;
            try {
                reviews = documentProduct.querySelector('.rating-box>.rating').getAttribute('style').match(/\d+/)[0];
                star_rating = documentProduct.querySelector('.ratings>.amount').textContent.replace("Review(s)", "");
            } catch (error) {

            }

            product = {
                StoreProductId: product_store_id,
                Title: title,
                Url: url,
                ImageUrl: image,
                Price: price,
                ListingPrice: listing_price,
                // Subtitle: 
                // Brand:  
                // SellerId:  
                // SellerName:     
                // Ean: ean13
                // Sku:
                // Mpn:
                // StarCount: 
                ReviewCount: reviews,
                // StockCount:
                StockStatus: stock_status
            };
        } catch (error) {

        }
        return product;
    }

};

var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (r) { var t, e, o, a, h, n, c, d = "", C = 0; for (r = Base64._utf8_encode(r); C < r.length;)a = (t = r.charCodeAt(C++)) >> 2, h = (3 & t) << 4 | (e = r.charCodeAt(C++)) >> 4, n = (15 & e) << 2 | (o = r.charCodeAt(C++)) >> 6, c = 63 & o, isNaN(e) ? n = c = 64 : isNaN(o) && (c = 64), d = d + this._keyStr.charAt(a) + this._keyStr.charAt(h) + this._keyStr.charAt(n) + this._keyStr.charAt(c); return d }, decode: function (r) { var t, e, o, a, h, n, c = "", d = 0; for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < r.length;)t = this._keyStr.indexOf(r.charAt(d++)) << 2 | (a = this._keyStr.indexOf(r.charAt(d++))) >> 4, e = (15 & a) << 4 | (h = this._keyStr.indexOf(r.charAt(d++))) >> 2, o = (3 & h) << 6 | (n = this._keyStr.indexOf(r.charAt(d++))), c += String.fromCharCode(t), 64 != h && (c += String.fromCharCode(e)), 64 != n && (c += String.fromCharCode(o)); return c = Base64._utf8_decode(c) }, _utf8_encode: function (r) { r = r.replace(/\r\n/g, "\n"); for (var t = "", e = 0; e < r.length; e++) { var o = r.charCodeAt(e); o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128)) } return t }, _utf8_decode: function (r) { for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length;)(o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), e++) : o > 191 && o < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), e += 3); return t } };

