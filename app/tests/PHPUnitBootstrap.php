<?php
function loader($class)
{
    $file = $class . '.php';
    if (file_exists(__DIR__ . DIRECTORY_SEPARATOR . '../lib/' . $file)) {
        require_once __DIR__ . DIRECTORY_SEPARATOR . '../lib/' . $file;
    }else if(realpath(__DIR__ . '/../' . $file)){
      require_once realpath(__DIR__ . '/../' . $file);
    }
}
spl_autoload_register('loader');

include_once 'vendor/autoload.php';
include_once __DIR__ . '/../../vendor/elgervb/compact/classes/compact/ClassLoader.php';
compact\ClassLoader::create()
->addClassPath(__DIR__."/app")
->addClassPath(__DIR__."/app/lib");
