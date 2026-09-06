
export async function getProducts() {
  const res = await fetch("http://localhost:5000/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

