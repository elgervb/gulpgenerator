<?php 
use router\Router;
use handler\Handlers;
use handler\json\JsonHandler;
use handler\http\HttpStatusHandler;
use handler\http\HttpStatus;

include __DIR__ . '/../vendor/autoload.php';

// all dates in UTC timezone
date_default_timezone_set("UTC");
ini_set('date.timezone', 'UTC');

$router = new Router();
Handlers::get()->add(new JsonHandler());
Handlers::get()->add(new HttpStatusHandler());

/**
 * 
 */
$router->route('root', '/', function ()
{
    return new HttpStatus(200);
});

$result = $router->match($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);

$handler = Handlers::get()->getHandler($result);

if ($handler) {
    $handler->handle($result);
} else {
    $error = new HttpStatus(404, ' ');
    $handler = Handlers::get()->getHandler($error);
    $handler->handle($error);
}

return $result; // for testing purposes