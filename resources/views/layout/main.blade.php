<?php
	$_CONFIG = app('site_config');
?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-tw" xml:lang="zh-tw">
	<head>
		@include('layout.meta')

		<title>[{{ $_CONFIG['name'] }}] @yield('title')</title>

		@yield('oEmbed')

	</head>
	<?php
		$route = explode('.', Route::currentRouteName());
		if ( isset($route[1]) && $route[1] == 'show' ) unset($route[1]);
		$id = join('-', $route);
	?>
	<body id='{{ $id }}'>
		@yield('banner')

		@yield('breadcrumb')

		@yield('prev')

		<div id='main'>
			<div class='container'>
				<div class='row'>
					@yield('content')
				</div>
			</div>
		</div>

		@yield('after')

		@include('layout.footer')
	</body>

	@yield('js')

</html>