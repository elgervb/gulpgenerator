<?php

namespace tests\gulp;

use gulp\GulpfileController;
use compact\handler\impl\http\HttpStatus;
/**
 *
 * @author elger
 *        
 */
class GulpFileControllerTest extends \PHPUnit_Framework_TestCase {


	public function testPost204(){
		
		$response = GulpfileController::instance()->post();
		
		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(204, $response->getHttpCode());
	}
	
	public function testPost201(){
		$_POST['tasks'] = [['name' =>'copy', 'src'=>'./src', 'dist'=>'./dest']];
		$response = GulpfileController::instance()->post();

		$this->assertTrue($response instanceof HttpStatus);
		$this->assertEquals(201, $response->getHttpCode());
	}
}
