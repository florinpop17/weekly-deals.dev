const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

const freeDealsEl = document.getElementById("free_deals");
const featuredDealsEl = document.getElementById("featured_deals");

const endTime = new Date("July 1 2021 23:59:59");

countdown();

setInterval(countdown, 1000);

function countdown() {
    const startTime = new Date();
    const diff = endTime - startTime;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
    minEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    secEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

fetch("./deals.json")
    .then((body) => body.json())
    .then((data) => {
        const { featured, free } = data;

        featured.forEach((product) => createFeaturedProduct(product));
        free.forEach((product) => createFreeProduct(product));
    });

function createFreeProduct(product) {
    const a = document.createElement("a");
    a.innerHTML = `
        <img
            class="w-full h-full object-cover"
            src="${product.image_url}"
            alt="${product.title}"
        />
        <span
            class="
                text-2xl text-white
                font-bold
                absolute
                bottom-0
                left-0
                bg-purple-700
                py-2
                px-3
                rounded-tr-sm
            "
        >
            FREE
        </span>
    `;

    a.href = product.url;
    a.className = `w-full max-w-sm h-60 relative rounded-sm overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl`;

    freeDealsEl.appendChild(a);
}

function createFeaturedProduct(product) {
    const a = document.createElement("a");
    a.innerHTML = `
        <span
            class="
                bg-purple-700
                text-white text-3xl
                font-semibold
                py-3
                px-4
                top-0
                right-0
                absolute
                rounded-bl-sm
            "
            >Featured</span
        >

        <img
            class="w-full h-full object-cover"
            src="${product.image_url}"
            alt="${product.title}"
        />
        <span
            class="
                text-4xl text-white
                absolute
                bottom-0
                left-0
                bg-purple-700
                py-2
                px-3
                rounded-tr-sm
            "
        >
            $${product.new_price}
            <del class="text-lg">$${product.old_price}</del>
        </span>
    `;

    a.href = product.url;
    a.className = `w-full md:max-w-xl h-96 relative rounded-sm overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl`;

    featuredDealsEl.appendChild(a);
}
