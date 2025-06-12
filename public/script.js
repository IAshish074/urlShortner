const form = document.getElementById("shorten-form");
const ul = document.getElementById("shortend-urls");


const fetchShortenURl = async () => {
  try {
    const response = await fetch("/links");
    const links = await response.json();

    ul.innerHTML = "" 
    for (const code in links) {
      const { original, short } = links[code]

      const li = document.createElement("li")
      li.innerHTML = `
        <strong>${code}</strong>:<br/>
        🌐 Original: <a href="${original}" target="_blank">${original}</a><br/>
        🔗 Short: <a href="${short}" target="_blank">${short}</a>
      `;
      ul.appendChild(li);
    }
    
  } catch (err) {
    console.error("Failed to fetch links:", err);
  }
};


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target)
  const url = formData.get("url");
  const shortCode = formData.get("shortCode")

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, shortCode }),
    });

    if (response.ok) {
      const result = await response.json();
      alert(`✅ Short URL created: http://localhost:3000/${result.shortCode}`);
      form.reset(); 
      fetchShortenURl(); 
    } else {
      const errorMessage = await response.text();
      alert(`❌ Error: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong!");
  }
});


fetchShortenURl();
