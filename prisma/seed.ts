import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STREAMS = [
  {
    name: 'Голосовой ассисент'
  },
  {
    name: 'Платежи'
  },
  {
    name: 'Продажи и обслуживание вне отделений'
  },
  {
    name: 'Омниканальный мидл'
  },
  {
    name: 'Сквозные компоненты'
  },
  {
    name: 'Мессенджеры и чат-боты'
  },
  {
    name: 'Дебетовые карты и счета'
  },
  {
    name: 'Продажи и обслуживание в отделении'
  },
  {
    name: 'Мобильный банк'
  },
  {
    name: 'Партнерские сервисы'
  },
  {
    name: 'Сбережение и инвестиции'
  },
  {
    name: 'Цифровые продажи'
  },
  {
    name: 'Виртуальные ассисенты'
  },
  {
    name: 'Ипотека'
  },
  {
    name: 'Нотификация'
  },
  {
    name: 'Переводы'
  },
  {
    name: 'Страхование'
  },
  {
    name: 'Фронт система.Витрина и Сценарии'
  },
  {
    name: 'Фронт система. Оформление'
  },
  {
    name: 'Клиент 360'
  },
  {
    name: 'Устройства самообслуживания'
  },
  {
    name: 'Качество и безопасность'
  }
];

async function main() {
  await prisma.stream.createMany({
    data: STREAMS,
    skipDuplicates: true
  });
}

main()
  .catch(e => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
