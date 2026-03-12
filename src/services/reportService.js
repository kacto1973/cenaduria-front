import api from "./api";

export const getAuditLogs = async () => {
  return await api.get("/reports/audit-logs");
};
