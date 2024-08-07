// function for load data
const loadPhone = async (inputFieldText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`);
    const data = await res.json();
    // console.log(data);
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

// function for display data in ui
const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones and remove when show all btn pressed
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    // loop through for array of data
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 w-96 shadow-xl';
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <h4 class="card-title">999$</h2>
                <div class="card-actions">
                <button onclick="handleShowDetailBtn('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);
}

// function for search and value collect to search field
const searchPhone = (isShowAll) => {
    toggleLoadingSpinner(true);
    const inputField = document.getElementById('text-field');
    const inputFieldText = inputField.value;
    loadPhone(inputFieldText, isShowAll)
}

// function for toggle loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// function for handle show all button 
const handleShowAllBtn = () => {
    console.log('btn press');
    searchPhone(true);
}

// function for handle show details btn
const handleShowDetailBtn = async (id) => {
    // console.log('click show details btn',id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    displayShowDetails(phone);

}

// function for display show detail part
const displayShowDetails = (phone) => {
    console.log(phone);
    const showDetailsModalContainer = document.getElementById('show-details-modal-container');
    showDetailsModalContainer.innerHTML = `
        
        <!-- Open the modal using ID.showModal() method -->
        <dialog id="show_details_modal" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <div class="card bg-base-100 grid gap-1">
                    <figure class="">
                        <img src="${phone?.image}" alt="${phone?.name}"
                            class="rounded-xl" />
                    </figure>
                    <h2 class="text-3xl text-left">${phone?.name}</h2>
                    <p class="text-base"><span class="text-xl">Storage : </span>${phone?.mainFeatures?.storage}</p>
                    <p class="text-base"><span class="text-xl">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
                    <p class="text-base"><span class="text-xl">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
                    <p class="text-base"><span class="text-xl">Memory : </span>${phone.mainFeatures.memory}</p>
                    <p class="text-base"><span class="text-xl">Slug : </span>${phone?.slug}</p>
                    <p class="text-base"><span class="text-xl">Release data : </span>${phone?.releaseDate}</p>
                    <p class="text-base"><span class="text-xl">Brand : </span>${phone?.brand}</p>
                    <p class="text-base"><span class="text-xl">GPS : </span>${phone?.others?.GPS || 'none'}</p>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
     `
    // show detail modal
    show_details_modal.showModal()
}
