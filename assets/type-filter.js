console.log("hello");


$(document).ready(function() {
    // When a filter option is selected
    $('input[name="type-filter"]').change(function() {
      const selectedType = $(this).attr('id');
      // Show all products if "all" is selected
      if (selectedType === 'all') {
        $('.product-card').show();
      } else {
        // Hide all products
        $('.product-card').hide();
  
        // Show only the products that match the selected type
        $('.product-card[data-type="' + selectedType + '"]').show();
      }
    });
  });
