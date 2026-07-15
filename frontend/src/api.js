const BASE_URL = "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const json = await res.json();
  return json.data;
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  const json = await res.json();
  return json.data;
}

export async function createProduct(product) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const json = await res.json();
  return json.data;
}

export async function updateProduct(id, product) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const json = await res.json();
  return json.data;
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  return json.data;
}