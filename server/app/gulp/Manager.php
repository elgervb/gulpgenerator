<?php
namespace gulp;

/**
 *
 * @author eaboxt
 *        
 */
class Manager
{
    /**
     * Saves a gulpfile to disc
     * 
     * @param array $json the gulpfile data
     * 
     * @throws \Exception on invalid data
     * @return string the id of the gulpfile
     */
    public static function save(array $json) {
        if (!isset($json['name'])) {
            throw new \Exception('Name of the gulpfile is not specified');
        }
        if (!isset($json['version']) || !isset($json['version']['major']) || !isset($json['version']['minor']) || !isset($json['version']['patch'])) {
            throw new \Exception('Version of the gulpfile is not specified');
        }
        
        $json['uuid'] = self::uuid();
        
        $fp = fopen(self::filename($json['uuid']), 'w');
        fwrite($fp, json_encode($json));
        fclose($fp);
        
        return $json['uuid'];
    }
    
    /**
     * Loads a gulpfile from disk
     * 
     * @param string $id
     * @throws \Exception
     * @return string|boolean The content of the file or false when a gulpfile with id does not exists
     */
    public static function load($id) {
        if (!$id) {
            throw new \Exception('Id is mandatory');
        }   
        
        $file = self::filename($id);
        if(is_file($file)) {
            return json_decode(file_get_contents($file), true);
        }
        
        return false;
    }
    
    /**
     * Returns the storage directory for all gulpfiles
     * 
     * @return string the directory
     */
    private static function filename($id) {
        return sys_get_temp_dir() . DIRECTORY_SEPARATOR . $id . '.json';
    }
    
    /**
     * Creates a new UUID like 4ddb9da0-a641-471d-a926-221a7a33b0ec
     *
     * @return string The UUID
     */
    private static function uuid()
    {
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
        .substr($charid, 8, 4).$hyphen
        .substr($charid,12, 4).$hyphen
        .substr($charid,16, 4).$hyphen
        .substr($charid,20,12);
        
        return $uuid;
    }
}