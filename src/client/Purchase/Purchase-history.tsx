import { useQuery } from "react-query";
import "./Purchase-History.css";
import { CartItemType } from "../App";

type Props = {};

const PurchaseHistory: React.FC<Props> = () => {
  // const getPurchseHistory = async (): Promise<CartItemType[]> =>
  //   await (await fetch(`api/purchase`)).json();

  // const { data, isLoading, error } = useQuery<CartItemType[]>(
  //   "purchasedCheese",
  //   getPurchseHistory
  // );
  // const isLoading = false;
  // if (isLoading) return <LinearProgress />;
  // if (error) return <div>Something went wrong ...</div>;
  // console.log("----------", data);
  const data: CartItemType[] = [];
  let content = (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Status</th>
            <th>Offers</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((purchasedItems, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{purchasedItems.id}</td>
              <td>{purchasedItems.description}</td>
              <td>{purchasedItems.category}</td>
              <td>{purchasedItems.image}</td>
              <td>{purchasedItems.price}</td>
              <td>{purchasedItems.title}</td>
              <td>{purchasedItems.amount}</td>
              {/* <td>{dateFormatter(product.createdAt)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  return (
    <>
      <h2>View Recent Purchase</h2>
      {/* {content} */}
    </>
  );
};
export default PurchaseHistory;
