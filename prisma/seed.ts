import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

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
  try {
    const result = [];

    for (let i = 0; i < STREAMS.length; i += 1) {
      result.push(
        prisma.stream.create({
          data: {
            name: STREAMS[i].name,
            teams: {
              create: [
                {
                  name: 'Team 1'
                },
                {
                  name: 'Team 2'
                },
                {
                  name: 'Team 3'
                }
              ]
            }
          }
        })
      );
    }

    await Promise.all(result);

    const stream = await prisma.stream.findFirst({
      where: {
        name: 'Голосовой ассисент'
      },
      include: {
        teams: true
      }
    });

    const headOfDepartment = await prisma.employee.create({
      data: {
        fio: 'Mike',
        username: 'username1',
        position: 'position1',
        role: 'HEAD_OF_DEPARTMENT',
        type: 'INTERNAL',
        password: hashSync('password', 8)
      }
    });

    const headOfStream = await prisma.employee.create({
      data: {
        fio: 'Dan',
        username: 'username2',
        position: 'position2',
        role: 'HEAD_OF_STREAM',
        type: 'INTERNAL',
        streamId: stream.id,
        password: hashSync('password', 8)
      }
    });

    const headOfTeam = await prisma.employee.create({
      data: {
        fio: 'John',
        username: 'username3',
        position: 'position3',
        role: 'HEAD_OF_TEAM',
        type: 'INTERNAL',
        streamId: stream.id,
        teamId: stream.teams[0].id,
        password: hashSync('password', 8)
      }
    });

    await prisma.stream.updateMany({
      data: {
        headOfDepartmentId: headOfDepartment.id
      }
    });

    await prisma.stream.updateMany({
      data: {
        headOfDepartmentId: headOfDepartment.id
      }
    });

    await prisma.team.update({
      where: {
        id: stream.teams[0].id
      },
      data: {
        teamItLeaderId: headOfTeam.id
      }
    });

    await prisma.stream.update({
      where: {
        id: stream.id
      },
      data: {
        streamItLeaderId: headOfStream.id
      }
    });
  } catch (e) {
    console.error(e.message); // eslint-disable-line no-console
  }
}

main()
  .catch(e => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
