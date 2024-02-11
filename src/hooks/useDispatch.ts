import { useDispatch as base } from 'react-redux'
import type { AppDispatch } from '@/store'

export const useDispatch: () => AppDispatch = base
