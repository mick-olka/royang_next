
// Example POST method implementation:


async function fetchData(url = '', data = null, method) {
    // Default options are marked with *
    const response = await fetch('http://192.168.1.164:7500'+url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
    });
    if (response.status !== 200 && response.status !== 304 && response.status !== 0) {
        throw new Error("Error fetching products");
    }
    return response.json(); // parses JSON response into native JavaScript objects
}


export async function getProductsList(page=1, limit=30, locale="ua") {
    try {
        return await fetchData(
            `/products?page=${page}&limit=${limit}&locale=${locale}`,
            null, 'GET');
    } catch (e) {
        return { products: [], error: e.toString() };
    }
}

export async function findProducts(page=1, limit=999, pattern, locale) {
    try {
        return await fetchData(
            `/search?str=${pattern}&page=${page}&limit=${limit}&locale=${locale}`,
            null, 'GET');
    } catch (e) {
        return { products: [], error: e.toString() };
    }
}

export async function getProduct(prodId, locale="ua") {
    try {
        let prodData = await fetchData(
            `/products/${prodId}?locale=${locale}`,
            null, 'GET');
        // prodData = {...prodData,
        //     name: prodData.name[locale],
        //     description: prodData.description[locale],
        //     features: prodData.features.map(f=>{
        //         return f[locale];
        //     }),
        //     images: prodData.images.map(i=>{
        //         return {...i, mainColor: i.mainColor[locale], pillColor: i.pillColor[locale]}
        //     }),
        // };
        return prodData;
    } catch (e) {
        return { product: {}, error: e.toString() };
    }
}

export async function fetchNewOrder(data) { // {name: name, phone: phone, message: message, cart: cart, sum: sum}
    try {
        return await fetchData(
            `/orders/`,
            JSON.stringify(data), 'POST');
    } catch (e) {
        return { error: e.toString() };
    }
}

export async function patchProduct(prodId, data) { // {name: name, phone: phone, message: message, cart: cart, sum: sum}
    try {
        return await fetchData(
            `/products/${prodId}`,
            JSON.stringify(data), 'PATCH');
    } catch (e) {
        return { error: e.toString() };
    }
}

export async function getAllLists(locale="ua") { // {name: name, phone: phone, message: message, cart: cart, sum: sum}
    try {
        let listData = await fetchData(
            `/lists/?locale=${locale}`,
            null, 'GET');
        return listData.lists;
    } catch (e) {
        return { lists: [], error: e.toString() };
    }
}

export async function getAllListUrls(locale="ua") { // {name: name, phone: phone, message: message, cart: cart, sum: sum}
    try {
        let listData = await fetchData(
            `/lists/?locale=${locale}`,
            null, 'GET');
        return listData.lists.map(l => {
            return {
                params: {
                    listUrl: l.url
                }
            }
        });
    } catch (e) {
        return { listUrls: [], error: e.toString() };
    }
}

export async function getListProducts(listUrl, page=1, limit=999, locale="ua") {
    try {
        return await fetchData(
            `/lists/${listUrl}?page=${page}&limit=${limit}&locale=${locale}`,
            null, 'GET');
    } catch (e) {
        return { products: [], error: e.toString() };
    }
}

export async function getGallery() {
    try {
        return await fetchData(
            '/photos/gallery',
            null, 'GET');
    } catch (e) {
        return { gallery: [], error: e.toString() };
    }
}

export async function getColorsPhotos() {
    try {
        return await fetchData(
            '/photos/colors/',
            null, 'GET');
    } catch (e) {
        return { gallery: [], error: e.toString() };
    }
}

export async function getAllProductsIds() {
    const prodList = await getProductsList(1, 999);
    return prodList.products.map(p => {
        return {
            params: {
                id: p.url_name
            }
        }
    })
}