import axios from "axios";
import { useEffect } from "react";

const product = ({ product }) => {
  
  useEffect(() => {
    const productGallery = cloudinary.galleryWidget(
      {
        container: "#gallery",
        cloudName: "johnpaul",
        mediaAssets: [{ tag: `${product[0].tags[0]}`, mediaType: "image" }]
      },
      []
    );
    productGallery.render();
  });
  return (
    <>
      <h3>widget generated gallery</h3>
      <div id="gallery"></div>
    </>
  );
};
export default product;

export async function getStaticPaths() {
  const products = await axios.get(
    "https://r2pfgf-8888.sse.codesandbox.io/.netlify/functions/products"
  );
  const paths =
    products.data &&
    products.data.map((prod) => ({
      params: { id: prod._id }
    }));

  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const products = await axios.get(
    "https://r2pfgf-8888.sse.codesandbox.io/.netlify/functions/products"
  );
  const product =
    products.data && products.data.filter((prod) => params.id === prod._id);

  return {
    props: {
      product
    }
  };
}
