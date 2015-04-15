<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<meta name="_token" content="{{ csrf_token() !!}"/>

<meta content="width=device-width,initial-scale=1" name="viewport" />

<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="{{ asset('asset/img/favicon/mstile-144x144.png') !!}">

<?php

	// ios facicon
	$res = array('57x57', '60x60', '72x72', '76x76', '114x114', '120x120', '144x144', '152x152', '180x180');
	foreach( $res as $v ) echo "<link rel='apple-touch-icon' sizes='{$v}' href='" . asset("asset/img/favicon/apple-touch-icon-{$v}.png") . "' />";


	// android facicon
	$res = array('16x16', '32x32', '96x96', '120x120', '160x160');
	foreach( $res as $v ) echo "<link rel='icon' type='image/png' href='". asset("asset/img/favicon/favicon-{$v}.png") ."' sizes='{$v}' />";

?>

{!! HTML::style( asset('asset/css/font-awesome.min.css') )	!!}
{!! HTML::style( asset('asset/css/bootstrap.min.css') )		!!}
{!! HTML::style( asset('asset/css/style.css') ) !!}
{!! HTML::style( asset('asset/css/autocomplete.css') )		!!}

{!! HTML::script( asset('asset/js/jquery.2.0.0.js') )		!!}
{!! HTML::script( asset('asset/js/jquery.tmpl.min.js') )	!!}
{!! HTML::script( asset('asset/js/bootstrap.min.js') )		!!}
{!! HTML::script( asset('asset/js/script.js') )				!!}
{!! HTML::script( asset('asset/js/form.js') )				!!}
{!! HTML::script( asset('asset/js/jquery.autocomplete.min.js') ) !!}

