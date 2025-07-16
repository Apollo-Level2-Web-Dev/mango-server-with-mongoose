// name, email, phone, password, role

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "Admin" | "Customer";
}
