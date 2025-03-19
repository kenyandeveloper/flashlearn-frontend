import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  ArrowLeft,
  Rotate3D,
  ThumbsUp,
  ThumbsDown,
  Trophy,
} from "lucide-react";
import React from "react";

const StudyActions = ({
  showAnswer,
  setShowAnswer,
  currentFlashcardIndex,
  flashcardsLength,
  setCurrentFlashcardIndex,
  startTimeRef,
  handleFlashcardResponse,
  cardProgress,
  handleMarkAsLearned,
}) => {
  // Track answered cards in the current session
  const [answeredCards, setAnsweredCards] = React.useState(new Set());

  const isCurrentCardAnswered = answeredCards.has(currentFlashcardIndex);

  const handleResponse = (wasCorrect) => {
    setAnsweredCards((prev) => new Set(prev).add(currentFlashcardIndex));
    handleFlashcardResponse(wasCorrect);
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
        }}
      >
        <Tooltip title="Previous Card (Left Arrow)">
          <span>
            <IconButton
              onClick={() => {
                if (currentFlashcardIndex > 0) {
                  setCurrentFlashcardIndex(currentFlashcardIndex - 1);
                  setShowAnswer(false);
                  startTimeRef.current = Date.now();
                }
              }}
              disabled={currentFlashcardIndex === 0}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "action.hover" },
                "&.Mui-disabled": { opacity: 0.5 },
              }}
            >
              <ArrowLeft size={24} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Next Card (Right Arrow)">
          <span>
            <IconButton
              onClick={() => {
                if (currentFlashcardIndex < flashcardsLength - 1) {
                  setCurrentFlashcardIndex(currentFlashcardIndex + 1);
                  setShowAnswer(false);
                  startTimeRef.current = Date.now();
                }
              }}
              disabled={currentFlashcardIndex === flashcardsLength - 1}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "action.hover" },
                "&.Mui-disabled": { opacity: 0.5 },
              }}
            >
              <ArrowLeft size={24} style={{ transform: "rotate(180deg)" }} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {!showAnswer ? (
        <Button
          variant="contained"
          size="large"
          onClick={() => setShowAnswer(true)}
          startIcon={<Rotate3D size={20} />}
          sx={{
            minWidth: 200,
            py: 1.5,
          }}
        >
          Show Answer
        </Button>
      ) : (
        <>
          {!isCurrentCardAnswered ? (
            <>
              <Tooltip title="Press Left Arrow or 0">
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={() => handleResponse(false)}
                  startIcon={<ThumbsDown size={20} />}
                  sx={{
                    minWidth: 160,
                    py: 1.5,
                  }}
                >
                  Incorrect
                </Button>
              </Tooltip>
              <Tooltip title="Press Right Arrow or 1">
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  onClick={() => handleResponse(true)}
                  startIcon={<ThumbsUp size={20} />}
                  sx={{
                    minWidth: 160,
                    py: 1.5,
                  }}
                >
                  Correct
                </Button>
              </Tooltip>
            </>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowAnswer(false)}
              startIcon={<Rotate3D size={20} />}
              sx={{
                minWidth: 200,
                py: 1.5,
              }}
            >
              Show Question
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default StudyActions;
