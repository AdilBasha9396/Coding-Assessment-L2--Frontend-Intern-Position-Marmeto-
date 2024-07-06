document.addEventListener("DOMContentLoaded", () => {
    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to the console

            const menContainer = document.getElementById('men');
            const womenContainer = document.getElementById('women');
            const kidsContainer = document.getElementById('kids');

            data.categories.forEach(category => {
                if (category.category_name === 'Men') {
                    category.category_products.forEach(product => {
                        menContainer.appendChild(createProductCard(product));
                    });
                } else if (category.category_name === 'Women') {
                    category.category_products.forEach(product => {
                        womenContainer.appendChild(createProductCard(product));
                    });
                } else if (category.category_name === 'Kids') {
                    category.category_products.forEach(product => {
                        kidsContainer.appendChild(createProductCard(product));
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const badgeText = product.badge_text;

    if (badgeText) {
        const badge = document.createElement('div');
        badge.classList.add('product-badge');
        badge.textContent = badgeText;
        card.appendChild(badge);
    }

    const image = document.createElement('img');
    image.classList.add('product-image');
    image.src = product.image;
    image.alt = product.title;
    card.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('product-info');

    const title = document.createElement('div');
    title.classList.add('product-title');
    title.textContent = product.title;
    info.appendChild(title);

    const vendor = document.createElement('div');
    vendor.classList.add('product-vendor');
    vendor.textContent = product.vendor;
    info.appendChild(vendor);

    const price = document.createElement('div');
    price.classList.add('product-price');
    price.textContent = `Rs ${product.price}`;
    info.appendChild(price);

    const comparePrice = document.createElement('div');
    comparePrice.classList.add('product-compare-price');
    comparePrice.textContent = `Rs ${product.compare_at_price}`;
    info.appendChild(comparePrice);

    const discountPercent = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
    const discount = document.createElement('div');
    discount.classList.add('product-discount');
    discount.textContent = `${discountPercent.toFixed(0)}% Off`;
    info.appendChild(discount);

    const addToCart = document.createElement('button');
    addToCart.classList.add('add-to-cart');
    addToCart.textContent = 'Add to Cart';
    info.appendChild(addToCart);

    card.appendChild(info);

    return card;
}

function openTab(event, tabName) {
    const tabLinks = document.getElementsByClassName('tab-link');
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
    }
    event.currentTarget.classList.add('active');

    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'flex';
// Hide all logos initially
const logos = document.getElementsByClassName('tab-logo');
for (let i = 0; i < logos.length; i++) {
    logos[i].style.display = 'none';
}

// Show the relevant logo based on tabName
const logoToShow = document.querySelector(`.${tabName}-logo`);
if (logoToShow) {
    logoToShow.style.display = 'inline-block';
}
    const h1 = document.getElementById('h1');
    if (tabName === 'men') {
        h1.style.textShadow = '5px 5px 10px rgba(0, 0, 0, 0.3)';
    } else {
        h1.style.textShadow = 'none';
    }
}
