const BASE_URL = "http://localhost:3000";

export function sendItems(cart) {
  const data = { item: cart };

  fetch(`${BASE_URL}/api/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
