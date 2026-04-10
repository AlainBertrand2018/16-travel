"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  User,
  signOut as firebaseSignOut 
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    uid: "dev-user",
    email: "admin@sixteen.travel",
    displayName: "Admin"
  } as any);
  const [profile, setProfile] = useState<any>({
    name: "Admin",
    role: "System Admin"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auth logic suspended for development
    setLoading(false);
  }, []);

  const signOut = async () => {
    // Sign out disabled for development
    console.log("Sign out bypassed");
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
