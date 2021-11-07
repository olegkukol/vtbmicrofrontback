# vacations_backend

Перед запуском необходимо установить докер

### `yarn` - устанавливаем зависимости

### `prisma migrate dev --name init` - генерация таблиц в БД, затем `npm run seed` - заполняем бд данными стримов и команд (запускаем всего 1 раз)

### `npm run build` - запуск сервера на 3001 порту (порт можно поменять в .env и в Dockerfile)

Текущие методы можно посмотреть в src/routes/index.ts (полный путь /api/login итд)

Модели данных в prisma/schema.prisma