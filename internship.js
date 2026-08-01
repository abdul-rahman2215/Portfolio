async function loadINTERNSHIP() {
  const tbody = document.getElementById("internship-tbody");

  const { data, error } = await supabaseClient
    .from("INTERNSHIP")
    .select("*");

  if (error) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4">${error.message}</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.YEAR}</td>
      <td>${item["COMPANY NAME"]}</td>
      <td><span class="role">${item.ROLE}</span></td>
      <td>${item.DURATION}</td>
    </tr>
  `).join("");
}

loadINTERNSHIP();