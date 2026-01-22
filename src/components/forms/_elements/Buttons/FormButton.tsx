'use client';
import {FC} from "react";

interface FormButtonProps {
    useFormStatus: Function;
    btnType: "button" | "submit" | "reset";
    btnLabel?: string;
    pendingMessage?: string;
    classNames?: string;
}

export const FormButton: FC<FormButtonProps> = ({
    useFormStatus,
    btnType = "button",
    classNames,
    btnLabel,
    pendingMessage,
}) => {
    const { pending } = useFormStatus();
    return (
        <div className={"text-center mt-5"}>
            <button
                className={`${classNames} ${pending && "inactive"}`}
                type={btnType}
                disabled={pending}
            >
                {
                    pending ?
                        pendingMessage :
                        btnLabel
                }
            </button>
        </div>
    );
}