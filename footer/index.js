
function addLogo(params){
    const img = document.querySelector(".scc-footer__img");
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

function footer (el){
    const container = document.querySelector(".footerEl");
    const footer = document.createElement("section");
    footer.className = "scc-footer";

    footer.innerHTML = `
     <img class="scc-footer__img" src="" alt="logo">
        
        <div class="scc-footer__menu">
            <a href="#">
                <span class="index.html">🏠</span>
                Home
            </a>

            <a href="servicios.html">
                <span class="icon">💼</span>
                Servicios
            </a>

            <a href="contacto.html">
                <span class="icon">☎️</span>
                Contacto
            </a>
        </div>

        <div class="scc-footer__redes">
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-github"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
        </div>

        <a class="link" href="https://apx.school">
            <span class="link__span"> ©2026 </span>
            https://apx.school
        </a>
    `;
    container.appendChild(footer);

     getLogo().then(function(content) {
                addLogo(content[0]);
        });
}