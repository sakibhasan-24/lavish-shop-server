import bcryptjs from "bcryptjs";

const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: bcryptjs.hashSync("admin", 8),
    role: "admin",
    isAdmin: true,
  },
  {
    id: 1,
    name: "sakib",
    email: "sakib@gmail.com",
    password: bcryptjs.hashSync("sakib", 8),
    role: "sakib",
    isAdmin: false,
  },
  {
    id: 1,
    name: "user",
    email: "user@gmail.com",
    password: bcryptjs.hashSync("user", 8),
    role: "user",
    isAdmin: false,
  },
];

export default users;
