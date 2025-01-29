import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { DbUser } from "../types/database/DbUser";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  public find(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
      include: { country: true },
    }) as unknown as PrismaPromise<DbUser>;
  }

  public create(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
      include: { country: true },
    }) as unknown as PrismaPromise<DbUser>;
  }
}