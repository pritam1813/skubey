import { Prisma, PrismaClient } from "@prisma/client";
import { ProductsSampleData } from "../data/products";

const prisma = new PrismaClient();

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: "Uncategorized",
    slug: "Uncategorized",
  },
  {
    name: "Featured",
    slug: "featured",
  },
  {
    name: "Best Seller",
    slug: "bestseller",
  },
  {
    name: "Latest",
    slug: "latest",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  let i = 0;
  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    });
    if (c.name != "Uncategorized") {
      while (i < ProductsSampleData.length) {
        const product = await prisma.product.create({
          data: {
            ...ProductsSampleData[i],
            category: {
              connect: { id: category.id },
            },
          },
        });
        console.log(`Created Product with id: ${product.id}`);
        i += 1;
      }
    }
    console.log(`Created Category with id: ${category.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
