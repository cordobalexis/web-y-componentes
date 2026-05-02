function addHomePageInfo (params){
    const template = document.querySelector("#scc__cont_template");
    const container = document.querySelector(".scc__cont");
    template.content.querySelector(".scc__cont_saludo_hi").textContent = params.hola;
    template.content.querySelector(".name_uno").textContent = params.soy;
    template.content.querySelector(".name_dos").textContent = params.alexis;
    template.content.querySelector(".scc__cont_img").src = params.imagen;
    
    const clone = document.importNode(template.content, true);
    container.appendChild(clone);
}

function addPresentationInfo(params){
    const template = document.querySelector("#scc-dos__template");
    const container = document.querySelector(".scc-dos__content");
    template.content.querySelector(".scc-dos__present_title").textContent = params.soy;
    template.content.querySelector(".scc-dos__present_p").textContent = params.parrafo;
    template.content.querySelector(".scc-dos__img").src = params.selfie;

    const clone =document.importNode(template.content, true);
    container.appendChild(clone);
}

function getPresentationInfo(){
    return fetch("https://cdn.contentful.com/spaces/h4ddew5ctc7a/environments/master/entries?access_token=CFpT9ERxxSqKYiJmwZx0CRyXu6pB_OCjXa7MZvDRo48&content_type=presentation&include=1")
    .then( res => {
        return res.json()}).then((data) => {
            const assets = data.includes.Asset;
            const getImageUrl = (id) => {
                const asset = assets.find(a => a.sys.id === id);
                return asset?.fields.file.url;
            };

            const fieldCollection = data.items.map((item) => {
                return{
                    soy: item.fields.titleIam,
                    parrafo: item.fields.presentation,
                    selfie: "https:" + getImageUrl(item.fields.selfie.sys.id)
                }
            });
            return fieldCollection;

        })
}

function getHomePageInfo (){
    return fetch("https://cdn.contentful.com/spaces/h4ddew5ctc7a/environments/master/entries?access_token=CFpT9ERxxSqKYiJmwZx0CRyXu6pB_OCjXa7MZvDRo48&content_type=homePage&include=1")
    .then( res => {
        return res.json()}).then( (data) =>{
            console.log(data.items);
            const assets = data.includes.Asset;

            const getImageUrl = (id) => {
                    const asset = assets.find(a => a.sys.id === id);
                    return asset?.fields.file.url;
                };

            const fieldCollection = data.items.map((item) =>{
                return{
                    hola: item.fields.whiteText,
                    soy: item.fields.blueText,
                    alexis: item.fields.blueText2,
                    imagen: "https:" + getImageUrl(item.fields.image.sys.id)
                }
            });
            return fieldCollection;
        })
}

function main(){
    getHomePageInfo().then(function(content){
        // console.log(content);
        // console.log(data);
        for( const c of content){
            addHomePageInfo(c);
        }
    });

    getPresentationInfo().then(function(content){
        for( const c of content){
            addPresentationInfo(c);
        }
    });

    const headerEl = document.querySelector(".headerEl");
    Header(headerEl);

    const serviciosEl = document.querySelector(".serviciosEl");
    servicios(serviciosEl);

    const contactoEl = document.querySelector(".contactoEl");
    contacto(contactoEl);

    const footerEl = document.querySelector(".footerEl");
    footer(footerEl);
}
main();