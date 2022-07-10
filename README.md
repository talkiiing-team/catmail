# CatMail

## Запуск

### Деплой

Проект задеплоен по адресу: https://catmail.roamiiing.ru

### Если вдруг бэк будет недоступен или захочется запустить его локально:

Бэкенд находится в папке server и запускается командой `npm start`. Базы данных не используется, только in-memory storage.

Фронтенд находится в папке client и запускается при помощи `npm run dev`

## Заметки

- Можно загружать json файлы в таком же формате, как представленные для тестирования
- Если скроллить вниз, то будут подгружаться по 10 новых писем, а старые 10 будут убираться, итого в памяти всегда 20 писем

На запросы GET бэкенд принимает параметры `skip` и `limit`, которые позволяют реализовывать подгрузку новых писем с заданным количеством.