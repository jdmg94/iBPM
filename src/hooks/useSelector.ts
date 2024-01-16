import {useSelector as base} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState} from '@/store';

export const useSelector: TypedUseSelectorHook<RootState> = base;
