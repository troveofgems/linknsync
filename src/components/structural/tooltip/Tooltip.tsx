import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function TooltipShell(
    {
        tooltipTrigger,
        tooltipContent
    } : {
        tooltipTrigger: React.ReactNode;
        tooltipContent: React.ReactNode;
}) {
    return (
        <Tooltip>
            <TooltipTrigger className={"tooltipIcon"}>
                {tooltipTrigger}
            </TooltipTrigger>
            <TooltipContent>
                <div>
                    {tooltipContent}
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

export default TooltipShell;