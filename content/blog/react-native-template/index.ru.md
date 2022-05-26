---
title: Как быстро начать проект для разработки React Native приложения
date: "2022-05-25T22:36:00Z"
---

Зачастую, структуры построения приложения от проекта к проекту переизобретаются с нуля. При таком подходе, есть целый ряд неудобств, такие как удаление ненужных модулей или добавление новых; переименование переменных. Все это трудоемкая и кропотливая работа, которая занимает немало времени

Хочу рассказать о шикарном способе создать стартер своей мечты

### Всего в пять шагов

1.  Создание проекта обычным способом
```js
 npx react-native init AwesomeProject
```
> ВАЖНО: необходимо указывать имя проекта в Pascal case стиле, это имя будет заменено на имя проекта созданного при помощи шаблона 

Далее можно интегрировать разнообразные модули и создать структуру, которую планируется использовать при старте разработки нового проекта

2. Изменение имени корневой директори созданного проекта на новое:  `template`

3. Создание репозитория; перенос директори с шаблоном и добавлени конфигурационных файлов

Должна получиться такая структура:

```tree
any-name-of-your-repo
 ┣ template
 ┣ script.js
 ┗ template.config.js
```
> Из `template` рекомендуется удалить `yarn.lock` и `ios/Podfile.lock`

`script.js`
```js
#!/usr/bin/env node

console.log("This is post init script");
```

` template.config.js`
```js
module.exports = {
 // Имя заполнитель, которое будет заменено
 // в package.json, index.json, android/, ios/ именем проекта
 placeholderName: "AwesomeProject",

 // Дириктория с шаблоном
 templateDir: "./template",

 // Путь к скрипту, который будет выполнен после
 postInitScript: "./script.js"
};
```

4. Пушим наш шаблон, например, на [GitHub](https://github.com)

5. Можно использовать 
```js 
 npx react-native init MyApp --template https://github.com/YOUR_NAME/YOUR_REPO_NAME
```

### Для ознакомления
`react-native-community/cli ` [Creating custom template](https://github.com/react-native-community/cli/blob/master/docs/init.md#creating-custom-templatehttps://github.com/react-native-community/cli/blob/master/docs/init.md#creating-custom-template)

___

✨ [Мой шаблон](https://github.com/sergeiivanow/react-native-fsd-templete#-react-native-feature-sliced-design-template)
