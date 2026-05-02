
function addLogo(params){
    const img = document.querySelector(".header__logo");
    img.src = params.logo;
}

function getLogo(){
    return fetch("https://cdn.contentful.com/spaces/h4ddew5ctc7a/environments/master/entries?access_token=CFpT9ERxxSqKYiJmwZx0CRyXu6pB_OCjXa7MZvDRo48&content_type=logo&include=1")
    .then( res => {
        return res.json()}).then((data) => {
            const assets = data.includes.Asset;

            const getLogoUrl = (id) => {
                const asset = assets.find(a => a.sys.id === id);
                return asset?.fields.file.url;
            };

            const fieldCollection = data.items.map((item) =>{
                return {
                 logo: "https:" + getLogoUrl(item.fields.logo.sys.id)
                };
            });
            return fieldCollection;
            
        });
};


function Header(el){
    const container = document.querySelector(".headerEl")
    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `
           <a href="index.html" class="header__logo">
                <img class="header__logo" src="https://images.ctfassets.net/h4ddew5ctc7a/2S9wDARTKWGf2GnVCK8PIr/230734e05f04d3b35d5c7ce5e35a93bf/logo_animal_circular_minimalista_negro.png" alt="logo">
            </a>

        <button class="open">
            <div></div>
            <div></div>
            <div></div>
        </button>
        <nav class="menu_desktop">
            <a href="portfolio.html">Portfolio</a>
            <a href="servicios.html">Servicios</a>
            <a href="contacto.html">Contacto</a>
        </nav>

        <div class="window">
            <button class="window__close">
                <div></div>
                <div></div>
                <div></div>
            </button>
            <ul class="window__content">
                <a href="portfolio.html">Portfolio</a>
                <a href="servicios.html">Servicios</a>
                <a href="contacto.html">Contacto</a>
            </ul>
        </div>`;
        container.appendChild(header);

        const window = document.querySelector(".window");
        const openWindow = document.querySelector(".open");
        const closeWindow = document.querySelector(".window__close");

        openWindow.addEventListener("click", () => {
        window.style.display = "inherit";
        });

        closeWindow.addEventListener("click", () => {
        window.style.display = "none";
        })

        getLogo().then(function(content) {
                addLogo(content[0]);
        });
    };
