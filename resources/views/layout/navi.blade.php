<?php 
	$_CONFIG = app('site_config');
?>

<header class="navbar">
	<div class="container">
	
		<div class="navbar-header">
		
			<button style="width:95px; padding:3px 10px; margin-right:5px;" class="navbar-toggle clearfix" type="button" data-toggle="collapse" data-target=".navbar-collapse">
				<div class="pull-left" style="margin-top:5px">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</div>
				<div class="text-right">MENU</div>
			</button>
			
			<div id="info">
				<a class="navbar-brand" href="{{ URL::route('home') }}">
					<span class="fa fa-music"></span> {{ $_CONFIG['name'] }}
				</a>
			</div>
		</div>

		<nav class="collapse navbar-collapse">
			<div id="menu">
				<ul class="nav navbar-nav navbar-right">
					<li>
						{{ HTML::link(SearchHelper::getLink(), Lang::get('m.search')) }}
					</li>
					
					<li><a href="/poetry/mgr/">管理 </a></li>
					<li><a href="/poetry/comment/">記事本</a></li>
					
					@if ( Auth::check() )
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								{{ Auth::user()->name }} <b class="caret"></b>
							</a>

							<ul class="dropdown-menu">
								<li><span class="fa fa-edit"></span> {{ HTML::link( UserHelper::getEditLink(Auth::user()->id), Lang::get('m.user.edit')) }}</li>
								<li><span class="fa fa-music"></span> {{ HTML::link( URL::route('recent'), Lang::get('m.user.recent')) }}</li>
								<li><span class="fa fa-lock"></span> {{ HTML::link( UserHelper::getEditPasswordLink(Auth::user()->id), Lang::get('m.user.editPassword')) }}</li>
								<li><span class="fa fa-youtube-play"></span> {{ HTML::link( UserHelper::getMyPlaylistLink(Auth::user()->id), Lang::get('m.user.playlist')) }}</li>
								<li><span class="fa fa-sign-out"></span> {{ HTML::link(URL::route('logout'), Lang::get('m.logout')) }}</li>
							</ul>
						</li>
					@else
						<li>{{ HTML::link(URL::route('login'), Lang::get('m.login')) }}</li>
					@endif
					
					
				</ul>
			</div>
		</nav>
	</div>
</header>