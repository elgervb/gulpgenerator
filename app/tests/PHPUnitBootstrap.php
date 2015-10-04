<?php
use compact\translations\Translator;
use compact\logging\Logger;
use compact\logging\recorder\impl\NullRecorder;
function loader($class)
{
    $file = $class . '.php';
    if (file_exists(__DIR__ . '/../lib/' . $file)) {
        require_once __DIR__ . '/../lib/' . $file;
    }else if(realpath(__DIR__ . '/../' . $file)){
      require_once realpath(__DIR__ . '/../' . $file);
    }
}
spl_autoload_register('loader');

include_once __DIR__ . '/../../vendor/autoload.php';
include_once __DIR__ . '/../../vendor/elgervb/compact/classes/compact/ClassLoader.php';
compact\ClassLoader::create()
	->addClassPath(__DIR__."/app")
	->addClassPath(__DIR__."/app/lib");


Translator::get();
new Logger(new NullRecorder());
$_SERVER['REMOTE_ADDR'] = "localhost";
$_SERVER["SCRIPT_FILENAME"] = realpath(__DIR__ . '/../../index.php');