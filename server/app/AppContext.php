<?php
namespace app;

use compact\Context;
use compact\IAppContext;
use compact\routing\Router;
use compact\handler\impl\json\JsonHandler;
use gulp\GulpfileController;
use compact\handler\impl\json\Json;

/**
 * The Application Context
 *
 * @author eaboxt
 */
class AppContext implements IAppContext
{
	/**
	 * Regex to match a guid: 4ddb9da0-a641-471d-a926-221a7a33b0ec
	 * @var string
	 */
	const GUID_REGEX = "[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}";
	
    /**
     * (non-PHPdoc)
     * 
     * @see \compact\IAppContext::routes()
     */
    public function routes(Router $router)
    {
    	$router->add('^/$', function(){
    		return new Json([
				"/" => [
    				"method" => "GET",
					"desc" => "Get routing info"
    			],
    			"/predefinedtasks" => [
    				"method" => "GET",
    				"desc" => "Get all predefined tasks"
    			],
    			"/gulpfile" => [
    				"method" => "POST",
    				"desc" => "Add a new gulpfile"
    			],
    			"/gulpfile/:guid" => [
					"method" => "GET",
    				"desc" => "Get an existing gulpfile"
    			],
    			"/gulpfile/:guid/generate" => [
	    			"method" => "GET",
	    			"desc" => "Generate the gulpfile"
    			],
    			"/gulpfile/:guid/tasks" => [
    				"method" => "PUT",
    				"desc" => "Add a gulp task to an existing gulpfile"
    			]
    		]);
    	});
        
        $router->add("^/predefinedtasks$", function () {
        	return GulpfileController::instance()->getPredefinedTasks();
        }, 'GET');
        
        $router->add("^/gulpfile$", function (){
        	return GulpfileController::instance()->post();
        }, 'POST');
        
        $router->add("^/gulpfile/(".self::GUID_REGEX.")$", function($guid){
        	return \gulp\GulpfileController::instance()->get($guid);
        }, 'GET');
        
        $router->add("^/gulpfile/(".self::GUID_REGEX.")/generate$", function($guid){
        	return \gulp\GulpfileController::instance()->download($guid);
        }, 'GET');
        
        $router->add("^/gulpfile/(".self::GUID_REGEX.")/tasks$", function($guid){
        	return \gulp\GulpfileController::instance()->addtask($guid);
        }, 'PUT');
        
        if (Context::get()->isLocal()){
        	Context::get()->http()->getResponse()->setCORSHeaders();
        	$router->add(".*", function(){
        		return " ";
        	}, 'OPTIONS');
        }
    }

    /**
     * (non-PHPdoc)
     * 
     * @see \compact\IAppContext::handlers()
     */
    public function handlers(Context $ctx)
    {
        $ctx->addHandler(new JsonHandler());
    }

    /**
     * (non-PHPdoc)
     * 
     * @see \compact\IAppContext::services()
     */
    public function services(Context $ctx)
    {
        //
    }
}
