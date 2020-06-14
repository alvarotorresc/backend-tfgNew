import './module-alias';
import inquirer from 'inquirer';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { Rol } from './graphql.types';

const MENU_OPTIONS = ['Create Admin', 'Exit'] as const;
type MenuOption = typeof MENU_OPTIONS[number];
async function main(): Promise<void> {
  while (true) {
    const { menu } = await inquirer.prompt<{ menu: MenuOption }>([
      {
        type: 'list',
        name: 'menu',
        choices: MENU_OPTIONS,
      },
    ]);
    switch (menu) {
      case 'Create Admin':
        await createAdmin();
        break;

      case 'Exit':
        process.exit(0);
    }
  }
}

async function createAdmin(): Promise<void> {
  const prisma = new PrismaService();
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      age,
      nationality,
    } = await inquirer.prompt<{
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      age: number;
      nationality: string;
    }>([
      {
        type: 'input',
        name: 'email',
        message: 'Email',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password',
      },
      {
        type: 'input',
        name: 'firstName',
        message: 'First name',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Last name',
      },
      {
        type: 'number',
        name: 'age',
        message: 'Age',
      },
      {
        type: 'input',
        name: 'nationality',
        message: 'Nationality',
      },
    ]);

    await prisma.researcher.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        age,
        nationality,
        rol: Rol.admin,
        image: 'https://semantic-ui.com/images/avatar/large/steve.jpg',
      },
    });
  } catch (error) {
    console.log('The admin already exists', error);
  }
}

main();
