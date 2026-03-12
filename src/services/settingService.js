import api from "./api";

export const getSettings = async () => {
  return await api.get("/settings/");
};

export const updateSettings = async (settingsData) => {
  // settingsData = { business_name, authorized_wifi, address, phone_number }
  return await api.put("/settings/", settingsData);
};
