<?php 
namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

class MyMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	 
	protected $auth;
	
	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
	}
	
	public function handle($request, Closure $next)
	{		
		\App::singleton('site_config', function(){
			$obj = array( array('name' => 'site_name', 'value' => '2234') );

			$_CONFIG = array();
			foreach ( $obj as $v ) $_CONFIG['name'] = $v['value'];

			return $_CONFIG;
		});

		if ( $this->auth->guest() )
		{
			print_r ( $request->route() );
		//	return redirect('');
		}
		
		
		
		return $next($request);
	}

}
