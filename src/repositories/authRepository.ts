import initialUsers from "../data/users.json";

import { storageService } from "../services/storageService";

import type {
  LoginCredentials,
  User,
  UserRecord,
} from "../types/auth";

const SESSION_KEY = "app_session";
const REGISTERED_USERS_KEY = "registered_users";

const initialUserRecords =
  initialUsers as UserRecord[];

function getRegisteredUsers(): UserRecord[] {
  const savedUsers = localStorage.getItem(
    REGISTERED_USERS_KEY,
  );

  if (!savedUsers) {
    return [];
  }

  try {
    return JSON.parse(savedUsers) as UserRecord[];
  } catch {
    return [];
  }
}

function getAllUsers(): UserRecord[] {
  return [
    ...initialUserRecords,
    ...getRegisteredUsers(),
  ];
}

export interface RegisterData {
  name: string;
  carnet: string;
  password: string;
}

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const normalizedCarnet =
      credentials.carnet.trim();

    const foundUser = getAllUsers().find(
      (user) =>
        user.carnet === normalizedCarnet &&
        user.password === credentials.password,
    );

    if (!foundUser) {
      return null;
    }

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      carnet: foundUser.carnet,
      role: foundUser.role,
    };

    storageService.set<User>(
      SESSION_KEY,
      sessionUser,
    );

    return sessionUser;
  },

  register(data: RegisterData): {
    success: boolean;
    message: string;
    user?: User;
  } {
    const name = data.name.trim();
    const carnet = data.carnet.trim();
    const password = data.password;

    if (!name || !carnet || !password) {
      return {
        success: false,
        message: "Todos los campos son obligatorios.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message:
          "La contraseña debe tener al menos 6 caracteres.",
      };
    }

    const existingUser = getAllUsers().some(
      (user) =>
        user.carnet.toLowerCase() ===
        carnet.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message:
          "Ya existe una cuenta con ese carnet.",
      };
    }

    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      name,
      carnet,
      password,
      role: "USUARIO",
    };

    const registeredUsers = getRegisteredUsers();

    registeredUsers.push(newUser);

    localStorage.setItem(
      REGISTERED_USERS_KEY,
      JSON.stringify(registeredUsers),
    );

    const sessionUser: User = {
      id: newUser.id,
      name: newUser.name,
      carnet: newUser.carnet,
      role: newUser.role,
    };

    storageService.set<User>(
      SESSION_KEY,
      sessionUser,
    );

    return {
      success: true,
      message: "Cuenta creada correctamente.",
      user: sessionUser,
    };
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};