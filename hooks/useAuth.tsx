// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { account, db } from "@/api/config";
import { ID, Models } from "react-native-appwrite";
import Constants from "expo-constants";

export default function useAuth() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  };

  const register = async (
    { email, password, name, phone }: { email: string; password: string; name: string; phone: string },
    role: "driver" | "customer"
  ) => {
    setLoading(true);
    try {
      // Create auth account
      const newUser = await account.create(ID.unique(), email, password, name);

      // Create a session (auto-login after signup)
      await account.createEmailPasswordSession(email, password);

      // Save extra fields to database (drivers or customers collection)
      const databaseId = "68724035002cd5c6269d";
      const collectionId =
        role === "driver"
          ? "687366a70018db5a155a"
          : "6873676000023e919fe5";

      await db.createDocument(databaseId, collectionId!, newUser.$id, {
        fullName: name,
        email,
        phone: phone,
      });

      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      const session = await account.createEmailPasswordSession(email, password);
      await getCurrentUser();
      return session;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { user, loading, register, login, logout };
}
