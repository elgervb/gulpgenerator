<?php

namespace tests\gulp;

use gulp\GulpfileController;
use compact\handler\impl\http\HttpStatus;
use compact\utils\Random;
/**
 *
 * @author elger
 *        
 */
class GulpFileControllerTest extends \PHPUnit_Framework_TestCase {


	protected function tearDown(){
		$_POST = [];
	}
	
	public function testGetPredefinedTasks(){
		$tasks = GulpfileController::instance()->getPredefinedTasks()->getObject();
		
		$this->assertTrue(is_array($tasks->{'tasks'}));
		$this->assertGreaterThanOrEqual(1, $tasks->{'tasks'});
	}
	public function testPost204NoContent(){
		
		$response = GulpfileController::instance()->post();
		
		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(204, $response->getHttpCode(), "Check the http status code");
		
		$this->assertArrayHasKey("message", $response->getContent(), "Check that there is an error message");
	}
	
	public function testPost422ValidationError(){
		$_POST['tasks'] = [['name' =>'copy', 'src'=>'./src', 'dist'=>'./dest']];
		$response = GulpfileController::instance()->post();

		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(422, $response->getHttpCode(), "Check the http status code");
		
		$this->assertArrayHasKey("message", $response->getContent(), "Check that there is an error message");
	}
	
	public function testPost201Created(){
		$_POST['guid'] = Random::guid();
		$_POST['version'] = 'v1.0.0';
		$_POST['tasks'] = [['name' =>'copy', 'description'=>'test gulpfile', 'src'=>'./src', 'dist'=>'./dest']];
		$response = GulpfileController::instance()->post();
	
		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(201, $response->getHttpCode(), "Check the http status code");
		
		return $response->getContent()->getObject();
	}
	
	public function testAddTask(){
		$task = $this->testPost201Created();
		$this->assertNotEmpty($task->{"guid"});
		$this->assertTrue(is_array($task->{"tasks"}));
		$this->assertGreaterThanOrEqual(1, count($task->{'tasks'}));
		
		// reset post
		$_POST = [];
		
		// prep task
		$_POST['type'] = "test";
		$_POST['name'] = "testName";
		
		// add task
		$response = GulpfileController::instance()->addtask($task->{"guid"});
		$task = $response->getContent()->getObject();
		$this->assertEquals($_POST['type'], $task->{"type"});
		$this->assertEquals($_POST['name'], $task->{'name'});
	}
}
