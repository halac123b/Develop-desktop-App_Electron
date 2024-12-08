console.log("From index.js");

fetch("https://zenquotes.io/api/quotes")
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
        const firstQuote = data.slice(0, 1); // Get the first quote
        console.log(firstQuote);
        document.getElementById("quote").innerHTML = firstQuote[0].q;
    })
    .catch((error) => console.error("Error fetching quotes:", error));