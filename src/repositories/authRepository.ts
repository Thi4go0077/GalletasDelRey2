import initialUsers from "../data/users.json";

import { storageService } from "../services/storageService";

import type {
  DistributorRegisterData,
  LoginCredentials,
  RegisterData,
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


function saveRegisteredUser(
  user: UserRecord,
): void {
  const registeredUsers =
    getRegisteredUsers();

  registeredUsers.push(user);

  localStorage.setItem(
    REGISTERED_USERS_KEY,
    JSON.stringify(registeredUsers),
  );
}


export const authRepository = {

  /* =========================================
     LOGIN
  ========================================= */

  login(
    credentials: LoginCredentials,
  ): User | null {

    const normalizedCarnet =
      credentials.carnet.trim();

    const foundUser =
      getAllUsers().find(
        (user) =>
          user.carnet.toLowerCase() ===
            normalizedCarnet.toLowerCase() &&
          user.password ===
            credentials.password,
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


  /* =========================================
     REGISTRO CLIENTE
  ========================================= */

  register(
    data: RegisterData,
  ): {
    success: boolean;
    message: string;
    user?: User;
  } {

    const name =
      data.name.trim();

    const carnet =
      data.carnet.trim();

    const password =
      data.password;


    if (
      !name ||
      !carnet ||
      !password
    ) {
      return {
        success: false,
        message:
          "Todos los campos son obligatorios.",
      };
    }


    if (password.length < 6) {
      return {
        success: false,
        message:
          "La contraseña debe tener al menos 6 caracteres.",
      };
    }


    const existingUser =
      getAllUsers().some(
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


    saveRegisteredUser(
      newUser,
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
      message:
        "Cuenta creada correctamente.",
      user: sessionUser,
    };
  },


  /* =========================================
     REGISTRO DISTRIBUIDOR
  ========================================= */

  registerDistributor(
    data: DistributorRegisterData,
  ): {
    success: boolean;
    message: string;
    user?: User;
  } {

    const name =
      data.name.trim();

    const carnet =
      data.carnet.trim();

    const password =
      data.password;

    const email =
      data.email.trim();

    const phone =
      data.phone.trim();

    const businessName =
      data.businessName.trim();

    const nit =
      data.nit.trim();

    const address =
      data.address.trim();

    const city =
      data.city.trim();

    const businessType =
      data.businessType.trim();

    const experience =
      data.experience.trim();


    if (
      !name ||
      !carnet ||
      !password ||
      !email ||
      !phone ||
      !businessName ||
      !nit ||
      !address ||
      !city ||
      !businessType ||
      !experience
    ) {
      return {
        success: false,
        message:
          "Todos los campos son obligatorios.",
      };
    }


    if (password.length < 6) {
      return {
        success: false,
        message:
          "La contraseña debe tener al menos 6 caracteres.",
      };
    }


    const existingUser =
      getAllUsers().some(
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


    const newDistributor:
      UserRecord = {

      id:
        `distributor-${Date.now()}`,

      name,

      carnet,

      password,

      role:
        "DISTRIBUIDOR",

      email,

      phone,

      businessName,

      nit,

      address,

      city,

      businessType,

      experience,
    };


    saveRegisteredUser(
      newDistributor,
    );


    const sessionUser:
      User = {

      id:
        newDistributor.id,

      name:
        newDistributor.name,

      carnet:
        newDistributor.carnet,

      role:
        newDistributor.role,
    };


    storageService.set<User>(
      SESSION_KEY,
      sessionUser,
    );


    return {
      success: true,

      message:
        "Cuenta de distribuidor creada correctamente.",

      user:
        sessionUser,
    };
  },


  /* =========================================
     OBTENER DATOS COMPLETOS
     DEL USUARIO ACTUAL
  ========================================= */

  getCurrentUserRecord():
    UserRecord | null {

    const user =
      this.getCurrentUser();

    if (!user) {
      return null;
    }

    const foundUser =
      getAllUsers().find(
        (item) =>
          item.id === user.id,
      );

    return foundUser ?? null;
  },


  /* =========================================
     CERRAR SESIÓN
  ========================================= */

  logout(): void {

    storageService.remove(
      SESSION_KEY,
    );
  },


  /* =========================================
     USUARIO ACTUAL
  ========================================= */

  getCurrentUser():
    User | null {

    return storageService.get<User>(
      SESSION_KEY,
    );
  },


  /* =========================================
     COMPROBAR SESIÓN
  ========================================= */

  isAuthenticated():
    boolean {

    return (
      this.getCurrentUser() !== null
    );
  },
};