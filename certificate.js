async function loadCERTIFICATE() {

    const container = document.getElementById("certificate-container");

    const { data, error } = await supabaseClient
        .from("CERTIFICATE")
        .select("*");

    console.table(data);

    if (error) {
        console.error(error);
        container.innerHTML = `<p>${error.message}</p>`;
        return;
    }

    container.innerHTML = "";

    data.forEach(cert => {

        container.innerHTML += `
        <section class="case-hero">

            <div class="hero-text">
                <h1>${cert.NAME ?? ""}</h1>
                <h2>Issued By • ${cert.issuer ?? ""}</h2>
            </div>

            <img
                class="case-img"
                src="${cert.image_url ?? ""}"
                alt="${cert.NAME ?? ""}"
            >

        </section>
        `;
    });
}

loadCERTIFICATE();