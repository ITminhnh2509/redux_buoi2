import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProducts } from "../redux/productslice";
import { addItem, removeItem } from "../redux/cartSlice";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
const ProductsList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const { carts } = useSelector((state) => state.cart);
  useEffect(() => {
    if (status === "start") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);
  if (status === "loading") return <div>Loading ...</div>;
  if (status === "failed") return <div>{error}</div>;
  return (
    <Container>
      <Row className="mt-2 d-flex">
        {items.map((product) => (
          <Col lg={3} md={4} sm={6}>
            <Card
              className="py-2 px-3 m-5"
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {product.price}
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button
                  className="btn btn-success"
                  onClick={() => dispatch(addItem(product))}
                >
                  Button
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <div>
        <h1>Đây là giỏ hàng</h1>
        {carts.length > 0 ? (
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => dispatch(removeItem(item.id))}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3>Cart is empty</h3>
        )}
      </div>
    </Container>
  );
};

export default ProductsList;
