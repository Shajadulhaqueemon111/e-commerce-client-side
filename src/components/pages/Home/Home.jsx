import Product from "../AllProduct/Product";
import Banner from "../Banner/Banner";
import MostPopular from "../MostPopular/MostPopular";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Product></Product>
      <MostPopular></MostPopular>
    </div>
  );
};

export default Home;
