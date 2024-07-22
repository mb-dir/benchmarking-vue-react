# Frontend Framework Performance Comparison - Vue.js app

## How to Use

### Tl;dr

-   Clone the repo
-   Navigate to `react-forum` diractory
-   Install dependencies
-   Setup database
-   Run `php artisan serve` and `npm run dev`

### Setup

-   Clone the whole repository using `https://github.com/mb-dir/benchmarking-vue-react.git`
-   Navigate to `react-forum` via `cd react-forum`
-   Run `composer install` and `npm install` to install dependencies
-   Copy `.env.example` file as `.env` and setup your database
    Especially those fields:

    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=react_forum
    DB_USERNAME=root
    DB_PASSWORD=
    ```

-   Run `php artisan migrate` and then `php artisan db:seed` to create db structure and insert mock data
-   Run `php artisan serve` and in separate terminal `npm run dev`
-   Open the application on localserver (`127.0.0.1:8000` by default)
