import api from "./api";

export const getProducts = async (category = null) => {
  // Si mandas categoría, Axios automáticamente arma la URL: /api/products/?category=Comida
  const params = category ? { category } : {};
  return await api.get("/products/", { params });
};

export const createProduct = async (productData) => {
  // productData = { name, price, category }
  return await api.post("/products/", productData);
};

export const updateProduct = async (productData) => {
  // productData = { product_id, name, price, category }
  return await api.put("/products/", productData);
};

export const deleteProduct = async (product_id) => {
  // Axios requiere que el body de un DELETE vaya en la propiedad 'data'
  return await api.delete("/products/", { data: { product_id } });
};

export const toggleProductAvailability = async (product_id) => {
  return await api.put("/products/toggle-availability", { product_id });
};
