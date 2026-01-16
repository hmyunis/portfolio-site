import { FORM_CONFIG } from '../config/constants';
import type { FormState } from '../types';

export async function submitContactForm(formData: FormData): Promise<{ success: boolean; message?: string }> {
    try {
        const response = await fetch(FORM_CONFIG.apiEndpoint, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            return { success: true };
        } else {
            throw new Error(data.message || FORM_CONFIG.errorMessage);
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : FORM_CONFIG.errorMessage,
        };
    }
}

export function createSuccessState(): FormState {
    return {
        status: 'success',
        message: FORM_CONFIG.successMessage,
    };
}

export function createErrorState(message?: string): FormState {
    return {
        status: 'error',
        message: message || FORM_CONFIG.errorMessage,
    };
}

export function createLoadingState(): FormState {
    return {
        status: 'loading',
        message: '',
    };
}

export function createIdleState(): FormState {
    return {
        status: 'idle',
        message: '',
    };
}
