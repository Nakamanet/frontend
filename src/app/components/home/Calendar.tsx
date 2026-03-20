'use client';

import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { User } from '../../types/auth';


export default function Calendar({ user }: { user: User | null }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const events = [
    {
        id: 1,
        title: "Tome 1 de Naruto",
        date: "2026-03-13",
        description: "Le premier tome de Naruto",
    },
    {
        id: 2,
        title: "Tome 2 de Naruto",
        date: "2026-03-20",
        description: "Le deuxième tome de Naruto",
    },
    {
        id: 3,
        title: "Tome 3 de Naruto",
        date: "2026-03-27",
        description: "Le troisième tome de Naruto",
    }
  ]
  // Logique de génération des jours
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="card bg-accent rounded-[15px] shadow-xl border border-border w-full">
      <div className="card-body p-4">
        {/* Header : Flèches + Select mois + Select année */}
        <div className="flex justify-between items-center gap-2 mb-4">
          <button
            type="button"
            onClick={prevMonth}
            className="btn btn-ghost btn-sm btn-circle text-border hover:bg-primary hover:text-primary-content border-none"
            aria-label="Mois précédent"
          >
            ‹
          </button>
          <select
            className="select select-bordered bg-transparent border-border border select-sm flex-1 max-w-[120px]"
            value={currentMonth.getMonth()}
            onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), Number(e.target.value), 1))}
          >
            <option value={0}>Janvier</option>
            <option value={1}>Février</option>
            <option value={2}>Mars</option>
            <option value={3}>Avril</option>
            <option value={4}>Mai</option>
            <option value={5}>Juin</option>
            <option value={6}>Juillet</option>
            <option value={7}>Août</option>
            <option value={8}>Septembre</option>
            <option value={9}>Octobre</option>
            <option value={10}>Novembre</option>
            <option value={11}>Décembre</option>
          </select>
          <select
            className="select select-bordered bg-transparent border-border border select-sm flex-1 max-w-[100px]"
            value={currentMonth.getFullYear()}
            onChange={(e) => setCurrentMonth(new Date(Number(e.target.value), currentMonth.getMonth(), 1))}
          >
            {Array.from({ length: 11 }, (_, i) => currentMonth.getFullYear() - 5 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={nextMonth}
            className="btn btn-ghost btn-sm btn-circle text-border hover:bg-primary hover:text-primary-content border-none"
            aria-label="Mois suivant"
          >
            ›
          </button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold opacity-50 mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <div key={d + Math.random()}>{d}</div>)}
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const hasEvent = events.some(e => e.date === dateStr);
            const isCurrentMonth = isSameMonth(day, monthStart);

            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDay(day);
                  (document.getElementById('calendar_modal') as HTMLDialogElement).showModal();
                }}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-lg text-xs transition-colors
                  ${!isCurrentMonth ? 'opacity-20' : 'hover:bg-primary hover:text-primary-content'}
                  ${isSameDay(day, new Date()) ? 'bg-primary text-primary-content' : ''}
                `}
              >
                {format(day, 'd')}
                {hasEvent && <div className="w-1 h-1 bg-error rounded-full mt-1"></div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal DaisyUI */}
      <dialog id="calendar_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {selectedDay ? format(selectedDay, 'eeee d MMMM', { locale: fr }) : ''}
          </h3>
          <div className="py-4">
            {selectedDay && events.filter(e => e.date === format(selectedDay, 'yyyy-MM-dd')).length > 0 ? (
              events.filter(e => e.date === format(selectedDay, 'yyyy-MM-dd')).map(e => (
                <div key={e.id} className="alert alert-info shadow-sm mb-2">
                  <div>
                    <h4 className="font-bold">{e.title}</h4>
                    <p className="text-sm">{e.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm opacity-60">Aucun événement prévu.</p>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Fermer</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}