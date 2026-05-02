function addServicios(params){
    const container = document.querySelector(".scc-tres__cards");

    const card = document.createElement("div");
    card.classList.add("scc-tres__cards_carta");

    card.innerHTML =`
    <img class="img_card" src="${params.imagen}" alt="">
        <h3 class="title_card">${params.titulo}</h3>
        <p class="txt_card">${params.descripcion}</p>
    `;
    
    container.appendChild(card);
}

function getCards(){
    return fetch("https://cdn.contentful.com/spaces/h4ddew5ctc7a/environments/master/entries?access_token=CFpT9ERxxSqKYiJmwZx0CRyXu6pB_OCjXa7MZvDRo48&content_type=card&include=1")
    .then(res =>{
        return res.json()}).then((data) =>{
            console.log(data);
            console.log(data.items[0].fields);
            
            const assets = data.includes.Asset;

            const getImgUrl = (id) => {
                const asset = assets.find(a => a.sys.id === id);
                return asset?.fields.file.url;
            };

            const fieldCollection = data.items.map((item) =>{
                return {
                    imagen: "https:" + getImgUrl(item.fields.image.sys.id),
                    titulo: item.fields.title,
                    descripcion: item.fields.description,
                }
            });
            return fieldCollection;
        });
}


function servicios (el){
    const containerEl = document.createElement("section");
    containerEl.className = "scc-tres";
    containerEl.innerHTML = `
    <div class="scc-tres__title">
            <h2 class="scc-tres__title_uno">Mis</h2>
            <h2 class="scc-tres__title_dos">Servicios</h2>
        </div>
        <div class="scc-tres__cards">
        </div>`;

        el.appendChild(containerEl);

        getCards().then(function(content){
            for(const c of content){
                addServicios(c);
            }
        });
}