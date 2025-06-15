
import { ProductEntity } from "@/domain/entities/Product";
import styles from "./AlternativeVoiceAssistant.module.css";

interface ProductDisplayProps {
  products: ProductEntity[];
}

export const ProductDisplay = ({ products }: ProductDisplayProps) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.productCardContainer} space-y-2`}>
      <p className={styles.productTitle}>Productos encontrados:</p>
      {products.slice(0, 3).map((product) => (
        <div key={product.id} className={styles.productItem}>
          <p className={styles.productName}>{product.name}</p>
          <p className={styles.productPrice}>${product.price}</p>
          <p className={styles.productCategory}>{product.category}</p>
        </div>
      ))}
    </div>
  );
};
