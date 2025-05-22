import React from 'react';

export const FormFieldPlaceholder: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
    </div>
);

export const UserDataPlaceholder: React.FC = () => (
    <div className="animate-pulse space-y-4">
        <FormFieldPlaceholder />
        <FormFieldPlaceholder />
        <FormFieldPlaceholder />
        <div className="flex space-x-4">
            <div className="w-1/2">
                <FormFieldPlaceholder />
            </div>
            <div className="w-1/2">
                <FormFieldPlaceholder />
            </div>
        </div>
    </div>
);

export const AddressPlaceholder: React.FC = () => (
    <div className="animate-pulse space-y-4">
        <div className="flex space-x-4">
            <div className="w-3/4">
                <FormFieldPlaceholder />
            </div>
            <div className="w-1/4">
                <FormFieldPlaceholder />
            </div>
        </div>
        <div className="flex space-x-4">
            <div className="w-1/3">
                <FormFieldPlaceholder />
            </div>
            <div className="w-1/3">
                <FormFieldPlaceholder />
            </div>
            <div className="w-1/3">
                <FormFieldPlaceholder />
            </div>
        </div>
        <FormFieldPlaceholder />
    </div>
);

export const CaptchaPlaceholder: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-20 w-full max-w-md bg-gray-200 rounded"></div>
    </div>
);

export const ButtonPlaceholder: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-12 w-48 bg-gray-200 rounded"></div>
    </div>
);

export const FullPagePlaceholder: React.FC = () => (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
        <div className="animate-pulse">
            <div className="h-8 w-1/2 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>

        <div className="meli-card">
            <div className="animate-pulse">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                <UserDataPlaceholder />
            </div>
        </div>

        <div className="meli-card">
            <div className="animate-pulse">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                <AddressPlaceholder />
            </div>
        </div>

        <div className="meli-card">
            <div className="animate-pulse">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                <CaptchaPlaceholder />
            </div>
        </div>

        <div className="flex justify-center mt-6">
            <ButtonPlaceholder />
        </div>
    </div>
);