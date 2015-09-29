<?php

namespace gulp;

use compact\mvvm\impl\ViewModel;
use compact\handler\impl\json\Json;
use compact\utils\JsonUtils;
/**
 * Generator for gulpfiles
 * 
 * @author Elger van Boxtel
 */
class Generator {
	
	/**
	 * Returns all available tasks
	 * 
	 * @return \ArrayObject all available gulp tasks
	 */
	public function getAvaliableTasks(){
		return JsonUtils::decode(file_get_contents(__DIR__ . '/tasks/available.json'));
	}
	
	/**
	 * Returns the ViewModel for the task
	 * 
	 * @param string $name the name of the task
	 * @param array $vars the variables to pass to the template
	 * 
	 * @return \compact\mvvm\impl\ViewModel
	 */
	public function getTask($name, array $vars){
		$vm = $this->getTemplate($name);
		foreach($vars as $key => $value){
			$vm->{$key} = $value;
		}
		
		return $vm;
	}
	/**
	 * Returns the template for the gulp task
	 * 
	 * @param string $name the name of the gulpfile to use
	 * @throws GulpException when the template could not be found
	 * 
	 * @return \compact\mvvm\impl\ViewModel
	 */
	private function getTemplate($name){
		$file = new \SplFileInfo(__DIR__ . DIRECTORY_SEPARATOR . 'tasks/' . $name . '.tpl');
		if (!is_file($file)){
			throw new GulpException("Cannot fild template for task " . $name);
		}
		
		return new ViewModel($file);
	}
}
