<?php
namespace app;

use compact\Context;
use compact\IAppContext;
use compact\routing\Router;
use compact\handler\impl\json\JsonHandler;
use gulp\GulpfileController;

/**
 * The Application Context
 *
 * @author eaboxt
 */
class AppContext implements IAppContext
{
    /**
     * (non-PHPdoc)
     * 
     * @see \compact\IAppContext::routes()
     */
    public function routes(Router $router)
    {
        $router->add("^/gulpfile$", function ()
        {
            return GulpfileController::instance()->post();
        }, 'POST');
        
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
