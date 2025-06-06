import type { ApiError, Endpoint } from '../api.js';
import type { CLIDeployFlowConfig, OnEventScriptsByProvider } from './incomingFlow.js';
import type { SyncDeploymentResult } from './index.js';
import type { OnEventType } from '../scripts/on-events/api.js';
import type { JSONSchema7 } from 'json-schema';

export type PostDeployConfirmation = Endpoint<{
    Method: 'POST';
    Path: '/sync/deploy/confirmation';
    Body: {
        flowConfigs: CLIDeployFlowConfig[];
        onEventScriptsByProvider?: OnEventScriptsByProvider[] | undefined;
        reconcile: boolean;
        debug: boolean;
        singleDeployMode?: boolean;
        jsonSchema?: JSONSchema7 | undefined;
        sdkVersion?: string | undefined;
    };
    Success: ScriptDifferences;
}>;

export type PostDeploy = Endpoint<{
    Method: 'POST';
    Path: '/sync/deploy';
    Body: {
        flowConfigs: CLIDeployFlowConfig[];
        onEventScriptsByProvider?: OnEventScriptsByProvider[] | undefined;
        nangoYamlBody: string;
        reconcile: boolean;
        debug: boolean;
        singleDeployMode?: boolean;
        jsonSchema?: JSONSchema7 | undefined;
        sdkVersion?: string | undefined;
    };
    Success: SyncDeploymentResult[];
}>;

export type PostDeployInternal = Endpoint<{
    Method: 'POST';
    Path: '/sync/deploy/internal';
    Querystring: {
        customEnvironment: string;
    };
    Body: {
        flowConfigs: CLIDeployFlowConfig[];
        onEventScriptsByProvider?: OnEventScriptsByProvider[] | undefined;
        nangoYamlBody: string;
        reconcile: boolean;
        debug: boolean;
        singleDeployMode?: boolean;
        jsonSchema?: JSONSchema7 | undefined;
        sdkVersion?: string | undefined;
    };
    Error: ApiError<'forbidden'> | ApiError<'environment_creation_error'>;
    Success: SyncDeploymentResult[];
}>;

export interface SlimSync {
    id?: number; // Can be new
    name: string;
    auto_start: boolean;
    sync_id?: string | null;
    providerConfigKey: string;
    connections?: number;
    enabled?: boolean;
}

export interface SlimAction {
    id?: number; // Can be new
    providerConfigKey: string;
    name: string;
}

export interface SlimOnEventScript {
    providerConfigKey: string;
    name: string;
    event: OnEventType;
}

export interface SyncAndActionDifferences {
    newSyncs: SlimSync[];
    updatedSyncs: SlimSync[];
    deletedSyncs: SlimSync[];
    newActions: SlimAction[];
    updatedActions: SlimAction[];
    deletedActions: SlimAction[];
    deletedModels: string[];
}

export interface ScriptDifferences extends SyncAndActionDifferences {
    newOnEventScripts: SlimOnEventScript[];
    updatedOnEventScripts: SlimOnEventScript[];
    deletedOnEventScripts: SlimOnEventScript[];
}
