import { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";

import MainLayout from "../../layouts/MainLayout";

import {
  askAI,
  getChatHistory,
} from "./AIService";

import "./AI.css";

function AI() {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  // -----------------------------
  // Load Chat History
  // -----------------------------
  const loadHistory = async () => {
    try {
      const data = await getChatHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // -----------------------------
  // Ask AI
  // -----------------------------
  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const data = await askAI(question);

      setAnswer(data.answer);

      setQuestion("");

      await loadHistory();
    } catch (error) {
      console.error(error);

      setAnswer("Unable to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box className="ai-page">

        <Typography variant="h4">
          AI Assistant
        </Typography>

        <Typography className="ai-subtitle">
          Ask warehouse-related questions
        </Typography>

        {/* Ask Question */}

        <Paper className="ai-card">

          <TextField
            multiline
            rows={5}
            fullWidth
            label="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleAsk}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Ask AI
          </Button>

        </Paper>

        {/* Latest Response */}

        <Paper className="ai-response">

          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            <SmartToyIcon sx={{ mr: 1 }} />
            AI Response
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Typography>
              {answer || "Ask something to get started..."}
            </Typography>
          )}

        </Paper>

        {/* Chat History */}

        <Paper
          sx={{
            mt: 3,
            p: 3,
          }}
        >

          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            Previous Chats
          </Typography>

          {history.length === 0 ? (

            <Typography>
              No chat history available.
            </Typography>

          ) : (

            history.map((chat) => (

              <Paper
                key={chat.id}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: "#f8f9fa",
                }}
              >

                <Typography fontWeight="bold">
                  Question:
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  {chat.question}
                </Typography>

                <Typography fontWeight="bold">
                  Answer:
                </Typography>

                <Typography>
                  {chat.answer}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mt: 1,
                  }}
                >
                  {new Date(chat.created_at).toLocaleString()}
                </Typography>

              </Paper>

            ))

          )}

        </Paper>

      </Box>
    </MainLayout>
  );
}

export default AI;