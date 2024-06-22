"use client";
import { Toast } from "flowbite-react";
import {HiX } from "react-icons/hi";
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
        <Toast className="mx-auto max-w-lg ">
        <HiX className=" h-5 w-5 text-red-500 dark:text-red-400" />
        <div className="pl-4  text-lg font-normal">{alertTranslations[alertType]}! {alertMessage}</div>
      </Toast>
    );
}
