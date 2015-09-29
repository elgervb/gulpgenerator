<?php
namespace tests\gulp;

use gulp\Generator;
/**
 *
 * @author elger
 *       
 */
class GeneratorTest extends \PHPUnit_Framework_TestCase {

	private $generator;
	
	protected function setUp(){
		$this->generator = new Generator();
	}
	public function testGetAvaliableTasks(){
		$tasks = $this->generator->getAvaliableTasks();
		
		$this->assertGreaterThanOrEqual(1, $tasks->count());
	}
	public function testGetAvaliableTasksStructure(){
		$tasksObj = $this->generator->getAvaliableTasks();
	
		$this->assertTrue($tasksObj->offsetExists('tasks'));
		
		$tasks = $tasksObj->offsetGet('tasks');
		$this->assertTrue(is_array($tasks));
		$this->assertGreaterThanOrEqual(1, count($tasks));
		
		$this->assertArrayHasKey('name', $tasks[0]);
		$this->assertArrayHasKey('vars', $tasks[0]);
	}
	
	public function testGenerateCleanCache(){
		$task = $this->generator->getTask('clear-cache', ['name'=>'clear-cache']);
		
		$this->assertEquals('clear-cache', $task->{'name'});
	}
	public function testGenerateCleanCacheRender(){
		$task = $this->generator->getTask('clear-cache', ['name'=>'clear-cache']);
	
		$render = $task->render();
		
		$this->assertContains("gulp.task('clear-cache',", $render);
	}
}
