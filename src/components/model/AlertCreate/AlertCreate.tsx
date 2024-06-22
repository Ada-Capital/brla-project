"use client";
import { Alert } from "flowbite-react";

type ComponentProps = {
    alertType: "failure" | "success" | "warning";
    alertMessage: string;
};

const alertTranslations: { [key in ComponentProps["alertType"]]: string } = {
    failure: "Falha",
    success: "Sucesso",
    warning: "Alerta",
};

export function CreateAlert({ alertType, alertMessage }: ComponentProps) {
    return (
        <Alert color={alertType}>
            <span className="font-medium">{alertTranslations[alertType]}!</span> {alertMessage}
        </Alert>
    );
}