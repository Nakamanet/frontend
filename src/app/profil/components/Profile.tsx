'use client'

import { User } from '../../types/auth'
import PersonnalForm from './form/PersonnalForm'
import SupplementaireForm from './form/SupplementaireForm'
import NotificationForm from './form/NotificationForm'
import ConfidentialForm from './form/ConfidentialForm'
import PasswordForm from './form/PasswordForm'
import DeleteForm from './form/DeleteForm'
import ThemeForm from './form/ThemeForm'

export default function profil({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 lg:mt-7 px-3 lg:ml-6 lg:px-0 items-start">
      <div className="flex flex-col gap-6 w-full">
        <PersonnalForm user={user} />
        <PasswordForm />
        <SupplementaireForm user={user} />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <NotificationForm user={user} />
        <ConfidentialForm user={user} />
        <ThemeForm user={user} />
      </div>
      <div className="col-span-2">
        <DeleteForm user={user} />
      </div>
    </div>
  )
}
