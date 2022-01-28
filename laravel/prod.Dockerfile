FROM php:7.4-cli AS builder

WORKDIR /var/www

RUN apt-get update && \
	apt-get install libzip-dev -y && \
	docker-php-ext-install zip

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
	php composer-setup.php && \
	php -r "unlink('composer-setup.php');"

RUN php composer.phar create-project --prefer-dist laravel/laravel laravel

ENTRYPOINT ["php", "laravel/artisan", "serve"]
CMD ["--host=0.0.0.0"]

FROM php:7.4-fpm-alpine

WORKDIR /var/www
RUN rm -rf /var/www/html
COPY --from=builder /var/www/laravel .

RUN ln -s public html
RUN chown -R www-data:www-data /var/www

EXPOSE 9000

CMD ["php-fpm"]
