import { useQuery } from "react-query";
import "./Purchase-History.css";
import { CartItemType } from "../App";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
                          <TableCell>SN</TableCell>
                          <TableCell align="right">Id</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Catergory</TableCell>
              <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.description}</TableCell> 
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
