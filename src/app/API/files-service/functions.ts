/*
    This file contains a set of functions designed to interact with the file-service API.
    These functions facilitate various file operations such as uploading, downloading,
    and retrieving metadata for files stored in different buckets on the server.
*/

// import { decode } from "jsonwebtoken";

export enum BucketsNames {
    RECIPES = 'recipes',
}

const host = process.env.NEXT_PUBLIC_HOST;

const ROUT = `http://${host}:4002`;

const FILES_SERVICE_ENDPOINTS = {
    FILES: `${ROUT}/api/files`,
};

const FILES_API = {
    UPLOAD_FILE: `${FILES_SERVICE_ENDPOINTS.FILES}/uploadFile`,
    UPLOAD_FILES_ARRAY: `${FILES_SERVICE_ENDPOINTS.FILES}/uploadFilesArray`,
    IS_FILE_EXISTED: `${FILES_SERVICE_ENDPOINTS.FILES}/isFileExisted`,
    GET_METADATA_BY_ETAG: `${FILES_SERVICE_ENDPOINTS.FILES}/getMetadataByEtag`,
    GET_FILE_BY_NAME: `${FILES_SERVICE_ENDPOINTS.FILES}/getFileByName`,
    GET_FILE_METADATA_MY_NAME: `${FILES_SERVICE_ENDPOINTS.FILES}/getFileMetadataByName`,
    UPDATE_FILE_METADATA: `${FILES_SERVICE_ENDPOINTS.FILES}/updateMetadata`,
    DELETE_FILE: `${FILES_SERVICE_ENDPOINTS.FILES}/deleteFile`,
};


export const uploadFile = async (bucketName: BucketsNames, recipeId: string, file: File): Promise<boolean> => {
    try {
        console.log("uploadFile", bucketName, recipeId, file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucketName', bucketName);
        formData.append('recipeId', recipeId);
        console.log("formData", formData);

        const uploadRecordResponse = await fetch(
            FILES_API.UPLOAD_FILE, {
            method: 'POST',
            body: formData,
        })
        return uploadRecordResponse.status === 200;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

export const uploadFilesArray = async (
    mainId: string,
    subtypeId: string,
    modelId: string,
    files: File[],
): Promise<boolean> => {
    try {
        console.log("uploadFilesArray", mainId, subtypeId, modelId, files);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        formData.append('mainId', mainId);
        formData.append('subtypeId', subtypeId);
        formData.append('modelId', modelId);

        console.log("formData", formData);

        const uploadRecordResponse = await fetch(
            FILES_API.UPLOAD_FILES_ARRAY,
            {
                method: 'POST',
                body: formData,
            }
        );

        return uploadRecordResponse.status === 200;
    } catch (error: any) {
        console.log(error);
        return false;
    }
};

export const isFileExisted = async (fileName: string, bucketName: BucketsNames, recipeId: string): Promise<boolean> => {
    try {
        const response = await fetch(
            `${FILES_API.IS_FILE_EXISTED}/${bucketName}/${recipeId}/${fileName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const data = await response.json();
            const status = data.status as boolean;
            // console.log('getAllRecords', files);
            return status;
        }
        return false;
    }
    catch (error) {
        throw new Error(`error checking if file existed - ${error}`);
    }
}

export const getFileMetadataByETag = async (bucketName: BucketsNames, etag: string): Promise<{
    name: string,
    id: string,
    metadata: Partial<any>
} | null> => {
    try {
        const response = await fetch(
            `${FILES_API.GET_METADATA_BY_ETAG}/${bucketName}/${etag}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const objectInfo = await response.json();
            console.log('getFileMetadataByETag - data', objectInfo);
            // const objectInfo = data.objectInfo;
            return objectInfo;
        }
        return null;
    }
    catch (error) {
        throw new Error(`error getting all records - ${error}`);
    }
}


export const getFileByName = async (bucketName: BucketsNames, recipeId: string, objectName: string): Promise<string | null> => {
    try {
        const encodedObjectName = encodeURIComponent(objectName);
        const response = await fetch(
            `${FILES_API.GET_FILE_BY_NAME}/${bucketName}/${recipeId}/${encodedObjectName}`, {
            method: 'GET',
            credentials: 'include',
        })

        // console.log("getFileByName response", response);

        const blob = await response.blob();
        // console.log('getFileByName blob', blob);
        const url = window.URL.createObjectURL(blob);


        return url;
    }
    catch (error) {
        console.error(`error getFileByName - ${error}`);
        return null;
    }
}

export const getFileMetadataByName = async (bucketName: BucketsNames, recipeId: string, objectName: string): Promise<{
    name: string,
    id: string,
    metadata: Partial<any>
} | null> => {
    try {
        console.log('getFileMetadataByName recordId', objectName);
        const encodedObjectName = encodeURIComponent(objectName);

        const response = await fetch(
            `${FILES_API.GET_FILE_METADATA_MY_NAME}/${bucketName}/${recipeId}/${encodedObjectName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) return null;

        const data = await response.json();
        const sonolist = data.sonograms;
        console.log('getSonolistNamesByRecordId sonolist: ', sonolist);
        return sonolist;
    }
    catch (error) {
        console.error(`error getSonolistByRecordId - ${error}`);
        return null;
    }
}

export const updateMetadata = async (bucketName: BucketsNames, recipeId: string, objectName: string, metadata: any): Promise<boolean> => {
    try {
        const body = JSON.stringify({ objectName: objectName, metadata: metadata });
        const response = await fetch(
            `${FILES_API.UPDATE_FILE_METADATA}/${bucketName}/${recipeId}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        });
        return response.status === 200;
    } catch (error) {
        console.error(`error updateMetadata - ${error}`);
        return false;
    }
}

export const deleteFile = async (bucketName: BucketsNames, recipeId: string, objectName: string): Promise<boolean> => {
    try {
        const encodedObjectName = encodeURIComponent(objectName);

        const response = await fetch(
            `${FILES_API.DELETE_FILE}/${bucketName}/${recipeId}/${encodedObjectName}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.status === 200;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}