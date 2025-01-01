# Загрузка базового образа с Node.js
FROM node:21

# Определяем аргументы, которые можно передать в момент сборки образа
ARG NODE_ENV=production
ARG PORT=3000

# Устанавливаем переменные окружения внутри контейнера
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app
# Копируем файл package.json в рабочую директорию контейнера
COPY package.json ./

RUN rm -rf node_modules
RUN npm i

# Копируем все остальные файлы и директории в контейнер
COPY . .

CMD ["npm", "start"]