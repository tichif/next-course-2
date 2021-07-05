import path from 'path';
import fs from 'fs/promises';

const Home = (props) => {
  const { products } = props;
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);

  return {
    props: {
      products: data.products,
    },
  };
}

export default Home;
