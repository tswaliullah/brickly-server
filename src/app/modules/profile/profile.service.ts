import { prisma } from "../../shared/prisma";
import { UserStatus } from "../../../generated/client";
import { IJWTPayload } from "../../types/common";



const getMyProfile = async (user: IJWTPayload) => {

    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        },
        select: {
            id: true,
            email: true,
            needPasswordChange: true,
            role: true,
            status: true,
            profileImage: true
        }
    })

    return {
        ...userInfo
    }
}


const updateMyProfile = async (user: IJWTPayload, payload: any) => {

    const updateProfile = await prisma.user.update({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        },
        data: payload
    })

    return updateProfile
}



export const UserService = {
    getMyProfile,
    updateMyProfile
}