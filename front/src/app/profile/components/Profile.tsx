'use client';

import { User } from "../../types/auth";
import PersonnalForm from "./form/PersonnalForm";
import SupplementaireForm from "./form/SupplementaireForm";
import MediaForm from "./form/MediaForm";

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