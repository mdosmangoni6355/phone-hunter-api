const loadPhone = async (searchPhone = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones.length);
    displayPhones(phones, isShowAll);

}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // step-1: 
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container
    phoneContainer.textContent = '';

    const showAllPhone = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllPhone.classList.remove('hidden');
    }
    else{
        showAllPhone.classList.add('hidden');
    }

    // console.log('show all', isShowAll);
    // display only 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        // step-2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-5 bg-gray-100 shadow-xl`;
        // step-3: set inner HTML
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions">
                <button onclick="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        // step-4: append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// Handle Show Details Button
const handleShowDetail = async (id) => {
    // console.log('clicked', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);

    const phone = data.data;
    showPhoneDetails(phone);
}

// show the modal
const showPhoneDetails = (phone) =>{
    show_details_modal.showModal()
    // const showDetailPhoneName = document.getElementById('show-detail-phone-name');
    // showDetailPhoneName.innerText = phone.name;

    const showDetailModal = document.getElementById('show-detail-modal');
    showDetailModal.innerHTML = `
    <img src="${phone?.image}">
    <h3 class="font-bold text-lg">${phone?.name}</h3>
    <p class="py-4">${phone.slug}</p>
    <p class="py-4">Storage: ${phone?.mainFeatures?.storage}</p>
    <div class="modal-action">
    <!-- if there is a button in form, it will close the modal -->
    <button class="btn">Close</button>
    </div>
    `
}

loadPhone();

// Handel search button

const handelSearchBtn = (isShowAll) => {
    toggleLoadingSpinner(true);
    const inputText = document.getElementById('search-bar-input');
    const searchPhone = inputText.value;
    // console.log(text);
    // inputText.value = '';
    loadPhone(searchPhone, isShowAll);
}

// Loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// Handle show all
const handleShowAll = () =>{
    handelSearchBtn(true);
}
