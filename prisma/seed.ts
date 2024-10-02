const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.template.createMany({
    data: [
      {
        name: "História do casal",
        description: "Compartilhe os momentos mais especiais da sua história de amor, desde o primeiro encontro até as conquistas mais recentes, em um formato único e emocionante.",
        thumbnail: "/images/love-history.jpg",
      },
      {
        name: "Declaração de amor",
        description: "Declare todo o seu amor de maneira criativa e impactante, tornando cada palavra uma lembrança inesquecível para a pessoa amada.",
        thumbnail: "/images/love-declaration.jpg",
      },
      {
        name: "Celebração de aniversário",
        description: "Celebre cada ano juntos com uma página interativa que relembra os melhores momentos e fortalece ainda mais o laço entre vocês.",
        thumbnail: "/images/birthday-celebration.jpg",  
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
