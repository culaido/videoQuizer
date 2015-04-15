var form = (function(){

	var selector;

	return {

		init : function( s ){

			$.ajaxSetup({headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }});

			selector = s;

			selector.find('.form-group input')
				.focus(function(){ $(this).closest('.form-group').addClass('active');
				})
				.blur(function(){ $(this).closest('.form-group').removeClass('active');
			});
		},

		submit : function(dataString, url){

			var self = this;

			if ( !url ) {

				var action = selector.attr('action');

				if (action) url = action;
				else url = window.location.href;
			}

			dataString	= (!dataString) ? this.getData() : {};

			selector.find('[type="submit"]').prop('disabled', true);
			selector.find('[type="cancel"]').prop('disabled', true);

			lib.loading.show();

			var type = 'POST';
			if ( selector.find("[name='_method']").length > 0 ) type = selector.find('[name="_method"]').attr('value');

			$.ajax({
				type		: type,
				url			: url,
				data		: dataString,
				dataType	: 'json',
				success : function( e ){
					selector.find('[type="submit"]').prop('disabled', false);
					selector.find('[type="cancel"]').prop('disabled', false);

					lib.loading.hide();
					self.validator.init( e );
				}
			});
		},

		getData : function(){
			return selector.serialize();
		},

		validator : {

			init : function( data ){
				if ( data.status == false )	this.fail(data);
				else 						this.success(data);
			},

			fail : function( data ){

				var msg = data.error;

				this.clearError();

				if ( data.type == 'alert' ) {
					alert( msg );
					return;
				}

				$.each( msg, function(key, itm){

					var inp = selector.find('[name="' + key + '"]');

					inp.closest('.form-group').addClass('has-error');

					var sw = $(document.body).width();

					var placement = 'right';
					if ( ( parseInt(inp.offset().left, 10) + inp.width() + 280 ) > sw){
						placement = 'bottom';
					}

					inp.popover('destroy').popover({
						container	:'body',
						content		: itm,
						placement 	: placement,
						template	: '<div class="popover form-popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
						trigger		: 'keydown'
					});
				} );
			},

			clearError : function(){

				selector.find('.has-error input').each(function(key, itm){

					var inp = $(itm);

					inp.closest('.form-group').removeClass('has-error');
					inp.popover('destroy');
				});
			},

			success : function( data ){

				if ( data.redir ) {
					window.location.href = data.redir;
					return;
				}

				if ( data.alert ) {
					alert(data.alert);
					return;
				}

			}

		}




	}

})();


