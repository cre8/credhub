/**
 * API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface AuthRequestStateEntity { 
    correlationId: string;
    uri: string;
    jwt: string;
    status: AuthRequestStateEntity.StatusEnum;
    timestamp: number;
    lastUpdated: number;
    error?: object;
}
export namespace AuthRequestStateEntity {
    export type StatusEnum = 'created' | 'sent' | 'received' | 'verified' | 'error';
    export const StatusEnum = {
        created: 'created' as StatusEnum,
        sent: 'sent' as StatusEnum,
        received: 'received' as StatusEnum,
        verified: 'verified' as StatusEnum,
        error: 'error' as StatusEnum
    };
}

