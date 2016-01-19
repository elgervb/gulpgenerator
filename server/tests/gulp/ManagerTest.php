<?php
namespace gulp;

use gulp\Manager;
/**
 *
 * @author eaboxt
 */
class ManagerTest extends \PHPUnit_Framework_TestCase
{
    
    /**
     * Test save and read of a gulpfile
     */
    public function testSaveLoad() {
        $json = [
            'name'=>'test',
            'version'=>['major'=>1,'minor'=>0,'patch'=>0]
        ];
        
        $id = Manager::save($json);
        $this->assertNotNull($id, 'Data has not been saved');
        
        $content = Manager::load($id);
        $this->assertNotNull($content, 'Content should not be null');
        $this->assertEquals($json['name'], $content['name']);
        $this->assertEquals($id, $content['uuid']);
        $this->assertEquals($json['version'], $content['version']);
    }
    
    /**
     * Test trying to load a gulpfile without an id
     */
    public function testLoadWithoutId() {
        try {
            Manager::load(null);
            $this->fail('Exception expected');
        } catch (\Exception $e) {
            $this->assertEquals('Id is mandatory', $e->getMessage());
        }
    }
    
    /**
     * Test trying to load a gulpfile with a non existing ID
     */
    public function testLoadNonExistingId() {
        $result = Manager::load('$$$-non-existing-id-$$$');
        $this->assertFalse($result);
    }
    
    /**
     * Test saving a gulpfile without a name
     */
    public function testSaveWithoutName() {
        $json = [
            'version'=>['major'=>1,'minor'=>0,'patch'=>0]
        ];
        try {  
            Manager::save($json);
            $this->fail('Exception expected');
        } catch (\Exception $e) {
            $this->assertEquals('Name of the gulpfile is not specified', $e->getMessage());
        }
    }
    
    /**
     * Test saving a gulpfile without a version
     */
    public function testSaveWithoutVersion() {
        $json = [
            'name'=>'test',
        ];
        try {
            Manager::save($json);
            $this->fail('Exception expected');
        } catch (\Exception $e) {
            $this->assertEquals('Version of the gulpfile is not specified', $e->getMessage());
        }
    }
    
    /**
     * Test saving a gulpfile without a version
     */
    public function testSaveWithoutMinorVersion() {
        $json = [
            'name'=>'test',
            'version'=>['major'=>1,'patch'=>0]
        ];
        try {
            Manager::save($json);
            $this->fail('Exception expected');
        } catch (\Exception $e) {
            $this->assertEquals('Version of the gulpfile is not specified', $e->getMessage());
        }
    }
    
    public function testRoute() {
        
        $index = __DIR__ .'/../../app/index.php';
        $this->assertFileExists($index);
        
        $_SERVER['REQUEST_URI'] = '/';
        $_SERVER['REQUEST_METHOD'] = 'GET';
        
        ob_start();
        $handler = include($index);
        $content = ob_get_clean();
        
        $this->assertEmpty($content, 'Expected no content');
        
        $this->assertTrue($handler instanceof \handler\http\HttpStatus, 'Expected different class. ' . get_class($handler) );
        /* @var $handler \handler\http\HttpStatus */
        $this->assertEquals(200, $handler->getHttpCode());
        $this->assertEmpty($handler->getContent());
    }
}
