
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


export async function getProductsList(page=1, limit=30) {
    try {
        return await fetchData(
            `/products?page=${page}&limit=${limit}`,
            null, 'GET');
    } catch (e) {
        return { products: [], error: e.toString() };
    }
}

export async function findProducts(page=1, limit=999, pattern) {
    try {
        return await fetchData(
            `/search?str=${pattern}&page=${page}&limit=${limit}`,
            null, 'GET');
    } catch (e) {
        return { products: [], error: e.toString() };
    }
}

export async function getProduct(prodId) {
    try {
        return await fetchData(
            `/products/${prodId}`,
            null, 'GET');
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

export async function getAllLists() { // {name: name, phone: phone, message: message, cart: cart, sum: sum}
    try {
        let listData = await fetchData(
            `/lists/`,
            null, 'GET');
        return listData.lists;
    } catch (e) {
        return { lists: [], error: e.toString() };
    }
}

export async function getAllListUrls() { // {name: name, phone: phone, message: message, cart: cart, sum: sum}
    try {
        let listData = await fetchData(
            `/lists/`,
            null, 'GET');
        return listData.lists.map(l => {
            return '/'+l.url;
        });
    } catch (e) {
        return { listUrls: [], error: e.toString() };
    }
}

export async function getListProducts(listUrl, page=1, limit=999) {
    try {
        return await fetchData(
            `/lists/${listUrl}?page=${page}&limit=${limit}`,
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