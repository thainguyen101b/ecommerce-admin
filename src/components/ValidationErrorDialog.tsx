import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { FieldError } from "../types/errors";

interface ValidationErrorDialogProps {
  open: boolean;
  onClose: () => void;
  fieldErrors: FieldError[];
  title?: string;
}

export const ValidationErrorDialog: React.FC<ValidationErrorDialogProps> = ({
  open,
  onClose,
  fieldErrors,
  title = "Validation Failed",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: "300px",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorIcon color="error" />
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please correct the following errors and try again:
        </Typography>

        <List dense>
          {fieldErrors.map((error, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <ErrorIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {error.property.charAt(0).toUpperCase() +
                      error.property.slice(1)}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {error.message}
                    {error.rejectedValue && (
                      <Typography
                        component="span"
                        variant="caption"
                        display="block"
                        sx={{ mt: 0.5, fontStyle: "italic" }}
                      >
                        Current value: "
                        {String(error.rejectedValue).substring(0, 50)}
                        {String(error.rejectedValue).length > 50 ? "..." : ""}"
                      </Typography>
                    )}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: "120px" }}
        >
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
};
