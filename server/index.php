<?php
use compact\mvvm\FrontController;
include_once 'vendor/elgervb/compact/classes/compact/ClassLoader.php';
include_once 'vendor/autoload.php';
compact\ClassLoader::create()
    ->addClassPath(__DIR__."/app")
    ->addClassPath(__DIR__."/app/lib");

$fc = new FrontController();
$fc->run();
