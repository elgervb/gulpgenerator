<?php

namespace lib\gulp\model;

use compact\repository\DefaultModelConfiguration;
use compact\validation\ValidatorList;
use compact\mvvm\IModel;
use compact\mvvm\impl\validation\ModelValidatorAdapter;
use compact\mvvm\impl\validation\ModelFieldsNotNullValidator;

/**
 *
 * @author elger
 *        
 */
class GulpTaskModelConfiguration extends DefaultModelConfiguration {

	private $validators;
	
	/**
	 *
	 * @see compact\repository\IModelConfiguration::validate()
	 */
	public function validate(IModel $model)
	{
		if ($this->validators === null){
			$this->validators = new ValidatorList();
			
			$this->validators->register(new ModelFieldsNotNullValidator(["guid", "tasks", "version"]));
		}
		$this->validators->validate($model);
	}
}
