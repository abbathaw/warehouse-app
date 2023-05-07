import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faBoxOpen, faChartLine, faWarning } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div>
      <h3 className="greeting">Welcome to the warehouse</h3>
      <div className="container home-desc">
        There are three main pages for your use
        <ul className="list-pages">
          <li>
            <h4>
              <FontAwesomeIcon icon={faWarehouse} />
              <span>Inventory</span>
            </h4>
            <p>View and update stock inventories of items (articles) used by the various products</p>
          </li>
          <li>
            <h4>
              <FontAwesomeIcon icon={faBoxOpen} />
              <span>Products</span>
            </h4>
            <p>
              Create and view products and define how many pieces of each inventory item used. View products with items
              that are low in stock.
            </p>
          </li>
          <li>
            <h4>
              <FontAwesomeIcon icon={faChartLine} />
              <span>Sales</span>
            </h4>
            <p>
              Register new sales of products. Adding new sales or adjusting existing sales will adjust the inventory
              stock accordingly.
            </p>
          </li>
        </ul>
      </div>
      <div className="container notice">
        <FontAwesomeIcon icon={faWarning} title="slow api" color={'orange'} />
        Note: Currently, our API is under high load and is facing some technical difficulties. Some of your usage might
        feel slow or might even fail. We appreciate your patience while we work on improving it.
      </div>
    </div>
  );
};

export default Home;
