<?php 
namespace App\Http\Middleware;

use Closure;

class MyMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{		
		\App::singleton('site_config', function(){
			$obj = array( array('name' => 'site_name', 'value' => '2234') );

			$_CONFIG = array();
			foreach ( $obj as $v ) $_CONFIG['name'] = $v['value'];

			return $_CONFIG;
		});
		
		return $next($request);
	}

}
