import {
  Box,
  Container,
  Text,
  Form,
  Heading,
  Label,
  Input,
  Button,
} from "theme-ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "../lib/session";
import Layout from "../components/layout";

function Login({ origin }) {
  const router = useRouter();
  const [, setSession] = useSession();
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState("");

  const { redirect } = router.query;

  const disabled = ["authenticating", "submitting"].includes(status);

  async function submit(e) {
    setStatus("submitting");
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      setStatus("invalid");
      setTimeout(() => {
        setStatus(null);
      }, 1000);
    } else {
      const { username, token } = await res.json();
      setSession({ token: token, username: username });
      setStatus("authenticating");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }

  return (
    <Layout hideFooter={true} status={status}>
      <Container
        sx={{
          px: [3, 3, 4],
        }}
      >
        <Heading sx={{ my: [4, 5, 5], fontSize: [6, 7, 7] }}>
          This page is private
        </Heading>
        <Text sx={{ my: [3, 4, 4], fontSize: [4, 5, 5] }}>
          Enter a password to continue
        </Text>
        <Box as="form" onSubmit={submit} sx={{ fontSize: [4], mb: [4] }}>
          <Input
            sx={{
              width: ["200px"],
              mt: [2],
              borderStyle: "solid",
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderRadius: "0px",
            }}
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password?"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            disabled={disabled}
            onClick={submit}
            type="submit"
            sx={{
              fontFamily: "faux",
              color: "text",
              display: "inline-block",
              mr: [3],
              fontSize: [7],
              mt: [2],
              cursor: "pointer",
              "&:hover": {
                color: disabled ? "primary" : "secondary",
              },
              background: "none",
              p: [0],
            }}
          >
            →
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export default Login;
