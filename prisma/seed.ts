import { PrismaClient, Role, Status } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type SeedUser = {
  email: string;
  name: string;
  role: Role;
  status: Status;
  createdAt: Date;
};

const now = new Date();

function monthsAgo(months: number, day = 8): Date {
  return new Date(now.getFullYear(), now.getMonth() - months, day, 10, 30, 0);
}

const users: SeedUser[] = [
  {
    email: "admin@devpanel.com",
    name: "Mariana Castillo",
    role: Role.ADMIN,
    status: Status.ACTIVE,
    createdAt: monthsAgo(0, 2),
  },
  {
    email: "andres.morales@example.com",
    name: "Andres Morales",
    role: Role.MODERATOR,
    status: Status.ACTIVE,
    createdAt: monthsAgo(0, 4),
  },
  {
    email: "camila.rivera@example.com",
    name: "Camila Rivera",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(0, 6),
  },
  {
    email: "diego.navarro@example.com",
    name: "Diego Navarro",
    role: Role.USER,
    status: Status.INACTIVE,
    createdAt: monthsAgo(1, 12),
  },
  {
    email: "elena.torres@example.com",
    name: "Elena Torres",
    role: Role.ADMIN,
    status: Status.ACTIVE,
    createdAt: monthsAgo(2, 14),
  },
  {
    email: "felipe.santos@example.com",
    name: "Felipe Santos",
    role: Role.USER,
    status: Status.SUSPENDED,
    createdAt: monthsAgo(3, 9),
  },
  {
    email: "gabriela.perez@example.com",
    name: "Gabriela Perez",
    role: Role.MODERATOR,
    status: Status.ACTIVE,
    createdAt: monthsAgo(4, 18),
  },
  {
    email: "hector.medina@example.com",
    name: "Hector Medina",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(5, 7),
  },
  {
    email: "isabella.gomez@example.com",
    name: "Isabella Gomez",
    role: Role.USER,
    status: Status.INACTIVE,
    createdAt: monthsAgo(6, 21),
  },
  {
    email: "julian.castro@example.com",
    name: "Julian Castro",
    role: Role.MODERATOR,
    status: Status.ACTIVE,
    createdAt: monthsAgo(7, 13),
  },
  {
    email: "karla.vargas@example.com",
    name: "Karla Vargas",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(8, 11),
  },
  {
    email: "luis.herrera@example.com",
    name: "Luis Herrera",
    role: Role.USER,
    status: Status.SUSPENDED,
    createdAt: monthsAgo(9, 5),
  },
  {
    email: "monica.reyes@example.com",
    name: "Monica Reyes",
    role: Role.ADMIN,
    status: Status.ACTIVE,
    createdAt: monthsAgo(10, 16),
  },
  {
    email: "nicolas.rojas@example.com",
    name: "Nicolas Rojas",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(11, 20),
  },
  {
    email: "olivia.mendez@example.com",
    name: "Olivia Mendez",
    role: Role.MODERATOR,
    status: Status.INACTIVE,
    createdAt: monthsAgo(12, 3),
  },
  {
    email: "pablo.silva@example.com",
    name: "Pablo Silva",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(13, 25),
  },
  {
    email: "renata.fuentes@example.com",
    name: "Renata Fuentes",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(14, 8),
  },
  {
    email: "samuel.ortega@example.com",
    name: "Samuel Ortega",
    role: Role.MODERATOR,
    status: Status.SUSPENDED,
    createdAt: monthsAgo(15, 19),
  },
  {
    email: "teresa.leon@example.com",
    name: "Teresa Leon",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(16, 10),
  },
  {
    email: "ulises.campos@example.com",
    name: "Ulises Campos",
    role: Role.USER,
    status: Status.INACTIVE,
    createdAt: monthsAgo(17, 22),
  },
  {
    email: "valeria.molina@example.com",
    name: "Valeria Molina",
    role: Role.ADMIN,
    status: Status.ACTIVE,
    createdAt: monthsAgo(18, 15),
  },
  {
    email: "walter.ibarra@example.com",
    name: "Walter Ibarra",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(19, 6),
  },
  {
    email: "ximena.aguilar@example.com",
    name: "Ximena Aguilar",
    role: Role.MODERATOR,
    status: Status.ACTIVE,
    createdAt: monthsAgo(20, 17),
  },
  {
    email: "yahir.delgado@example.com",
    name: "Yahir Delgado",
    role: Role.USER,
    status: Status.SUSPENDED,
    createdAt: monthsAgo(21, 23),
  },
  {
    email: "zoe.escobar@example.com",
    name: "Zoe Escobar",
    role: Role.USER,
    status: Status.ACTIVE,
    createdAt: monthsAgo(22, 12),
  },
  {
    email: "alejandro.pineda@example.com",
    name: "Alejandro Pineda",
    role: Role.USER,
    status: Status.INACTIVE,
    createdAt: monthsAgo(23, 9),
  },
];

async function main(): Promise<void> {
  const adminPassword = await bcrypt.hash("admin123", 12);
  const defaultPassword = await bcrypt.hash("password123", 12);

  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users.map((user) => ({
      ...user,
      password:
        user.email === "admin@devpanel.com" ? adminPassword : defaultPassword,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
