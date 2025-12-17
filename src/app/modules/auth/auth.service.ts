import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import bcrypt from 'bcryptjs';
import { prisma } from '../../shared/prisma';
import { TRegisterInput } from './auth.interface';
import { jwtHelperes } from '../../helper/jwtHelper';
import config from '../../../config';
import { UserStatus } from '../../../generated/enums';

const login = async (payload: { email: string, password: string }) => {



    // const user = await prisma.user.findFirstOrThrow({
    //     where: {
    //         email: payload.email,
    //         // status: UserStatus.ACTIVE
    //     }
    // })


    // const checkPassword = await bcrypt.compare(payload.password, user.password)

    // if (!checkPassword) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Password not matched")
    // }

    // const accessToken = jwtHelperes.generateToken({ email: user.email, role: user.role }, config.access_token_secret as string, "1h")

    // const refreshToken = jwtHelperes.generateToken({ email: user.email, role: user.role }, config.refresh_token_secret as string, "90d")

    return {
        // accessToken,
        // refreshToken,
        // needPasswordChange: user.needPasswordChange
    }
}



const refreshToken = async (token: string) => {
    let decodedData;

    try {
        decodedData = jwtHelperes.verifyToken(token, config.refresh_token_secret as Secret);
    } catch (error) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    })

    const accessToken = jwtHelperes.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.access_token_secret as string,
        config.jwt_expire_in as string
    )

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    }
}




const getMe = async (session: any) => {
    const accessToken = session.accessToken;
    // const decodedData = jwtHelperes.verifyToken(accessToken, config.access_token_secret as Secret);

    // const userData = await prisma.user.findUniqueOrThrow({
    //     where: {
    //         email: decodedData.email,
    //         status: UserStatus.ACTIVE
    //     }
    // })

    // const {id, email, role, needPasswordChange, status} = userData;

    // return {
    //     id,
    //     email,
    //     role,
    //     needPasswordChange,
    //     status
    // }

}


const Register = async (payload: TRegisterInput) => {

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.user.create({
        data: payload
    })

    console.log(result);
    return result;
}


export const AuthService = {
    Register,
    login,
    // refreshToken,
    getMe
}