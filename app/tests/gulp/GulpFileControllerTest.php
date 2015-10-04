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
		$_POST['tasks'] = [['name' =>'copy', 'src'=>'./src', 'dist'=>'./dest']];
		$response = GulpfileController::instance()->post();
	
		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(201, $response->getHttpCode(), "Check the http status code");
	
	}
}
