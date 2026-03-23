'use client'

import { User } from '../../types/auth'
import PersonnalForm from './form/PersonnalForm'
import SupplementaireForm from './form/SupplementaireForm'
import MediaForm from './form/MediaForm'
import NotificationForm from './form/NotificationForm'
import ConfidentialForm from './form/ConfidentialForm'

export default function Profile({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-7 ml-6">
      <div className="flex flex-col gap-6 w-full">
        <PersonnalForm user={user} />
        <SupplementaireForm user={user} />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <NotificationForm user={user} />
        <MediaForm user={user} />
      </div>
      <div className="col-span-2">
        <ConfidentialForm user={user} />
      </div>
    </div>
  )
}
