import React, { useRef, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import gitLogo from "./github.png";
import searchLogo from "./search.png";

export default function HomePage(props) {
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      console.log("Entered");
      props.history.push({ pathname: `/${search}/issues` });
    }
  };

  return (
    <div>
      <header>
        <img src={gitLogo} alt="git logo" />
      </header>
      <div style={{ display: "inline-block", border: "1px inset #ccc" }}>
        <input
          type="text"
          ref={searchRef}
          placeholder="Search a repo for issues"
          onChange={() => setSearch(searchRef.current.value)}
          onKeyPress={enterHandler}
          style={{ border: "none", padding: 0 }}
        />
        <button type="submit" style={{ border: "none", background: "none" }}>
          <img src={searchLogo} alt="Search" onClick={enterHandler} />
        </button>
      </div>

      <Container>
        <Card
          style={{
            marginLeft: "18%",
            marginRight: "18%",
            width: "auto",
            maxWidth: "20rem"
          }}
        >
          <Card.Header>Suggested Searches</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>facebook/react</ListGroup.Item>
            <ListGroup.Item>octocat/Hello-world </ListGroup.Item>
            <ListGroup.Item>teju5531/covid-api</ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
}
