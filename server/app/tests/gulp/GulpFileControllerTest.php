<?php

namespace tests\gulp;

use gulp\GulpfileController;
use compact\handler\impl\http\HttpStatus;
use compact\utils\Random;
use compact\handler\impl\json\Json;
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
		$this->assertTrue($response->getContent() instanceof Json, "Check that the result is JSON");
		
		$this->assertArrayHasKey("message", $response->getContent()->getObject(), "Check that there is an error message");
	}
	
	public function testPost422ValidationError(){
		$_POST['tasks'] = [['name' =>'copy', 'src'=>'./src', 'dist'=>'./dest']];
		$response = GulpfileController::instance()->post();

		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(422, $response->getHttpCode(), "Check the http status code");
		$this->assertTrue($response->getContent() instanceof Json, "Check that the result is JSON");
		
		$this->assertArrayHasKey("message", $response->getContent()->getObject(), "Check that there is an error message");
	}
	
	public function testPost201Created(){
		$_POST['version'] = 'v1.0.0'; 
		$_POST['name'] = Random::alphaNum(10);
		$_POST['description'] = Random::alphaNum(10);
		//$_POST['tasks'] = [['name' => Random::alphaNum(10), 'description'=>'test gulpfile', 'src'=>'./src', 'dist'=>'./dest']];
		$response = GulpfileController::instance()->post();

		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(201, $response->getHttpCode(), "Check the http status code");
		
		return $response->getContent()->getObject();
	}
	
	public function testAddTask(){
		$task = $this->testPost201Created();
		$this->assertNotEmpty($task->{"guid"}, "Guid must be filled in");
		$this->assertObjectNotHasAttribute('tasks', $task);
		
		// reset post
		$_POST = [];
		
		// prep task
		$_POST['type'] = "test";
		$_POST['name'] = "testName";
		
		// add task
		$response = GulpfileController::instance()->addtask($task->{"guid"});
		$task = $response->getContent()->getObject();
		$this->assertEquals($_POST['type'], $task[0]->{"type"});
		$this->assertEquals($_POST['name'], $task[0]->{'name'});
	}
}
