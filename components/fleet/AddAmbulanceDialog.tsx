'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import type { Ambulance } from '@/lib/redux/slices/ambulancesSlice'

interface AddAmbulanceDialogProps {
  onAdd?: (ambulance: Omit<Ambulance, 'id'>) => void
}

export default function AddAmbulanceDialog({ onAdd }: AddAmbulanceDialogProps) {
  const [open, setOpen] = useState(false)
  const [callSign, setCallSign] = useState('')
  const [crew1, setCrew1] = useState('')
  const [crew2, setCrew2] = useState('')
  const [equipment, setEquipment] = useState('')

  const handleAdd = () => {
    if (callSign && crew1 && crew2) {
      onAdd?.({
        callSign,
        status: 'Available',
        location: { lat: 40.7128, lng: -74.0060 },
        crew: [crew1, crew2],
        equipment: equipment.split(',').map(e => e.trim()).filter(Boolean) || [
          'Defibrillator',
          'Oxygen',
          'Stretcher',
          'Monitor',
        ],
        responseTime: Math.floor(Math.random() * 10) + 3,
        incidents: 0,
      })
      setCallSign('')
      setCrew1('')
      setCrew2('')
      setEquipment('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Ambulance
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ambulance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Call Sign</label>
            <Input
              placeholder="e.g., Unit 6"
              value={callSign}
              onChange={(e) => setCallSign(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Crew Member 1</label>
            <Input
              placeholder="Name"
              value={crew1}
              onChange={(e) => setCrew1(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Crew Member 2</label>
            <Input
              placeholder="Name"
              value={crew2}
              onChange={(e) => setCrew2(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Equipment (comma separated)</label>
            <Input
              placeholder="Defibrillator, Oxygen, Stretcher..."
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={!callSign || !crew1 || !crew2}
            className="w-full"
          >
            Add Ambulance
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
