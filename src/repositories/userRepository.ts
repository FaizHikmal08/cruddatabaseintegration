import { getDb } from '../db/index.ts';
import { users } from '../db/schema.ts';

export interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'owner' | 'customer';
}

export class UserRepository {
  async findAll() {
    const db = await getDb();

    console.log('USERS TABLE:', users);

    return db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(users.id);
  }

  async create(input: CreateUserInput) {
    const db = await getDb();

    await db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
        role: input.role,
      });

    return {
      name: input.name,
      email: input.email,
      role: input.role,
    };
  }
}