import { useAuth } from "../context/AuthContext";
import { permissions } from "../utils/permissions";

export function usePermissions() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return permissions[user.role];
}