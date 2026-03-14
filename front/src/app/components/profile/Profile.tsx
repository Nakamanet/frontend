'use client';

import { User } from "../../types/auth";
import PersonnalForm from "./PersonnalForm";
import SupplementaireForm from "./SupplementaireForm";
import MediaForm from "./MediaForm";

export default function Profile({ user }: { user: User }) {
    return (
        <div>
            {/* Informations personnelles */}
            <PersonnalForm user={user} />

            {/* Informations supplementaires */}
            <SupplementaireForm user={user} />

            {/* Médias */}
            <MediaForm user={user} />
        </div>
    );
}