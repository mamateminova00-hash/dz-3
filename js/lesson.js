const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');let currentIndex = 0;

const hideBlocks = () => {
    tabBlocks.forEach(item => item.style.display = 'none');
    tabs.forEach(item => item.classList.remove('tab_content_item_active'));
};

const showBlock = (index = 0) => {
    tabBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};
const nextSlide = () => {
    currentIndex++;
    if (currentIndex >= tabBlocks.length) currentIndex = 0;
    hideBlocks();
    showBlock(currentIndex);
};

setInterval(nextSlide, 5000);

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (target === item) {
                currentIndex = i; 
                hideBlocks();
                showBlock(currentIndex);
            }
        });
    }
});

function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTime);
    window.removeEventListener('scroll', showModalScroll);
}
const modalTime = setTimeout(showModal, 10000);

function showModalScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        showModal();
    }
}

window.addEventListener('scroll', showModalScroll);


const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (element) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки курсов валют');
            }

            const data = await response.json();

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
                return;
            }

            const val = parseFloat(element.value);

            if (element.id === 'som') {
                usdInput.value = (val / data.usd).toFixed(2);
                eurInput.value = (val / data.eur).toFixed(2);
            } else if (element.id === 'usd') { 
                somInput.value = (val * data.usd).toFixed(2);
                eurInput.value = (somInput.value / data.eur).toFixed(2);
            } else if (element.id === 'eur') {
                somInput.value = (val * data.eur).toFixed(2);
                usdInput.value = (somInput.value / data.usd).toFixed(2);
            }
        } catch (error) {
            console.error("Converter error:", error);
        }
    };
};

converter(somInput);
converter(usdInput);
converter(eurInput);