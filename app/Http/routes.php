<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
/*
App::before(function($request)
{
    App::singleton('site_config', function(){
        $obj = array('name' => 'test');

		$_CONFIG = array();
		foreach ( $obj as $v ) $_CONFIG['name'] = $v['value'];

        return $_CONFIG;
    });
});
*/


Route::get('/', 'WelcomeController@index');
