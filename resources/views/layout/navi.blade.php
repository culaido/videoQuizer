<?php 
	$_CONFIG = app('site_config');
?>
<header class="navbar">
	<div class="container">
	
		<div class="navbar-header">
				
			<div id="info">
				<a class="navbar-brand" href="{{ URL::route('home') }}">
					<span class="fa fa-edit"></span> {{ $_CONFIG['name'] }}
				</a>
			</div>
		</div>
	</div>
</header>