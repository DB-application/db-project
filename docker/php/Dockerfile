FROM php:8.1-fpm

RUN docker-php-ext-install pdo_mysql
RUN pecl install apcu
RUN pecl install redis && docker-php-ext-enable redis

RUN apt-get update && \
apt-get install -y \
libzip-dev

RUN docker-php-ext-install zip
RUN docker-php-ext-enable apcu

WORKDIR /usr/src/backend

COPY backend /usr/src/backend
RUN chmod 777 -R /usr/src/backend

RUN PATH=$PATH:/usr/src/backend/vendor/bin:bin
ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-scripts --prefer-dist --no-interaction
RUN composer dump-env prod --no-scripts
RUN chmod +x ./bin/docker-entrypoint.sh
RUN sed -i -e 's/\r$//' ./bin/docker-entrypoint.sh
RUN sed -i -e 's/\r$//' ./bin/console

ENTRYPOINT ["./bin/docker-entrypoint.sh"]
