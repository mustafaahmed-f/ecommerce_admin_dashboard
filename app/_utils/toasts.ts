import { toast } from "sonner";

const defaultSuccessStyle = {
  backgroundColor: "#dcfce7", // green-100
  color: "#166534", // green-800
  border: "1px solid #86efac", // green-300
};

const defaultErrorStyle = {
  backgroundColor: "#fee2e2", // red-100
  color: "#991b1b", // red-800
  border: "1px solid #fca5a5", // red-300
};

export const showSuccessToast = (
  message: string,
  options?: { icon?: string }
) => {
  toast.success(message, {
    icon: options?.icon ?? "✅",
    style: defaultSuccessStyle,
  });
};

export const showErrorToast = (
  message: string,
  options?: { icon?: string }
) => {
  toast.error(message, {
    icon: options?.icon ?? "❌",
    style: defaultErrorStyle,
  });
};
