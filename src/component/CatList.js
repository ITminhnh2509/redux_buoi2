import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addNewCat,
  deleteCat,
  fetchDataCats,
  reCheckCat,
} from "../redux/catSlice";
import { Button, Container, Table } from "reactstrap";
import AddCat from "./AddCat";

export default function CatList() {
  const dispatch = useDispatch();
  const { cats } = useSelector((state) => state.cats);
  useEffect(() => {
    dispatch(fetchDataCats());
  }, []);
  const handle_delete = (id) => {
    dispatch(deleteCat(id));
  };
  const handle_add = (cat) => {
    dispatch(addNewCat(cat));
  };
  const handle_rechecked = (cat) => {
    dispatch(reCheckCat(cat));
  };
  return (
    <div>
      <Container>
        <AddCat handle_add={handle_add} />
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index}</th>
                <td>{item.name}</td>
                <td>{item.checked ? "True" : "False"}</td>
                <td>
                  <Button onClick={() => handle_delete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
