import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    'https://nextjs-course-33770-default-rtdb.firebaseio.com/sales.json'
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedData);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load ...</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  return fetch(
    'https://nextjs-course-33770-default-rtdb.firebaseio.com/sales.json'
  )
    .then((res) => res.json())
    .then((data) => {
      const transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return {
        props: {
          sales: transformedData,
        },
        revalidate: 10,
      };
    })
    .catch((err) => console.log(err));
}

export default LastSalesPage;
