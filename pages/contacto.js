function contacto(el){
const containerEl = document.createElement("section");
containerEl.className = "scc-cuatro";
containerEl.innerHTML = `
<h2 class="scc-cuatro__title">Escribeme</h2>

        <form class="scc-cuatro__form" action="">
           <div class="nym">
                <label for="" class="scc-cuatro__form_name">
                    <legend class="legend">Nombre</legend>
                    <input class="input" type="text" name="nombre" placeholder="Tu nombre">
                </label>

                <label for="" class="scc-cuatro__form_mail">
                    <legend class="legend">Email</legend>
                    <input class="input" type="email" name="email" placeholder="tu@mail.com">
                </label>
           </div>

           <label for="" class="scc-cuatro__form_mail">
            <legend class="legend">Mensaje</legend>
            <textarea class="textarea" name="mensaje" id=""></textarea>
           </label>

           <button class="btn">Enviar 🚀</button>
        </form>
`;
el.appendChild(containerEl);

const form = document.querySelector("form");

form.addEventListener("submit", function (e){
    e.preventDefault();

    const data = new FormData(form);
    const nombre = data.get("nombre");
    const email = data.get("email");
    const mensaje = data.get("mensaje");

    const message = `
    Nombre: ${nombre}
    Email: ${email}
    Mensaje: ${mensaje}
    `;

    fetch("https://apx.school/api/utils/email-to-student", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            to: "alexiscordoba978@gmail.com",
            message: message
        })
    }).then(res => res.json()).then(data => {
        console.log("enviado:", data);
    }).catch(err => {
        console.log("error:", err);
    });
});

}