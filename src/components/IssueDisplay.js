import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Col, Image, Row, Alert } from "react-bootstrap";

export default function IssueDisplay({ match }) {
  console.log("Here we go again");
  const repo = `${match.params.org}/${match.params.repo}`;
  const issueNumber = match.params.issue;
  const [issue, setIssue] = useState({});
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const currentDateTime = new Date();

  useEffect(() => {
    axios(`https://api.github.com/repos/${repo}/issues/${issueNumber}`)
      .then((response) => {
        console.log(response);
        console.log(repo, issueNumber);
        setIssue(response.data);
      })
      .then((error) => setError("Something went wrong"));

    axios(`https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`)
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .then((error1) => {
        setError("Something went wrong");
        console.log(error);
      });
  }, []);

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
    <Container>
      {/* <Alert>Shit</Alert> */}
      <h3>
        {issue.title} #{issue.number}
      </h3>
      <p>
        Opened {getTimeDifference(issue.created_at)} by{" "}
        {issue.user && issue.user.login}
      </p>
      <Card className="mx-auto my-4">
        {issue.user && (
          <Image
            src={`https://avatars.githubusercontent.com/${issue.user.login}`}
            style={{ width: "50px", height: "50x" }}
            roundedCircle
          />
        )}
        <Card.Header>
          {issue.user && issue.user.login} commented{" "}
          {getTimeDifference(issue.created_at)}
        </Card.Header>
        <Card.Body>
          <div style={{ whiteSpace: "pre-line" }}>{issue.body}</div>
        </Card.Body>
      </Card>

      {comments.map((comment) => (
        <Card key={comment.id} className="mx-auto my-4">
          <Image
            src={`https://avatars.githubusercontent.com/${comment.user.login}`}
            style={{ width: "50px", height: "50x" }}
            roundedCircle
          />
          <Card.Header>
            {comment.user.login} commented{" "}
            {getTimeDifference(comment.created_at)}
          </Card.Header>
          <Card.Body style={{ whiteSpace: "pre-line" }}>
            {comment.body}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
