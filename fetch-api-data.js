import axios from "axios";

const BASE_URL = "https://dummyjson.com";

// Fetch multiple products with their details
async function fetchProductsWithDetails() {
  try {
    console.log("\n=== FETCHING PRODUCTS ===\n");
    
    // Fetch all products
    const productsRes = await axios.get(`${BASE_URL}/products?limit=30`);
    console.log(`✓ Fetched ${productsRes.data.products.length} products\n`);

    // Fetch detailed info for first 5 products
    console.log("=== FETCHING PRODUCT DETAILS & REVIEWS ===\n");
    
    const detailedProducts = [];
    for (let i = 1; i <= 5; i++) {
      try {
        const productRes = await axios.get(`${BASE_URL}/products/${i}`);
        const product = productRes.data;
        
        console.log(`Product ${i}: ${product.title}`);
        console.log(`  - Price: $${product.price}`);
        console.log(`  - Rating: ${product.rating}/5`);
        console.log(`  - Stock: ${product.stock}`);
        console.log(`  - Discount: ${product.discountPercentage}%`);
        console.log(`  - Reviews: ${product.reviews?.length || 0} reviews`);
        
        if (product.reviews && product.reviews.length > 0) {
          console.log(`  - Review Details:`);
          product.reviews.forEach((review, idx) => {
            console.log(`    ${idx + 1}. "${review.comment}" - ${review.reviewerName} (${review.rating}/5)`);
          });
        }
        console.log();
        
        detailedProducts.push(product);
      } catch (err) {
        console.error(`Error fetching product ${i}:`, err.message);
      }
    }

    // Fetch comments (if available)
    console.log("\n=== FETCHING COMMENTS ===\n");
    try {
      const commentsRes = await axios.get(`${BASE_URL}/comments?limit=10`);
      console.log(`✓ Fetched ${commentsRes.data.comments.length} comments`);
      commentsRes.data.comments.slice(0, 5).forEach((comment, idx) => {
        console.log(`\n${idx + 1}. "${comment.body}"`);
        console.log(`   - By: ${comment.user.fullName}`);
        console.log(`   - Email: ${comment.user.email}`);
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.log("Comments endpoint not available");
    }

    // Save all data to JSON file
    console.log("\n\n=== SAVING DATA TO FILE ===\n");
    const fs = await import("fs").then(mod => mod.promises);
    
    const allData = {
      timestamp: new Date().toISOString(),
      products: detailedProducts,
      summary: {
        totalProducts: productsRes.data.total,
        productsShown: detailedProducts.length,
        averageRating: (detailedProducts.reduce((sum, p) => sum + p.rating, 0) / detailedProducts.length).toFixed(2)
      }
    };

    await fs.writeFile(
      "api-data.json",
      JSON.stringify(allData, null, 2)
    );
    console.log("✓ Data saved to api-data.json");

  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchProductsWithDetails();
