describe('buttons - button().collectionRebuild()', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'buttons', 'buttons-colVis'],
		css: ['datatables', 'buttons']
	});

	let table;

	describe('Check the defaults', function () {
		dt.html('basic');
		it('Ensure its a function', function () {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests

						extend: 'collection',
						buttons: [{text: 'first'}]
					},
					{
						extend: 'collection',
						buttons: [{text: 'second'}]
					}
				]
			});
			expect(typeof table.button().collectionRebuild).toBe('function');
		});
		it('Returns an API instance', function () {
			expect(table.button(1).collectionRebuild([{text: 'third'}]) instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Functional tests - basic', function () {
		dt.html('basic');
		it('Confirm original button', function () {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests

						extend: 'collection',
						buttons: [{text: 'first'}]
					},
					{
						extend: 'collection',
						buttons: [{text: 'second'}]
					}
				]
			});

			$('button.buttons-collection:eq(1)').click();
			expect($('div.dt-button-collection button.dt-button').text()).toBe('second');
		});
		it('Call rebuild', function () {
			table.button(1).collectionRebuild([{text: 'third'}]);
			expect($('div.dt-button-collection button.dt-button').text()).toBe('third');
		});
		it('Other collection not effected', function (done) {
			$('button.buttons-collection:eq(0)').click();
			setTimeout(function () {
				expect($('div.dt-button-collection button.dt-button').text()).toBe('first');
				done();
			}, 500);
		});
	});
});
