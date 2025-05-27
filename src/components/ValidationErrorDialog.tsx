import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Stack,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { FieldError } from "../types/errors";

interface ValidationErrorDialogProps {
  open: boolean;
  onClose: () => void;
  fieldErrors: FieldError[];
  title?: string;
}

export const ValidationErrorDialog = ({
  open,
  onClose,
  fieldErrors,
  title = "Validation Failed",
}: ValidationErrorDialogProps) => {
  // Nhóm errors theo field để hiển thị gọn hơn
  const groupedErrors = fieldErrors.reduce(
    (acc, error) => {
      if (!acc[error.property]) {
        acc[error.property] = [];
      }
      acc[error.property].push(error);
      return acc;
    },
    {} as Record<string, FieldError[]>,
  );

  const fieldNames = Object.keys(groupedErrors);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "70vh",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, pr: 6 }}>
        <Typography variant="h6" component="div" color="error.main">
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please fix the following {fieldNames.length} field
          {fieldNames.length > 1 ? "s" : ""}:
        </Typography>

        <Stack spacing={2}>
          {fieldNames.map((fieldName) => {
            const errors = groupedErrors[fieldName];
            const fieldLabel =
              fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

            return (
              <Alert
                key={fieldName}
                severity="error"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  "& .MuiAlert-message": { width: "100%" },
                }}
              >
                <AlertTitle
                  sx={{ mb: 1, fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {fieldLabel}
                </AlertTitle>

                <Stack spacing={1}>
                  {errors.map((error, index) => (
                    <Box key={index}>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {error.message}
                      </Typography>

                      {error.rejectedValue && (
                        <Chip
                          label={`Current: "${String(error.rejectedValue).substring(0, 30)}${
                            String(error.rejectedValue).length > 30 ? "..." : ""
                          }"`}
                          size="small"
                          variant="outlined"
                          color="error"
                          sx={{
                            fontSize: "0.75rem",
                            height: "20px",
                            "& .MuiChip-label": { px: 1 },
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>
              </Alert>
            );
          })}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="medium"
          sx={{ minWidth: 100, borderRadius: 1.5 }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};
