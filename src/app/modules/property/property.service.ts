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

const getSingleProperty = async (propertyId: string): Promise<any | null> => {
    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });
    return property;
}


export const PropertyService = {
    createProperty,
    getAllProperties,
    getSingleProperty
}