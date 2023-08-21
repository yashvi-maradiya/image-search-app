const accesskey = "P4xRacgXD-5kv4zRLFYKw9QKQ8wo2-VtR4YPAiFNJII";

const formEL = document.querySelector("form")
const inputEL = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-button")


let inputdata = ""
let page = 1;

 async function searchimages(){
    inputdata = inputEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`

    const response = await fetch(url)
    const data = await response.json()

   const results = data.results

   if(page === 1){
       searchResults.innerHTML = "";
   }
   
   results.map((result) => {
         const imagwapper = document.createElement('div');
         imagwapper.classList.add("search-result");
         const image = document.createElement('img');
         image.src = result.urls.small;
         image.alt = result.alt_description;
         const imageLink = document.createElement('a');
         imageLink.href = result.links.html;
         imageLink.target = "_blank";
         imageLink.textContent = result.alt_description;


         imagwapper.appendChild(image)
         imagwapper.appendChild(imageLink)
         searchResults.appendChild(imagwapper)

   });

   page++;
   if(page > 1){
    showMore.style.display = "block"
   }
}

formEL.addEventListener("submit",(event) => {
    event.preventDefault()
    page = 1;
    searchimages();
})

showMore.addEventListener("click",() => {
    searchimages();
})
