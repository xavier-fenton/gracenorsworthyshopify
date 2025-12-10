
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('input[name="type-filter"]').forEach(input => {
    input.addEventListener('change', function() {
      const selectedType = this.id.replaceAll(" ", "");
      
      document.querySelectorAll('.product-card').forEach(card => {
        if (selectedType === 'all' || card.dataset.type === selectedType) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});