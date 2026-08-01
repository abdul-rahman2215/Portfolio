async function loadhackathon() {
  const tbody = document.getElementById("hackathon-tbody");

  const { data, error } = await supabaseClient
    .from("hackathon")
    .select("*");

  if (error) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">${error.message}</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.YEAR}</td>
      <td>${item.NAME}</td>
      <td>${item.STACK}</td>
      <td><span class="outcome">${item.OUTCOME}</span></td>
      <td>${item.ORGANIZER}</td>
    </tr>
  `).join("");
}

loadhackathon();