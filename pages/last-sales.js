import { useEffect, useState } from 'react';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://nextjs-course-33770-default-rtdb.firebaseio.com/sales.json')
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);

        const transformedData = [];

        for (const key in data) {
          transformedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedData);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
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

export default LastSalesPage;
