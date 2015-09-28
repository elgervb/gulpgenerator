<?php
namespace app;

use compact\Context;
use compact\IAppContext;
use compact\routing\Router;

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
        /**
         * Show the upload form (with optionally uploaded image)
         */
        $router->add("^/$", function ()
        {
            return "Index";
        }, 'GET');
        
    }

    /**
     * (non-PHPdoc)
     * 
     * @see \compact\IAppContext::handlers()
     */
    public function handlers(Context $ctx)
    {
        //
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
