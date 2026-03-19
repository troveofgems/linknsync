'use server';
import db from "@/db/connect.db";

import {AttachOrUpdatePMSSchema} from "@/validator/pms.validation.schema";
import {ZodError} from "zod";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {SessionDataState} from "@/store/userStore";
import {Prisma} from "@prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

/**
 * This File Contains the Logic for Attaching or Updating PMS Data To An Organization
 * */
export type AttachPMSProps = {
    name?: string;
    domain?: string;
    apiKey?: string;
    secretKey?: string;
    blockReasonId?: string;
};
export interface AttachPMSActionState {
    message: string;
    response: {
        pmsValidation?: {
            success: boolean;
            data?: {
                domain?: string;
                apiKey?: string;
                secretKey?: string;
                blockReasonId?: string;
            };
            error?: ZodError;
        };
        formData?: FormData,
        generated?: {
            pmsId: string;
        }
    };
    errors?: {
        name?: string[];
        domain?: string[];
        apiKey?: string[];
        secretKey?: string[];
        blockReasonId?: string[];
        processing?: Error | PrismaClientValidationError,
    };
    pState?: SessionDataState | null;
    formState?: never;
    nonce?: string;
}

export const attachPMSAction = async(
    prevState: AttachPMSActionState,
    formData: FormData,
    generateAudit = true
): Promise<AttachPMSActionState> => {
    const // Owner Data
        { loggedInUser, profile } = prevState.pState as SessionDataState,
        coid = profile!.org.id,
        cid  = loggedInUser!.userId!,
        sid = loggedInUser!.sessionId!;

    try {
        const // Variable Extraction
            pms = {
                orgImprintId: coid,
                domain: formData.get("pms.domain") as string,
                apiKey: formData.get("pms.apiKey") as string,
                secretKey: formData.get("pms.secretKey") as string,
                blockReasonId: formData.get("pms.blockReasonId") as string,
            };

        const // Validation of Data
            validatedPMSFields = await validatePMSAction(
                {} as AttachPMSActionState,
                pms
            );

        if( // Validation Catch
            !validatedPMSFields?.response?.pmsValidation?.success
        ) {
           const pmsFieldErrors = validatedPMSFields?.response?.pmsValidation?.error;

            return {
                message: "Please resolve the form errors and re-submit.",
                response: {
                    formData
                },
                errors: {
                    ...pmsFieldErrors?.flatten().fieldErrors,
                },
                pState: prevState.pState,
                prevState
            } as unknown as AttachPMSActionState;
        }

        const { id: generatedPMSId, pmsName } = await db
            .attachedPMS
            .create({
                data: {
                    pmsName: "Track",
                    orgImprintId: coid,
                    domain: validatedPMSFields.response.pmsValidation.data?.domain as string,
                    apiKey: validatedPMSFields.response.pmsValidation.data?.apiKey as string,
                    secretKey: validatedPMSFields.response.pmsValidation.data?.secretKey as string,
                    blockReasonId: validatedPMSFields.response.pmsValidation.data?.blockReasonId as string,
                }
            });

        // System Audit Log Background Process
        if(generateAudit) {
            const
                actionsTaken = [
                    "PMS Attached",
                    `${pmsName}-${pms.domain}`,
                ],
                auditData = compileUserAuditObject(
                    actionsTaken, "attach.action", "pms",
                    coid, cid, sid
                );
            createUserAuditAction_BackgroundProcess(auditData).then(() => {});
        }

        return {
            message: "PMS Successfully Attached!",
            response: {
                generated: {
                    pmsId: generatedPMSId,
                }
            }
        };
    } catch(error) {
        return {
            message: 'Error Attaching PMS',
            response: {},
            errors: {
                processing: error as Error
            },
            pState: prevState.pState
        };
    }
};

export const validatePMSAction = async(
    prevState: AttachPMSActionState,
    pms: AttachPMSProps,
): Promise<AttachPMSActionState> => ({
    message: "Validating PMS Data...",
    response: {
        pmsValidation: AttachOrUpdatePMSSchema.safeParse(pms)
    },
    pState: prevState.pState
});