'use client';
import { toast } from "sonner";

export const Alert = ({
    message = "abc",
    description = "",
    actionLabel = "Undo",
    actionHandler = null,
} : {
    message: string,
    description: string,
    actionLabel: string,
    actionHandler?: never | null
}) => {
    return toast(`${message}`, {
        description,
        action: {
            label: actionLabel,
            onClick: () => actionHandler !== null ? actionHandler : null,
        },
    });
}