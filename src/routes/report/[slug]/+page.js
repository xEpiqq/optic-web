    // Load the slug from the URL
    export async function load({ params }) {
        const { slug } = params;
        return { slug };
      }