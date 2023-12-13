console.log("script chargé");

const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";
let urlRecherche;

let content;



let champResultat = document.querySelector(".results")
let form = document.querySelector(".form")
    form.addEventListener('submit', (event)=> {
      event.preventDefault()
      champResultat.innerHTML = "";
      
      let champRecherche = document.querySelector(".form-input").value
      urlRecherche = url + champRecherche;
    
      getContent();
      async function getContent() {
        const res= await fetch(urlRecherche, {
          method: 'GET',
          headers: {
              "Content-type": "application/json"
          }
        });
        content = await res.json();
        console.log(content)

        if (content.query.search == 0) {
          let div = document.createElement("div");
              div.classList.add("error")
              div.innerText = "Votre recherche ne rapporte aucun résultat"
              champResultat.appendChild(div)
        }
      
        for(let i=0; i < content.query.search.length; i++){
          console.log(content.query.search[i]);
          let div = document.createElement("div");
              div.classList.add("articles");
              div.innerHTML = `<a href="https://en.wikipedia.org/wiki?curid=${content.query.search[i].pageid}"><h1>${content.query.search[i].title}</h1><p>${content.query.search[i].snippet}</p></a>`
          champResultat.appendChild(div);

        }
      }

      



})


