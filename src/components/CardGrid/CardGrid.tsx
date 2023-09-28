import { forwardRef } from "react";
import Style from "./CardGrid.module.scss";
import { Books } from "../../store/bookSlice";
import Card from "../Card/Card";
import { motion, useAnimation } from "framer-motion";

interface Props {
  books: Books[];
  totalCount: number;
}

const CardGrid = forwardRef<HTMLDivElement, Props>(
  ({ books, totalCount }, ref) => {
    const controls = useAnimation();

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <div ref={ref} className={Style.cardGrid}>
        <div className={Style.totalCount}>
          <p>{`${totalCount} books`}</p>
        </div>
        <div className={Style.gridContainer}>
          {books.map(
            (book) =>
              book.volumeInfo &&
              book.volumeInfo.authors &&
              book.volumeInfo.imageLinks && (
                <motion.div
                  className={Style.card_block}
                  key={book.id}
                  viewport={{ once: true }}
                  initial="hidden"
                  whileInView="visible"
                  animate={controls}
                  variants={variants}
                  transition={{ delay: 0.1 }}
                >
                  <Card
                    category={
                      book.volumeInfo.categories
                        ? book.volumeInfo.categories[0]
                        : "Unknown"
                    }
                    image={book.volumeInfo.imageLinks.thumbnail}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors.join(", ")}
                  />
                </motion.div>
              )
          )}
        </div>
      </div>
    );
  }
);

export default CardGrid;
