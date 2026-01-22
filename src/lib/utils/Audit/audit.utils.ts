import {CreateUserAuditProps} from "@/actions/audit/user/create.action";

export const compileUserAuditObject = (
    actionsTaken: string[],
    api: string,
    path: string,
    orgImprintId: string,
    userImprintId: string,
    sessionId: string
): CreateUserAuditProps => (
    {
        actionsTaken,
        api,
        path,
        orgImprintId,
        userImprintId,
        sessionId,
    } as CreateUserAuditProps
);