Spring_Library_System

Монолитное fullstack web приложение, представляющее из себя личную библиотеку с возможностью читать книги, добавлять в избранное и искать по базе данных книг Gutenberg.

Как запустить?

1) Создать Postgres базу данных с именем
spring_library_system

2) При первом запуске поменять переменные 'isPopulateUsers' и 'isPopulateBooks' на true.

3) Собрать проект

```bash
   mvn install
```

4) Запустить Spring-приложение
```bash
   mvn spring-boot:run
```
