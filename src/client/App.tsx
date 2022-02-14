import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Cart/Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import {
  BrowserRouter as Router,
  useNavigate,
  Route,
  Routes
} from "react-router-dom";

// Styles
import {
  Wrapper,
  StyledButton,
  StyledAppBar,
  HeaderTypography
} from "./App.styles";
import { AppBar, Toolbar, Typography, Modal } from "@material-ui/core";
import PurchaseHistory from "./Purchase/PurchaseHistory";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const App = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({
    id: 0,
    category: "",
    description: "",
    image: "",
    price: 0,
    title: "",
    amount: 0
  });

  const handleClickToOpen = (item: CartItemType) => {
    setOpen(true);
    setClickedItem({ ...item });
  };

  const handleToClose = () => {
    setOpen(false);
  };
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "cheeses",
    getCheeses
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const navigate = useNavigate();
  const handleOnRecentPurchaseClick = () => navigate("/purchase-history");

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {" "}
            <Link to="/purchase-history">
              <StyledButton onClick={handleOnRecentPurchaseClick}>
                <RestoreIcon />
                <Typography variant="subtitle2">
                  Recent Purchases
                </Typography>{" "}
              </StyledButton>
            </Link>
            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>
            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color="error"
                data-cy="badge-count"
              >
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">Cart</Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item
              item={item}
              handleAddToCart={handleAddToCart}
              handleClickToOpen={handleClickToOpen}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{clickedItem.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{clickedItem.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Routes>
        <Route
          path="/purchase-history"
          element={<PurchaseHistory></PurchaseHistory>}
        ></Route>
      </Routes>
    </Wrapper>
  );
};

export default App;
