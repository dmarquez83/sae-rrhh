## SAE - RRHH

Prerequisitos
 - PHP 5.6 con modulos (php-gd, php-mcrypt, php-mongo)
 - Composer
 - NODEJS y NPM
 - Instalar GULP y GULP-CLI
 
```shell
npm install -g gulp
npm install - gulp-cli
```
- Instalar BOWER

```shell
npm install -g bower
```

Pasos a seguir para instalar dependencias

```shell
composer install
npm install
bower install
```

Ejecutar el comando GULP para minificar codigo cliente
```shell
gulp
```

Datos iniciales en base de datos

```shell
php artisan migrate:refresh --seed
```


