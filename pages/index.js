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
  return {
    props: {
      products: [{ id: 'p1', title: 'Product One' }],
    },
  };
}

export default Home;
