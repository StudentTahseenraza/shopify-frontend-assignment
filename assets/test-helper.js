// Test Helper - Run this in browser console to add test products
// Only use for testing purposes!

const testProducts = [
  { title: "Ocean Blue Shirt", price: 50.00, image: "https://via.placeholder.com/500x500/4a90e2/white?text=Ocean+Blue" },
  { title: "Black Leather Bag", price: 30.00, image: "https://via.placeholder.com/500x500/2c2c2c/white?text=Black+Bag" },
  { title: "Blue Silk Tuxedo", price: 70.00, image: "https://via.placeholder.com/500x500/3b5998/white?text=Silk+Tuxedo" },
  { title: "Classic Varsity Top", price: 45.00, image: "https://via.placeholder.com/500x500/c0392b/white?text=Varsity" },
  { title: "White Cotton Tee", price: 25.00, image: "https://via.placeholder.com/500x500/ecf0f1/333?text=Cotton+Tee" },
  { title: "Denim Jacket", price: 85.00, image: "https://via.placeholder.com/500x500/2980b9/white?text=Denim+Jacket" }
];

console.log("Test Helper Loaded!");
console.log("To add test products, run: addTestProducts()");

window.addTestProducts = async function() {
  console.log("Adding test products...");
  
  for (const product of testProducts) {
    // This would normally create products via API
    // For demo, we're just logging
    console.log(`Product: ${product.title} - $${product.price}`);
  }
  
  console.log("✅ Test products would be added here");
  console.log("💡 Note: In a real store, products need to be created in Shopify Admin");
};

window.showProductGridStatus = function() {
  const grid = document.querySelector('.product-grid');
  const cards = document.querySelectorAll('.product-card');
  
  console.log(`Product Grid Status:`);
  console.log(`- Grid exists: ${!!grid}`);
  console.log(`- Product cards found: ${cards.length}`);
  
  if (cards.length === 0) {
    console.log("⚠️ No products found! Please add products in the Shopify Admin and assign them to the product grid blocks.");
  }
};