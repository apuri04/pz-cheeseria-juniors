import { useQuery } from "react-query";
import "./Purchase-History.css";
import { CartItemType } from "../App";
// import { LinearProgress } from "@material-ui/core/LinearProgress";

type Props = {};

const PurchaseHistory: React.FC<Props> = () => {
  const getPurchseHistory = async (): Promise<CartItemType[]> =>
    await (await fetch(`api/purchase`)).json();

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "purchasedCheese",
    getPurchseHistory
  );
  // if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  let content = (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Descritpion</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((purchasedItems, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{purchasedItems.id}</td>
              <td>{purchasedItems.title}</td>
              <td>{purchasedItems.category}</td>
              <td>{purchasedItems.description}</td>
              <td>{purchasedItems.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  return (
    <>
      <h2>View Recent Purchase</h2>
      {content}
    </>
  );
};
export default PurchaseHistory;
