@extends('layout.main')

@section('content')
<div class='col-md-6' style='line-height:2'>
	{{ Lang::get('m.loginInfo') }!}
</div>

<div class='col-md-6' style='background:#f1f1f1; padding:15px'>
	{!! Former::horizontal_open()->secure() !!}

		{!! Former::text('account', Lang::get('m.account') ) !!}
		{!! Former::password('password', Lang::get('m.password') ) !!}
		{!! Former::checkbox('rememberMe', ' ')->text( Lang::get('m.rememberMe') )->check() !!}

		<div class="form-group">
			<div class='col-lg-10 col-sm-8 text-center'>

				{!! Former::primary_submit( Lang::get('m.submit') ) !!}
			</div>
		</div>
	</div>
	{!! Former::close() !!}
</div>
@stop


