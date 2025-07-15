import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

//  provided access token
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyb2hpdC5wb2toYXJpeWExMjNAZ21haWwuY29tIiwiZXhwIjoxNzUyNTU2OTIxLCJpYXQiOjE3NTI1NTYwMjEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2NTYwNmI5NS00Y2QxLTRiNzctYWM0Ny0zOTY3MzBiODNmNDciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJyb2hpdCBzaW5naCBwb2toYXJpeWEiLCJzdWIiOiIxZjYxZDYyOC01MzEwLTQyYjAtYTFlMy1jM2FmYTljOWZkZDYifSwiZW1haWwiOiJyb2hpdC5wb2toYXJpeWExMjNAZ21haWwuY29tIiwibmFtZSI6InJvaGl0IHNpbmdoIHBva2hhcml5YSIsInJvbGxObyI6IjIyMTk0NzMiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiIxZjYxZDYyOC01MzEwLTQyYjAtYTFlMy1jM2FmYTljOWZkZDYiLCJjbGllbnRTZWNyZXQiOiJaU2Z4cVJIVGJlTkhHeHFSIn0.LaTXzy0ySRFVFB8aBT67vzo9Z67FvCFTL5Xg-x3tMIc";

// Log API function
const logEvent = async (stack, level, pkg, message) => {
  const validStacks = ["frontend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validFrontendPackages = ["api"];

  if (
    !validStacks.includes(stack) ||
    !validLevels.includes(level) ||
    (stack === "frontend" && !validFrontendPackages.includes(pkg))
  ) {
    console.error("Invalid log parameters");
    return;
  }

  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
};

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [message, setMessage] = useState('');

  const handleShorten = async () => {
    if (!longUrl) {
      setMessage("Please enter a valid URL");
      await logEvent("frontend", "warn", "api", "User submitted empty URL");
      return;
    }

    try {
      const res = await fetch("http://20.244.56.144/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          url: longUrl,
          customCode: customCode || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl || "Short URL created!");
        setMessage("URL shortened successfully");
        await logEvent("frontend", "info", "api", "URL shortened successfully");
      } else {
        setMessage(data.message || "Something went wrong");
        await logEvent("frontend", "error", "api", data.message || "Shorten API returned error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
      await logEvent("frontend", "fatal", "api", "Failed to connect to shorten API");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 10, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <TextField
        label="Enter Long URL"
        fullWidth
        margin="normal"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <TextField
        label="Custom Code (optional)"
        fullWidth
        margin="normal"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />

      <Button variant="contained" fullWidth onClick={handleShorten}>
        Shorten URL
      </Button>

      {shortUrl && (
        <Typography mt={2}>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </Typography>
      )}

      {message && (
        <Typography color="error" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default App;
