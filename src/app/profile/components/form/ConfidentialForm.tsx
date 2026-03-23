'use client'

import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { User } from '../../../types/auth'
import api from '../../../lib/axios'

export default function NotificationForm({ user }: { user: User }) {
  // Rajouter la logique pour changer le status du compte en Archived

  return (
    <div className="flex justify-between items-center p-5 bg-accent border border-border rounded-[15px]">
      <div className="flex flex-col items-center m-auto">
        <label htmlFor="delete_account">
          <button className="btn btn-ghost btn-xs text-sm p-0 border-none hover:bg-transparent">
            Suprimer mon compte
          </button>
        </label>
        <p className="text-sm text-border">Supprimer toute vos données, cette action est irreversible</p>
      </div>
    </div>
  )
}
