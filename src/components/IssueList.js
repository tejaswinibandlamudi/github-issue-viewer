import React, { useEffect, useState } from "react";
import { Card, ListGroup, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IssueList({ match }) {
  const repo = `${match.params.org}/${match.params.repo}`;
  const [count, setCount] = useState(1);
  const [repoInfo, setRepoInfo] = useState({});
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  let currentDateTime = new Date();

  useEffect(() => {
    axios(`https://api.github.com/repos/${repo}`)
      .then((response) => {
        console.log(response);
        setRepoInfo(response.data);
      })
      .then((error) => setError("Something went wrong"));

    axios(`https://api.github.com/repos/${repo}/issues?page=${count}`)
      .then((response) => {
        console.log(response);
        setIssues(response.data);
      })
      .then((error) => setError("Something went wrong"));
  }, [count]);

  const getTimeDifference = (time) => {
    const createdOn = new Date(time);
    const minutes = Math.round((currentDateTime - createdOn) / (1000 * 60));
    if (minutes < 60) return minutes + " minutes ago";
    const hours = Math.round(minutes / 60);
    if (hours < 24) return hours + " hours ago";
    const days = hours > 24 ? Math.round(hours / 24) : 0;
    if (days < 30) return days + " days ago";
    const dd = createdOn.getDate();
    const M = createdOn.toLocaleString("default", { month: "long" });
    const yyyy = createdOn.getFullYear();
    return `on ${dd} ${M} ${yyyy}`;
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      {/* <Alert>{error}</Alert> */}
      <h2>
        <div className="d-flex justify-content-between">
          <div className="p-2 col-example text-left">{repo}</div>
          <Alert className="p-2 col-example text-left" variant="dark">
            ★ {Math.round(repoInfo.watchers_count / 1000)}k
          </Alert>
        </div>
      </h2>
      <Card>
        <Card.Header>Open - {repoInfo.open_issues}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {issues.map((issue) => (
              <ListGroup.Item key={issue.id}>
                <Link
                  to={`/${repo}/issues/${issue.number}`}
                  style={{ color: "black" }}
                >
                  {issue.title} -
                  <ul>
                    {issue.labels.map((label) => (
                      <li
                        key={label.id}
                        style={{
                          backgroundColor: `#${label.color}`,
                          display: "inline-block",
                          boxSizing: "border-box",
                          borderRadius: "12px",
                          margin: "5px",
                          padding: "5px"
                        }}
                      >
                        {label.name}
                      </li>
                    ))}
                  </ul>
                </Link>
                #{issue.number}, opened {getTimeDifference(issue.created_at)} by{" "}
                {issue.user.login}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <Button disabled={count === 1} onClick={() => setCount(count - 1)}>
        Prev
      </Button>
      {count}
      <Button onClick={() => setCount(count + 1)}>Next</Button>
    </Container>
  );
}
