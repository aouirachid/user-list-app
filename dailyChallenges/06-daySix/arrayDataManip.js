const products = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Phone", price: 500, inStock: false },
  { name: "Tablet", price: 300, inStock: true },
];

const productWithTax = products.map((product) => {
  return { ...product, price: product.price * 1.1 }; // explain this line
});

console.log(`Product after tax: ${JSON.stringify(productWithTax)}`);

const inStockProducts = productWithTax.filter((prod) => {
  return prod.inStock;
});
console.log(`Product in stock: ${JSON.stringify(inStockProducts)}`);

const totalPrice = inStockProducts.reduce((acc, product) => {
  return acc + product.price;
}, 0);
console.log(`Product in stock total price : ${totalPrice.toFixed(2)}`);
