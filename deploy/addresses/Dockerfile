# Загрузка базового образа с Node.js
FROM node:21

# Определяем аргументы, которые можно передать в момент сборки образа
ARG NODE_ENV=production
ARG PORT=4001
ARG POSTGRES_DB='addresses'
ARG POSTGRES_USER='postgres'
ARG POSTGRES_PASSWORD='0896'
ARG POSTGRES_HOSTNAME='postgres'

# Устанавливаем переменные окружения внутри контейнера
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_HOSTNAME=${POSTGRES_HOSTNAME}

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app
# Копируем файл package.json в рабочую директорию контейнера
COPY package.json ./

RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm i

# Копируем все остальные файлы и директории в контейнер
COPY . .

EXPOSE ${PORT}

CMD ["node", "index.js"]

# docker build --build-arg NODE_ENV=production --build-arg PORT=4000 --build-arg POSTGRES_PASSWORD='0896' -t users .
# docker run -p 4000:4000 users

# для minkube:
#& minikube docker-env | Invoke-Expression



#>> docker build -t abdulovdb/addresses . 