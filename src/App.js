import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { NavBar, WorkItemCollection, WorkItemCard1 } from "./ui-components";
import { listTodos } from "./graphql/queries";
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    const todosFromAPI = apiData.data.listTodos.items;
    await Promise.all(
      todosFromAPI.map(async (todo) => {
        if (todo.image) {
          const url = await Storage.get(todo.name);
          todo.image = url;
        }
        return todo;
      })
    );
    setTodos(todosFromAPI);
  }

  async function createTodo(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createTodoMutation,
      variables: { input: data },
    });
    fetchTodos();
    event.target.reset();
  }

  async function deleteTodo({ id, name }) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    await Storage.remove(name);
    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <NavBar />

      <View>
        <Flex overflow={"auto"}>
          <View backgroundColor={"grey"} padding={"5px"}>
            <WorkItemCollection />
          </View>

          <Flex position={"relative"} overflow={"hidden"} grow={1}>
            HELLO
          </Flex>
        </Flex>
      </View>
    </View>
  );
};

export default withAuthenticator(App);
