import api from "./api";

export const getActiveOrders = async () => {
  return await api.get("/orders/active");
};

export const createOrder = async (orderData) => {
  // orderData = { table_number, user_id, user_name }
  return await api.post("/orders/create", orderData);
};

export const lockOrder = async (order_id, user_name) => {
  return await api.put("/orders/edit-lock", { order_id, user_name });
};

export const unlockOrder = async (order_id) => {
  return await api.put("/orders/edit-unlock", { order_id });
};

export const addItemsToOrder = async (payload) => {
  // payload = { order_id, user_id, items: [{ product_id, quantity }] }
  return await api.post("/orders/add-items", payload);
};

export const removeItemFromOrder = async (payload) => {
  // payload = { order_id, product_id, user_id, justification }
  return await api.post("/orders/remove-item", payload);
};

export const finishOrder = async (order_id) => {
  return await api.post("/orders/finish", { order_id });
};

export const cancelOrder = async (payload) => {
  // payload = { order_id, user_id, justification }
  return await api.post("/orders/cancel", payload);
};
