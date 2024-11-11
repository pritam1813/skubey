import { Prisma, PrismaClient } from "@prisma/client";
import { ProductsSampleData } from "@/data/products";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = ProductsSampleData;

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
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created Product with id: ${product.id}`);
  }
  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    });
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
