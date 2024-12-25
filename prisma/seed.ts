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
  for (let c of categoryData) {
    let count = 0;
    const category = await prisma.category.create({
      data: c,
    });
    console.log(`Products Under Category ${c.name} (id: ${category.id}):-`);
    console.log("****************Start********************");

    if (c.name != "Uncategorized") {
      while (i < ProductsSampleData.length) {
        if (count >= 11) break;
        const product = await prisma.product.create({
          data: {
            ...ProductsSampleData[i],
            category: {
              connect: { id: category.id },
            },
          },
        });
        console.log(
          `Created Product ${ProductsSampleData[i].name} with id: ${product.id}`
        );
        count++;
        i += 1;
      }
      console.log("****************End********************");
    }
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
