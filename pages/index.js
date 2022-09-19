import { client } from "../lib/sanity";
import styles from "../styles/Home.module.css";
import imageUrlBuilder from "@sanity/image-url";
import axios from "axios";

const builder = imageUrlBuilder(client);

export default function IndexPage({ products }) {
  //console.log(products);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          {products.map((product) => {
            const { defaultProductVariant = {} } = product;
            const { images } = defaultProductVariant;
            return (
              <div key={product._id}>
                <a href={`/product/${product._id}`}>
                  <img
                    className={styles.card}
                    src={builder.image(images[0]).width(300)}
                    alt="images"
                  />
                </a>
                <h3>{product.title}</h3>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const products = await axios.get(
    "https://r2pfgf-8888.sse.codesandbox.io/.netlify/functions/products"
  );
  console.log(products.data);

  return {
    props: {
      products: products.data
    }
  };
}
