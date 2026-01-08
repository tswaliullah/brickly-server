import httpStatus from 'http-status';
import { prisma } from '../../shared/prisma';


const createProperty = async (payload: any): Promise<any> => {
    const result = await prisma.property.create({
        data: payload
    })

    return result;
}


const getAllProperties = async (): Promise<any[]> => {
    const properties = await prisma.property.findMany();
    return properties;
}


export const PropertyService = {
    createProperty,
    getAllProperties
}