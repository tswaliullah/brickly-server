import { prisma } from "../../shared/prisma";
import { Prisma, UserRole, UserStatus } from "../../../generated/client";
import { userSearchableFields } from "./user.contant";
import { paginationHelper } from "../../shared/pagination";
import { IJWTPayload } from "../../types/common";


const getAllFromDB = async (params: any, options: any) => {

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.pagination(options);
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = []

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                },
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.user.findMany({
        skip,
        take: Number(limit),

        where: whereConditions,

        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.user.count({
        where: whereConditions,

    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}


const getMyProfile = async (user: IJWTPayload) => {

    // const userInfo = await prisma.user.findUniqueOrThrow({
    //     where: {
    //         email: user.email,
    //         status: UserStatus.ACTIVE
    //     },
    //     select: {
    //         id: true,
    //         email: true,
    //         needPasswordChange: true,
    //         role: true,
    //         status: true
    //     }
    // })

    // let profileData;

    // if(userInfo.role === UserRole.PATIENT){
    //     profileData = await prisma.patient.findUnique({
    //         where: {
    //             email: userInfo.email
    //         }
    //     })
    // } else if(userInfo.role === UserRole.DOCTOR){
    //     profileData = await prisma.doctor.findUnique({
    //         where: {
    //             email: userInfo.email
    //         }
    //     })
    // } else if (userInfo.role === UserRole.ADMIN) {
    //     profileData = await prisma.admin.findUnique({
    //         where: {
    //             email: userInfo.email
    //         }
    //     })
    // }

    return user;
}


const changeProfileStatusOrRole = async (id: string, payload: { status: UserStatus, role: UserRole }) => {

    // const userData = await prisma.user.findUniqueOrThrow({
    //     where: {
    //         id
    //     }
    // })

    // const updatedUserStatusOrRole = await prisma.user.update({
    //     where: {
    //         id
    //     },
    //     data: payload
    // })

    // return updatedUserStatusOrRole
}


export const UserService = {
    getAllFromDB,
    getMyProfile,
    changeProfileStatusOrRole
}