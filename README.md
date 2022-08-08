[![Tests](https://github.com/AntonovkaE/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/AntonovkaE/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/AntonovkaE/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/AntonovkaE/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

Серверная часть раненее написаного приложение. Проект написан с помощью express, также использованы в качестве баз данных mongoDb и mongoose, для валидации запросов - библиотека celebrate, для проверки кода - ESLint, для безопасности приложения helmet и express-rate-limit. 
В данной части реализована возможность авторизации, регистрации пользователей, обновление данных пользователя. Работа с карточками, постановка/снятие лайка. 

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки
`/middlewares` - папка с файлами мидлвер
`/utils` - папка с вспомогательными файлами

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm run lint` - запуск eslintrc

В планах объелинение с Фронтенд частью.
