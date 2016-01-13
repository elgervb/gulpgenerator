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
}
