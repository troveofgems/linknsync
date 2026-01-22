"use server";
import db from "@/db/connect.db";

interface CollisionQuery {
    where?: { coid: string; };
}

export const fetchCollisionsByOrgIdAction = async(
    coid: string
) => {
    try {
        const fetchCollisionListResponse = await db.dateBlockConflict.findMany({
            where: { coid },
            select: {
                id: true,
                propertyId: true,
                propertyName: true,
                startDate: true,
                endDate: true,
                createdAt: true,
                firstBlock: {
                    select: {
                        id: true,
                        startDate: true,
                        endDate: true,
                        UserImprint: {
                            select: {
                                fullName: true,
                            }
                        },
                        priority: true
                    }
                },
                UserImprint: {
                    select: {
                        fullName: true,
                    }
                }
            }
        } as CollisionQuery);

        return { message: "Conflict List By COID Fetch Successful!", response: fetchCollisionListResponse };
    } catch(error) {
        return { message: 'Error Fetching Collisions List By COID', error };
    }
}

export const fetchCollisionCountsByOrgIdAction = async(
    coid: string
) => {
    'use server';
    try {
        const collisionsCountResponse =
            await db
                .dateBlockConflict
                .count({
                    where: { coid },
                } as CollisionQuery);

        return { message: "Collisions List By Org Id Fetch Successful!", response: collisionsCountResponse };
    } catch(error) {
        return { message: 'Error Fetching Collisions Count By Org Id', error };
    }
}